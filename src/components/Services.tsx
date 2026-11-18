import type { Dictionary } from "@/i18n/dictionaries/en";

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
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2
          id="services-title"
          className="text-[clamp(2rem,2.5vw+1rem,3.5rem)] leading-[1.06] font-light tracking-[-0.015em] text-balance font-stretch-expanded"
        >
          {dictionary.title}
        </h2>
        <ul className="mt-16 grid gap-8 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className="border-t border-border pt-6">
              <h3 className="text-[clamp(1.25rem,0.75vw+0.875rem,1.625rem)] leading-[1.2] font-medium">
                {item.title}
              </h3>
              <p className="mt-2 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
