import Link from "next/link";
import Reveal from "../Reveal";
import Scene from "../Scene";

export default function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="final-cta-heading">
      <Scene
        name="kitchen"
        alt="A warm Khandeshi home kitchen with window light, spice bowls on the counter and jars of loncha on a shelf"
        className="absolute inset-0 -z-10 h-full w-full"
      />
      {/* Scrim keeps the copy legible over the image at every crop. */}
      <div className="absolute inset-0 -z-10 bg-ink/65" />

      <div className="shell py-24 text-center sm:py-30">
        <Reveal>
          <p className="text-label font-medium uppercase tracking-[0.14em] text-mango">
            One Last Thing
          </p>
          <h2 id="final-cta-heading" className="mx-auto mt-4 max-w-3xl text-display text-ivory-50">
            Bring a Little Khandesh Home.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lede text-ivory-100/90">
            One jar. One traditional recipe. A whole lot of memories.
          </p>
          <Link href="/shop" className="btn-primary mt-9 h-13 px-8 text-base">
            Shop Khandeshi Mango Loncha
          </Link>
          <p className="note mt-8 text-[1.75rem] text-mango">Khandesh in every bite.</p>
        </Reveal>
      </div>
    </section>
  );
}
