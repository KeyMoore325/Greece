import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight, Compass, Menu, Moon, Phone, Ship, Sun, Utensils, Wallet, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import panoramaImage from "@/assets/greece-panorama.jpg";
import milosImage from "@/assets/milos-coast.jpg";
import parosImage from "@/assets/paros-lanes.jpg";
import tableImage from "@/assets/greek-table.jpg";
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
  { icon: Sun, title: "Caldera sunsets", text: "Golden light, cliffside terraces, and a glass of Assyrtiko. Some evenings stay with you forever.", tone: "bg-accent/10", number: "01" },
  { icon: Ship, title: "Island to island", text: "From Naxos to Milos to Paros. Follow the ferries to a different kind of beautiful.", tone: "bg-secondary/5", number: "02" },
  { icon: Utensils, title: "A taste of Greece", text: "Long lunches, the freshest catch, and a table by the sea. There's always room for one more.", tone: "bg-primary/5", number: "03" },
];

const GALLERY = [
  { image: panoramaImage, title: "Santorini", detail: "Where the light meets the sea", alt: "Santorini's blue domes and whitewashed village above the sea" },
  { image: milosImage, title: "Milos", detail: "A coastline from another world", alt: "White volcanic cliffs and turquoise water at Sarakiniko, Milos" },
  { image: parosImage, title: "Paros", detail: "Take the beautiful way around", alt: "A flower-filled whitewashed alley on Paros" },
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

function TripLink({ children, href = "#contact", outline = false }: { children: React.ReactNode; href?: string; outline?: boolean }) {
  return <Button asChild variant={outline ? "outline" : "default"} className={`h-11 rounded-full px-6 font-normal shadow-none ${outline ? "border-secondary/30 bg-transparent text-primary hover:bg-secondary/10" : "hover:bg-primary-hover"}`}><a href={href}>{children}</a></Button>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("aegea-theme", next ? "dark" : "light"); } catch { /* Theme still works when storage is unavailable. */ }
  };
  return <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
    <nav className="page-width" aria-label="Main navigation">
      <div className="grid h-[72px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <a href="#home" className="min-w-0 font-display text-2xl text-primary">Aegea<span className="ml-1 text-sm">®</span></a>
        <div className="hidden items-center gap-8 md:flex">{NAV_LINKS.map(link => <a key={link.href} href={link.href} className="text-sm text-primary transition-colors hover:text-primary-hover">{link.label}</a>)}</div>
        <div className="flex shrink-0 items-center justify-end gap-3">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/10" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? <Sun /> : <Moon />}</Button>
          <div className="hidden sm:block"><TripLink>Plan your trip <ArrowRight /></TripLink></div>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && <div className="flex flex-col gap-4 border-t border-border py-5 md:hidden">{NAV_LINKS.map(link => <a href={link.href} key={link.href} onClick={() => setOpen(false)} className="text-primary">{link.label}</a>)}<TripLink>Plan your trip</TripLink></div>}
    </nav>
  </header>;
}

function Breadcrumbs() {
  return <nav aria-label="Breadcrumb" className="mb-5"><ol className="flex items-center gap-2 text-xs text-photo-foreground/80"><li><a href="#home" className="hover:underline">Home</a></li><ChevronRight className="size-3" aria-hidden="true"/><li><a href="#features" className="hover:underline">Discover</a></li><ChevronRight className="size-3" aria-hidden="true"/><li aria-current="page">Greek Islands</li></ol></nav>;
}

function Hero() {
  return <section id="home" className="relative isolate flex min-h-[590px] items-center overflow-hidden text-photo-foreground">
    <img src={panoramaImage} alt="Blue domes overlooking the Aegean sea in Santorini at sunset" width={1920} height={1024} fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover" />
    <div className="photo-shade absolute inset-0 -z-10" />
    <div className="page-width w-full py-14 sm:py-16">
      <Breadcrumbs />
      <h1 className="max-w-[16ch] text-balance font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">Greece, the way the light was meant to fall.<span className="ml-3 inline-block align-top font-body text-base font-normal sm:text-xl">GR</span></h1>
      <p className="mt-6 max-w-[46ch] text-pretty text-base leading-relaxed text-photo-foreground/90">White-washed lanes, slow mornings over the caldera, and seas so blue they stop being a color. We plan the whole island-hopping journey so you only have to show up and look up.</p>
      <div className="mt-8 flex flex-wrap gap-4"><TripLink href="#gallery">Explore the islands <ArrowRight /></TripLink><Button asChild variant="link" className="h-11 font-normal text-photo-foreground"><a href="#features">Discover more</a></Button></div>
    </div>
  </section>;
}

