import { site } from "@/lib/site";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={
        "font-serif text-[22px] md:text-[24px] tracking-tight text-foreground " +
        (className ?? "")
      }
      style={{ fontWeight: 500 }}
    >
      {site.shortName}
      <span className="text-accent">.</span>
    </span>
  );
}
