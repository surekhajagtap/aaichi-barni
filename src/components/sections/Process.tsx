import Reveal from "../Reveal";
import Scene, { type SceneName } from "../Scene";

export const STEPS: {
  step: string;
  title: string;
  copy: string;
  scene: SceneName;
  alt: string;
}[] = [
  {
    step: "01",
    title: "Fresh Kairi",
    copy: "The season decides when we start. Raw mangoes are chosen by hand — firm, sour, and heavy for their size.",
    scene: "kairi",
    alt: "Raw green kairi mangoes resting on a wooden kitchen counter, one cut open to show the pale flesh",
  },
  {
    step: "02",
    title: "Carefully Cut",
    copy: "Cut into even pieces on the vili, skin left on. Uneven pieces soak up spice unevenly, so this part is never hurried.",
    scene: "cutting",
    alt: "Hands cutting kairi into even pieces on a wooden board with a traditional vili blade",
  },
  {
    step: "03",
    title: "Traditional Khandeshi Spices",
    copy: "Red chilli, mustard, fenugreek, turmeric and asafoetida — measured the way they have always been measured, by eye and by memory.",
    scene: "spices",
    alt: "Bowls of red chilli, turmeric, mustard and fenugreek arranged on a dark wooden surface",
  },
  {
    step: "04",
    title: "Mixed by Hand",
    copy: "No machine. Hands know when the pieces are coated evenly and when the oil has settled in properly.",
    scene: "mixing",
    alt: "A mother's hands mixing spiced mango pieces in a wide brass vessel",
  },
  {
    step: "05",
    title: "Prepared in Small Batches",
    copy: "A batch is as large as one pair of hands can look after. Then it rests, and the flavours find each other.",
    scene: "jars",
    alt: "Glass jars of mango loncha resting in a row on a wooden shelf in warm afternoon light",
  },
  {
    step: "06",
    title: "Packed With Care",
    copy: "Filled into clean glass jars, sealed, labelled and checked once more before it leaves the kitchen.",
    scene: "packing",
    alt: "Hands closing the lid of a finished glass jar of mango loncha beside a twine-tied tag",
  },
  {
    step: "07",
    title: "Your Table",
    copy: "And then it does the only thing it was ever made to do — sit beside a hot bhakri on someone's plate.",
    scene: "table",
    alt: "Three steel thalis set for a family meal, each with bhakri and a spoon of mango loncha",
  },
];

export default function Process({ heading = "Made the Way Mom Makes It." }: { heading?: string }) {
  return (
    <section className="section bg-ivory-100" aria-labelledby="process-heading">
      <div className="shell">
        <Reveal className="max-w-prose">
          <p className="eyebrow">How Mom Makes It</p>
          <h2 id="process-heading" className="mt-3 text-h2">
            {heading}
          </h2>
          <p className="mt-5 text-lede text-ink-soft">
            Nothing about this is fast. Every jar moves through the same seven steps, in the same
            kitchen, at the pace the mangoes decide.
          </p>
        </Reveal>

        <ol className="mt-14 flex flex-col gap-12 lg:gap-16">
          {STEPS.map((item, index) => (
            <li key={item.step}>
              <Reveal
                delay={40}
                className={`grid items-center gap-6 sm:gap-10 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Scene
                  name={item.scene}
                  alt={item.alt}
                  className="aspect-[4/3] rounded-card shadow-e2"
                />

                <div className="lg:px-6">
                  <span className="tabular font-serif text-[2.5rem] leading-none text-mango-deep">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-h3">{item.title}</h3>
                  <p className="mt-3 max-w-prose text-lede text-ink-soft">{item.copy}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-14 text-center">
          <p className="note text-[1.625rem]">
            Some recipes belong to a family before they belong to a brand.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
