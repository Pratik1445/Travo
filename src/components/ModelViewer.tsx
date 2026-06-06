import { forwardRef, useEffect, useState, type CSSProperties } from "react";

// Lazy-load the model-viewer web component on the client only.
let registered = false;
function ensureRegistered() {
  if (registered || typeof window === "undefined") return;
  registered = true;
  void import("@google/model-viewer");
}

// Minimal typing for the custom element (React 19 JSX).
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          "ios-src"?: string;
          alt?: string;
          poster?: string;
          ar?: boolean | "";
          "ar-modes"?: string;
          "ar-scale"?: string;
          "ar-placement"?: string;
          "camera-controls"?: boolean | "";
          "disable-zoom"?: boolean | "";
          "interaction-prompt"?: "auto" | "none" | "when-focused";
          "auto-rotate"?: boolean | "";
          "auto-rotate-delay"?: number | string;
          "rotation-per-second"?: string;
          "shadow-intensity"?: number | string;
          "shadow-softness"?: number | string;
          "exposure"?: number | string;
          "environment-image"?: string;
          "tone-mapping"?: string;
          "camera-orbit"?: string;
          "field-of-view"?: string;
          "min-camera-orbit"?: string;
          "max-camera-orbit"?: string;
          loading?: "auto" | "lazy" | "eager";
          reveal?: "auto" | "interaction" | "manual";
        },
        HTMLElement
      >;
    }
  }
}

export interface ModelViewerElement extends HTMLElement {
  activateAR(): Promise<void>;
  canActivateAR: boolean;
}

interface Props {
  src: string;
  iosSrc?: string;
  alt: string;
  poster?: string;
  ar?: boolean;
  cameraControls?: boolean;
  autoRotate?: boolean;
  disableZoom?: boolean;
  exposure?: number;
  shadowIntensity?: number;
  shadowSoftness?: number;
  cameraOrbit?: string;
  fieldOfView?: string;
  interactionPrompt?: "auto" | "none" | "when-focused";
  className?: string;
  style?: CSSProperties;
  onLoad?: () => void;
}

export const ModelViewer = forwardRef<ModelViewerElement, Props>(function ModelViewer(
  {
    src,
    iosSrc,
    alt,
    poster,
    ar = false,
    cameraControls = false,
    autoRotate = false,
    disableZoom = false,
    exposure = 1.05,
    shadowIntensity = 1,
    shadowSoftness = 0.9,
    cameraOrbit,
    fieldOfView,
    interactionPrompt = "none",
    className,
    style,
    onLoad,
  },
  ref,
) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ensureRegistered();
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background: "transparent",
        }}
        aria-hidden
      />
    );
  }

  return (
    <model-viewer
      ref={ref as unknown as React.Ref<HTMLElement>}
      src={src}
      ios-src={iosSrc}
      alt={alt}
      poster={poster}
      ar={ar ? ("" as const) : undefined}
      ar-modes="scene-viewer quick-look webxr"
      ar-scale="fixed"
      ar-placement="floor"
      camera-controls={cameraControls ? ("" as const) : undefined}
      auto-rotate={autoRotate ? ("" as const) : undefined}
      disable-zoom={disableZoom ? ("" as const) : undefined}
      rotation-per-second="20deg"
      interaction-prompt={interactionPrompt}
      shadow-intensity={shadowIntensity}
      shadow-softness={shadowSoftness}
      exposure={exposure}
      tone-mapping="aces"
      camera-orbit={cameraOrbit}
      field-of-view={fieldOfView}
      loading="eager"
      reveal="auto"
      className={className}
      style={{
        background: "transparent",
        ...style,
      }}
      onLoad={onLoad as unknown as React.ReactEventHandler<HTMLElement>}
    >
      <div slot="progress-bar" className="hidden" />
    </model-viewer>
  );
});
