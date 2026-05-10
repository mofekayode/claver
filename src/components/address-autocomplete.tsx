"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  name: string;
  defaultValue?: string;
  hasError?: boolean;
  placeholder?: string;
  id?: string;
  ariaDescribedBy?: string;
};

type Suggestion = {
  placeId: string;
  mainText: string;
  secondaryText: string;
  fullText: string;
};

const ENDPOINT = "https://places.googleapis.com/v1/places:autocomplete";
const DEBOUNCE_MS = 220;

export function AddressAutocomplete({
  name,
  defaultValue = "",
  hasError = false,
  placeholder,
  id,
  ariaDescribedBy,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [sessionToken, setSessionToken] = useState<string>(() => uuid());
  const lastQueryRef = useRef("");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Close on outside click.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Debounced fetch on value change.
  useEffect(() => {
    if (!apiKey) return;
    const q = value.trim();
    if (q.length < 3) {
      setSuggestions([]);
      return;
    }
    if (q === lastQueryRef.current) return;
    const t = setTimeout(async () => {
      lastQueryRef.current = q;
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
          },
          body: JSON.stringify({
            input: q,
            includedRegionCodes: ["us"],
            sessionToken,
          }),
        });
        if (!res.ok) {
          setSuggestions([]);
          return;
        }
        const json = (await res.json()) as {
          suggestions?: Array<{
            placePrediction?: {
              placeId: string;
              text: { text: string };
              structuredFormat?: {
                mainText?: { text: string };
                secondaryText?: { text: string };
              };
            };
          }>;
        };
        const next: Suggestion[] = (json.suggestions ?? [])
          .map((s) => s.placePrediction)
          .filter((p): p is NonNullable<typeof p> => Boolean(p))
          .map((p) => ({
            placeId: p.placeId,
            fullText: p.text.text,
            mainText: p.structuredFormat?.mainText?.text ?? p.text.text,
            secondaryText: p.structuredFormat?.secondaryText?.text ?? "",
          }));
        setSuggestions(next);
        setHighlight(0);
        setOpen(next.length > 0);
      } catch {
        setSuggestions([]);
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [value, apiKey, sessionToken]);

  const choose = (s: Suggestion) => {
    setValue(s.fullText);
    setSuggestions([]);
    setOpen(false);
    // A new session begins after each selection per Places billing semantics.
    setSessionToken(uuid());
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(suggestions[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative mt-2">
      <input
        ref={inputRef}
        id={id ?? name}
        name={name}
        type="text"
        autoComplete="street-address"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value.trim().length >= 3) setOpen(true);
        }}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={`${name}-listbox`}
        aria-describedby={ariaDescribedBy}
        role="combobox"
        className={cn(
          "w-full rounded-xl border bg-background px-4 py-3",
          "text-[16px] leading-normal placeholder:text-muted/60",
          "focus:outline-none focus:ring-2 transition-colors",
          hasError
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-border focus:border-accent focus:ring-accent/15",
        )}
      />

      {open && suggestions.length > 0 && (
        <ul
          id={`${name}-listbox`}
          role="listbox"
          className={cn(
            "absolute z-50 left-0 right-0 mt-1.5 overflow-hidden",
            "rounded-xl bg-background border border-border",
            "shadow-[0_20px_40px_-16px_rgba(28,37,32,0.18)]",
          )}
        >
          {suggestions.map((s, i) => (
            <li
              key={s.placeId}
              role="option"
              aria-selected={i === highlight}
              onMouseEnter={() => setHighlight(i)}
              onMouseDown={(e) => {
                e.preventDefault(); // keep input focus while clicking
                choose(s);
              }}
              className={cn(
                "px-4 py-3 cursor-pointer transition-colors",
                "border-t border-border first:border-t-0",
                i === highlight ? "bg-subtle" : "bg-background",
              )}
            >
              <div className="flex items-center gap-3">
                <PinIcon className="w-4 h-4 text-muted shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] text-foreground truncate">
                    {s.mainText}
                  </div>
                  {s.secondaryText && (
                    <div className="text-[13px] text-muted truncate">
                      {s.secondaryText}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
