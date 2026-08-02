import { createServerFn } from "@tanstack/react-start";

// ─── Type definitions (matching prompt strategy schemas) ───

export interface Caption {
  caption: string;
  hook_style: string;
  engagement_tactic: string;
  tone: string;
}

export interface VideoHook {
  description: string;
  text_overlay: string;
  first_3_words_audio: string;
}

export interface VideoAct {
  time: string;
  content: string;
}

export interface FormatTips {
  ideal_length: string;
  pacing: string;
  lighting: string;
}

export interface EngagementScores {
  watch_time_retention: number;
  shareability: number;
  comment_bait: number;
  save_likelihood: number;
}

export interface VideoConcept {
  title: string;
  structure_type: string;
  hook: VideoHook;
  acts: VideoAct[];
  audio_suggestion: string;
  text_strategy: string;
  engagement_trigger: string;
  format_tips: FormatTips;
  predicted_engagement_scores: EngagementScores;
}

export interface TierBreakdown {
  high_volume: string[];
  mid_tier: string[];
  niche: string[];
}

export interface HashtagSet {
  set_id: number;
  hashtags: string[];
  tier_breakdown: TierBreakdown;
  rationale: string;
  reach_quality: string;
}

export interface ContentSet {
  content_set_id: number;
  video_concept: VideoConcept;
  caption: Caption;
  hashtags: HashtagSet;
  coherence_note: string;
}

// ─── Request / response types ───

export interface GenerateRequest {
  niche: string;
  audience?: string;
  tone?: string;
  count?: number;
}

export interface GenerateResponse {
  success: boolean;
  data: ContentSet[];
  error?: string;
}

// ─── Mock content sets for different niches ───

