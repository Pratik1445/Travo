import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/for-restaurants")({
  head: () => ({
    meta: [
      { title: "For Restaurants — Tavola" },
      {
        name: "description",
        content:
          "We scan your dishes, model them photorealistically, and ship a QR menu your guests can explore in AR — no app required.",
      },
      { property: "og:title", content: "For Restaurants — Tavola" },
      {
        property: "og:description",
        content:
          "We scan your dishes, model them photorealistically, and ship a QR menu your guests can explore in AR — no app required.",
      },
    ],
  }),
  component: ForRestaurants,
});

const STAGES = [
  {
    n: "01",
    t: "Capture",
    d: "A one-evening on-site shoot. We scan each signature dish with photogrammetry rigs — no service interruption.",
  },
  {
    n: "02",
    t: "Model",
    d: "Studio cleanup, PBR materials, and real-world scale. Every plate is tuned for mobile-class GPUs.",
  },
  {
    n: "03",
    t: "Deploy",
    d: "Your branded QR menu goes live on stable URLs you control. Update copy, prices, and dishes anytime.",
  },
];

const PILLARS = [
  ["Photoreal", "PBR materials, environment lighting, soft contact shadows."],
  ["No app", "Runs in iOS Quick Look and Android Scene Viewer — already installed."],
  ["Real scale", "Models are sized to the plate. AR drops them at true size."],
  ["Fast", "Sub-3MB GLBs. Loads on a 4G connection in seconds."],
  ["Brand-fit", "Typography, color, and copy tuned to your room."],
  ["Measured", "Per-dish view + AR analytics on every cover."],
];

function ForRestaurants() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-32 pb-24 md:pt-40">
        <section className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "var(--color-gold-soft)" }}
            >
              <span
                aria-hidden
                className="inline-block h-px w-6"
                style={{ background: "var(--color-gold)" }}
              />
              For restaurants
            </div>
            <h1 className="mt-5 max-w-4xl text-balance font-display text-5xl font-700 leading-[1.02] tracking-tight md:text-7xl">
              A menu your guests <em className="not-italic" style={{ color: "var(--color-gold-soft)" }}>can hold.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Tavola brings every plate on your menu into your guest&apos;s
              hands — photoreal, in 3D, placed on the real table in augmented
              reality. From a single QR code.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto mt-24 max-w-7xl px-6 md:px-10">
          <Reveal>
            <h2 className="font-display text-3xl font-700 md:text-4xl">
              How we work with you.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {STAGES.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div
                  className="h-full rounded-3xl hairline p-7"
                  style={{ background: "var(--color-surface)" }}
                >
                  <div
                    className="font-mono text-xs tracking-widest"
                    style={{ color: "var(--color-gold-soft)" }}
                  >
                    {s.n}
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-700">{s.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-7xl px-6 md:px-10">
          <Reveal>
            <h2 className="font-display text-3xl font-700 md:text-4xl">
              What you get.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.04}>
                <div
                  className="h-full rounded-3xl hairline p-6"
                  style={{ background: "var(--color-surface)" }}
                >
                  <div
                    aria-hidden
                    className="size-8 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-gold), color-mix(in oklab, var(--color-gold) 25%, transparent))",
                    }}
                  />
                  <h3 className="mt-5 font-display text-lg font-700">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-28 max-w-7xl px-6 md:px-10">
          <Reveal>
            <div
              className="rounded-[28px] hairline-strong p-10 md:p-16"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-2) 100%)",
                boxShadow: "var(--shadow-elevated)",
              }}
            >
              <h2 className="max-w-2xl text-balance font-display text-3xl font-700 md:text-5xl">
                Ready to put your menu in their hands?
              </h2>
              <p className="mt-5 max-w-xl text-muted-foreground">
                We&apos;re piloting with a small cohort of restaurants this
                season. Tell us about your room and your menu.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:hello@tavola.menu?subject=Tavola%20pilot"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium"
                  style={{
                    background: "var(--color-gold)",
                    color: "#0a0a0a",
                    boxShadow: "var(--shadow-gold)",
                  }}
                >
                  Apply for the pilot
                </a>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 rounded-full hairline-strong px-6 py-3.5 text-sm hover:bg-secondary"
                >
                  Try the demo menu
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
