import "server-only";
import forms from "./forms.json";

export type FormKey = keyof typeof forms;
export type FieldDef = { name: string; label: string; kind: string; required?: boolean };

/**
 * How a website form is stored in Wix. The website's forms are sent into forms that already exist
 * in the Wix dashboard:
 *   map     website field → Wix field name (target)
 *   convert format a value for Wix: "phone" (E.164), "datetime" (ISO, Houston time), "array"
 *   values  rename a choice to the exact text the Wix form uses
 *   notes   Wix text field that receives every website field without its own Wix field
 */
export type WixTarget = {
  form: string;
  map: Record<string, string>;
  convert?: Record<string, "phone" | "datetime" | "array">;
  values?: Record<string, Record<string, string>>;
  notes?: string;
};
type FormDef = { name: string; env: string; fields: FieldDef[]; wix?: WixTarget };

export const formDefs = forms as Record<FormKey, FormDef>;

export class WixNotConfiguredError extends Error {}

/** "832-914-7844" → "+18329147844" (US numbers); international numbers keep their country code. */
function toE164(v: string) {
  const digits = v.replace(/\D/g, "");
  if (v.trim().startsWith("+")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return v;
}

/** A browser "2026-12-10T14:00" value is Houston wall-clock time; Wix wants an ISO instant. */
function houstonToIso(v: string) {
  const m = v.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return v;
  const [, y, mo, d, h, mi] = m.map(Number);
  const asUtc = Date.UTC(y, mo - 1, d, h, mi);
  // Offset of America/Chicago at that moment (handles daylight saving).
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
    .formatToParts(new Date(asUtc))
    .reduce<Record<string, number>>((a, p) => (p.type !== "literal" ? { ...a, [p.type]: Number(p.value) } : a), {});
  const shown = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
  return new Date(asUtc - (shown - asUtc)).toISOString();
}

const readable = (name: string, v: string) =>
  name === "tour_date" || name === "preferred_date" || name === "event_date"
    ? new Date(`${v}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
    : v;

/** Builds the Wix `submissions` object for one website form. Exported for tests and the setup check. */
export function toWixSubmission(def: FormDef, values: Record<string, string>) {
  const wix = def.wix;
  const out: Record<string, string | string[]> = {};
  if (!wix) {
    for (const f of def.fields) if (values[f.name]?.trim()) out[f.name] = values[f.name].trim();
    return out;
  }
  const notes: string[] = [];
  for (const f of def.fields) {
    let v = values[f.name]?.trim();
    if (!v) continue;
    v = wix.values?.[f.name]?.[v] ?? v;
    const target = wix.map[f.name];
    if (!target || target === wix.notes) {
      if (f.name !== "message") notes.push(`${f.label}: ${readable(f.name, v)}`);
      continue;
    }
    const kind = wix.convert?.[f.name];
    out[target] = kind === "phone" ? toE164(v) : kind === "datetime" ? houstonToIso(v) : kind === "array" ? [v] : v;
  }
  if (wix.notes) {
    const message = values.message?.trim();
    const header = wix.notes === wix.map.message ? [] : [`[Website] ${def.name}`];
    const text = [...header, ...notes, ...(message ? [notes.length || header.length ? `\n${message}` : message] : [])].join("\n").trim();
    if (text) out[wix.notes] = text.slice(0, 4000);
  }
  return out;
}

/**
 * Sends one submission to Wix Forms (Form Submissions API v4) using the server-side API key.
 * Wix then stores it under Forms & Submissions, upserts the CRM contact and fires any Automations.
 */
export async function submitToWix(key: FormKey, values: Record<string, string>) {
  const def = formDefs[key];
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  const formId = process.env[def.env];
  if (!apiKey || !siteId || !formId) {
    throw new WixNotConfiguredError(`Wix is not configured for "${def.name}" (missing ${!formId ? def.env : "API key / site ID"})`);
  }

  const res = await fetch("https://www.wixapis.com/form-submission-service/v4/submissions", {
    method: "POST",
    headers: { Authorization: apiKey, "wix-site-id": siteId, "Content-Type": "application/json" },
    body: JSON.stringify({ submission: { formId, submissions: toWixSubmission(def, values) } }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Wix submission failed (${res.status}): ${detail.slice(0, 500)}`);
  }
  const data = (await res.json()) as { submission?: { id?: string } };
  return data.submission?.id;
}