const contentLibraries: Record<string, () => ContentSet[]> = {
  fashion: () => [
    {
      content_set_id: 1,
      video_concept: {
        title: "My Sustainable Wardrobe Transformation",
        structure_type: "A_transformation",
        hook: {
          description: "Stand in front of a cluttered closet looking overwhelmed, then cut to a perfectly organized capsule wardrobe",
          text_overlay: "I HAD 80 PIECES I NEVER WORE 👆",
          first_3_words_audio: "I used to think...",
        },
        acts: [
          { time: "0:00-0:04", content: "Hook: Show chaotic closet → organized capsule in quick wipe transition" },
          { time: "0:04-0:18", content: "Process: Show 3 sustainable brands I switched to, with price comparisons" },
          { time: "0:18-0:28", content: "Results: 3 outfit formulas using only ethical pieces. Text: 'Quality over quantity'" },
          { time: "0:28-0:32", content: "CTA: 'Save this for your wardrobe reset — comment 'sustainable' for my brand list'" },
        ],
        audio_suggestion: "Trending calm/original audio with voiceover explaining each brand switch",
        text_strategy: "Keyword captions on each brand name; bold claim in first frame; price callouts in process section",
        engagement_trigger: "Save for wardrobe inspiration + Comment for brand list + Share with eco-conscious friends",
        format_tips: { ideal_length: "28-32 seconds", pacing: "Fast cuts during transformation, slow down for outfit close-ups", lighting: "Natural window light for clothing shots; warm lamp for cozy vibe" },
        predicted_engagement_scores: { watch_time_retention: 8, shareability: 9, comment_bait: 7, save_likelihood: 9 },
      },
      caption: {
        caption: "i had 80 pieces in my closet and wore the same 10. 😳 here's how i built a sustainable capsule wardrobe that actually sparks joy. 🌿\n\nsave this for your next closet cleanout\n\ncomment 'brands' and i'll send you my list 👇",
        hook_style: "relatable_reveal",
        engagement_tactic: "save_comment",
        tone: "relatable",
      },
      hashtags: {
        set_id: 1,
        hashtags: ["#SustainableFashion", "#CapsuleWardrobe", "#EthicalFashion", "#SlowFashion", "#WardrobeEssentials", "#EcoFriendlyStyle"],
        tier_breakdown: { high_volume: ["#SustainableFashion", "#CapsuleWardrobe"], mid_tier: ["#EthicalFashion", "#SlowFashion"], niche: ["#WardrobeEssentials", "#EcoFriendlyStyle"] },
        rationale: "Targets eco-conscious fashion lovers. #SustainableFashion provides broad reach while #WardrobeEssentials attracts viewers ready to make a change — high save likelihood.",
        reach_quality: "targeted",
      },
      coherence_note: "The caption's 'save this' CTA matches the video's high save-likelihood score. Hashtags categorize the ethical fashion angle directly from the concept.",
    },
    {
      content_set_id: 2,
      video_concept: {
        title: "Fast Fashion vs. Sustainable — The Real Cost",
        structure_type: "D_comparison",
        hook: {
          description: "Split screen: holding a cheap fast-fashion item on the left vs. a quality sustainable piece on the right",
          text_overlay: "THIS COSTS MORE BUT LASTS LONGER 👆",
          first_3_words_audio: "You're paying for...",
        },
        acts: [
          { time: "0:00-0:05", content: "Hook: Split screen comparison. Text: '$20 vs $80 — which lasts longer?'" },
          { time: "0:05-0:15", content: "Comparison: Show wear after 5 washes on each. Fast fashion fades, sustainable holds up" },
          { time: "0:15-0:25", content: "Value breakdown: Cost-per-wear math. '$80 worn 50 times = $1.60/wear'" },
          { time: "0:25-0:30", content: "CTA: 'Follow for more sustainable style tips. Your wallet (and the planet) will thank you'" },
        ],
        audio_suggestion: "Original audio — voiceover explaining cost-per-wear concept with slightly educational tone",
        text_strategy: "On-screen math calculations; bold comparison callouts; price tags appearing on each item",
        engagement_trigger: "Save for shopping reference + Comment your favorite sustainable brand + Share with shopping buddies",
        format_tips: { ideal_length: "28-30 seconds", pacing: "Steady with clear visual comparisons; slow down for math explanation section", lighting: "Bright, even lighting to show fabric quality differences clearly" },
        predicted_engagement_scores: { watch_time_retention: 9, shareability: 8, comment_bait: 8, save_likelihood: 8 },
      },
      caption: {
        caption: "the $20 shirt lasted 3 washes. the $80 one is still going strong after a year. 🧵\n\nhere's the math nobody talks about 👇\n\nsave this before your next shopping trip\n\nfollow for more sustainable style tips 🌱",
        hook_style: "surprising_fact",
        engagement_tactic: "save_follow",
        tone: "educational",
      },
      hashtags: {
        set_id: 2,
        hashtags: ["#SustainableStyle", "#SlowFashionMovement", "#EthicalShopping", "#FashionOnABudget", "#QualityOverQuantity", "#EcoConsciousLiving"],
        tier_breakdown: { high_volume: ["#SustainableStyle"], mid_tier: ["#SlowFashionMovement", "#EthicalShopping"], niche: ["#FashionOnABudget", "#QualityOverQuantity", "#EcoConsciousLiving"] },
        rationale: "Combines broad discovery (#SustainableStyle) with niche community tags (#SlowFashionMovement) and savable content triggers.",
        reach_quality: "broad",
      },
      coherence_note: "The educational tone of the caption matches the cost-per-wear math in the concept. All three reinforce 'smarter shopping'.",
    },
  ],
  fitness: () => [
    {
      content_set_id: 1,
      video_concept: {
        title: "One Move That Fixed My Posture",
        structure_type: "A_transformation",
        hook: {
          description: "Stand sideways to camera in bad posture, then cut to perfect posture after the exercise",
          text_overlay: "THE MOVE THAT FIXED MY POSTURE 👆",
          first_3_words_audio: "This one change...",
        },
        acts: [
          { time: "0:00-0:03", content: "Hook: Show bad posture → good posture transformation as quick tease" },
          { time: "0:03-0:15", content: "Process: Demonstrate the corrective exercise, show close-up form" },
          { time: "0:15-0:25", content: "Results: Side-by-side comparison. Text: 'Do this daily for 2 weeks'" },
        ],
        audio_suggestion: "Trending calm/original audio — soft voiceover explaining the move",
        text_strategy: "Keyword captions on screen during each step; bold claim in first frame",
        engagement_trigger: "Save for later reference + Comment 'posture' for more tips",
        format_tips: { ideal_length: "25-30 seconds", pacing: "Fast cuts during process, slow down for key demonstration", lighting: "Natural light, side-lit to show body alignment" },
        predicted_engagement_scores: { watch_time_retention: 8, shareability: 7, comment_bait: 8, save_likelihood: 9 },
      },
      caption: {
        caption: "this one move changed my posture in 2 weeks. 🦴\n\nhere's the exact exercise 👇\n\nsave this for your next workout\n\ncomment 'posture' for more tips",
        hook_style: "command_stop",
        engagement_tactic: "save_comment",
        tone: "direct_motivational",
      },
      hashtags: {
        set_id: 1,
        hashtags: ["#PostureCorrection", "#FitnessTips", "#HomeWorkout", "#MobilityMatters", "#DeskJobProblems", "#CoreStrength"],
        tier_breakdown: { high_volume: ["#FitnessTips"], mid_tier: ["#PostureCorrection", "#HomeWorkout"], niche: ["#MobilityMatters", "#DeskJobProblems", "#CoreStrength"] },
        rationale: "Targets desk workers with posture problems — a highly engaged sub-niche. #FitnessTips provides broad discovery while niche tags attract viewers likely to save and follow.",
        reach_quality: "targeted",
      },
      coherence_note: "The caption's 'posture' CTA directly links to the video concept's core topic. Hashtags reinforce the desk-worker/posture angle.",
    },
  ],
  gaming: () => [
    {
      content_set_id: 1,
      video_concept: {
        title: "3 Settings That Instantly Made Me Better",
        structure_type: "F_tutorial",
        hook: {
          description: "Split screen: gameplay before settings vs after — dramatic quality difference",
          text_overlay: "THESE 3 SETTINGS CHANGED MY GAMEPLAY 👆",
          first_3_words_audio: "Stop playing with...",
        },
        acts: [
          { time: "0:00-0:05", content: "Hook: Before/after gameplay comparison with dramatic difference" },
          { time: "0:05-0:20", content: "Tutorial: Walk through 3 critical settings changes step by step with screen capture" },
          { time: "0:20-0:28", content: "Results: Full gameplay clip showing improved performance. Text overlay each setting name" },
          { time: "0:28-0:32", content: "CTA: 'Save this for your next session — drop your main in the comments'" },
        ],
        audio_suggestion: "Trending gaming audio track with voiceover explaining each setting",
        text_strategy: "Bold setting names on screen as they're mentioned; on-screen arrows pointing to menu items",
        engagement_trigger: "Save for later reference + Comment your main character + Share with squad",
        format_tips: { ideal_length: "28-32 seconds", pacing: "Quick cuts between settings, slow down during key menu navigation", lighting: "N/A — screen capture content with facecam inset option" },
        predicted_engagement_scores: { watch_time_retention: 9, shareability: 6, comment_bait: 9, save_likelihood: 10 },
      },
      caption: {
        caption: "i played for 2 years before discovering these settings. 🎮\n\nthe difference is insane 👇\n\nsave this for your next gaming session\n\ndrop your main in the comments 🎯",
        hook_style: "curiosity_gap",
        engagement_tactic: "save_comment",
        tone: "casual_excited",
      },
      hashtags: {
        set_id: 1,
        hashtags: ["#GamingSetup", "#GamingTips", "#GameSettings", "#FPSBoost", "#CompetitiveGaming", "#PCMasterRace"],
        tier_breakdown: { high_volume: ["#GamingSetup", "#GamingTips"], mid_tier: ["#GameSettings", "#FPSBoost"], niche: ["#CompetitiveGaming", "#PCMasterRace"] },
        rationale: "#GamingSetup captures broad gaming audience while #GameSettings attracts players actively looking to improve — high save likelihood.",
        reach_quality: "broad",
      },
      coherence_note: "The 'before/after' hook in all three elements creates a cohesive narrative. Hashtags target both casual browsers and competitive players.",
    },
  ],
};

