import { promises as fs } from "fs";
import path from "path";

/**
 * Deliberately simple file-backed database.
 * One JSON document on disk, read and written through this module only.
 * Swap the four functions at the bottom for a real driver when the brand outgrows it.
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

export type OrderItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    notes?: string;
  };
  status: "placed";
};

type Database = {
  products: Product[];
  orders: Order[];
};

const DB_PATH = path.join(process.cwd(), "data", "db.json");
const SEED_PATH = path.join(process.cwd(), "data", "db.seed.json");

/** A serverless host gives us a read-only filesystem outside /tmp. */
function isReadOnly(error: unknown): boolean {
  const code = (error as NodeJS.ErrnoException)?.code;
  return code === "EROFS" || code === "EACCES" || code === "EPERM";
}

/**
 * db.json holds real customer orders, so it is gitignored and does not exist on
 * a fresh clone, a clean CI checkout, or a serverless deployment. The seed —
 * products only, no orders — is what lives in version control.
 *
 * Locally the seed is copied to db.json on first read so orders can accumulate.
 * On a read-only host that copy is skipped and the seed is served directly:
 * products still render, and persistence is handled by createOrder's caller.
 */
async function read(): Promise<Database> {
  try {
    return JSON.parse(await fs.readFile(DB_PATH, "utf8")) as Database;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;

    const seed = await fs.readFile(SEED_PATH, "utf8");
    try {
      await fs.writeFile(DB_PATH, seed, "utf8");
    } catch (writeError) {
      if (!isReadOnly(writeError)) throw writeError;
    }
    return JSON.parse(seed) as Database;
  }
}

async function write(db: Database): Promise<void> {
  // Write to a temp file then rename, so a crash mid-write cannot corrupt the store.
  const tmp = `${DB_PATH}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await fs.rename(tmp, DB_PATH);
}

export async function getProducts(): Promise<Product[]> {
  const db = await read();
  return db.products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const db = await read();
  return db.products.find((p) => p.slug === slug);
}

/**
 * `persisted` is false when the host filesystem is read-only, which is the norm
 * on serverless. The order is still fully built and priced; recording it becomes
 * the caller's responsibility (see the email delivery in the orders route).
 */
export type CreatedOrder = { order: Order; persisted: boolean };

export async function createOrder(input: {
  items: OrderItem[];
  customer: Order["customer"];
}): Promise<CreatedOrder> {
  const db = await read();

  // Price from the database, never from the client payload.
  const items: OrderItem[] = input.items.map((item) => {
    const product = db.products.find((p) => p.slug === item.slug);
    if (!product) throw new Error(`Unknown product: ${item.slug}`);
    const quantity = Math.max(1, Math.min(10, Math.floor(item.quantity)));
    return { slug: product.slug, name: product.name, price: product.price, quantity };
  });

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 79;

  const order: Order = {
    id: `AB-${String(db.orders.length + 1001)}`,
    createdAt: new Date().toISOString(),
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
    customer: input.customer,
    status: "placed",
  };

  db.orders.push(order);

  try {
    await write(db);
    return { order, persisted: true };
  } catch (error) {
    if (!isReadOnly(error)) throw error;

    // Without a writable store the sequential counter always restarts from the
    // empty seed, so every order would be handed the same id. Fall back to a
    // time-ordered one that stays unique across invocations.
    const stamp = Date.now().toString(36).toUpperCase();
    const salt = Math.floor(Math.random() * 1296)
      .toString(36)
      .toUpperCase()
      .padStart(2, "0");
    return { order: { ...order, id: `AB-${stamp}${salt}` }, persisted: false };
  }
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const db = await read();
  return db.orders.find((o) => o.id === id);
}
