import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { CATEGORIES, DISHES, type DishCategory } from "../lib/dishes";

export const Route = createFileRoute("/menu/")({
  head: () => ({
    meta: [
      { title: "The Menu — Tavola" },
      {
        name: "description",
        content:
          "A demo restaurant menu. Tap any dish to view it in 3D and place it on your table in AR.",
      },
      { property: "og:title", content: "The Menu — Tavola" },
      {
        property: "og:description",
        content:
          "A demo restaurant menu. Every dish in 3D, placeable in AR.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [category, setCategory] = useState<"All" | DishCategory>("All");
  const list = useMemo(
    () =>
      category === "All" ? DISHES : DISHES.filter((d) => d.category === category),
    [category],
  );

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
              The menu
            </div>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-5xl font-700 leading-[1.02] tracking-tight md:text-6xl">
              Every dish, in your hand.
            </h1>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Tap a dish to rotate it in 3D — and on your phone, place it on
              your real table at real scale.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const active = c === category;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className="rounded-full px-4 py-2 text-sm transition-all"
                    style={
                      active
                        ? {
                            background: "var(--color-gold)",
                            color: "#0a0a0a",
                          }
                        : {
                            background: "var(--color-surface)",
                            color: "var(--color-foreground)",
                            border: "1px solid var(--color-border)",
                          }
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((d, i) => (
              <Reveal key={d.slug} delay={Math.min(i * 0.04, 0.32)}>
                <article
                  className="group h-full overflow-hidden rounded-[24px] hairline transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                  style={{ background: "var(--color-surface)" }}
                >
                  <Link
                    to="/menu/$slug"
                    params={{ slug: d.slug }}
                    className="block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <motion.img
                        src={d.image}
                        alt={d.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                        initial={{ scale: 1.06 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 50%, color-mix(in oklab, #000 65%, transparent) 100%)",
                        }}
                      />
                      <span
                        className="absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] tracking-wide backdrop-blur-md"
                        style={{
                          background:
                            "color-mix(in oklab, #000 50%, transparent)",
                          color: "var(--color-gold-soft)",
                        }}
                      >
                        {d.category}
                      </span>
                    </div>
                  </Link>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl font-700">
                          {d.name}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {d.blurb}
                        </p>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-xs"
                        style={{
                          background:
                            "color-mix(in oklab, var(--color-gold) 12%, transparent)",
                          color: "var(--color-gold-soft)",
                        }}
                      >
                        {d.price}
                      </span>
                    </div>
                    <div className="mt-5 flex gap-2">
                      <Link
                        to="/menu/$slug"
                        params={{ slug: d.slug }}
                        className="flex-1 rounded-full hairline-strong px-4 py-2.5 text-center text-xs hover:bg-secondary"
                      >
                        View in 3D
                      </Link>
                      <Link
                        to="/menu/$slug"
                        params={{ slug: d.slug }}
                        search={{ ar: 1 } as never}
                        className="flex-1 rounded-full px-4 py-2.5 text-center text-xs font-medium"
                        style={{
                          background: "var(--color-gold)",
                          color: "#0a0a0a",
                        }}
                      >
                        View in AR
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
