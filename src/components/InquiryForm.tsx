"use client";

import { Input, Select, Textarea, WixForm } from "./Forms";

type Props = {
  compact?: boolean;
  /** "inquiry" (default) or "brochure" — each goes to its own Wix form. */
  formKey?: "inquiry" | "brochure";
};

const today = () => new Date().toISOString().slice(0, 10);

/** General inquiry / private tour request used in the footer, contact, room pages and availability modal. */
export default function InquiryForm({ compact = false, formKey = "inquiry" }: Props) {
  const cols = compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2";
  const brochure = formKey === "brochure";
  return (
    <WixForm
      formKey={formKey}
      submitLabel={brochure ? "Send Me the Brochure" : "Request My Private Tour"}
      successMessage={
        brochure
          ? "Your brochure request has been received. Our team will send the full brochure to your inbox shortly."
          : "Your request has been received. Our planning team will reach out within one business day to arrange your private tour."
      }
      footnote="We respond within one business day · No obligation · Your details stay private"
    >
      <div className={`grid ${cols} gap-4`}>
        <Input label="First Name *" name="first_name" required autoComplete="given-name" />
        <Input label="Last Name *" name="last_name" required autoComplete="family-name" />
      </div>
      <div className={`grid ${cols} gap-4`}>
        <Input label="Phone *" name="phone" type="tel" required autoComplete="tel" />
        <Input label="Email *" name="email" type="email" required autoComplete="email" />
      </div>
      <div className={`grid ${cols} gap-4`}>
        <Select
          label="Event Type *"
          name="event_type"
          required
          defaultOption="Weddings"
          options={["Weddings", "Corporate Event", "Quinceañera", "Other Social Event"]}
        />
        <Input label="Preferred Date" name="preferred_date" type="date" min={today()} />
      </div>
      <Textarea label="Tell us about your celebration" name="message" />
    </WixForm>
  );
}
