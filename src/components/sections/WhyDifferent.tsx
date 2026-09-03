import Reveal from "../Reveal";
import { BatchIcon, HandIcon, HeartIcon, LeafIcon, MangoIcon, ScrollIcon } from "../icons";

const REASONS = [
  {
    Icon: HandIcon,
    title: "Handmade",
    copy: "Prepared by hand in small batches.",
  },
  {
    Icon: LeafIcon,
    title: "Khandeshi Roots",
    copy: "Inspired by traditional Khandeshi flavours.",
  },
  {
    Icon: ScrollIcon,
    title: "Traditional Recipe",
    copy: "A recipe rooted in homemade cooking.",
  },
  {
    Icon: MangoIcon,
    title: "Carefully Selected Mangoes",
    copy: "Mangoes chosen with care for the right taste and texture.",
  },
  {
    Icon: BatchIcon,
    title: "Small-Batch Preparation",
    copy: "Made in limited quantities rather than mass-produced.",
  },
  {
    Icon: HeartIcon,
    title: "Mother's Touch",
    copy: "The ingredient that cannot be measured.",
  },
];

export default function WhyDifferent() {
  return (
    <section className="section" aria-labelledby="why-heading">
      <div className="shell">
        <Reveal className="max-w-prose">
          <p className="eyebrow">Why Our Loncha Is Different</p>
          <h2 id="why-heading" className="mt-3 text-h2">
            What Makes It Taste Like Home?
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ Icon, title, copy }, index) => (
            <li key={title}>
              <Reveal delay={index * 55}>
                <div className="card h-full p-7 transition-shadow duration-enter ease-out hover:shadow-e2">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-terracotta-tint text-terracotta">
                    <Icon />
                  </span>
                  <h3 className="mt-5 text-[1.1875rem]">{title}</h3>
                  <p className="mt-2 text-ink-soft">{copy}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10 text-center">
          <p className="note text-[1.75rem]">A little extra love goes into every jar.</p>
        </Reveal>
      </div>
    </section>
  );
}
