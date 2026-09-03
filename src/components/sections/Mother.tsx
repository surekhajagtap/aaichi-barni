import Link from "next/link";
import Reveal from "../Reveal";
import Scene from "../Scene";

export default function Mother({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="section" aria-labelledby="mother-heading">
      <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <Reveal>
          <Scene
            name="mother"
            alt="The mother behind AaiChi Barni standing at her kitchen counter, preparing mango loncha in window light"
            className="aspect-[4/5] rounded-card shadow-e3"
          />
        </Reveal>

        <Reveal delay={80}>
          <p className="eyebrow">The Mother Behind the Jar</p>
          <h2 id="mother-heading" className="mt-3 text-h2">
            Behind Every Jar Is a Mother.
          </h2>

          <div className="mt-7 flex flex-col gap-1 font-serif text-[1.375rem] leading-relaxed text-ink">
            <p>Before there was a brand, there was a kitchen.</p>
            <p>Before there was a product, there was a recipe.</p>
            <p>
              And before there was a recipe, there was a mother who knew exactly how mangoes,
              spices and patience could come together.
            </p>
          </div>

          <div className="mt-7 flex max-w-prose flex-col gap-4 text-lede text-ink-soft">
            <p>
              She learned it the way most things in a Khandeshi home are learned — standing next to
              her own mother, being handed small jobs first. Wiping the kairi dry. Holding the jar
              steady. Being told, gently, that the mango was not ready yet and would have to wait
              another week.
            </p>
            <p>
              For years the loncha never left the house. It was made every summer, in the same
              quantity, for the same people: her children, her husband, whoever happened to be at
              the table. Jars went to relatives. Jars went with her daughter after marriage. Jars
              were quietly asked for, again and again, by neighbours who had tasted it once.
            </p>
            <p>
              AaiChi Barni started there — not with a business plan, but with one more question at
              the door. <em>Could you make a jar for us as well?</em> Enough people asked that she
              finally said yes to all of them.
            </p>
            <p>
              She still makes it herself. Same recipe. Same hands. The only thing that has changed
              is how many tables it reaches.
            </p>
          </div>

          <p className="note mt-7 text-[1.625rem]">The taste we grew up with.</p>

          {showLink && (
            <Link href="/our-story" className="btn-secondary mt-7">
              Read her story
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
