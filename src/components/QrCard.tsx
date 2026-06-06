import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

interface Props {
  /** Path appended to current origin. Defaults to /menu. */
  path?: string;
}

export function QrCard({ path = "/menu" }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const u = `${window.location.origin}${path}`;
    setUrl(u);
    if (ref.current) {
      QRCode.toCanvas(ref.current, u, {
        errorCorrectionLevel: "H",
        margin: 1,
        width: 320,
        color: {
          dark: "#0a0a0a",
          light: "#f4ecd8",
        },
      }).catch(() => {});
    }
  }, [path]);

  return (
    <div
      className="relative w-full max-w-sm rounded-[28px] p-6 hairline-strong"
      style={{
        background:
          "linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-2) 100%)",
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      <div
        className="rounded-[20px] p-4"
        style={{ background: "#f4ecd8" }}
      >
        <canvas ref={ref} className="block h-auto w-full" />
      </div>
      <div className="mt-5 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Scan with your phone</span>
        <span
          className="truncate font-mono text-[11px]"
          style={{ color: "var(--color-gold-soft)" }}
          title={url}
        >
          {url.replace(/^https?:\/\//, "")}
        </span>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[28px]"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--color-gold) 25%, transparent), transparent 40%, transparent 60%, color-mix(in oklab, var(--color-gold) 18%, transparent))",
          maskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />
    </div>
  );
}
