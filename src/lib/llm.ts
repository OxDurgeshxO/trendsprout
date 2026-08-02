// LLM Client for AI Content Generation
// Supports OpenAI, Anthropic, and a mock fallback for development

const OPENAI_API_KEY = () => process.env.OPENAI_API_KEY;
const ANTHROPIC_API_KEY = () => process.env.ANTHROPIC_API_KEY;

type LLMProvider = "openai" | "anthropic" | "mock";

function detectProvider(): LLMProvider {
  if (OPENAI_API_KEY()) return "openai";
  if (ANTHROPIC_API_KEY()) return "anthropic";
  return "mock";
}

interface LLMRequest {
  systemPrompt: string;
  userPrompt: string;
  count?: number;
  niche?: string;
}

interface LLMResponse {
  content: string;
  provider: LLMProvider;
}

/**
 * Call the LLM with system and user prompts.
 * Falls back to a deterministic mock when no API key is configured
 * so the app is always functional during development.
 */
export async function callLLM(req: LLMRequest): Promise<LLMResponse> {
  const provider = detectProvider();

  switch (provider) {
    case "openai":
      return callOpenAI(req);
    case "anthropic":
      return callAnthropic(req);
    case "mock":
    default:
      return callMockLLM(req);
  }
}

/**
 * OpenAI integration.
 */
async function callOpenAI(req: LLMRequest): Promise<LLMResponse> {
  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY()}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: req.systemPrompt },
          { role: "user", content: req.userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 4096,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${error}`);
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[];
  };

  return {
    content: data.choices[0]?.message?.content ?? "",
    provider: "openai",
  };
}

/**
 * Anthropic integration.
 */
async function callAnthropic(req: LLMRequest): Promise<LLMResponse> {
  const response = await fetch(
    "https://api.anthropic.com/v1/messages",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY()!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        system: req.systemPrompt,
        messages: [{ role: "user", content: req.userPrompt }],
        max_tokens: 4096,
        temperature: 0.8,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error (${response.status}): ${error}`);
  }

  const data = (await response.json()) as {
    content: { text: string }[];
  };

  return {
    content: data.content[0]?.text ?? "",
    provider: "anthropic",
  };
}

/**
 * Mock LLM for development — returns varied, deterministic JSON
 * that follows the expected schemas without needing an API key.
 */
async function callMockLLM(req: LLMRequest): Promise<LLMResponse> {
  // Simulate a small delay like a real LLM would have
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

  // Use the hash of the system prompt to determine which type to generate
  const isCaption = req.systemPrompt.includes("copywriting expert");
  const isConcept = req.systemPrompt.includes("viral TikTok content strategist");
  const isHashtag = req.systemPrompt.includes("hashtag and SEO strategist");
  const count = req.count ?? 3;

  if (isCaption) {
    return {
      content: JSON.stringify(generateMockCaptions(req, count)),
      provider: "mock",
    };
  }

  if (isConcept) {
    return {
      content: JSON.stringify(generateMockConcepts(req, count)),
      provider: "mock",
    };
  }

  if (isHashtag) {
    return {
      content: JSON.stringify(generateMockHashtags(req, count)),
      provider: "mock",
    };
  }

  // Fallback
  return {
    content: JSON.stringify([{ note: "Mock fallback response" }]),
    provider: "mock",
  };
}

const MOCK_CAPTION_TEMPLATES = [
  {
    caption: "stop scrolling if you want to level up. here's the exact strategy that changed everything for me. try this for 7 days and thank me later. save this for later 👇",
    hook_style: "command_stop",
    engagement_tactic: "save",
    tone: "direct_motivational",
  },
  {
    caption: "tell me i'm not the only one who does this. 😅 be honest in the comments — how many times have you done this?",
    hook_style: "relatability",
    engagement_tactic: "comments",
    tone: "funny",
  },
  {
    caption: "i tried this for 30 days and the results blew my mind. here's what happened 👇 share this with someone who needs to hear it.",
    hook_style: "curiosity_challenge",
    engagement_tactic: "shares",
    tone: "educational",
  },
  {
    caption: "the way i used to do this vs. how i do it now. game changer. 🧠 comment 'guide' and i'll send you the full breakdown.",
    hook_style: "transformation",
    engagement_tactic: "comments",
    tone: "professional",
  },
  {
    caption: "wait for it... the ending is everything. 😳 this is your sign to start today. no more excuses.",
    hook_style: "curiosity_wait",
    engagement_tactic: "watch_time",
    tone: "direct_motivational",
  },
];

function generateMockCaptions(req: LLMRequest, count: number) {
  const niche = req.niche || "your niche";
  const items = [];
  for (let i = 0; i < count; i++) {
    const tpl = MOCK_CAPTION_TEMPLATES[i % MOCK_CAPTION_TEMPLATES.length];
    items.push({
      ...tpl,
      caption: tpl.caption.replace(/level up/, `master ${niche}`),
    });
  }
  return items;
}

