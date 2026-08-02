// Content Generation Server Functions
// These are callable from client components and run server-side,
// protecting API keys. They also serve as the API layer for
// /api/generate/captions, /api/generate/concepts, /api/generate/hashtags.

import { createServerFn } from "@tanstack/react-start";
import { callLLM } from "./llm";
import {
  CAPTION_SYSTEM_PROMPT,
  CONCEPT_SYSTEM_PROMPT,
  HASHTAG_SYSTEM_PROMPT,
  buildCaptionUserPrompt,
  buildConceptUserPrompt,
  buildHashtagUserPrompt,
} from "./prompts";
import type {
  GenerateRequest,
  CaptionResult,
  ConceptResult,
  HashtagSet,
} from "./generation-types";

// ============================================================
// Post-processing helpers
// ============================================================

function parseJSON<T>(raw: string, fallback: T): T {
  try {
    // Strip markdown code fences if present
    const cleaned = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    return JSON.parse(cleaned) as T;
  } catch {
    return fallback;
  }
}

function sanitizeHashtags(hashtags: string[]): string[] {
  return hashtags.map((tag) =>
    tag
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/^#/, "#") // ensure single #
  );
}

function deduplicate<T>(items: T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ============================================================
// 1. Generate Captions
// ============================================================

export const generateCaptions = createServerFn({ method: "POST" })
  .validator((data: unknown): GenerateRequest => {
    const req = data as GenerateRequest;
    if (!req.niche || typeof req.niche !== "string" || req.niche.trim().length === 0) {
      throw new Error("niche is required and must be a non-empty string");
    }
    return {
      niche: req.niche.trim(),
      audience: req.audience?.trim(),
      tone: req.tone,
      count: Math.min(Math.max(req.count ?? 3, 1), 10),
      brand_terms: req.brand_terms?.map((b) => b.trim()).filter(Boolean),
    };
  })
  .handler(async ({ data }) => {
    const systemPrompt = CAPTION_SYSTEM_PROMPT;
    const userPrompt = buildCaptionUserPrompt(data);

    const result = await callLLM({ systemPrompt, userPrompt });
    const captions = parseJSON<CaptionResult[]>(result.content, []);

    // Post-process
    const cleaned = deduplicate(captions, (c) => c.caption.slice(0, 50)).map(
      (c) => ({
        ...c,
        caption: c.caption.trim(),
      })
    );

    return { captions: cleaned, provider: result.provider };
  });

// ============================================================
// 2. Generate Video Concepts
// ============================================================

export const generateConcepts = createServerFn({ method: "POST" })
  .validator((data: unknown): GenerateRequest => {
    const req = data as GenerateRequest;
    if (!req.niche || typeof req.niche !== "string" || req.niche.trim().length === 0) {
      throw new Error("niche is required and must be a non-empty string");
    }
    return {
      niche: req.niche.trim(),
      audience: req.audience?.trim(),
      tone: req.tone,
      count: Math.min(Math.max(req.count ?? 2, 1), 5),
      brand_terms: req.brand_terms?.map((b) => b.trim()).filter(Boolean),
    };
  })
  .handler(async ({ data }) => {
    const result = await callLLM({
      systemPrompt: CONCEPT_SYSTEM_PROMPT,
      userPrompt: buildConceptUserPrompt(data),
    });

    const concepts = parseJSON<ConceptResult[]>(result.content, []);
    const cleaned = deduplicate(concepts, (c) => c.title);

    return { concepts: cleaned, provider: result.provider };
  });

// ============================================================
// 3. Generate Hashtag Sets
// ============================================================

export const generateHashtags = createServerFn({ method: "POST" })
  .validator((data: unknown): GenerateRequest => {
    const req = data as GenerateRequest;
    if (!req.niche || typeof req.niche !== "string" || req.niche.trim().length === 0) {
      throw new Error("niche is required and must be a non-empty string");
    }
    return {
      niche: req.niche.trim(),
      audience: req.audience?.trim(),
      count: Math.min(Math.max(req.count ?? 3, 1), 5),
      brand_terms: req.brand_terms?.map((b) => b.trim()).filter(Boolean),
      reference_trends: req.reference_trends ?? true,
    };
  })
  .handler(async ({ data }) => {
    const result = await callLLM({
      systemPrompt: HASHTAG_SYSTEM_PROMPT,
      userPrompt: buildHashtagUserPrompt(data),
    });

    const hashtagSets = parseJSON<HashtagSet[]>(result.content, []);

    // Post-process: sanitize all hashtags
    const cleaned = hashtagSets.map((set) => ({
      ...set,
      hashtags: sanitizeHashtags(set.hashtags),
      tier_breakdown: {
        high_volume: sanitizeHashtags(set.tier_breakdown?.high_volume ?? []),
        mid_tier: sanitizeHashtags(set.tier_breakdown?.mid_tier ?? []),
        niche: sanitizeHashtags(set.tier_breakdown?.niche ?? []),
      },
    }));

    return { hashtag_sets: cleaned, provider: result.provider };
  });
