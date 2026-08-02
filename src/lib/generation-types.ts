// Type definitions for the AI Content Generation API
// Based on the prompt strategy at /home/team/shared/trendsprout-prompt-strategy.md

// === Shared Input Parameters ===

export interface GenerateRequest {
  niche: string;
  audience?: string;
  tone?: "edgy" | "educational" | "funny" | "professional" | "direct_motivational";
  count?: number;
  brand_terms?: string[];
  reference_trends?: boolean;
}

// === Caption Generation ===

export interface CaptionResult {
  caption: string;
  hook_style: string;
  engagement_tactic: string;
  tone: string;
}

export interface CaptionResponse {
  captions: CaptionResult[];
}

// === Video Concept Generation ===

export interface ConceptAct {
  time: string;
  content: string;
}

export interface ConceptHook {
  description: string;
  text_overlay: string;
  first_3_words_audio: string;
}

export interface EngagementScores {
  watch_time_retention: number;
  shareability: number;
  comment_bait: number;
  save_likelihood: number;
}

export interface FormatTips {
  ideal_length: string;
  pacing: string;
  lighting: string;
}

export interface ConceptResult {
  title: string;
  structure_type: string;
  hook: ConceptHook;
  acts: ConceptAct[];
  audio_suggestion: string;
  text_strategy: string;
  engagement_trigger: string;
  format_tips: FormatTips;
  predicted_engagement_scores: EngagementScores;
}

export interface ConceptResponse {
  concepts: ConceptResult[];
}

// === Hashtag Generation ===

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
  reach_quality: "broad" | "targeted" | "niche";
}

export interface HashtagResponse {
  hashtag_sets: HashtagSet[];
}

// === Full Content Set ===

export interface FullContentSet {
  content_set_id: number;
  video_concept: ConceptResult;
  caption: CaptionResult;
  hashtags: HashtagSet;
  coherence_note: string;
}

export interface FullSetResponse {
  content_sets: FullContentSet[];
}

// === API Error ===

export interface ApiError {
  error: string;
  code: "INVALID_INPUT" | "RATE_LIMITED" | "LLM_ERROR" | "INTERNAL_ERROR";
  details?: string;
}