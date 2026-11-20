"use server";

import { headers } from "next/headers";
import { formDefs, submitToWix, WixNotConfiguredError, type FormKey } from "@/lib/wix/submit";

export type FormState =
  | { status: "idle" }
  | { status: "success"; firstName: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string>; values?: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LEN = 4000;

// Basic abuse protection: at most 5 submissions per IP per 10 minutes (per server instance).
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const FALLBACK = "Please call us at 832-914-7844 or email info@TheBougainvilleas.com and we'll take care of you right away.";

export async function submitForm(key: FormKey, _prev: FormState, formData: FormData): Promise<FormState> {
  const def = formDefs[key];
  if (!def) return { status: "error", message: "Unknown form." };

  const values: Record<string, string> = {};
  for (const f of def.fields) values[f.name] = String(formData.get(f.name) ?? "").slice(0, MAX_LEN).trim();

  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("website") ?? "").trim()) return { status: "success", firstName: values.first_name || "friend" };
  // Too fast to be human (form rendered < 2s ago).
  const started = Number(formData.get("started_at") ?? 0);
  if (started && Date.now() - started < 2000) return { status: "success", firstName: values.first_name || "friend" };

  const fieldErrors: Record<string, string> = {};
  for (const f of def.fields) {
    if (f.required && !values[f.name]) fieldErrors[f.name] = `${f.label} is required`;
  }
  if (values.email && !EMAIL.test(values.email)) fieldErrors.email = "Please enter a valid email address";
  if (values.phone && values.phone.replace(/\D/g, "").length < 7) fieldErrors.phone = "Please enter a valid phone number";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "local";
  if (rateLimited(ip)) {
    return { status: "error", message: `You've sent several requests in a short time. ${FALLBACK}`, values };
  }

  try {
    await submitToWix(key, values);
    return { status: "success", firstName: values.first_name };
  } catch (err) {
    console.error(`[forms] ${def.name}:`, err instanceof Error ? err.message : err);
    const message =
      err instanceof WixNotConfiguredError
        ? `Our online form is being set up. ${FALLBACK}`
        : `Something went wrong sending your request. ${FALLBACK}`;
    return { status: "error", message, values };
  }
}
