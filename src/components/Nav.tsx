import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-[15px] font-medium tracking-tight"
        >
          <span
            aria-hidden
            className="inline-block size-2 rounded-full"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="font-display text-base">Tavola</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">AR Menu</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/menu"
            className="rounded-full px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Menu
          </Link>
          <Link
            to="/for-restaurants"
            className="rounded-full px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            For Restaurants
          </Link>
        </nav>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 backdrop-blur-md"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--color-background) 70%, transparent), transparent)",
        }}
      />
    </header>
  );
}
