import Reveal from "../Reveal";
import Scene from "../Scene";

const NOTES = [
  {
    title: "Bold, unapologetic flavour",
    copy: "Khandeshi cooking does not whisper. Chilli, garlic and oil are used with confidence, and food is expected to taste of something.",
  },
  {
    title: "Mango season is a calendar",
    copy: "When the kairi arrives, kitchens reorganise around it. Loncha is made once a year, in quantity, to last until the next season.",
  },
  {
    title: "Cooking is a household event",
    copy: "Cutting, drying, mixing and filling are shared between whoever is home. It has always been more gathering than chore.",
  },
  {
    title: "Recipes travel through people",
    copy: "Nothing is written down. Proportions are held in memory and passed on by standing beside someone and watching.",
  },
];

export default function Khandesh() {
  return (
    <section className="section bg-ivory-100" aria-labelledby="khandesh-heading">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Khandesh Story</p>
            <h2 id="khandesh-heading" className="mt-3 text-h2">
              From the Heart of Khandesh
            </h2>
            <div className="mt-6 flex max-w-prose flex-col gap-4 text-lede text-ink-soft">
              <p>
                Khandesh sits in the north-west of Maharashtra — Jalgaon, Dhule, Nandurbar — where
                the soil is dark, the summers are long, and the mangoes are very good.
              </p>
              <p>
                Food here has a particular character. It is direct. It leans on chilli and oil
                without apology, and it is built around bhakri rather than rice. A meal is not
                considered complete without something sharp on the side, and for most of the year
                that something is loncha.
              </p>
              <p>
                Our recipe carries that spirit forward without dressing it up. It is
                gharghuti — homemade — and it tastes like it.
              </p>
            </div>
            <p className="mt-7 font-serif text-[1.5rem] text-terracotta">
              Rooted in Khandesh. Made for everyone.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <Scene
              name="khandesh"
              alt="Khandesh farmland in late afternoon light with a mango tree standing over the fields and a home in the distance"
              className="aspect-[5/4] rounded-card shadow-e3"
            />
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {NOTES.map((note, index) => (
            <li key={note.title}>
              <Reveal delay={index * 55}>
                <div className="h-full rounded-card border-l-2 border-mango bg-card p-6 shadow-e1">
                  <h3 className="text-[1.125rem]">{note.title}</h3>
                  <p className="mt-2 text-ink-soft">{note.copy}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
