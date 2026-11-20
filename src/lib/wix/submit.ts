import "server-only";
import forms from "./forms.json";

export type FormKey = keyof typeof forms;
export type FieldDef = { name: string; label: string; kind: string; required?: boolean };

export const formDefs = forms as Record<FormKey, { name: string; env: string; fields: FieldDef[] }>;

export class WixNotConfiguredError extends Error {}

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

  // Only send fields the Wix form knows about, and drop empties.
  const submissions: Record<string, string> = {};
  for (const f of def.fields) {
    const v = values[f.name]?.trim();
    if (v) submissions[f.name] = v;
  }

  const res = await fetch("https://www.wixapis.com/form-submission-service/v4/submissions", {
    method: "POST",
    headers: { Authorization: apiKey, "wix-site-id": siteId, "Content-Type": "application/json" },
    body: JSON.stringify({ submission: { formId, submissions } }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Wix submission failed (${res.status}): ${detail.slice(0, 500)}`);
  }
  const data = (await res.json()) as { submission?: { id?: string } };
  return data.submission?.id;
}
