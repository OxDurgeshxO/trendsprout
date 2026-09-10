// Database types matching the planned Supabase schema
// These serve as the source of truth for the team until Supabase is connected.

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  status: "active" | "canceled" | "past_due" | "trialing";
  current_period_start: string;
  current_period_end: string;
  created_at: string;
}

export type ContentType = "caption" | "concept" | "hashtags" | "all";

export interface Generation {
  id: string;
  user_id: string;
  niche: string;
  content_type: ContentType;
  topic: string | null;
  result: GenerationResult;
  created_at: string;
}

export interface GenerationResult {
  captions?: string[];
  concepts?: string[];
  hashtags?: string[];
}
