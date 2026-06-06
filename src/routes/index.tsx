import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ModelViewer, type ModelViewerElement } from "../components/ModelViewer";
import { QrCard } from "../components/QrCard";
import { Reveal } from "../components/Reveal";
import { DEMO_MODEL_GLB, DEMO_MODEL_USDZ, DISHES } from "../lib/dishes";
import { isCoarsePointer, isLikelyMobile } from "../lib/ar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tavola — See Your Food Before You Order" },
      {
        name: "description",
        content:
          "The AR menu for modern restaurants. Photoreal 3D dishes, placed on your table in one tap.",
      },
      { property: "og:title", content: "Tavola — See Your Food Before You Order" },
      {
        property: "og:description",
        content:
          "The AR menu for modern restaurants. Photoreal 3D dishes, placed on your table in one tap.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <SeeItInYourSpace />
        <HowItWorks />
        <QrSection />
        <FeaturedDishes />
        <ForRestaurants />
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------- Hero ---------------------------------- */

function Hero() {
  const navigateToAr = () => {
    if (typeof window === "undefined") return;
    if (isLikelyMobile()) {
      window.location.href = "/menu/pizza-margherita?ar=1";
    } else {
      document.getElementById("qr")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
      <BgGradient />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-[1.05fr_1fr] md:gap-16 md:px-10">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full hairline px-3 py-1 text-xs text-muted-foreground">
              <span
                aria-hidden
                className="size-1.5 rounded-full"
                style={{ background: "var(--color-gold)" }}
              />
              Now in pilot with select restaurants
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-balance font-display text-[clamp(2.6rem,6vw,5.25rem)] font-700 leading-[0.98] tracking-tight">
              See your food
              <br />
              <span style={{ color: "var(--color-gold-soft)" }}>
                before you order.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
              Tavola turns every dish on the menu into a photoreal 3D model your
              guests can place on their table — straight from a QR code, with no
              app to download.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                onClick={navigateToAr}
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all active:scale-[0.98]"
                style={{
                  background: "var(--color-gold)",
                  color: "#0a0a0a",
                  boxShadow: "var(--shadow-gold)",
                }}
              >
                Place Pizza On Your Table
                <ArrowIcon />
              </button>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full hairline-strong px-6 py-3.5 text-sm text-foreground transition-colors hover:bg-secondary"
              >
                Browse Demo Menu
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted-foreground">
              <Stat label="Works on" value="iOS · Android" />
              <Stat label="App download" value="None required" />
              <Stat label="Average uplift" value="+18% per cover" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative aspect-square w-full">
            <div
              aria-hidden
              className="absolute inset-[8%] rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--color-gold) 22%, transparent), transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <div className="animate-float relative h-full w-full">
              <ModelViewer
                src={DEMO_MODEL_GLB}
                alt="Floating signature dish"
                autoRotate
                disableZoom
                interactionPrompt="none"
                exposure={1.15}
                shadowIntensity={0.6}
                shadowSoftness={1}
                cameraOrbit="30deg 75deg 1.25m"
                fieldOfView="28deg"
                className="h-full w-full"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="uppercase tracking-[0.18em] text-[10px] text-muted-foreground/70">
        {label}
      </span>
      <span className="mt-1 text-sm text-foreground">{value}</span>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function BgGradient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(80% 50% at 70% 30%, color-mix(in oklab, var(--color-gold) 8%, transparent), transparent 60%)",
      }}
    />
  );
}

/* ------------------------ See It In Your Space ------------------------- */

