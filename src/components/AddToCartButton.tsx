"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { CheckIcon } from "./icons";
import type { Product } from "@/lib/db";

export default function AddToCartButton({
  product,
  quantity = 1,
  variant = "primary",
  label = "Add to Cart",
  className = "",
}: {
  product: Pick<Product, "slug" | "name" | "price" | "weight" | "hue" | "stock">;
  quantity?: number;
  variant?: "primary" | "secondary";
  label?: string;
  className?: string;
}) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const soldOut = product.stock <= 0;

  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [justAdded]);

  if (soldOut) {
    return (
      <button type="button" className={`btn-secondary ${className}`} disabled>
        This batch is finished
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        add(
          {
            slug: product.slug,
            name: product.name,
            price: product.price,
            weight: product.weight,
            hue: product.hue,
          },
          quantity,
        );
        setJustAdded(true);
      }}
      className={`${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`}
    >
      <span aria-live="polite" className="inline-flex items-center gap-2">
        {justAdded ? (
          <>
            <CheckIcon className="h-5 w-5" />
            Added
          </>
        ) : (
          label
        )}
      </span>
    </button>
  );
}
