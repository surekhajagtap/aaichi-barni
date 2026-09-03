import type { Metadata } from "next";
import Mother from "@/components/sections/Mother";
import Khandesh from "@/components/sections/Khandesh";
import WhyDifferent from "@/components/sections/WhyDifferent";
import FinalCTA from "@/components/sections/FinalCTA";
import Reveal from "@/components/Reveal";
import Scene from "@/components/Scene";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Some recipes belong to a family before they belong to a brand. The story behind AaiChi Barni, a homemade Khandeshi mango loncha.",
};

export default function OurStoryPage() {
  return (
    <>
      <section className="weave border-b border-sand bg-ivory-100 py-14 sm:py-18">
        <div className="shell max-w-prose">
          <p className="eyebrow">Our Story</p>
          <h1 className="mt-3 text-display">
            Some recipes belong to a family before they belong to a brand.
          </h1>
          <p className="mt-6 text-lede text-ink-soft">
            This one was made at home, shared with family, served at the dining table — and only
            much later did it become something we prepared for other people too.
          </p>
        </div>
      </section>

      <Mother showLink={false} />

      <section className="section bg-ivory-100" aria-labelledby="how-it-began">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">How It Began</p>
            <h2 id="how-it-began" className="mt-3 text-h2">
              It started with one more jar.
            </h2>
            <div className="mt-6 flex max-w-prose flex-col gap-4 text-lede text-ink-soft">
              <p>
                Every summer there was a number in her head — how many jars the house would need
                until the next mango season. Some years that number quietly grew. A jar for a
                neighbour who had asked. A jar for a cousin visiting from Pune. A jar for the
                family that had moved to Nashik and could not find loncha that tasted like this.
              </p>
              <p>
                One summer the number had grown far past what any one house eats. That is when it
                stopped being only cooking and started being something we should probably name.
              </p>
              <p>
                We called it AaiChi Barni — Aai&rsquo;s jar. Because that is exactly what people
                had been asking for all along. Not a product. Her jar.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Scene
              name="jars"
              alt="Filled glass jars of mango loncha lined up on a wooden shelf, waiting to be labelled"
              className="aspect-[4/3] rounded-card shadow-e3"
            />
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="promise-heading">
        <div className="shell">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">What Stays the Same</p>
            <h2 id="promise-heading" className="mt-3 text-h2">
              Nothing about the recipe has changed.
            </h2>
            <p className="mt-6 text-lede text-ink-soft">
              Not the mangoes, not the proportions, not who mixes it. We make more jars than we
              used to, and that is the only difference. When the season ends, we stop — and we
              would rather tell you a jar is finished than make it some other way.
            </p>
            <p className="note mt-8 text-[1.75rem]">Some flavours never go out of style.</p>
          </Reveal>
        </div>
      </section>

      <Khandesh />
      <WhyDifferent />
      <FinalCTA />
    </>
  );
}