const MOCK_CONCEPT_TEMPLATES = [
  {
    title: "The Transformation Method",
    structure_type: "A_transformation",
    hook: {
      description: "Quick before/after teaser in first 2 seconds",
      text_overlay: "THE CHANGE THAT CHANGED EVERYTHING",
      first_3_words_audio: "I used to...",
    },
    acts: [
      { time: "0:00-0:03", content: "Hook: Show dramatic before/after as a quick teaser" },
      { time: "0:03-0:15", content: "Process: Show the step-by-step method with close-ups" },
      { time: "0:15-0:30", content: "Results: Show final result with key tips on screen" },
    ],
    audio_suggestion: "Trending upbeat background music with soft voiceover",
    text_strategy: "Bold keyword captions on screen; result at the end",
    engagement_trigger: "Save for later + Comment for tips",
    format_tips: { ideal_length: "25-30 seconds", pacing: "Fast cuts during process", lighting: "Natural lighting" },
    predicted_engagement_scores: { watch_time_retention: 8, shareability: 7, comment_bait: 7, save_likelihood: 9 },
  },
  {
    title: "The Hot Take",
    structure_type: "G_hot_take",
    hook: {
      description: "Start with a controversial statement in the niche",
      text_overlay: "UNPOPULAR OPINION 🗣️",
      first_3_words_audio: "Here's what nobody...",
    },
    acts: [
      { time: "0:00-0:05", content: "Hook: State the controversial opinion" },
      { time: "0:05-0:20", content: "Explain: Break down why most people get it wrong" },
      { time: "0:20-0:30", content: "Resolution: Offer your proven alternative approach" },
    ],
    audio_suggestion: "Original audio — speak directly to camera",
    text_strategy: "Key phrases appear as text as you speak them",
    engagement_trigger: "Disagree? Comment your take below",
    format_tips: { ideal_length: "30-45 seconds", pacing: "Steady, confident delivery", lighting: "Ring light, eye-level" },
    predicted_engagement_scores: { watch_time_retention: 7, shareability: 9, comment_bait: 10, save_likelihood: 5 },
  },
  {
    title: "The List Hack",
    structure_type: "I_list",
    hook: {
      description: "Start with 'X things I wish I knew'",
      text_overlay: "THINGS I WISH I KNEW SOONER",
      first_3_words_audio: "Number one is...",
    },
    acts: [
      { time: "0:00-0:05", content: "Hook: Tease the list with the most surprising item" },
      { time: "0:05-0:25", content: "List: Go through each item with quick examples" },
      { time: "0:25-0:35", content: "Wrap up: Which one surprised you most? Comment below" },
    ],
    audio_suggestion: "Trending sound with text-to-speech voiceover",
    text_strategy: "Numbers appear as you count through the list",
    engagement_trigger: "Save to remember all X tips",
    format_tips: { ideal_length: "30-40 seconds", pacing: "Quick, snappy delivery between items", lighting: "Bright, even lighting" },
    predicted_engagement_scores: { watch_time_retention: 8, shareability: 6, comment_bait: 7, save_likelihood: 9 },
  },
];

function generateMockConcepts(req: LLMRequest, count: number) {
  return MOCK_CONCEPT_TEMPLATES.slice(0, count).map((t) => ({
    ...t,
    title: `${t.title} for ${req.niche || "your niche"}`,
    acts: t.acts.map((a) => ({ ...a, content: `${a.content} — ${req.niche || "niche"}-focused` })),
  }));
}

const MOCK_HASHTAG_TEMPLATES = [
  {
    set_id: 1,
    hashtags: ["#GameChanger", "#ProTips", "#GrowthHack", "#LearnOnTikTok", "#NicheKnowledge"],
    tier_breakdown: {
      high_volume: ["#GrowthHack"],
      mid_tier: ["#ProTips", "#LearnOnTikTok"],
      niche: ["#GameChanger", "#NicheKnowledge"],
    },
    rationale: "Balanced mix for maximum discovery. Broad tags drive views while niche tags attract engaged followers.",
    reach_quality: "targeted",
  },
  {
    set_id: 2,
    hashtags: ["#BeginnerTips", "#HowTo", "#ViralContent", "#TikTokTips", "#NewCreator"],
    tier_breakdown: {
      high_volume: ["#ViralContent", "#TikTokTips"],
      mid_tier: ["#HowTo", "#NewCreator"],
      niche: ["#BeginnerTips"],
    },
    rationale: "Focus on reach with high-volume tags plus community-building niche tags for engagement.",
    reach_quality: "broad",
  },
  {
    set_id: 3,
    hashtags: ["#DeepDive", "#ExpertAdvice", "#NicheCommunity", "#ViralTips", "#ContentCreator"],
    tier_breakdown: {
      high_volume: ["#ContentCreator", "#ViralTips"],
      mid_tier: ["#ExpertAdvice", "#NicheCommunity"],
      niche: ["#DeepDive"],
    },
    rationale: "Expert positioning with niche dominance. Establishes authority while driving targeted traffic.",
    reach_quality: "niche",
  },
];

function generateMockHashtags(_req: LLMRequest, count: number) {
  return MOCK_HASHTAG_TEMPLATES.slice(0, count);
}

// Re-import for mock generation

