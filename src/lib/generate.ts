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
  brand_terms?: string[];
  reference_trends?: boolean;
}

export interface GenerateResponse {
  success: boolean;
  data: ContentSet[];
  provider?: string;
  error?: string;
}

// ─── Preset Libraries for Instant Showcase Exploration ───

const contentLibraries: Record<string, (req: GenerateRequest) => ContentSet[]> = {
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
          { time: "0:25-0:30", content: "CTA: 'Save this for your next workout — comment posture for the full routine'" },
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
    {
      content_set_id: 2,
      video_concept: {
        title: "Stop Doing Sit-Ups — Do This Instead",
        structure_type: "D_comparison",
        hook: {
          description: "Big red 'X' over traditional sit-ups, cutting to high-tension deadbugs and pallof presses",
          text_overlay: "WHY SIT-UPS ARE RUINING YOUR BACK 🛑",
          first_3_words_audio: "If your back...",
        },
        acts: [
          { time: "0:00-0:04", content: "Hook: Explain why traditional crunches compress the lumbar spine" },
          { time: "0:04-0:16", content: "The Alternative: 2 deep core exercises that protect your spine and tighten abs" },
          { time: "0:16-0:26", content: "Rep cadence & breath cue: Inhale through nose, brace through movement" },
          { time: "0:26-0:30", content: "CTA: 'Save to replace crunches today — tag a gym partner'" },
        ],
        audio_suggestion: "Direct voiceover over rhythmic low-tempo beat",
        text_strategy: "Anatomy cues highlighted with green checkmarks and red X marks",
        engagement_trigger: "Debate in comments on crunches vs functional core + High save rate",
        format_tips: { ideal_length: "26-30 seconds", pacing: "Fast, authoritative", lighting: "Gym or studio lighting" },
        predicted_engagement_scores: { watch_time_retention: 9, shareability: 8, comment_bait: 9, save_likelihood: 9 },
      },
      caption: {
        caption: "stop doing 100 crunches a day and wondering why your lower back hurts. 🤦‍♂️\n\nhere are 2 spine-safe core moves that actually build abdominal tension 👇\n\nsave this before your next ab day!",
        hook_style: "controversial_fix",
        engagement_tactic: "save_share",
        tone: "educational",
      },
      hashtags: {
        set_id: 2,
        hashtags: ["#AbsWorkout", "#CoreStability", "#GymTok", "#WorkoutTips", "#FitTok", "#SpineHealth"],
        tier_breakdown: { high_volume: ["#GymTok", "#AbsWorkout"], mid_tier: ["#CoreStability", "#WorkoutTips"], niche: ["#SpineHealth"] },
        rationale: "Broad reach with gym community tags combined with niche pain-point targeting.",
        reach_quality: "broad",
      },
      coherence_note: "Aligns controversial hook with educational breakdown and high-save CTA.",
    },
  ],

  gaming: () => [
    {
      content_set_id: 1,
      video_concept: {
        title: "3 Settings That Instantly Made Me Better",
        structure_type: "F_tutorial",
        hook: {
          description: "Split screen: gameplay before settings vs after — dramatic quality and framerate difference",
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

  travel: () => [
    {
      content_set_id: 1,
      video_concept: {
        title: "3 Hidden Gems in Europe Nobody Tells You About",
        structure_type: "I_list",
        hook: {
          description: "Close-up passport stamp reveal cutting instantly to an unbelievable cliffside village without tourists",
          text_overlay: "SKIP THE TOURIST TRAPS IN 2026 ✈️",
          first_3_words_audio: "Don't visit Paris...",
        },
        acts: [
          { time: "0:00-0:04", content: "Hook: Show crowded hotspot vs completely serene secret alternative" },
          { time: "0:04-0:18", content: "Locations: 3 secret destinations with exact budget breakdown & transport tip" },
          { time: "0:18-0:28", content: "Best season & local food spot where meals cost under €12" },
          { time: "0:28-0:32", content: "CTA: 'Save this for your summer travel planning — Google Maps pins in bio'" },
        ],
        audio_suggestion: "Warm cinematic indie acoustic background with relaxed voiceover",
        text_strategy: "Location coordinates and flight cost badges popping in real-time",
        engagement_trigger: "High save rate for future vacation planning + Share to group chats",
        format_tips: { ideal_length: "30-34 seconds", pacing: "Vibrant and scenic cuts", lighting: "Golden hour natural lighting" },
        predicted_engagement_scores: { watch_time_retention: 9, shareability: 9, comment_bait: 8, save_likelihood: 10 },
      },
      caption: {
        caption: "stop spending $400/night in crowded capitals. 🗺️ here are 3 European hidden gems that feel like a fairytale and cost a fraction.\n\nsave this for your 2026 bucket list ✈️\n\ncomment 'pins' and i'll send you the exact Google Maps spots 👇",
        hook_style: "curiosity_challenge",
        engagement_tactic: "save_comment",
        tone: "inspirational",
      },
      hashtags: {
        set_id: 1,
        hashtags: ["#TravelHacks", "#HiddenGems", "#BucketListTravel", "#TravelTikTok", "#EuropeTravel", "#BudgetTravel"],
        tier_breakdown: { high_volume: ["#TravelTikTok", "#BucketListTravel"], mid_tier: ["#HiddenGems", "#EuropeTravel"], niche: ["#BudgetTravel", "#TravelHacks"] },
        rationale: "Blends massive discovery tags (#TravelTikTok) with high-intent travel planning tags.",
        reach_quality: "broad",
      },
      coherence_note: "Consistent bucket-list narrative connecting visually stunning hidden gems to savable itineraries.",
    },
  ],

  food: () => [
    {
      content_set_id: 1,
      video_concept: {
        title: "The 10-Minute Garlic Chili Noodles",
        structure_type: "F_tutorial",
        hook: {
          description: "Sizzling garlic and chili oil pour over tender noodles with crisp audio, first frame twirl",
          text_overlay: "BETTER THAN TAKEOUT IN 10 MINS 🍜",
          first_3_words_audio: "Stop ordering takeout...",
        },
        acts: [
          { time: "0:00-0:03", content: "Hook: Close-up noodle pull with steam and sauce shine" },
          { time: "0:03-0:15", content: "Prep: 4 staple pantry ingredients in one bowl with sizzling oil pour" },
          { time: "0:15-0:25", content: "Toss: 30-second toss with scallions and sesame seeds" },
          { time: "0:25-0:30", content: "CTA: 'Save this for when you're too lazy to cook tonight!'" },
        ],
        audio_suggestion: "Crisp ASMR kitchen sound effects over lo-fi hip hop beat",
        text_strategy: "Ingredient measurements listed cleanly on screen as each item drops in",
        engagement_trigger: "Extremely high save-for-dinner rate + Craving triggers",
        format_tips: { ideal_length: "24-28 seconds", pacing: "Snappy, satisfying cuts", lighting: "Bright top-down kitchen lighting" },
        predicted_engagement_scores: { watch_time_retention: 9, shareability: 8, comment_bait: 7, save_likelihood: 10 },
      },
      caption: {
        caption: "this is what i make when i have 10 minutes and zero energy. 🤤 one bowl, basic pantry staples, tastes like 5-star takeout.\n\nsave this for dinner tonight!\n\ncomment 'recipe' for the exact measurements 👇",
        hook_style: "relatable_solution",
        engagement_tactic: "save_comment",
        tone: "relatable",
      },
      hashtags: {
        set_id: 1,
        hashtags: ["#EasyRecipes", "#10MinuteMeals", "#FoodieTikTok", "#NoodlePull", "#QuickDinner", "#CookWithMe"],
        tier_breakdown: { high_volume: ["#FoodieTikTok", "#EasyRecipes"], mid_tier: ["#QuickDinner", "#CookWithMe"], niche: ["#10MinuteMeals", "#NoodlePull"] },
        rationale: "Balances viral foodie discovery with hyper-specific quick-meal search intent.",
        reach_quality: "targeted",
      },
      coherence_note: "Direct alignment between fast prep time, ASMR visual appeal, and save-for-later CTA.",
    },
  ],

  tech: () => [
    {
      content_set_id: 1,
      video_concept: {
        title: "3 Free AI Tools That Feel Illegal To Know",
        structure_type: "I_list",
        hook: {
          description: "Screen zoom into an AI tool automating 4 hours of tedious work in 5 seconds",
          text_overlay: "AI TOOLS THAT FEEL ILLEGAL ⚡",
          first_3_words_audio: "If you work...",
        },
        acts: [
          { time: "0:00-0:04", content: "Hook: 'If you work on a laptop, stop wasting 3 hours every day'" },
          { time: "0:04-0:18", content: "Tool 1 & 2: Quick live demonstration of free automation workflows" },
          { time: "0:18-0:28", content: "Tool 3: The secret powerhouse tool that replaced a $30/month subscription" },
          { time: "0:28-0:32", content: "CTA: 'Save this before you forget — link to all 3 tools in my profile'" },
        ],
        audio_suggestion: "Upbeat tech synth beat with energetic, authoritative narration",
        text_strategy: "URL callouts and tool badges with instant utility rating",
        engagement_trigger: "Instant save for work/study use + Tag coworkers in comments",
        format_tips: { ideal_length: "28-32 seconds", pacing: "Fast-paced screen capture with webcam corner", lighting: "Clean desktop lighting with neon accent" },
        predicted_engagement_scores: { watch_time_retention: 9, shareability: 9, comment_bait: 8, save_likelihood: 10 },
      },
      caption: {
        caption: "i canceled 3 paid subscriptions after discovering these free AI tools. 🤯\n\nthe second one literally saves me 2 hours every morning.\n\nsave this before your next workday 👇\n\nwhich one blew your mind?",
        hook_style: "curiosity_gap",
        engagement_tactic: "save_comment",
        tone: "educational",
      },
      hashtags: {
        set_id: 1,
        hashtags: ["#AITools", "#TechTok", "#ProductivityHacks", "#FreeSoftware", "#WorkSmarter", "#TechTips"],
        tier_breakdown: { high_volume: ["#TechTok", "#AITools"], mid_tier: ["#ProductivityHacks", "#TechTips"], niche: ["#FreeSoftware", "#WorkSmarter"] },
        rationale: "Leverages trending #AITools interest while targeting productivity-minded professionals.",
        reach_quality: "broad",
      },
      coherence_note: "High curiosity gap and immediate actionable utility generate massive retention and bookmarks.",
    },
  ],
};

// ─── Dynamic Synthesizer for Custom Niches ───

function generateDynamicNicheSets(req: GenerateRequest): ContentSet[] {
  const niche = req.niche;
  const audience = req.audience || "creators & enthusiasts";
  const tone = req.tone || "educational";
  const cleanNiche = niche.charAt(0).toUpperCase() + niche.slice(1);
  const tag = cleanNiche.replace(/\s+/g, "");

  return [
    {
      content_set_id: 1,
      video_concept: {
        title: `The Transformation Method for ${cleanNiche}`,
        structure_type: "A_transformation",
        hook: {
          description: `Direct address with high-contrast before/after demonstration in the ${niche} space`,
          text_overlay: `THE ${niche.toUpperCase()} SECRET NOBODY SHARES 💡`,
          first_3_words_audio: `I used to...`,
        },
        acts: [
          { time: "0:00-0:04", content: `Hook: Show the most frustrating rookie mistake in ${niche} vs the master strategy` },
          { time: "0:04-0:18", content: `Step-by-step breakdown: 3 actionable adjustments tailored for ${audience}` },
          { time: "0:18-0:28", content: `Results & proof: Side-by-side demonstration of results over 14 days` },
          { time: "0:28-0:32", content: `CTA: Save this for your next session & comment your thoughts below` },
        ],
        audio_suggestion: "Trending rhythmic voiceover with clean background audio",
        text_strategy: `Bold keyword popups highlighting critical ${niche} terms; high-contrast captions`,
        engagement_trigger: "High bookmark & save rate + Audience discussion on strategies",
        format_tips: { ideal_length: "28-32 seconds", pacing: "Fast, value-dense", lighting: "Crisp, focused lighting" },
        predicted_engagement_scores: { watch_time_retention: 8, shareability: 8, comment_bait: 8, save_likelihood: 9 },
      },
      caption: {
        caption: `stop scrolling if you want to master ${niche}. 🚀 here is the exact framework that changed everything for me.\n\nsave this for later reference 👇\n\ncomment '${niche.toLowerCase().slice(0, 5)}' and i'll send the full breakdown!`,
        hook_style: "command_stop",
        engagement_tactic: "save_comment",
        tone: tone,
      },
      hashtags: {
        set_id: 1,
        hashtags: [`#${tag}`, `#${tag}Tips`, `#${tag}Community`, "#TikTokGrowth", "#LearnOnTikTok", "#ProTips"],
        tier_breakdown: {
          high_volume: ["#LearnOnTikTok", "#TikTokGrowth"],
          mid_tier: [`#${tag}`, "#ProTips"],
          niche: [`#${tag}Tips`, `#${tag}Community`],
        },
        rationale: `Directly targets ${niche} interest groups while utilizing broad discovery tags for FYP distribution.`,
        reach_quality: "targeted",
      },
      coherence_note: `Unified narrative structured around solving the core pain point in ${niche} with high-retention 3-act pacing.`,
    },
    {
      content_set_id: 2,
      video_concept: {
        title: `3 Things I Wish I Knew Before Starting ${cleanNiche}`,
        structure_type: "I_list",
        hook: {
          description: `Shocked face to camera holding relevant tool or prop, cutting to immediate tip #1`,
          text_overlay: `WISH I KNEW THIS SOONER 🛑`,
          first_3_words_audio: "Number one is...",
        },
        acts: [
          { time: "0:00-0:05", content: `Hook: 'The biggest lie beginners are told about ${niche}'` },
          { time: "0:05-0:20", content: "Rapid-fire list: 3 insider lessons that save time, money, and frustration" },
          { time: "0:20-0:28", content: "Actionable summary: What you should do starting today" },
          { time: "0:28-0:32", content: "CTA: 'Which one surprised you most? Comment below'" },
        ],
        audio_suggestion: "Snappy trending background audio with direct narration",
        text_strategy: "Numbered cards appearing with sound effects",
        engagement_trigger: "Debate in comment section + Save for reference",
        format_tips: { ideal_length: "30-35 seconds", pacing: "Quick delivery", lighting: "Even ring light" },
        predicted_engagement_scores: { watch_time_retention: 9, shareability: 8, comment_bait: 9, save_likelihood: 9 },
      },
      caption: {
        caption: `i spent 2 years learning this the hard way so you don't have to. 🧠\n\nhere are 3 things nobody tells beginners in ${niche} 👇\n\nsave this to remember them!\n\nwhich one is your favorite?`,
        hook_style: "curiosity_challenge",
        engagement_tactic: "save_comment",
        tone: "relatable",
      },
      hashtags: {
        set_id: 2,
        hashtags: [`#${tag}`, `#${tag}Hacks`, `#${tag}Tok`, "#BeginnerTips", "#LifeLessons", "#GrowthHacks"],
        tier_breakdown: {
          high_volume: ["#LifeLessons", "#GrowthHacks"],
          mid_tier: [`#${tag}`, "#BeginnerTips"],
          niche: [`#${tag}Hacks`, `#${tag}Tok`],
        },
        rationale: `Captures both new creators entering ${niche} and experienced users looking to validate advice.`,
        reach_quality: "broad",
      },
      coherence_note: `High-curiosity hook matched with listicle pacing and conversational engagement prompt.`,
    },
  ];
}

// ─── Map niche to content library key ───

function findContentKey(niche: string): string | null {
  const lc = niche.toLowerCase();
  if (lc.includes("fashion") || lc.includes("style") || lc.includes("clothes") || lc.includes("beauty")) return "fashion";
  if (lc.includes("fit") || lc.includes("workout") || lc.includes("gym") || lc.includes("health") || lc.includes("posture")) return "fitness";
  if (lc.includes("game") || lc.includes("gaming") || lc.includes("valorant") || lc.includes("fortnite") || lc.includes("cod")) return "gaming";
  if (lc.includes("travel") || lc.includes("trip") || lc.includes("vacation") || lc.includes("flight") || lc.includes("europe")) return "travel";
  if (lc.includes("food") || lc.includes("recipe") || lc.includes("cook") || lc.includes("dinner") || lc.includes("chef")) return "food";
  if (lc.includes("tech") || lc.includes("ai") || lc.includes("software") || lc.includes("coding") || lc.includes("computer")) return "tech";
  return null;
}

// ─── Live LLM Generator with Multi-Provider Support ───

async function tryLiveLLM(data: GenerateRequest): Promise<ContentSet[] | null> {
  const geminiKey = (typeof process !== "undefined" && process.env?.GEMINI_API_KEY) || (import.meta.env["VITE_GEMINI_API_KEY"] as string | undefined);
  const openaiKey = typeof process !== "undefined" && process.env?.OPENAI_API_KEY;

  const prompt = `You are TrendSprout, an expert TikTok content strategist.
Generate ${String(data.count ?? 2)} content set(s) for a creator in the "${data.niche}" niche.
${data.audience ? `Target audience: ${data.audience}.` : ""}
Tone: ${data.tone ?? "educational"}.

Respond ONLY with a valid JSON array of ContentSet objects with this exact structure:
[{
  "content_set_id": 1,
  "video_concept": {
    "title": "...",
    "structure_type": "A_transformation|B_expose|C_story|D_comparison|E_challenge|F_tutorial|I_list",
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

  // 1. Try Gemini
  if (geminiKey) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
          }),
        }
      );
      if (res.ok) {
        const json = (await res.json()) as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
        const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
        const match = /\[[\s\S]*\]/.exec(rawText);
        if (match) {
          return JSON.parse(match[0]) as ContentSet[];
        }
      }
    } catch {
      // Fall through to other providers or fallback
    }
  }

  // 2. Try OpenAI
  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are an expert TikTok content strategist. Output strictly valid JSON." },
            { role: "user", content: prompt },
          ],
          temperature: 0.8,
        }),
      });
      if (res.ok) {
        const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
        const raw = json.choices?.[0]?.message?.content ?? "";
        const match = /\[[\s\S]*\]/.exec(raw);
        if (match) {
          return JSON.parse(match[0]) as ContentSet[];
        }
      }
    } catch {
      // Fall through
    }
  }

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
    // 1. Attempt live LLM if credentials are provided in environment
    const liveResults = await tryLiveLLM(data);
    if (liveResults && liveResults.length > 0) {
      return {
        success: true,
        data: liveResults.slice(0, data.count),
        provider: "live",
      } satisfies GenerateResponse;
    }

    // 2. Deterministic showcase fallback (simulates realistic generation latency)
    await new Promise((r) => setTimeout(r, 650));
    const key = findContentKey(data.niche);
    const library = key ? contentLibraries[key](data) : generateDynamicNicheSets(data);

    return {
      success: true,
      data: library.slice(0, data.count),
      provider: "showcase-engine",
      error: undefined,
    } satisfies GenerateResponse;
  });