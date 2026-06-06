# Premium AR Menu — Revised Build Plan

A minimalist, Apple-grade product experience for an AR dining concept. The hero action is AR placement, the QR-menu flow is front-and-center, and the menu reads like a real restaurant rather than a tech demo.

## Stack note
Project template is **TanStack Start (React 19 + Vite + Tailwind v4)**, not Next.js. Same UX, same libraries (`framer-motion`, `@google/model-viewer`, `qrcode`). No framework swap.

## Visual system (src/styles.css)
- Background `#090909`, foreground soft off-white `oklch(0.96 0.01 80)`
- Champagne/gold accent `oklch(0.82 0.09 85)`, warm neutral muted tones
- Hairline borders at low opacity, soft elevated shadow tokens
- Radius scale tuned so cards/buttons land at 20–28px
- Fonts via `<link>` in `__root.tsx`: **Inter Tight** display + **Inter** body, registered in `@theme` as `--font-display` / `--font-sans`
- Shared Framer Motion variants (fade-up, hover-lift) + page transitions via `AnimatePresence`

## Routes
```
src/routes/
  __root.tsx            (fonts, nav, footer shell, page transitions)
  index.tsx             (landing)
  menu.index.tsx        (full menu grid)
  menu.$slug.tsx        (3D + AR product page)
  for-restaurants.tsx   (deeper B2B page; landing section links here)
```

### `/` Landing — section order
1. **Nav** — wordmark + minimal links (Menu · For Restaurants)
2. **Hero** — headline "See Your Food Before You Order", subhead, floating `<model-viewer>` pizza (auto-rotate, no controls). CTAs:
   - Primary: **"Place Pizza On Your Table"** → deep-links to `/menu/pizza-margherita?ar=1` (auto-activates AR on mobile; on desktop scrolls to the QR section with a soft toast "Open on your phone to place it in your space")
   - Secondary: **"Browse Demo Menu"** → `/menu`
3. **"See It In Your Space"** — immersive AR shortcut directly under hero. Large pizza preview (same model, different camera framing), single big AR launch button, one-line explanation. One click to AR.
4. **How It Works** — 4 numbered steps (Scan QR · Browse · View in 3D · Place with AR), restrained cards with hairline borders, fade-up on scroll
5. **"Try the QR Experience"** — split layout:
   - Left: explanation of the real customer journey
   - Right: large rendered QR code (generated client-side with `qrcode` package, pointing at `${window.location.origin}/menu`), framed in a soft card. On mobile the QR is replaced with a prominent "Open Demo Menu" button
6. **Featured dishes** — 3 highlight cards linking into `/menu`
7. **"For Restaurants"** — value-prop section. Bullet grid:
   - We scan your dishes on-site
   - We craft photorealistic 3D models
   - Customers preview dishes before ordering
   - QR menu included
   - No app download required
   - Works on modern smartphones
   Link to `/for-restaurants` for the longer page.
8. **Quiet footer**

### `/menu` — Full menu
- 8 dishes across categories so it reads as a real restaurant, not a tech demo:
  Pizza Margherita · Pepperoni Pizza · Truffle Burger · Carbonara · Chicken Biryani · Club Sandwich · Garden Salad · Tiramisu (Coffee/Dessert pairing copy on the last two if needed for 10)
- Optional 9–10: Flat White Coffee, Affogato — easy to add to the same data array
- Category filter chips at top (All · Pizza · Pasta · Mains · Sides · Sweet · Coffee)
- Editorial card grid: image, name, short descriptor, price, two pill buttons → "View in 3D" + "View in AR"
- Hover: subtle scale + shadow lift; card image has gentle parallax on enter
- Internally all dishes reference one high-quality GLB for MVP; per-dish model swap is a one-line `model` field in the data file

