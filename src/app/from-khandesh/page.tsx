import type { Metadata } from "next";
import Khandesh from "@/components/sections/Khandesh";
import FinalCTA from "@/components/sections/FinalCTA";
import Reveal from "@/components/Reveal";
import Scene from "@/components/Scene";

export const metadata: Metadata = {
  title: "From Khandesh",
  description:
    "Khandeshi food traditions, mango season, family kitchens and the bold flavours that shaped our loncha.",
};

const SEASON = [
  {
    when: "March",
    what: "The wait",
    copy: "Trees are heavy but nothing is ready. The kitchen gets cleaned out, jars are washed and set to dry in the sun.",
  },
  {
    when: "April",
    what: "Kairi arrives",
    copy: "The sourest, firmest raw mangoes are bought in quantity — often from the same grower, year after year.",
  },
  {
    when: "May",
    what: "The making",
    copy: "The busiest fortnight of the year. Cutting, salting, drying, spicing, filling. Everyone at home helps.",
  },
  {
    when: "June onward",
    what: "The resting",
    copy: "Jars are left alone while the oil and spices settle into the mango. Rushing this is the one thing you cannot undo.",
  },
];

export default function FromKhandeshPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Scene
          name="khandesh"
          alt="The Khandesh landscape at golden hour — low hills, dark fields and a mango tree standing alone"
          className="absolute inset-0 -z-10 h-full w-full"
        />
        <div className="absolute inset-0 -z-10 bg-ink/60" />
        <div className="shell py-20 sm:py-30">
          <div className="max-w-2xl">
            <p className="text-label font-medium uppercase tracking-[0.14em] text-mango">
              From Khandesh
            </p>
            <h1 className="mt-4 text-display text-ivory-50">From the Heart of Khandesh</h1>
            <p className="mt-6 text-lede text-ivory-100/90">
              Jalgaon, Dhule, Nandurbar. Dark soil, long summers, and mangoes that everyone here
              has an opinion about.
            </p>
          </div>
        </div>
      </section>

      <Khandesh />

      <section className="section" aria-labelledby="season-heading">
        <div className="shell">
          <Reveal className="max-w-prose">
            <p className="eyebrow">Mango Season</p>
            <h2 id="season-heading" className="mt-3 text-h2">
              A year that turns around one fortnight.
            </h2>
            <p className="mt-5 text-lede text-ink-soft">
              Loncha is not made on demand. It is made once, when the mangoes decide, and then it
              has to last.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SEASON.map((item, index) => (
              <li key={item.when}>
                <Reveal delay={index * 60}>
                  <div className="card h-full border-t-2 border-t-mango p-6">
                    <p className="text-label uppercase tracking-[0.14em] text-saffron">
                      {item.when}
                    </p>
                    <h3 className="mt-3 text-[1.125rem]">{item.what}</h3>
                    <p className="mt-2 text-ink-soft">{item.copy}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-ivory-100" aria-labelledby="table-heading">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <Scene
              name="table"
              alt="A family table laid with steel thalis, bhakri and small servings of mango loncha"
              className="aspect-[4/3] rounded-card shadow-e3"
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow">The Table</p>
            <h2 id="table-heading" className="mt-3 text-h2">
              Food made for the people you feed every day.
            </h2>
            <div className="mt-6 flex max-w-prose flex-col gap-4 text-lede text-ink-soft">
              <p>
                Khandeshi cooking was never designed to impress a stranger. It was designed to feed
                a household, well, on what the season gave you — and to still taste like something
                worth sitting down for.
              </p>
              <p>
                That is the whole idea behind this jar. Not a delicacy for special occasions. A
                thing you keep on the table, open often, and finish faster than you meant to.
              </p>
            </div>
            <p className="note mt-8 text-[1.75rem]">Khandesh in every bite.</p>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
