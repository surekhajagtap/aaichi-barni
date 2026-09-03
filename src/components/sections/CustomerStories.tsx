import Link from "next/link";
import Reveal from "../Reveal";

/**
 * The brand brief is explicit: use real customer reviews once available,
 * and do not invent testimonials for the live website.
 *
 * So this section ships as an honest empty state. When real reviews exist,
 * fill the array below and the grid renders in place of the invitation.
 */
type Review = {
  quote: string;
  name: string;
  place: string;
  product: string;
};

const REVIEWS: Review[] = [];

export default function CustomerStories() {
  return (
    <section className="section" aria-labelledby="stories-heading">
      <div className="shell">
        <Reveal className="max-w-prose">
          <p className="eyebrow">Customer Stories</p>
          <h2 id="stories-heading" className="mt-3 text-h2">
            Tastes Like Home.
          </h2>
        </Reveal>

        {REVIEWS.length > 0 ? (
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review, index) => (
              <li key={review.name}>
                <Reveal delay={index * 55}>
                  <figure className="card flex h-full flex-col p-7">
                    <blockquote className="font-serif text-[1.1875rem] leading-relaxed text-ink">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 border-t border-sand pt-4 text-sm text-ink-soft">
                      <span className="font-medium text-ink">{review.name}</span>
                      <span className="block">
                        {review.place} · {review.product}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal delay={60}>
            <div className="mt-10 rounded-card border border-dashed border-sand bg-ivory-100 p-8 text-center sm:p-14">
              <p className="mx-auto max-w-prose text-lede text-ink-soft">
                We would rather leave this space empty than fill it with words nobody said. The
                first jars are only now reaching other people&rsquo;s tables — when they write to
                us, their words will live here.
              </p>
              <p className="note mt-6 text-[1.625rem]">
                If a jar reaches you, tell us what it reminded you of.
              </p>
              <Link href="/contact" className="btn-secondary mt-7">
                Share your story
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
