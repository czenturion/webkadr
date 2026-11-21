import type { Dictionary } from "@/i18n/dictionaries/en";
import { container, sectionTitle } from "./section";

export function Services({
  dictionary,
}: {
  dictionary: Dictionary["services"];
}) {
  const items = [dictionary.sites, dictionary.automation, dictionary.content];

  return (
    <section
      aria-labelledby="services-title"
      className="cover-next relative z-10 bg-background py-24"
    >
      <div className={container}>
        <h2 id="services-title" className={sectionTitle}>
          {dictionary.title}
        </h2>
        <ul className="mt-16 grid gap-8 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className="border-t border-border pt-6">
              <h3 className="text-title font-medium">{item.title}</h3>
              <p className="mt-2 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