### `/menu/$slug` — Premium product page
- Two-column on desktop, stacked on mobile
- Left: large `<model-viewer>` — `camera-controls`, `auto-rotate`, `shadow-intensity="1"`, `exposure="1.1"`, `ar`, `ar-modes="scene-viewer quick-look webxr"`, `ar-scale="fixed"`, GLB `src` + USDZ `ios-src`. Custom progress shimmer via `slot="progress-bar"`. Subtle radial vignette + soft depth blur behind the canvas.
- Smooth **image-to-3D transition**: initial render shows the dish hero image, fades + scales out as the GLB finishes loading and the model fades in (Framer Motion `AnimatePresence` cross-fade)
- Right: dish name (large display font), price, descriptor paragraph
- **Ingredient chips** row (e.g. "Tomato · Mozzarella · Basil · Olive Oil")
- **Preparation time** + **Calories** as two small stat blocks (demo values from the data file)
- Primary button: "View in AR" → calls `modelViewer.activateAR()`. Secondary: "Back to Menu".
- Auto-activate AR when `?ar=1` and on a mobile UA
- Page entry: card surfaces fade-up in sequence; hover-lift on stat blocks

### `/for-restaurants`
Long-form B2B page expanding the landing section: scanning process, model fidelity, deployment (QR), analytics potential, contact CTA.

## Imagery — no AI food photos
- **Source**: curated premium stock photography from Unsplash (CC0, attribution-friendly food photographers). For each of the 8–10 dishes, one tightly-cropped, dark-backdrop, top-down or 45° hero. Downloaded once into `src/assets/menu/` and uploaded via `lovable-assets` so they're CDN-served and don't bloat the repo.
- **Hero/AR-preview rendered stills**: where possible, capture a still from the actual 3D model (transparent PNG export from model-viewer in a one-off script, or pre-rendered turntable frame distributed with the model). Used for the hero floating image fallback and the image-to-3D transition on the product page so the still matches the 3D asset exactly.
- Explicitly NO generated food images via `imagegen`.

## 3D / AR asset — quality first
- Source the highest-quality publicly available pizza model with both **GLB and USDZ**. Candidates evaluated at build time:
  1. Khronos glTF Sample Assets — food category
  2. Google `<model-viewer>` shared-assets food samples
  3. Poly Pizza / Sketchfab CC0 pizza models with PBR materials
- Selection criteria: PBR materials (albedo + normal + roughness), correct real-world scale (~28cm pizza diameter baked into the GLB so AR `ar-scale="fixed"` lands correctly on the table), low-poly enough for mobile (<3MB target)
- Both `.glb` and `.usdz` shipped via `lovable-assets`
- If only a GLB is available, document the conversion path (Reality Converter) in a README note; ship the best USDZ we can find as a fallback
- Lighting: `<model-viewer>` `environment-image` set to a neutral warm HDRI for consistent realism; `shadow-softness="0.8"` for a believable ground shadow

## QR code
- Package: `qrcode` (pure JS, no native deps, Worker-safe)
- Rendered to a `<canvas>` client-side on the landing page, sized ~280px, styled with rounded corners, soft inner shadow, gold corner accents
- Encodes the current origin + `/menu`; updates if the deployed URL changes
- Mobile fallback: detect coarse-pointer + small viewport, replace QR card with "Open Demo Menu" button linking to `/menu`

## Motion
- Framer Motion `motion.div` + shared `fadeUp` variant with `whileInView`
- Hero pizza: CSS-keyframe gentle y-float (keeps model-viewer canvas cheap)
- Buttons: scale-down on tap, hairline border glow on hover
- Page transitions: 8px-y fade via `AnimatePresence` at the root
- Targeting 60fps; no parallax on scroll-heavy sections

## Dependencies to add
- `@google/model-viewer` (lazy-loaded only on pages that mount it)
- `framer-motion`
- `qrcode` + `@types/qrcode`

## Out of scope
No ordering, no auth, no backend. Pure presentation; Lovable Cloud not needed.

## Acceptance
- Hero primary CTA reaches AR in one tap on mobile
- Landing has a real, scannable QR pointing to `/menu`
- Menu shows 8+ dishes across multiple categories, reading like a real restaurant
- Product page renders the pizza with believable materials, soft ground shadow, smooth image-to-3D handoff, ingredient chips, prep time, calories
- Android Chrome opens Scene Viewer; iOS Safari opens Quick Look; pizza places on a real table at real scale
- For Restaurants section communicates the B2B value clearly
- No AI-generated food imagery anywhere in the build
