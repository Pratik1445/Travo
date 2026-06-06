// Demo dataset for the AR menu. All dishes reuse the same high-quality
// PBR food model for MVP — swap the `model`/`modelUsdz` fields per-dish
// when real per-dish assets are ready.

export const DEMO_MODEL_GLB =
  "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/IridescentDishWithOlives/glTF-Binary/IridescentDishWithOlives.glb";
// Apple's photogrammetry pancakes — premium real-food USDZ for iOS Quick Look.
export const DEMO_MODEL_USDZ =
  "https://developer.apple.com/augmented-reality/quick-look/models/pancakes/pancakes_photogrammetry.usdz";

export type DishCategory =
  | "Pizza"
  | "Pasta"
  | "Mains"
  | "Sides"
  | "Sweet"
  | "Coffee";

export interface Dish {
  slug: string;
  name: string;
  category: DishCategory;
  price: string;
  blurb: string;
  description: string;
  ingredients: string[];
  prepMinutes: number;
  calories: number;
  image: string; // Unsplash hand-picked food photography
  model: string;
  modelUsdz: string;
}

// Hand-curated Unsplash food photography (premium, dark backdrops where possible).
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DISHES: Dish[] = [
  {
    slug: "pizza-margherita",
    name: "Margherita",
    category: "Pizza",
    price: "$18",
    blurb: "San Marzano · fior di latte · basil",
    description:
      "Naples-style sourdough base, hand-stretched and fired in 90 seconds. Crushed San Marzano tomato, fior di latte, fresh basil, olio nuovo.",
    ingredients: ["Sourdough", "San Marzano", "Fior di latte", "Basil", "Olive oil"],
    prepMinutes: 9,
    calories: 720,
    image: u("photo-1604068549290-dea0e4a305ca"),
    model: DEMO_MODEL_GLB,
    modelUsdz: DEMO_MODEL_USDZ,
  },
  {
    slug: "pizza-pepperoni",
    name: "Pepperoni",
    category: "Pizza",
    price: "$22",
    blurb: "Spicy salame · mozzarella · honey",
    description:
      "Wood-fired pepperoni with cup-and-char salame, low-moisture mozzarella, finished with a thread of chili honey.",
    ingredients: ["Sourdough", "Tomato", "Mozzarella", "Salame", "Chili honey"],
    prepMinutes: 9,
    calories: 880,
    image: u("photo-1628840042765-356cda07504e"),
    model: DEMO_MODEL_GLB,
    modelUsdz: DEMO_MODEL_USDZ,
  },
  {
    slug: "pizza-veggie",
    name: "Orto",
    category: "Pizza",
    price: "$20",
    blurb: "Roast veg · stracciatella · olive",
    description:
      "Slow-roasted summer vegetables, blistered cherry tomato, torn stracciatella, taggiasche olives and a basil oil drizzle.",
    ingredients: ["Sourdough", "Stracciatella", "Roasted veg", "Olives", "Basil oil"],
    prepMinutes: 10,
    calories: 690,
    image: u("photo-1565299624946-b28f40a0ae38"),
    model: DEMO_MODEL_GLB,
    modelUsdz: DEMO_MODEL_USDZ,
  },
  {
    slug: "truffle-burger",
    name: "Truffle Burger",
    category: "Mains",
    price: "$24",
    blurb: "Dry-aged beef · brie · black truffle",
    description:
      "120g dry-aged short rib patty, melted brie, caramelised onion, black truffle aioli on a toasted brioche.",
    ingredients: ["Brioche", "Dry-aged beef", "Brie", "Truffle aioli", "Onion"],
    prepMinutes: 14,
    calories: 940,
    image: u("photo-1568901346375-23c9450c58cd"),
    model: DEMO_MODEL_GLB,
    modelUsdz: DEMO_MODEL_USDZ,
  },
  {
    slug: "carbonara",
    name: "Carbonara",
    category: "Pasta",
    price: "$19",
    blurb: "Guanciale · pecorino · egg yolk",
    description:
      "Bronze-cut tonnarelli, 24-month pecorino, crisped guanciale, glossed with cured egg yolk and cracked black pepper.",
    ingredients: ["Tonnarelli", "Guanciale", "Pecorino", "Egg yolk", "Pepper"],
    prepMinutes: 12,
    calories: 810,
    image: u("photo-1612874742237-6526221588e3"),
    model: DEMO_MODEL_GLB,
    modelUsdz: DEMO_MODEL_USDZ,
  },
  {
    slug: "chicken-biryani",
    name: "Hyderabadi Biryani",
    category: "Mains",
    price: "$21",
    blurb: "Basmati · saffron · slow-cooked chicken",
    description:
      "Long-grain basmati layered with marinated chicken, fried shallots, saffron milk and sealed dum-style for 40 minutes.",
    ingredients: ["Basmati", "Chicken", "Saffron", "Shallot", "Yogurt"],
    prepMinutes: 40,
    calories: 760,
    image: u("photo-1563379091339-03b21ab4a4f8"),
    model: DEMO_MODEL_GLB,
    modelUsdz: DEMO_MODEL_USDZ,
  },
  {
    slug: "club-sandwich",
    name: "House Club",
    category: "Sides",
    price: "$16",
    blurb: "Buttermilk chicken · bacon · sourdough",
    description:
      "Triple-stack toasted sourdough, buttermilk chicken, smoked bacon, vine tomato, butter lettuce and tarragon mayo.",
    ingredients: ["Sourdough", "Chicken", "Bacon", "Tomato", "Tarragon mayo"],
    prepMinutes: 11,
    calories: 720,
    image: u("photo-1528735602780-2552fd46c7af"),
    model: DEMO_MODEL_GLB,
    modelUsdz: DEMO_MODEL_USDZ,
  },
  {
    slug: "garden-salad",
    name: "Garden",
    category: "Sides",
    price: "$14",
    blurb: "Heirloom leaves · pickled shallot · seeds",
    description:
      "Daily heirloom leaves, pickled shallot, toasted seeds, soft herbs and a chilled lemon-thyme vinaigrette.",
    ingredients: ["Heirloom leaves", "Shallot", "Seeds", "Herbs", "Lemon"],
    prepMinutes: 6,
    calories: 220,
    image: u("photo-1512621776951-a57141f2eefd"),
    model: DEMO_MODEL_GLB,
    modelUsdz: DEMO_MODEL_USDZ,
  },
  {
    slug: "tiramisu",
    name: "Tiramisu",
    category: "Sweet",
    price: "$12",
    blurb: "Mascarpone · espresso · cocoa",
    description:
      "House savoiardi soaked in single-origin espresso, hand-folded mascarpone cream, dusted with Valrhona cocoa.",
    ingredients: ["Mascarpone", "Espresso", "Savoiardi", "Cocoa", "Marsala"],
    prepMinutes: 8,
    calories: 480,
    image: u("photo-1571877227200-a0d98ea607e9"),
    model: DEMO_MODEL_GLB,
    modelUsdz: DEMO_MODEL_USDZ,
  },
  {
    slug: "flat-white",
    name: "Flat White",
    category: "Coffee",
    price: "$5",
    blurb: "Single-origin · velvet milk",
    description:
      "Double ristretto of seasonal single-origin espresso, poured through silk-textured whole milk.",
    ingredients: ["Espresso", "Whole milk"],
    prepMinutes: 3,
    calories: 120,
    image: u("photo-1517701604599-bb29b565090c"),
    model: DEMO_MODEL_GLB,
    modelUsdz: DEMO_MODEL_USDZ,
  },
];

export const CATEGORIES: ("All" | DishCategory)[] = [
  "All",
  "Pizza",
  "Pasta",
  "Mains",
  "Sides",
  "Sweet",
  "Coffee",
];

export function getDish(slug: string): Dish | undefined {
  return DISHES.find((d) => d.slug === slug);
}
