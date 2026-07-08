import Image from "next/image";

type ShowcaseItem = {
  label: string;
  title: string;
  copy: string;
  image: string;
};

type SubpageKineticShowcaseProps = {
  eyebrow: string;
  title: string;
  items: ShowcaseItem[];
};

export function SubpageKineticShowcase({
  eyebrow,
  title,
  items,
}: SubpageKineticShowcaseProps) {
  return (
    <section className="subpage-kinetic" aria-label={eyebrow}>
      <div className="section-inner subpage-kinetic__top" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>

      <div className="subpage-kinetic__rail">
        {items.map((item) => (
          <article className="subpage-kinetic__card" key={item.label} data-reveal>
            <div className="subpage-kinetic__media">
              <Image src={item.image} alt="" fill sizes="(min-width: 1040px) 32vw, 86vw" />
            </div>
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
