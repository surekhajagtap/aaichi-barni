import type { Metadata } from "next";
import Process from "@/components/sections/Process";
import WhyDifferent from "@/components/sections/WhyDifferent";
import FinalCTA from "@/components/sections/FinalCTA";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "How It's Made",
  description:
    "Fresh kairi, carefully cut, traditional Khandeshi spices, mixed by hand, prepared in small batches and packed with care.",
};

export default function HowItsMadePage() {
  return (
    <>
      <section className="weave border-b border-sand bg-ivory-50 py-14 sm:py-18">
        <div className="shell max-w-prose">
          <p className="eyebrow">How It&rsquo;s Made</p>
          <h1 className="mt-3 text-display">Made the Way Mom Makes It.</h1>
          <p className="mt-6 text-lede text-ink-soft">
            There is no factory, no machine and no shortcut anywhere in this list. Just a kitchen,
            a season&rsquo;s worth of mangoes, and a set of steps that have not changed.
          </p>
        </div>
      </section>

      <Process heading="Fresh kairi to your table." />

      <section className="section" aria-labelledby="honest-heading">
        <div className="shell">
          <Reveal className="mx-auto max-w-3xl">
            <p className="eyebrow">Being Straight With You</p>
            <h2 id="honest-heading" className="mt-3 text-h2">
              What we do not do.
            </h2>
            <ul className="mt-7 flex flex-col gap-4 text-lede text-ink-soft">
              <li>
                We do not make loncha year-round. It is made in mango season, and when a batch is
                finished, it is finished.
              </li>
              <li>
                We do not use artificial colour or preservatives. Salt, oil and spice do that work,
                the way they always have.
              </li>
              <li>
                We do not claim health benefits. This is pickle. It is meant to make your plate
                taste better, not to fix anything.
              </li>
              <li>
                We do not standardise the taste to the last decimal. It is made by hand, so a jar
                from June and a jar from May are cousins, not clones.
              </li>
            </ul>
            <p className="note mt-9 text-[1.75rem]">From our kitchen to your table.</p>
          </Reveal>
        </div>
      </section>

      <WhyDifferent />
      <FinalCTA />
    </>
  );
}
