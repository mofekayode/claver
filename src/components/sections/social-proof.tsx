import { Container } from "@/components/container";

export function SocialProof() {
  return (
    <section className="py-20 md:py-28 border-t border-border/60 bg-subtle/30">
      <Container size="wide">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[13px] uppercase tracking-[0.14em] text-accent">
            Who we serve
          </p>
          <h2 className="mt-4 font-serif text-[32px] md:text-[40px] leading-[1.1] tracking-[-0.015em]">
            Built for offices, clinics, and storefronts across the Bay Area.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/70 rounded-2xl overflow-hidden border border-border/70">
          {[
            { label: "Offices & studios", icon: BuildingIcon },
            { label: "Medical & dental", icon: CrossIcon },
            { label: "Retail & storefront", icon: StorefrontIcon },
            { label: "Industrial & warehouse", icon: WarehouseIcon },
          ].map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="bg-background p-7 md:p-8 flex flex-col items-start gap-4"
            >
              <Icon className="w-6 h-6 text-accent" />
              <span className="font-serif text-[18px] md:text-[20px] tracking-[-0.01em]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      <path d="M10 21v-3h4v3" />
    </svg>
  );
}

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function StorefrontIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 9l1.5-4h15L21 9" />
      <path d="M4 9v11h16V9" />
      <path d="M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

function WarehouseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 10v11h18V10L12 5 3 10z" />
      <path d="M7 21v-7h10v7" />
      <path d="M7 17h10" />
    </svg>
  );
}
