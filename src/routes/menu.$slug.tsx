import { createFileRoute, Link, notFound, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { ModelViewer, type ModelViewerElement } from "../components/ModelViewer";
import { getDish } from "../lib/dishes";
import { isLikelyMobile } from "../lib/ar";

export const Route = createFileRoute("/menu/$slug")({
  validateSearch: (search: Record<string, unknown>) => ({
    ar: search.ar === "1" || search.ar === 1 ? 1 : undefined,
  }),
  loader: ({ params }) => {
    const dish = getDish(params.slug);
    if (!dish) throw notFound();
    return { dish };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.dish.name} — Tavola` },
          { name: "description", content: loaderData.dish.description },
          { property: "og:title", content: `${loaderData.dish.name} — Tavola` },
          { property: "og:description", content: loaderData.dish.description },
          { property: "og:image", content: loaderData.dish.image },
          { name: "twitter:image", content: loaderData.dish.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Dish not found.</p>
        <Link
          to="/menu"
          className="mt-4 inline-block rounded-full hairline-strong px-5 py-3 text-sm"
        >
          Back to menu
        </Link>
      </div>
    </div>
  ),
  component: DishPage,
});

function DishPage() {
  const { dish } = Route.useLoaderData();
  const search = useSearch({ from: "/menu/$slug" });
  const ref = useRef<ModelViewerElement | null>(null);
  const [modelReady, setModelReady] = useState(false);

  // Auto-launch AR on mobile when ?ar=1
  useEffect(() => {
    if (!search.ar || !modelReady) return;
    if (!isLikelyMobile()) return;
    const t = setTimeout(() => {
      ref.current?.activateAR().catch(() => {});
    }, 400);
    return () => clearTimeout(t);
  }, [search.ar, modelReady]);

  const launchAR = async () => {
    const el = ref.current;
    if (!el) return;
    if (!isLikelyMobile()) {
      alert("Open this page on your phone to launch AR.");
      return;
    }
    try {
      await el.activateAR();
    } catch {
      /* user dismissed */
    }
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-28 pb-24 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <span aria-hidden>←</span> Back to menu
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-16">
            {/* 3D / image stage */}
            <Reveal>
              <div
                className="relative aspect-square w-full overflow-hidden rounded-[28px] hairline-strong"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 55%, color-mix(in oklab, var(--color-gold) 10%, transparent), transparent 70%), linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-2) 100%)",
                  boxShadow: "var(--shadow-elevated)",
                }}
              >
                <AnimatePresence>
                  {!modelReady && (
                    <motion.img
                      key="poster"
                      src={dish.image}
                      alt={dish.name}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </AnimatePresence>

                <ModelViewer
                  ref={ref}
                  src={dish.model}
                  iosSrc={dish.modelUsdz}
                  alt={dish.name}
                  ar
                  cameraControls
                  autoRotate
                  exposure={1.1}
                  shadowIntensity={1}
                  shadowSoftness={0.85}
                  cameraOrbit="30deg 70deg 1.1m"
                  fieldOfView="30deg"
                  className="absolute inset-0 h-full w-full"
                  onLoad={() => setModelReady(true)}
                />

                {!modelReady && (
                  <div className="pointer-events-none absolute inset-x-10 bottom-8 h-[2px] overflow-hidden rounded-full bg-white/5">
                    <div className="shimmer-bar h-full w-full" />
                  </div>
                )}

                <div
                  className="absolute right-5 top-5 rounded-full px-3 py-1 text-[11px] tracking-wide backdrop-blur-md"
                  style={{
                    background: "color-mix(in oklab, #000 45%, transparent)",
                    color: "var(--color-gold-soft)",
                  }}
                >
                  3D · {modelReady ? "ready" : "loading"}
                </div>
              </div>
            </Reveal>

            {/* Info column */}
            <div>
              <Reveal>
                <div
                  className="text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--color-gold-soft)" }}
                >
                  {dish.category}
                </div>
                <h1 className="mt-3 font-display text-5xl font-700 leading-[1.02] tracking-tight md:text-6xl">
                  {dish.name}
                </h1>
                <p className="mt-4 text-sm text-muted-foreground">{dish.blurb}</p>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="mt-8 flex items-baseline gap-4">
                  <span
                    className="font-display text-3xl font-700"
                    style={{ color: "var(--color-gold-soft)" }}
                  >
                    {dish.price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    per portion
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-balance leading-relaxed text-foreground/90">
                  {dish.description}
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Ingredients
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {dish.ingredients.map((i: string) => (
                      <span
                        key={i}
                        className="rounded-full px-3 py-1.5 text-xs hairline"
                        style={{ background: "var(--color-surface)" }}
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <StatCard label="Prep time" value={`${dish.prepMinutes} min`} />
                  <StatCard label="Calories" value={`${dish.calories} kcal`} />
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <button
                    onClick={launchAR}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all active:scale-[0.98]"
                    style={{
                      background: "var(--color-gold)",
                      color: "#0a0a0a",
                      boxShadow: "var(--shadow-gold)",
                    }}
                  >
                    View in AR
                  </button>
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-2 rounded-full hairline-strong px-6 py-3.5 text-sm hover:bg-secondary"
                  >
                    Back to menu
                  </Link>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  On desktop, scan the QR on the home page to open this dish on
                  your phone and place it on your real table.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-2xl hairline p-4 transition-all hover:-translate-y-0.5"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 font-display text-xl font-700">{value}</div>
    </div>
  );
}
