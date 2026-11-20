// Creates (or reuses) the website's forms in the Wix site that .env.local points to,
// then writes their IDs back into .env.local.
//
//   npm run wix:setup            -> dry run: shows the target site and what would be created
//   npm run wix:setup -- --apply -> creates missing forms and saves the IDs
//
// Safe to re-run: forms are matched by name, existing ones are reused, never deleted.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const envPath = path.join(root, ".env.local");
const apply = process.argv.includes("--apply");

const readEnv = () =>
  Object.fromEntries(
    fs
      .readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .filter((l) => /^[A-Z0-9_]+=/.test(l))
      .map((l) => {
        const i = l.indexOf("=");
        return [l.slice(0, i), l.slice(i + 1).trim().replace(/^['"]|['"]$/g, "")];
      })
  );

const env = readEnv();
if (!env.WIX_API_KEY || !env.WIX_SITE_ID) throw new Error("WIX_API_KEY and WIX_SITE_ID must be set in .env.local");

const headers = { Authorization: env.WIX_API_KEY, "wix-site-id": env.WIX_SITE_ID, "Content-Type": "application/json" };
async function wix(method, url, body) {
  const res = await fetch(`https://www.wixapis.com${url}`, { method, headers, body: body && JSON.stringify(body) });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${url} -> ${res.status}: ${text.slice(0, 600)}`);
  return text ? JSON.parse(text) : {};
}

const forms = JSON.parse(fs.readFileSync(path.join(root, "src/lib/wix/forms.json"), "utf8"));

const contactFields = {
  firstName: { identifier: "CONTACTS_FIRST_NAME", mapping: { contactField: "FIRST_NAME" } },
  lastName: { identifier: "CONTACTS_LAST_NAME", mapping: { contactField: "LAST_NAME" } },
  email: { identifier: "CONTACTS_EMAIL", mapping: { contactField: "EMAIL", emailInfo: { tag: "UNTAGGED" } }, format: "EMAIL" },
  phone: { identifier: "CONTACTS_PHONE", mapping: { contactField: "PHONE", phoneInfo: { tag: "UNTAGGED" } } },
};

function buildForm(def) {
  const formFields = [];
  const fieldsMapping = {};
  for (const f of def.fields) {
    const contact = contactFields[f.kind];
    const field = {
      id: crypto.randomUUID(),
      hidden: false,
      identifier: contact?.identifier ?? "TEXT_INPUT",
      fieldType: "INPUT",
      inputOptions: {
        target: f.name,
        pii: Boolean(contact),
        required: Boolean(f.required),
        inputType: "STRING",
        readOnly: false,
        stringOptions: {
          validation: { format: contact?.format ?? "UNKNOWN_FORMAT", enum: [] },
          // Wix has no multi-line string component; long text is still accepted.
          componentType: "TEXT_INPUT",
          textInputOptions: { label: f.label, showLabel: true },
        },
        ...(contact ? { contactMapping: contact.mapping } : {}),
      },
    };
    formFields.push(field);
    if (contact) fieldsMapping[f.name] = contact.mapping;
  }
  const submit = {
    id: crypto.randomUUID(),
    hidden: false,
    identifier: "SUBMIT_BUTTON",
    fieldType: "DISPLAY",
    displayOptions: {
      displayFieldType: "PAGE_NAVIGATION",
      pageNavigationOptions: { nextPageText: "Next", previousPageText: "Back", submitText: "Submit" },
    },
  };
  formFields.push(submit);
  return {
    namespace: "wix.form_app.form",
    properties: { name: def.name, disabled: false },
    formFields,
    steps: [
      {
        id: crypto.randomUUID(),
        name: "Page 1",
        hidden: false,
        layout: { large: { items: formFields.map((f, row) => ({ fieldId: f.id, row, column: 0, width: 12, height: 1 })), sections: [] } },
      },
    ],
    postSubmissionTriggers: { upsertContact: { fieldsMapping, labels: [] } },
  };
}

const site = await wix("GET", "/site-properties/v4/properties");
console.log(`Target Wix site: "${site.properties?.siteDisplayName || site.properties?.businessName}" (${env.WIX_SITE_ID})`);

const existing = await wix("POST", "/form-schema-service/v4/forms/query", {
  query: { filter: {}, cursorPaging: { limit: 100 } },
  namespace: "wix.form_app.form",
});
const byName = new Map((existing.forms ?? []).map((f) => [f.properties?.name ?? f.name, f]));

const ids = {};
for (const [key, def] of Object.entries(forms)) {
  const found = byName.get(def.name);
  if (found) {
    const targets = new Set((found.formFields ?? []).map((f) => f.inputOptions?.target).filter(Boolean));
    const missing = def.fields.map((f) => f.name).filter((n) => !targets.has(n));
    console.log(`  ✓ ${def.name}: exists (${found.id})${missing.length ? ` — WARNING, missing fields: ${missing.join(", ")}` : ""}`);
    ids[def.env] = found.id;
  } else if (apply) {
    const { form } = await wix("POST", "/form-schema-service/v4/forms", { form: buildForm(def) });
    console.log(`  + ${def.name}: created (${form.id})`);
    ids[def.env] = form.id;
  } else {
    console.log(`  - ${def.name}: would be created (${def.fields.length} fields)`);
  }
}

if (apply) {
  let text = fs.readFileSync(envPath, "utf8").replace(/\s*$/, "\n");
  if (!text.includes("# Wix form IDs")) text += "\n# Wix form IDs (written by npm run wix:setup)\n";
  for (const [k, v] of Object.entries(ids)) {
    text = new RegExp(`^${k}=.*$`, "m").test(text) ? text.replace(new RegExp(`^${k}=.*$`, "m"), `${k}=${v}`) : text + `${k}=${v}\n`;
  }
  fs.writeFileSync(envPath, text);
  console.log("Saved form IDs to .env.local");
} else {
  console.log("\nDry run only. Re-run with --apply to create the missing forms.");
}