function Features() {
  return <section id="features" className="section-space"><div className="page-width">
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><p className="eyebrow">Discover</p><h2 className="section-heading mt-4 max-w-[450px]">What's so special<br />about Greece?</h2></div><div className="hidden sm:block"><TripLink href="#experiences">A little inspiration <ArrowRight /></TripLink></div></div>
    <div className="mt-10 grid gap-5 md:grid-cols-3">{FEATURES.map(feature => <article key={feature.title} className={`relative rounded-lg p-7 transition-transform duration-300 hover:-translate-y-1 ${feature.tone}`}><span className="absolute right-6 top-6 font-display text-3xl text-foreground/10">{feature.number}</span><span className="grid size-10 place-items-center rounded-full bg-secondary text-secondary-foreground"><feature.icon className="size-4" /></span><h3 className="mt-7 font-display text-xl">{feature.title}</h3><p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-foreground/70">{feature.text}</p></article>)}</div>
  </div></section>;
}

function Gallery() {
  const [current, setCurrent] = useState(0);
  const slide = GALLERY[current] ?? GALLERY[0]!;
  return <section id="gallery" className="section-space pt-0"><div className="page-width">
    <div className="mb-9 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><p className="eyebrow">Gallery</p><h2 className="section-heading mt-4">Explore the beauty</h2></div><div className="flex shrink-0 gap-2"><Button variant="ghost" size="icon" className="rounded-full" aria-label="Previous island" onClick={() => setCurrent((current + GALLERY.length - 1) % GALLERY.length)}><ArrowLeft /></Button><Button size="icon" className="rounded-full" aria-label="Next island" onClick={() => setCurrent((current + 1) % GALLERY.length)}><ArrowRight /></Button></div></div>
    <div className="relative isolate h-[360px] overflow-hidden rounded-lg sm:h-[390px]" aria-roledescription="carousel" aria-label="Greek island gallery">
      <img key={slide.title} src={slide.image} alt={slide.alt} width={1920} height={1024} loading="lazy" className="gallery-photo absolute inset-0 -z-20 size-full object-cover"/><div className="photo-bottom-shade absolute inset-0 -z-10"/>
      <div className="absolute bottom-7 left-7 right-7 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 text-photo-foreground"><div aria-live="polite"><p className="text-xs">{slide.detail}</p><h3 className="mt-2 font-display text-3xl">{slide.title}</h3></div><div className="flex gap-2">{GALLERY.map((item, i) => <Button key={item.title} variant="ghost" className="h-6 w-6 p-0 hover:bg-transparent" aria-label={`Show ${item.title}`} aria-pressed={current === i} onClick={() => setCurrent(i)}><span className={`h-1 rounded-full bg-photo-foreground ${current === i ? "w-6" : "w-2 opacity-50"}`} /></Button>)}</div></div>
    </div>
  </div></section>;
}

function Experiences() {
  const experiences = [
    { image: heroImage, title: "Caldera sunsets", text: "Clifftop views and the kind of golden hour you'll never forget.", link: "Find your Santorini", alt: "Santorini village at golden hour" },
    { image: parosImage, title: "Whitewashed wanderings", text: "Flower-filled lanes, blue doors, and nowhere you need to be.", link: "Get lost in Paros", alt: "Whitewashed Paros alley with pink bougainvillea" },
    { image: tableImage, title: "A seat by the sea", text: "Fresh catch, local wine, and lunches that last all afternoon.", link: "Taste the islands", alt: "Greek food and wine at a seaside taverna" },
  ];
  return <section id="experiences" className="section-space bg-muted/60"><div className="page-width"><div className="grid gap-5 md:grid-cols-2 md:items-end"><div><p className="eyebrow">Must experience</p><h2 className="section-heading mt-4">Icons of Greece</h2></div><p className="max-w-[360px] text-sm leading-relaxed text-foreground/65 md:justify-self-end">The little things that make a place unforgettable. Come for the views. Stay for everything else.</p></div>
    <div className="mt-10 grid gap-8 md:grid-cols-3">{experiences.map(item => <article key={item.title} className="group min-w-0"><div className="relative isolate aspect-[3/4] overflow-hidden rounded-lg"><img src={item.image} alt={item.alt} width={1024} height={1280} loading="lazy" className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-500 group-hover:scale-105"/><div className="photo-bottom-shade absolute inset-0 -z-10"/><div className="absolute bottom-0 p-6 text-photo-foreground"><h3 className="font-display text-xl">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-photo-foreground/85">{item.text}</p></div></div><div className="mt-5 text-center"><TripLink outline>{item.link} <ArrowRight /></TripLink></div></article>)}</div>
  </div></section>;
}

function Planning() {
  const items = [ {icon: Compass, label:"Your route", value:"Three islands. One beautiful journey."}, {icon: Wallet, label:"Your budget", value:"From €1,480 per person"}, {icon: CalendarDays, label:"Best time", value:"Late May–June & September"}, {icon: Ship, label:"Getting around", value:"Flights, ferries & transfers included"} ];
  return <section id="pricing" className="section-space"><div className="page-width"><p className="eyebrow">Before you go</p><h2 className="section-heading mt-4">Plan your trip</h2><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map(item => <div key={item.label} className="border-t border-secondary/25 py-6"><span className="grid size-9 place-items-center rounded-full bg-secondary/10 text-secondary"><item.icon className="size-4"/></span><p className="mt-5 text-xs uppercase text-foreground/50">{item.label}</p><p className="mt-2 text-sm">{item.value}</p></div>)}</div></div></section>;
}

function CtaBanner() {
  return <section className="relative isolate overflow-hidden text-photo-foreground"><img src={panoramaImage} alt="Sunset over the Aegean sea" width={1920} height={1024} loading="lazy" className="absolute inset-0 -z-20 size-full object-cover"/><div className="absolute inset-0 -z-10 bg-photo-overlay/75"/><div className="page-width grid gap-8 py-20 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><h2 className="max-w-[540px] font-display text-3xl leading-tight sm:text-4xl">Pack your bags, your<br />adventure awaits!</h2><TripLink>Reserve your summer <ArrowRight /></TripLink></div></section>;
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="py-5">
      <Button
        type="button"
        variant="ghost" className="h-auto w-full justify-between gap-4 whitespace-normal rounded-none p-0 text-left hover:bg-transparent"
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
      </Button>
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
          <span className="text-xs font-normal uppercase  text-primary">Good to know</span>
          <h2 className="mt-4 section-heading text-balance">
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
    <section id="contact" className="bg-muted/50">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-normal uppercase  text-primary">Say hello</span>
            <h2 className="mt-4 section-heading text-balance">
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
            className="border-t border-secondary/25 pt-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <div className="flex min-h-80 flex-col items-center justify-center text-center" role="status">
                <span className="grid size-14 place-items-center rounded-full bg-secondary/15 font-display text-2xl text-secondary" aria-hidden="true">✓</span>
                <h3 className="mt-5 font-display text-2xl font-normal">Efcharistó — message sent.</h3>
                <p className="mt-2 max-w-[36ch] text-sm text-foreground/70">
                  A travel designer will reply within a day with the first sketch of your route.
                </p>
                <Button
                  type="button"
                  onClick={() => setSent(false)}
                  variant="link" className="mt-6 text-sm text-primary"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-normal uppercase  text-foreground/60">Name</span>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="mt-1.5 w-full rounded-md bg-muted/60 px-4 py-3 text-sm ring-1 ring-border transition focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-normal uppercase  text-foreground/60">Email</span>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="mt-1.5 w-full rounded-md bg-muted/60 px-4 py-3 text-sm ring-1 ring-border transition focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="you@email.com"
                    />
                  </label>
                </div>
                <label className="mt-4 block">
                  <span className="text-xs font-normal uppercase  text-foreground/60">Subject</span>
                  <select
                    name="subject"
                    className="mt-1.5 w-full rounded-md bg-muted/60 px-4 py-3 text-sm ring-1 ring-border transition focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Planning a trip</option>
                    <option>Group or private route</option>
                    <option>Questions about an itinerary</option>
                    <option>Something else</option>
                  </select>
                </label>
                <label className="mt-4 block">
                  <span className="text-xs font-normal uppercase  text-foreground/60">Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="mt-1.5 w-full rounded-md bg-muted/60 px-4 py-3 text-sm ring-1 ring-border transition focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us about your dates and dreams..."
                  />
                </label>
                <Button
                  type="submit"
                  className="mt-6 h-12 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-normal text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25"
                >
                  Send the message
                </Button>
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
              <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-lg font-normal leading-none text-primary-foreground">
                A
              </span>
              <span className="font-display text-lg font-normal text-deep-foreground">Aegea</span>
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
              <h2 className="text-xs font-normal uppercase  text-deep-foreground/50">{column.heading}</h2>
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
      <main>
      <Hero />
      <Features />
      <Gallery />
      <Experiences />
      <Planning />
      <Faq />
      <Contact />
      <CtaBanner />
      </main>
      <Footer />
      <FloatingContactButton />
    </div>
  );
}