const defaultSets: ContentSet[] = [
  {
    content_set_id: 1,
    video_concept: {
      title: "The Surprising Hack That Changed Everything",
      structure_type: "B_expose",
      hook: {
        description: "Direct-to-camera with a shocked expression, holding up a common item in the niche",
        text_overlay: "NOBODY TALKS ABOUT THIS 👆",
        first_3_words_audio: "Here's what nobody...",
      },
      acts: [
        { time: "0:00-0:05", content: "Hook: Direct address with surprising claim about the topic" },
        { time: "0:05-0:18", content: "Explanation: Break down the common misconception step by step" },
        { time: "0:18-0:28", content: "Solution: Show the alternative approach with demonstration" },
        { time: "0:28-0:32", content: "CTA: 'Follow for more tips in this niche — save this for later'" },
      ],
      audio_suggestion: "Trending original audio with engaging voiceover explaining the concept",
      text_strategy: "Bold surprising fact as first text overlay; bullet points for key takeaways",
      engagement_trigger: "Save for reference + Comment your experience + Share with someone who needs this",
      format_tips: { ideal_length: "28-32 seconds", pacing: "Energetic opening, measured explanation, strong finish", lighting: "Well-lit face cam with B-roll cutaways" },
      predicted_engagement_scores: { watch_time_retention: 8, shareability: 8, comment_bait: 8, save_likelihood: 7 },
    },
    caption: {
      caption: "nobody talks about this, but it makes ALL the difference. 💡\n\ntry this and thank me later 👇\n\nsave this for later\n\ncomment your experience below 👇",
      hook_style: "curiosity_gap",
      engagement_tactic: "save_comment",
      tone: "educational",
    },
    hashtags: {
      set_id: 1,
      hashtags: ["#LearnOnTikTok", "#LifeHacks", "#TipsAndTricks", "#EducationalContent", "#GrowthMindset"],
      tier_breakdown: { high_volume: ["#LearnOnTikTok"], mid_tier: ["#LifeHacks", "#TipsAndTricks"], niche: ["#EducationalContent", "#GrowthMindset"] },
      rationale: "Balances broad educational content tags with niche growth-focused tags for maximum relevant reach.",
      reach_quality: "broad",
    },
    coherence_note: "All three elements center on a 'hidden knowledge' narrative — the caption teases it, the concept reveals it, the hashtags categorize it.",
  },
];

