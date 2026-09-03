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

async function read(): Promise<Database> {
  const raw = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(raw) as Database;
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

export async function createOrder(input: {
  items: OrderItem[];
  customer: Order["customer"];
}): Promise<Order> {
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
  await write(db);
  return order;
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const db = await read();
  return db.orders.find((o) => o.id === id);
}
