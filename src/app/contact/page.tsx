import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import Scene from "@/components/Scene";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about a jar, an order, or the recipe? Write to AaiChi Barni.",
};

const DETAILS = [
  { label: "Email", value: "hello@aaichibarni.in" },
  { label: "Phone / WhatsApp", value: "+91 90000 00000" },
  { label: "Kitchen", value: "Jalgaon, Khandesh, Maharashtra" },
  { label: "We reply", value: "Within 1–2 working days" },
];

export default function ContactPage() {
  return (
    <>
      <section className="weave border-b border-sand bg-ivory-100 py-14 sm:py-18">
        <div className="shell max-w-prose">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 text-display">Write to us.</h1>
          <p className="mt-6 text-lede text-ink-soft">
            It is a small kitchen and a small team, so your message reaches an actual person.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            <h2 className="text-h3">Details</h2>
            <dl className="mt-6 flex flex-col gap-5">
              {DETAILS.map((item) => (
                <div key={item.label}>
                  <dt className="text-sm text-ink-soft">{item.label}</dt>
                  <dd className="mt-1 text-[1.0625rem] text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>

            <Scene
              name="kitchen"
              alt="The home kitchen where AaiChi Barni loncha is prepared, with spice bowls on the counter and jars on a shelf"
              className="mt-9 aspect-[4/3] rounded-card shadow-e2"
            />
            <p className="note mt-6 text-[1.625rem]">From our kitchen to your table.</p>
          </div>

          <div>
            <h2 className="text-h3">Send a message</h2>
            <p className="mt-3 max-w-prose text-ink-soft">
              Ordering in bulk, gifting a few jars, or asking about the fasting preparation? All of
              it is welcome here.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
