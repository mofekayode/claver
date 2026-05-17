export const site = {
  name: "Claver Services",
  shortName: "Claver",
  tagline: "Commercial cleaning that proves itself, every visit.",
  description:
    "Tech-enabled commercial cleaning. Photo verification every visit, monthly service reports, 24-hour issue resolution.",
  url: "https://www.claverservices.com",
  phone: "(510) 689-1362",
  phoneHref: "tel:+15106891362",
  phoneE164: "+15106891362",
  email: "hello@claverservices.com",
  emailHref: "mailto:hello@claverservices.com",
  hours: "Mon–Fri, 8am–7pm PT",
  calendlyUrl: "https://calendly.com/hello-claverservices/30min",
  founder: {
    // TODO: swap to real name + role + photo once finalized.
    name: "Mofe Kayode",
    initials: "MK",
    title: "Founder",
    photo: undefined as string | undefined, // e.g. "/founder.jpg"
  },
  geo: {
    region: "US-CA",
    locality: "Oakland",
    latitude: 37.8044,
    longitude: -122.2712,
  },
  serviceAreas: [
    "Oakland",
    "Berkeley",
    "Emeryville",
    "Alameda",
    "Piedmont",
  ],
  nav: [
    { href: "/how-it-works", label: "How we work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
  ] as const,
};
