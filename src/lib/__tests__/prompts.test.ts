import { describe, it, expect } from "vitest";
import {
  CAPTION_SYSTEM_PROMPT,
  CONCEPT_SYSTEM_PROMPT,
  HASHTAG_SYSTEM_PROMPT,
  buildCaptionUserPrompt,
  buildConceptUserPrompt,
  buildHashtagUserPrompt,
} from "../prompts";
import type { GenerateRequest } from "../generate";

describe("TrendSprout AI Prompt Architecture", () => {
  const baseRequest: GenerateRequest = {
    niche: "Fitness & Calisthenics",
    audience: "Beginners working from home",
    tone: "Energizing and direct",
    brand_terms: ["ZeroToHero", "BodyweightMastery"],
    count: 5,
  };

  describe("Caption Prompt Generation", () => {
    it("should build structured user prompt containing all request fields", () => {
      const prompt = buildCaptionUserPrompt(baseRequest);
      expect(prompt).toContain("Niche: Fitness & Calisthenics");
      expect(prompt).toContain("Audience: Beginners working from home");
      expect(prompt).toContain("Tone: Energizing and direct");
      expect(prompt).toContain("Brand Terms: ZeroToHero, BodyweightMastery");
      expect(prompt).toContain("Count: 5");
    });

    it("should apply default count when count is undefined", () => {
      const req: GenerateRequest = { niche: "Tech Reviews" };
      const prompt = buildCaptionUserPrompt(req);
      expect(prompt).toContain("Niche: Tech Reviews");
      expect(prompt).toContain("Count: 3");
    });

    it("should enforce TikTok viral rules in CAPTION_SYSTEM_PROMPT", () => {
      expect(CAPTION_SYSTEM_PROMPT).toContain("50-150 characters");
      expect(CAPTION_SYSTEM_PROMPT).toContain("First 3 words must create curiosity");
      expect(CAPTION_SYSTEM_PROMPT).toContain("OUTPUT FORMAT (JSON array)");
      expect(CAPTION_SYSTEM_PROMPT).toContain('"hook_style"');
      expect(CAPTION_SYSTEM_PROMPT).toContain('"engagement_tactic"');
    });
  });

  describe("Concept Prompt Generation", () => {
    it("should build structured user prompt for video concepts", () => {
      const prompt = buildConceptUserPrompt(baseRequest);
      expect(prompt).toContain("Niche: Fitness & Calisthenics");
      expect(prompt).toContain("Audience: Beginners working from home");
    });

    it("should contain 3-act structure and engagement scoring in CONCEPT_SYSTEM_PROMPT", () => {
      expect(CONCEPT_SYSTEM_PROMPT).toContain("HOOK (first 3 seconds)");
      expect(CONCEPT_SYSTEM_PROMPT).toContain("VIDEO STRUCTURE");
      expect(CONCEPT_SYSTEM_PROMPT).toContain("predicted_engagement_scores");
      expect(CONCEPT_SYSTEM_PROMPT).toContain("watch_time_retention");
      expect(CONCEPT_SYSTEM_PROMPT).toContain("shareability");
    });
  });

  describe("Hashtag Set Prompt Generation", () => {
    it("should include reference trends when provided in request", () => {
      const req: GenerateRequest = {
        niche: "Personal Finance",
        reference_trends: true,
      };
      const prompt = buildHashtagUserPrompt(req);
      expect(prompt).toContain("Niche: Personal Finance");
      expect(prompt).toContain("Reference Trends: true");
    });

    it("should enforce 3-tier hashtag strategy in HASHTAG_SYSTEM_PROMPT", () => {
      expect(HASHTAG_SYSTEM_PROMPT).toContain("4-6 hashtags");
      expect(HASHTAG_SYSTEM_PROMPT).toContain("high_volume");
      expect(HASHTAG_SYSTEM_PROMPT).toContain("mid_tier");
      expect(HASHTAG_SYSTEM_PROMPT).toContain("niche");
      expect(HASHTAG_SYSTEM_PROMPT).toContain("OUTPUT FORMAT (JSON array)");
    });
  });
});
