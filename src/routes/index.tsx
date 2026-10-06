import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Phone, Sun } from "lucide-react";
import heroImage from "@/assets/hero-santorini.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aegea — Greek Island Travel" },
      {
        name: "description",
        content:
          "Island-hopping journeys across the Aegean. Ferries, boutique stays, food tours and local guides — planned end to end.",
      },
      { property: "og:title", content: "Aegea — Greek Island Travel" },
      {
        property: "og:description",
        content:
          "Island-hopping journeys across the Aegean. Ferries, boutique stays, food tours and local guides — planned end to end.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Discover", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

const FEATURES = [
  {
    glyph: "☀",
    tone: "bg-secondary/10 text-secondary",
    title: "Caldera sunsets",
    text: "Watch the sun melt into the volcano rim from a cliffside terrace, glass of Assyrtiko in hand.",
  },
  {
    glyph: "⚓",
    tone: "bg-secondary/10 text-secondary",
    title: "Island hopping",
    text: "Ferry hops between Naxos, Milos and Paros, timed so you always land where the light is best.",
  },
  {
    glyph: "✦",
    tone: "bg-secondary/15 text-secondary",
    title: "Slow mornings",
    text: "Lemon groves, warm bread, and coffee that takes as long as the view does. No alarms here.",
  },
  {
    glyph: "◈",
    tone: "bg-secondary/10 text-secondary",
    title: "Blue-domed lanes",
    text: "Wander whitewashed alleys where every doorway opens onto another shade of the sea.",
  },
  {
    glyph: "◍",
    tone: "bg-secondary/10 text-secondary",
    title: "Table for two",
    text: "Grilled octopus, fresh catch, and wine poured by people who know your name by day two.",
  },
  {
    glyph: "✺",
    tone: "bg-secondary/15 text-secondary",
    title: "Hidden coves",
    text: "Swim in quiet bays most maps forget, then dry off on warm, sun-bleached stone.",
  },
];

const FAQS = [
  {
    q: "How many islands can I reach in ten days?",
    a: "Comfortably three to four. We pair a base island with day ferries so you never spend your evenings repacking.",
  },
  {
    q: "What's the best time to go?",
    a: "Late May through early June, and September. Warm sea, long light, and fewer crowds than peak August.",
  },
  {
    q: "Are flights and ferries included?",
    a: "Yes. Every itinerary bundles return flights, all inter-island ferries, and ground transfers into one price.",
  },
];

function Navigation() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("aegea-theme");
    setDark(stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("aegea-theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="mx-auto max-w-6xl px-5 sm:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-lg font-semibold leading-none text-primary-foreground">
              A
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Aegea</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-primary transition-colors hover:text-primary-hover"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="grid size-10 place-items-center rounded-full ring-1 ring-border transition-colors hover:bg-muted"
            >
              {dark ? (
                <Sun className="size-5 text-foreground/80" aria-hidden="true" />
              ) : (
                <Moon className="size-5 text-foreground/80" aria-hidden="true" />
              )}
            </button>
            <a
              href="#contact"
              className="hidden items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover sm:inline-flex"
            >
              Plan your trip
            </a>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full ring-1 ring-border transition-colors hover:bg-muted md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="flex flex-col gap-1.5">
                <span className={`block h-0.5 w-5 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:hidden ${
            open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 pb-4" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-muted hover:text-primary-hover"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Plan your trip
            </a>
          </nav>
        </div>
      </nav>
    </header>
  );
}

function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-background">
      <ol className="mx-auto flex max-w-6xl items-center gap-2 px-5 py-3 text-sm sm:px-8">
        <li>
          <a
            href="#home"
            className="font-medium text-primary transition-colors hover:text-primary-hover hover:underline underline-offset-4"
          >
            Home
          </a>
        </li>
        <li aria-hidden="true" className="text-foreground/30">
          ›
        </li>
        <li>
          <a
            href="#features"
            className="font-medium text-primary transition-colors hover:text-primary-hover hover:underline underline-offset-4"
          >
            Discover
          </a>
        </li>
        <li aria-hidden="true" className="text-foreground/30">
          ›
        </li>
        <li aria-current="page" className="font-medium text-foreground/60">
          Greek Islands
        </li>
      </ol>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -right-24 -top-24 size-[420px] rounded-full bg-primary/10" />
        <div className="absolute -bottom-32 -left-20 size-[360px] rounded-full bg-primary/10" />
      </div>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent-foreground">
              Island to island
            </span>
            <h1 className="mt-6 max-w-[20ch] font-display text-5xl font-semibold leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Greece, the way the light was meant to fall.
            </h1>
            <p className="mt-6 max-w-[52ch] text-base text-foreground/70 text-pretty sm:text-lg">
              White-washed lanes, slow mornings over the caldera, and seas so blue they stop being a color. We plan the
              whole island-hopping journey so you only have to show up and look up.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25"
              >
                See the itineraries
              </a>
              <a
                href="#features"
                className="inline-flex items-center rounded-full px-7 py-4 text-base font-semibold text-secondary ring-1 ring-secondary/30 transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                How it works
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img
              src={heroImage}
              alt="Santorini white Cycladic buildings cascading down a cliff toward the Aegean sea at golden hour"
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full rounded-[min(1vw,12px)] object-cover"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="bg-muted">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-[48ch]">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Discover</span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
            Six reasons the islands pull you in.
          </h2>
          <p className="mt-4 text-base text-foreground/70 text-pretty">
            Not a checklist. A rhythm — the things that make a Greek summer feel like it was always yours.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[min(1.5vw,16px)] bg-background p-7 ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/10"
            >
              <span className={`grid size-12 place-items-center rounded-full text-2xl font-display font-semibold ${feature.tone}`} aria-hidden="true">
                {feature.glyph}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-foreground/70 text-pretty">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section id="pricing" className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="rounded-[min(2vw,24px)] bg-secondary px-8 py-14 text-center ring-1 ring-secondary-foreground/20 sm:px-14 sm:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
            From €1,480 per person
          </span>
          <h2 className="mx-auto mt-5 max-w-[24ch] font-display text-4xl font-semibold leading-tight tracking-tight text-primary-foreground text-balance sm:text-5xl">
            One trip. Every island you've daydreamed about.
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-base text-primary-foreground/75 text-pretty">
            Flights, ferries, whitewashed stays and a local guide — bundled into a single, unhurried itinerary.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl hover:shadow-deep/20"
          >
            Reserve your summer
          </a>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="py-5">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="font-display text-lg font-medium">{q}</span>
        <span
          className={`grid size-8 shrink-0 place-items-center rounded-full text-foreground ring-1 ring-secondary/30 transition-transform duration-300 ${
            open ? "rotate-45 bg-primary text-primary-foreground ring-primary" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div className={`faq-panel ${open ? "open" : ""}`}>
        <div>
          <p className="pt-3 text-sm text-foreground/70 text-pretty">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="about" className="bg-background">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Good to know</span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
            Questions, answered.
          </h2>
        </div>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="bg-muted">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Say hello</span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl">
              Tell us where you're dreaming of.
            </h2>
            <p className="mt-4 text-base text-foreground/70 text-pretty">
              We'll reply within a day with a rough sketch of your route and a feel for the season.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <p className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-secondary/10 text-secondary" aria-hidden="true">✉</span>
                <a href="mailto:hello@aegea.travel" className="transition-colors hover:text-primary">hello@aegea.travel</a>
              </p>
              <p className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-secondary/10 text-secondary" aria-hidden="true">✆</span>
                <a href="tel:+302286000000" className="transition-colors hover:text-primary">+30 22860 00000</a>
              </p>
              <p className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-secondary/10 text-secondary" aria-hidden="true">◈</span>
                14 Harbour Lane, Fira, Santorini
              </p>
            </div>
          </div>
          <form
            className="rounded-[min(2vw,20px)] bg-background p-7 ring-1 ring-border sm:p-9"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <div className="flex min-h-80 flex-col items-center justify-center text-center" role="status">
                <span className="grid size-14 place-items-center rounded-full bg-secondary/15 font-display text-2xl text-secondary" aria-hidden="true">✓</span>
                <h3 className="mt-5 font-display text-2xl font-semibold">Efcharistó — message sent.</h3>
                <p className="mt-2 max-w-[36ch] text-sm text-foreground/70">
                  A travel designer will reply within a day with the first sketch of your route.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground/60">Name</span>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="mt-1.5 w-full rounded-xl bg-muted/60 px-4 py-3 text-sm ring-1 ring-border transition focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground/60">Email</span>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="mt-1.5 w-full rounded-xl bg-muted/60 px-4 py-3 text-sm ring-1 ring-border transition focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="you@email.com"
                    />
                  </label>
                </div>
                <label className="mt-4 block">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground/60">Subject</span>
                  <select
                    name="subject"
                    className="mt-1.5 w-full rounded-xl bg-muted/60 px-4 py-3 text-sm ring-1 ring-border transition focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Planning a trip</option>
                    <option>Group or private route</option>
                    <option>Questions about an itinerary</option>
                    <option>Something else</option>
                  </select>
                </label>
                <label className="mt-4 block">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground/60">Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="mt-1.5 w-full rounded-xl bg-muted/60 px-4 py-3 text-sm ring-1 ring-border transition focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us about your dates and dreams..."
                  />
                </label>
                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25"
                >
                  Send the message
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Itineraries", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Islands", href: "#features" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Journal", href: "#home" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Travel guide", href: "#features" },
      { label: "Packing list", href: "#about" },
      { label: "Best season", href: "#about" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Cancellations", href: "#" },
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-deep text-deep-foreground/70">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-lg font-semibold leading-none text-primary-foreground">
                A
              </span>
              <span className="font-display text-lg font-semibold text-deep-foreground">Aegea</span>
            </div>
            <p className="mt-4 max-w-[34ch] text-sm text-pretty">
              Island-hopping journeys across the Aegean, planned end to end.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { label: "Instagram", glyph: "◎" },
                { label: "Pinterest", glyph: "◉" },
                { label: "YouTube", glyph: "▶" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="grid size-9 place-items-center rounded-full text-deep-foreground/70 ring-1 ring-deep-foreground/20 transition-colors hover:bg-deep-foreground hover:text-deep"
                >
                  {social.glyph}
                </a>
              ))}
            </div>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-deep-foreground/50">{column.heading}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition-colors hover:text-deep-foreground">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-deep-foreground/10 pt-6 text-xs text-deep-foreground/50">
          © 2026 Aegea Travel Co. Made under the Aegean sun.
        </div>
      </div>
    </footer>
  );
}

function FloatingContactButton() {
  return (
    <a
      href="#contact"
      aria-label="Open the contact form"
      title="Call or message us"
      className="fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-foreground/25 ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-xl hover:shadow-foreground/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-hover"
    >
      <Phone className="size-6" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-primary/30 [animation-duration:2.5s]" aria-hidden="true" />
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground antialiased">
      <Navigation />
      <Breadcrumbs />
      <Hero />
      <Features />
      <CtaBanner />
      <Faq />
      <Contact />
      <Footer />
      <FloatingContactButton />
    </div>
  );
}
