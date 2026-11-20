"use client";

import { AlertCircle, Check, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { createContext, useActionState, useContext, useEffect, useState } from "react";
import { submitForm, type FormState } from "@/app/actions";
import type { FormKey } from "@/lib/wix/submit";

/* ----------------------------------------------------------------------------
 * Shared form kit. Every form posts to the `submitForm` server action, which
 * validates, filters spam and forwards the submission to Wix Forms.
 * Field `name`s must match the field names in src/lib/wix/forms.json.
 * ------------------------------------------------------------------------- */

const fieldCls =
  "w-full bg-transparent border-b py-2.5 text-sm font-body text-obsidian placeholder:text-obsidian/30 focus:border-gold focus:outline-none transition-colors";
const labelCls = "text-[10px] font-body uppercase tracking-wide-luxe text-obsidian/50";

const FormCtx = createContext<{ state: FormState }>({ state: { status: "idle" } });

function useField(name: string) {
  const { state } = useContext(FormCtx);
  const error = state.status === "error" ? state.fieldErrors?.[name] : undefined;
  const value = state.status === "error" ? state.values?.[name] : undefined;
  return { error, value };
}

function FieldShell({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className={labelCls}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="text-[11px] font-body text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ label, name, ...props }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const { error, value } = useField(name);
  return (
    <FieldShell label={label} name={name} error={error}>
      <input
        id={name}
        name={name}
        key={value ?? "init"}
        defaultValue={value}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
        className={`${fieldCls} ${error ? "border-red-700/60" : "border-obsidian/20"}`}
      />
    </FieldShell>
  );
}

export function Select({
  label,
  name,
  options,
  placeholder = "Choose one",
  defaultOption,
  ...props
}: { label: string; name: string; options: string[]; placeholder?: string; defaultOption?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { error, value } = useField(name);
  return (
    <FieldShell label={label} name={name} error={error}>
      <select
        id={name}
        name={name}
        key={value ?? "init"}
        defaultValue={value ?? defaultOption ?? ""}
        aria-invalid={!!error}
        {...props}
        className={`${fieldCls} ${error ? "border-red-700/60" : "border-obsidian/20"}`}
      >
        {!defaultOption && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </FieldShell>
  );
}

export function Textarea({ label, name }: { label: string; name: string }) {
  const { error, value } = useField(name);
  return (
    <FieldShell label={label} name={name} error={error}>
      <textarea
        id={name}
        name={name}
        rows={3}
        maxLength={4000}
        key={value ?? "init"}
        defaultValue={value}
        className={`${fieldCls} border-obsidian/20 resize-none`}
      />
    </FieldShell>
  );
}

function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-[12px] font-body font-semibold uppercase tracking-wide-luxe transition-all duration-500 rounded-sm bg-gold text-obsidian hover:bg-obsidian hover:text-silk disabled:opacity-70 disabled:cursor-wait"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" /> Sending…
        </>
      ) : (
        children
      )}
    </button>
  );
}

function ThankYou({ name, message, onReset }: { name: string; message: string; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12" role="status">
      <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mb-5">
        <Check className="w-8 h-8 text-gold" />
      </div>
      <p className="font-display text-3xl text-obsidian mb-2">Thank you, {name || "friend"}.</p>
      <p className="text-sm font-body text-obsidian/60 max-w-sm">{message}</p>
      <button
        onClick={onReset}
        className="mt-6 text-[11px] font-body uppercase tracking-wide-luxe text-gold hover:text-obsidian transition-colors"
      >
        Send another request
      </button>
    </div>
  );
}

type WixFormProps = {
  formKey: FormKey;
  submitLabel: string;
  successMessage: string;
  footnote?: string;
  children: React.ReactNode;
};

/** Wraps any set of fields and sends them to the matching Wix form. */
export function WixForm({ formKey, submitLabel, successMessage, footnote, children }: WixFormProps) {
  // Remounting (new key) resets the form after "Send another request".
  const [round, setRound] = useState(0);
  return (
    <WixFormInner key={round} formKey={formKey} submitLabel={submitLabel} successMessage={successMessage} footnote={footnote} onReset={() => setRound((r) => r + 1)}>
      {children}
    </WixFormInner>
  );
}

