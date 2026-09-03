"use client";

import { useState } from "react";
import { AlertIcon, CheckIcon } from "@/components/icons";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(field: keyof Errors, value: string): string | undefined {
    if (field === "name" && !value.trim()) return "Please tell us your name.";
    if (field === "email") {
      if (!value.trim()) return "We need an email address to write back.";
      if (!/^\S+@\S+\.\S+$/.test(value)) return "That email address does not look right.";
    }
    if (field === "message" && value.trim().length < 10)
      return "A line or two more would help us answer properly.";
    return undefined;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    (Object.keys(values) as (keyof Errors)[]).forEach((field) => {
      const error = validate(field, values[field]);
      if (error) next[field] = error;
    });
    setErrors(next);

    if (Object.keys(next).length > 0) {
      // Move focus to the first field that needs attention.
      const first = Object.keys(next)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="card p-8 text-center" role="status">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-leaf-tint text-leaf">
          <CheckIcon />
        </span>
        <h2 className="mt-5 text-h3">Thank you for writing.</h2>
        <p className="mt-3 text-ink-soft">
          We read every message ourselves, so it may take a day or two. If it is about an order,
          mention the order number and we will find it faster.
        </p>
      </div>
    );
  }

  const field = (name: keyof Errors) => ({
    id: name,
    name,
    value: values[name],
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : `${name}-help`,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [name]: event.target.value })),
    // Validate on blur, never on every keystroke.
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setErrors((e) => ({ ...e, [name]: validate(name, event.target.value) })),
  });

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="mb-2 block font-medium">
            Your name <span className="text-terracotta">*</span>
          </label>
          <input {...field("name")} type="text" autoComplete="name" className="field" />
          {errors.name ? (
            <p id="name-error" role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-terracotta">
              <AlertIcon className="h-4 w-4 shrink-0" />
              {errors.name}
            </p>
          ) : (
            <p id="name-help" className="mt-2 text-sm text-ink-soft">
              What should we call you?
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block font-medium">
            Email <span className="text-terracotta">*</span>
          </label>
          <input {...field("email")} type="email" autoComplete="email" className="field" />
          {errors.email ? (
            <p id="email-error" role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-terracotta">
              <AlertIcon className="h-4 w-4 shrink-0" />
              {errors.email}
            </p>
          ) : (
            <p id="email-help" className="mt-2 text-sm text-ink-soft">
              We will only use this to reply.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block font-medium">
            Your message <span className="text-terracotta">*</span>
          </label>
          <textarea
            {...field("message")}
            rows={5}
            className="field min-h-[140px] resize-y py-3 leading-relaxed"
          />
          {errors.message ? (
            <p id="message-error" role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-terracotta">
              <AlertIcon className="h-4 w-4 shrink-0" />
              {errors.message}
            </p>
          ) : (
            <p id="message-help" className="mt-2 text-sm text-ink-soft">
              A question, an order, or just what the loncha reminded you of.
            </p>
          )}
        </div>

        <button type="submit" className="btn-primary h-13 w-full text-base">
          Send message
        </button>
      </div>
    </form>
  );
}
