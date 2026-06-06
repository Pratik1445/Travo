export function Footer() {
  return (
    <footer className="mt-32 border-t hairline">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block size-2 rounded-full"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="font-display text-foreground">Tavola</span>
          <span>· The AR menu for modern restaurants.</span>
        </div>
        <div className="flex gap-6">
          <span>© {new Date().getFullYear()} Tavola Studio</span>
          <a href="mailto:hello@tavola.menu" className="hover:text-foreground">
            hello@tavola.menu
          </a>
        </div>
      </div>
    </footer>
  );
}
