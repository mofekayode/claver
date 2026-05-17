"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitQuote, type QuoteFormState } from "./actions";
import { cn } from "@/lib/cn";
import { AddressAutocomplete } from "@/components/address-autocomplete";

const initialState: QuoteFormState = { status: "idle" };

export function QuoteForm() {
  const [state, action] = useActionState(submitQuote, initialState);

  return (
    <form action={action} noValidate className="grid gap-7">
      {/* Honeypot — hidden from real users, filled by naive bots. Server
          rejects any submission where this field is non-empty. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label>
          Website (leave blank)
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-900"
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-7 md:grid-cols-2">
        <Field
          label="Business name"
          name="businessName"
          autoComplete="organization"
          state={state}
        />
        <Field
          label="Your name"
          name="contactName"
          autoComplete="name"
          state={state}
        />
      </div>

      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        state={state}
      />

      <div>
        <label
          htmlFor="address"
          className="block text-[14px] font-medium text-foreground/80"
        >
          Building address
        </label>
        <AddressAutocomplete
          id="address"
          name="address"
          defaultValue={state.values?.address ?? ""}
          hasError={Boolean(state.errors?.address)}
          placeholder="Start typing the building address…"
          ariaDescribedBy={state.errors?.address ? "address-error" : undefined}
        />
        {state.errors?.address && (
          <p id="address-error" className="mt-1.5 text-[13px] text-red-700">
            {state.errors.address}
          </p>
        )}
      </div>

      <SubmitButton />
      <p className="text-[13px] text-muted">
        We respond to every quote request within one business day. No spam, no
        sharing your details.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  state,
  inputRef,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  state: QuoteFormState;
  inputRef?: React.Ref<HTMLInputElement>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "ref">) {
  const error = state.errors?.[name as keyof typeof state.errors];
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[14px] font-medium text-foreground/80"
      >
        {label}
      </label>
      <input
        ref={inputRef}
        id={name}
        name={name}
        type={type}
        defaultValue={state.values?.[name as keyof typeof state.values] ?? ""}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          "mt-2 w-full rounded-xl border bg-background px-4 py-3",
          "text-[16px] leading-normal placeholder:text-muted/60",
          "focus:outline-none focus:ring-2 transition-colors",
          error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-border focus:border-accent focus:ring-accent/15",
        )}
        {...rest}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-[13px] text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  label,
  name,
  options,
  state,
}: {
  label: string;
  name: string;
  options: string[];
  state: QuoteFormState;
}) {
  const error = state.errors?.[name as keyof typeof state.errors];
  const selected = state.values?.[name as keyof typeof state.values];
  return (
    <fieldset>
      <legend className="block text-[14px] font-medium text-foreground/80">
        {label}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-[14px] transition-colors",
              "has-checked:bg-accent has-checked:text-background has-checked:border-accent",
              "border-border hover:border-foreground/40",
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              defaultChecked={selected === opt}
              className="sr-only"
            />
            {opt}
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1.5 text-[13px] text-red-700">{error}</p>
      )}
    </fieldset>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex h-13 items-center justify-center gap-2 rounded-full px-7",
        "bg-accent text-background font-medium text-base",
        "hover:bg-accent-hover transition-colors",
        "disabled:opacity-60 disabled:cursor-not-allowed",
      )}
    >
      {pending ? "Sending…" : "Request my quote"}
    </button>
  );
}