function SeeItInYourSpace() {
  const ref = useRef<ModelViewerElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  const launch = async () => {
    const el = ref.current;
    if (!el) return;
    if (!isLikelyMobile()) {
      alert("Open this page on your phone to launch AR.");
      return;
    }
    try {
      await el.activateAR();
    } catch {
      window.location.href = "/menu/pizza-margherita?ar=1";
    }
  };

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <SectionLabel>The shortcut</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-700 tracking-tight md:text-5xl">
            See it in your space.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            One tap. The pizza lands on your real table at real-world scale —
            walk around it, lean in, decide.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="mt-12 grid items-center gap-8 rounded-[28px] hairline-strong p-6 md:grid-cols-[1.2fr_1fr] md:p-10"
            style={{
              background:
                "linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-2) 100%)",
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px]">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 60%, color-mix(in oklab, var(--color-gold) 10%, transparent), transparent 70%)",
                }}
              />
              <ModelViewer
                ref={ref}
                src={DEMO_MODEL_GLB}
                iosSrc={DEMO_MODEL_USDZ}
                alt="Signature dish in AR"
                ar
                cameraControls
                autoRotate
                exposure={1.1}
                shadowIntensity={1}
                shadowSoftness={0.9}
                cameraOrbit="25deg 70deg 1.1m"
                fieldOfView="32deg"
                className="h-full w-full"
                onLoad={() => setLoaded(true)}
              />
              {!loaded && (
                <div className="pointer-events-none absolute inset-x-10 bottom-8 h-[2px] overflow-hidden rounded-full bg-white/5">
                  <div className="shimmer-bar h-full w-full" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-display text-2xl font-700">
                Margherita · 28cm
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Modeled to scale. Drop it on your table; it&apos;s the size it
                arrives.
              </p>
              <button
                onClick={launch}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium transition-all active:scale-[0.98] md:w-auto"
                style={{
                  background: "var(--color-gold)",
                  color: "#0a0a0a",
                  boxShadow: "var(--shadow-gold)",
                }}
              >
                <CubeIcon /> Launch AR
              </button>
              <p className="mt-4 text-xs text-muted-foreground">
                Tip: works best on iOS 12+ Safari and Android Chrome with ARCore.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

/* ----------------------------- How It Works ---------------------------- */

const STEPS = [
  { n: "01", t: "Scan", d: "Guests scan the table QR — no app, no install." },
  { n: "02", t: "Browse", d: "A curated, brand-fit menu loads instantly." },
  { n: "03", t: "View in 3D", d: "Rotate every dish. PBR materials, real lighting." },
  { n: "04", t: "Place in AR", d: "Drop the dish onto the table at real scale." },
];

function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-700 tracking-tight md:text-5xl">
            Four steps. Zero friction.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div
                className="h-full rounded-3xl hairline p-6 transition-all hover:-translate-y-1"
                style={{ background: "var(--color-surface)" }}
              >
                <div
                  className="font-mono text-xs tracking-widest"
                  style={{ color: "var(--color-gold-soft)" }}
                >
                  {s.n}
                </div>
                <h3 className="mt-6 font-display text-xl font-700">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ QR Section ----------------------------- */

function QrSection() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => setMobile(isCoarsePointer() && isLikelyMobile()), []);

  return (
    <section id="qr" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <SectionLabel>Try the QR experience</SectionLabel>
            <h2 className="mt-4 max-w-xl text-balance font-display text-4xl font-700 tracking-tight md:text-5xl">
              The whole journey, from QR to AR.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              {mobile
                ? "You're already on a phone — tap below to open the live demo menu and place a dish in AR."
                : "Open your camera and scan. The demo menu loads on your phone — pick a dish, view it in 3D, place it on your table."}
            </p>
            <ol className="mt-8 space-y-3 text-sm text-muted-foreground">
              {["Scan the QR", "Open the menu", "Pick a dish", "Place in AR"].map(
                (s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span
                      className="grid size-6 place-items-center rounded-full hairline text-[11px] text-foreground"
                      style={{ background: "var(--color-surface-2)" }}
                    >
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ),
              )}
            </ol>
            {mobile && (
              <Link
                to="/menu"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium"
                style={{
                  background: "var(--color-gold)",
                  color: "#0a0a0a",
                  boxShadow: "var(--shadow-gold)",
                }}
              >
                Open Demo Menu <ArrowIcon />
              </Link>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex justify-center md:justify-end">
              {mobile ? (
                <div
                  className="grid aspect-square w-full max-w-sm place-items-center rounded-[28px] hairline-strong p-10 text-center"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-2) 100%)",
                  }}
                >
                  <div>
                    <p className="text-sm text-muted-foreground">
                      You&apos;re on mobile.
                    </p>
                    <p className="mt-2 text-foreground">
                      Skip the QR — open the menu directly.
                    </p>
                  </div>
                </div>
              ) : (
                <QrCard path="/menu" />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Featured Dishes -------------------------- */

function FeaturedDishes() {
  const featured = DISHES.slice(0, 3);
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <SectionLabel>Featured</SectionLabel>
              <h2 className="mt-4 max-w-xl text-balance font-display text-4xl font-700 tracking-tight md:text-5xl">
                A taste of the demo menu.
              </h2>
            </div>
            <Link
              to="/menu"
              className="hidden shrink-0 rounded-full hairline-strong px-5 py-3 text-sm hover:bg-secondary md:inline-flex"
            >
              See full menu →
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.06}>
              <DishCard slug={d.slug} name={d.name} price={d.price} image={d.image} blurb={d.blurb} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DishCard({
  slug,
  name,
  price,
  image,
  blurb,
}: {
  slug: string;
  name: string;
  price: string;
  image: string;
  blurb: string;
}) {
  return (
    <Link
      to="/menu/$slug"
      params={{ slug }}
      className="group block overflow-hidden rounded-[24px] hairline transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover"
          initial={{ scale: 1.05 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, color-mix(in oklab, #000 60%, transparent) 100%)",
          }}
        />
      </div>
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <h3 className="font-display text-lg font-700">{name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{blurb}</p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs"
          style={{
            background: "color-mix(in oklab, var(--color-gold) 12%, transparent)",
            color: "var(--color-gold-soft)",
          }}
        >
          {price}
        </span>
      </div>
    </Link>
  );
}

/* ---------------------------- For Restaurants -------------------------- */

const BENEFITS = [
  { t: "We scan your dishes", d: "On-site photogrammetry capture, in a single service window." },
  { t: "Photoreal 3D models", d: "PBR materials, real-world scale, tuned for mobile." },
  { t: "Guests preview before ordering", d: "Fewer surprises. Smaller plates upsold. Higher satisfaction." },
  { t: "QR menu, included", d: "Branded, fast, and updateable from one dashboard." },
  { t: "No app download", d: "Runs in the camera and browser already in your guest's pocket." },
  { t: "Works on modern smartphones", d: "iOS 12+ via Quick Look. Android 8+ via Scene Viewer." },
];

function ForRestaurants() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <SectionLabel>For restaurants</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-700 tracking-tight md:text-5xl">
            A menu your guests can hold in their hand.
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground">
            We capture your kitchen, you get a living menu. No subscriptions for
            your guests, no friction for your team.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.t} delay={i * 0.04}>
              <div
                className="h-full rounded-3xl hairline p-6"
                style={{ background: "var(--color-surface)" }}
              >
                <div
                  aria-hidden
                  className="size-8 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-gold), color-mix(in oklab, var(--color-gold) 30%, transparent))",
                  }}
                />
                <h3 className="mt-5 font-display text-lg font-700">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              to="/for-restaurants"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium"
              style={{
                background: "var(--color-gold)",
                color: "#0a0a0a",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              Read the full pitch <ArrowIcon />
            </Link>
            <a
              href="mailto:hello@tavola.menu"
              className="inline-flex items-center gap-2 rounded-full hairline-strong px-6 py-3.5 text-sm hover:bg-secondary"
            >
              Talk to the team
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]"
      style={{ color: "var(--color-gold-soft)" }}
    >
      <span
        aria-hidden
        className="inline-block h-px w-6"
        style={{ background: "var(--color-gold)" }}
      />
      {children}
    </div>
  );
}