// ─── Map niche to content library key ───

function findContentKey(niche: string): string | null {
  const lc = niche.toLowerCase();
  if (lc.includes("fashion") || lc.includes("style") || lc.includes("clothes") || lc.includes("beauty")) return "fashion";
  if (lc.includes("fit") || lc.includes("workout") || lc.includes("gym") || lc.includes("health") || lc.includes("posture")) return "fitness";
  if (lc.includes("game") || lc.includes("gaming") || lc.includes("valorant") || lc.includes("fortnite") || lc.includes("cod")) return "gaming";
  return null;
}

// ─── The server function — called by the dashboard frontend ───

export const generateContent = createServerFn({ method: "GET" })
  .validator((input: any) => {
    const data: GenerateRequest = (input && typeof input === "object" && "data" in input ? input.data : input) as GenerateRequest;
    if (!data || typeof data.niche !== "string" || data.niche.trim().length === 0) {
      throw new Error("'niche' is required and must be a non-empty string");
    }
    return {
      niche: data.niche.trim(),
      audience: data.audience?.trim() || "",
      tone: data.tone?.trim() || "educational",
      count: Math.min(data.count ?? 2, 5),
    };
  })
  .handler(async ({ data }) => {
    // ── Optional: real Gemini AI generation ──
    // Set VITE_GEMINI_API_KEY in your .env or hosting platform env vars to enable.
    const apiKey = import.meta.env["VITE_GEMINI_API_KEY"] as string | undefined;

    if (apiKey) {
      try {
        const prompt = `You are TrendSprout, an expert TikTok content strategist.
Generate ${String(data.count)} content set(s) for a creator in the "${data.niche}" niche.
${data.audience ? `Target audience: ${data.audience}.` : ""}
Tone: ${data.tone}.

Respond ONLY with a valid JSON array of ContentSet objects with this exact structure:
[{
  "content_set_id": 1,
  "video_concept": {
    "title": "...",
    "structure_type": "A_transformation|B_expose|C_story|D_comparison|E_challenge|F_tutorial",
    "hook": { "description": "...", "text_overlay": "...", "first_3_words_audio": "..." },
    "acts": [{ "time": "0:00-0:05", "content": "..." }],
    "audio_suggestion": "...",
    "text_strategy": "...",
    "engagement_trigger": "...",
    "format_tips": { "ideal_length": "...", "pacing": "...", "lighting": "..." },
    "predicted_engagement_scores": { "watch_time_retention": 8, "shareability": 7, "comment_bait": 8, "save_likelihood": 9 }
  },
  "caption": { "caption": "...", "hook_style": "...", "engagement_tactic": "...", "tone": "..." },
  "hashtags": {
    "set_id": 1,
    "hashtags": ["#Tag1", "#Tag2"],
    "tier_breakdown": { "high_volume": ["#Tag1"], "mid_tier": ["#Tag2"], "niche": ["#Tag3"] },
    "rationale": "...",
    "reach_quality": "targeted|broad"
  },
  "coherence_note": "..."
}]`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.8, maxOutputTokens: 4096 },
            }),
          }
        );

        if (res.ok) {
          const json = (await res.json()) as {
            candidates?: Array<{
              content?: { parts?: Array<{ text?: string }> };
            }>;
          };
          const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          // Extract JSON array from response (strip markdown code fences if present)
          const match = /\[[\s\S]*\]/.exec(rawText);
          if (match) {
            const parsed = JSON.parse(match[0]) as ContentSet[];
            return { success: true, data: parsed.slice(0, data.count) } satisfies GenerateResponse;
          }
        }
      } catch {
        // Fall through to mock data on any error
      }
    }

    // ── Fallback: mock content library ──
    await new Promise((r) => setTimeout(r, 800));
    const key = findContentKey(data.niche);
    const library = key ? contentLibraries[key]() : defaultSets;
    return {
      success: true,
      data: library.slice(0, data.count),
      error: undefined,
    } satisfies GenerateResponse;
  });