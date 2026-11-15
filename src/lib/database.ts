// Database types and Supabase client integration
// Provides resilient database operations with Supabase and typed schema fallbacks.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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

export interface GenerationResult {
  captions?: any[];
  concepts?: any[];
  hashtags?: any[];
}

export interface Generation {
  id: string;
  user_id: string;
  niche: string;
  content_type: ContentType;
  topic: string | null;
  result: GenerationResult;
  created_at: string;
}

// Environment variables for Supabase
const supabaseUrl =
  (typeof process !== "undefined" ? process.env?.VITE_SUPABASE_URL : undefined) ||
  (typeof import.meta !== "undefined" ? (import.meta as any).env?.VITE_SUPABASE_URL : undefined) ||
  "";

const supabaseAnonKey =
  (typeof process !== "undefined" ? process.env?.VITE_SUPABASE_ANON_KEY : undefined) ||
  (typeof import.meta !== "undefined" ? (import.meta as any).env?.VITE_SUPABASE_ANON_KEY : undefined) ||
  "";

let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (clientInstance) return clientInstance;
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  clientInstance = createClient(supabaseUrl, supabaseAnonKey);
  return clientInstance;
}

/**
 * Save a new generation record to Supabase or fallback store
 */
export async function saveGeneration(
  gen: Omit<Generation, "id" | "created_at">
): Promise<Generation> {
  const client = getSupabaseClient();
  const newRecord: Generation = {
    ...gen,
    id: "gen_" + Math.random().toString(36).substring(2, 10),
    created_at: new Date().toISOString(),
  };

  if (!client) {
    // Local storage fallback for dev / demo
    if (typeof window !== "undefined") {
      try {
        const stored = JSON.parse(localStorage.getItem("trendsprout_generations") || "[]");
        stored.unshift(newRecord);
        localStorage.setItem("trendsprout_generations", JSON.stringify(stored.slice(0, 50)));
      } catch (e) {
        console.warn("Local storage write failed:", e);
      }
    }
    return newRecord;
  }

  const { data, error } = await client
    .from("generations")
    .insert({
      user_id: gen.user_id,
      niche: gen.niche,
      content_type: gen.content_type,
      topic: gen.topic,
      result: gen.result,
    })
    .select()
    .single();

  if (error || !data) {
    console.warn("Supabase insert error, falling back to local object:", error);
    return newRecord;
  }

  return data as Generation;
}

/**
 * Fetch generations for a specific user
 */
export async function getGenerations(userId: string): Promise<Generation[]> {
  const client = getSupabaseClient();
  if (!client) {
    if (typeof window !== "undefined") {
      try {
        const stored = JSON.parse(localStorage.getItem("trendsprout_generations") || "[]");
        return stored.filter((item: Generation) => item.user_id === userId);
      } catch (e) {
        console.warn("Local storage read failed:", e);
        return [];
      }
    }
    return [];
  }

  const { data, error } = await client
    .from("generations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("Supabase select error:", error);
    return [];
  }

  return (data || []) as Generation[];
}