function WixFormInner({ formKey, submitLabel, successMessage, footnote, children, onReset }: WixFormProps & { onReset: () => void }) {
  const [state, action, pending] = useActionState(submitForm.bind(null, formKey), { status: "idle" } as FormState);
  const pathname = usePathname();
  const [startedAt, setStartedAt] = useState(0);
  useEffect(() => setStartedAt(Date.now()), []);

  if (state.status === "success") return <ThankYou name={state.firstName} message={successMessage} onReset={onReset} />;

  return (
    <FormCtx.Provider value={{ state }}>
      <form action={action} className="space-y-5" noValidate>
        {/* Spam protection: hidden honeypot + render timestamp. */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <input type="hidden" name="started_at" value={startedAt} />
        <input type="hidden" name="page_source" value={pathname} />

        {children}

        {state.status === "error" && (
          <div role="alert" className="flex items-start gap-3 bg-red-50 border border-red-200 px-4 py-3 rounded-sm">
            <AlertCircle className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
            <p className="text-[13px] font-body text-red-800 leading-relaxed">{state.message}</p>
          </div>
        )}

        <SubmitButton pending={pending}>{submitLabel}</SubmitButton>
        {footnote && <p className="text-[10px] font-body text-obsidian/40 text-center">{footnote}</p>}
      </form>
    </FormCtx.Provider>
  );
}

const today = () => new Date().toISOString().slice(0, 10);

/* --------------------------------- Forms --------------------------------- */

/** Business, corporate & professional event inquiry (fields mirror the original site's form). */
export function CorporateInquiryForm() {
  return (
    <WixForm
      formKey="corporate"
      submitLabel="Submit Inquiry"
      successMessage="Your inquiry has been received. Our events team will respond within one business day with availability and next steps."
      footnote="We respect your privacy. Your information will only be used to respond to your inquiry."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="First Name *" name="first_name" required autoComplete="given-name" />
        <Input label="Last Name *" name="last_name" required autoComplete="family-name" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Email *" name="email" type="email" required autoComplete="email" />
        <Input label="Phone *" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Company Name" name="company" autoComplete="organization" />
        <Input label="Preferred Event Date *" name="event_date" type="date" min={today()} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select label="Event Timing *" name="event_timing" required options={["Full Day", "Daytime", "Evening", "Multi-Day Event"]} />
        <Select label="Estimated Guest Count *" name="guest_count" required options={["10–30", "31–75", "76–150", "151–250", "251–350+", "Other"]} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Type of Event *"
          name="event_type"
          required
          options={[
            "Executive Retreat",
            "Staff Meeting / Quarterly Review",
            "Holiday Party / Gala",
            "Awards Ceremony",
            "Training / Workshop",
            "Networking Mixer",
            "Product Launch",
            "Board / Investor Meeting",
            "Nonprofit Fundraiser",
            "Other",
          ]}
        />
        <Select
          label="Catering Needs *"
          name="catering_needs"
          required
          options={["Breakfast", "Lunch", "Dinner", "Cocktail Reception / Hors d'oeuvres", "Coffee & Snacks Only", "No Catering Needed"]}
        />
      </div>
      <Input label="Preferred Venue Tour Date & Time" name="tour_datetime" type="datetime-local" />
      <Textarea label="Message / Special Requests" name="message" />
    </WixForm>
  );
}

/** Private venue tour request. */
export function TourRequestForm() {
  return (
    <WixForm
      formKey="tour"
      submitLabel="Request My Tour"
      successMessage="Your tour request is in. We'll confirm your visit by phone or email within one business day."
      footnote="Tours are available Tuesday–Saturday · Closed Sundays & Mondays unless hosting an event"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="First Name *" name="first_name" required autoComplete="given-name" />
        <Input label="Last Name *" name="last_name" required autoComplete="family-name" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Email *" name="email" type="email" required autoComplete="email" />
        <Input label="Phone *" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Preferred Tour Date *" name="tour_date" type="date" min={today()} required />
        <Select
          label="Preferred Time *"
          name="tour_time"
          required
          options={["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"]}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Event Type *"
          name="event_type"
          required
          options={["Wedding", "Corporate Event", "Quinceañera", "Birthday / Anniversary", "Shower", "Gala / Fundraiser", "Other"]}
        />
        <Input label="Estimated Guests" name="guest_count" type="number" min={1} inputMode="numeric" />
      </div>
      <Select label="Tour Style *" name="tour_style" required options={["In person at the venue", "Virtual tour (video call)"]} />
      <Textarea label="Anything we should know?" name="message" />
    </WixForm>
  );
}
