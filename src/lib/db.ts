import { promises as fs } from "fs";
import path from "path";

/**
 * The product catalogue, read from one JSON file at build time.
 *
 * The site is exported as static files for GitHub Pages, so there is no server
 * and nothing to write to. These functions run during `next build` only, and
 * their output is baked into the generated HTML.
 *
 * Orders are handled entirely in the browser — see src/lib/order.ts.
 *
 * To change prices, copy, stock or ingredients, edit data/db.seed.json and
 * redeploy. To move to a real backend later, replace the two functions below.
 */

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  tasteProfile: string[];
  spiceLevel: 1 | 2 | 3;
  spiceLabel: string;
  hue: "mango" | "saffron" | "terracotta" | "leaf";
  price: number;
  compareAt?: number;
  weight: string;
  netQuantity: string;
  shelfLife: string;
  ingredients: string[];
  ingredientNote?: string;
  tasteNote: string;
  khandeshNote: string;
  perfectWith: string[];
  stock: number;
  featured: boolean;
};

type Catalogue = {
  products: Product[];
};

const SEED_PATH = path.join(process.cwd(), "data", "db.seed.json");

async function read(): Promise<Catalogue> {
  return JSON.parse(await fs.readFile(SEED_PATH, "utf8")) as Catalogue;
}

export async function getProducts(): Promise<Product[]> {
  return (await read()).products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await read()).products.find((p) => p.slug === slug);
}
