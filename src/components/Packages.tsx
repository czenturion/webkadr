import type { Dictionary } from "@/i18n/dictionaries/en";
import { type Locale, numberFormat } from "@/i18n/locales";
import { buttonShape } from "./button";
import { container, sectionLead, sectionTitle } from "./section";

const plans = [
  { id: "site", price: 60_000 },
  { id: "start", price: 75_000 },
  { id: "business", price: 200_000 },
] as const;

const featured = "business";

const card =
  "group relative isolate row-span-5 grid grid-rows-subgrid gap-y-6 p-6 after:absolute after:inset-0 after:-z-10 after:opacity-0 after:transition-opacity after:duration-300 after:ease-out motion-reduce:after:transition-none sm:p-10 sm:hover:after:opacity-100 sm:has-[a:focus-visible]:after:opacity-100";
const cardBase = "bg-surface after:bg-surface-hover";
const cardFeatured = "bg-surface-2 after:bg-surface-2-hover";
const cardTitle =
  "text-[1.5625rem] leading-[1.2] font-light font-stretch-expanded";
const action = `${buttonShape} relative isolate row-start-5 self-end before:absolute before:inset-0 before:-z-10 before:origin-left before:outline-offset-3 before:transition-[scale,background-color] before:duration-300 before:ease-out focus-visible:outline-none focus-visible:before:outline-2 focus-visible:before:outline-focus motion-reduce:before:transition-none max-sm:w-full sm:justify-self-start sm:group-hover:before:scale-x-110 sm:group-has-[a:focus-visible]:before:scale-x-110`;
const actionText =
  "transition-[translate] duration-300 ease-out motion-reduce:transition-none sm:group-hover:translate-x-[calc(5%+0.15rem)] sm:group-has-[a:focus-visible]:translate-x-[calc(5%+0.15rem)]";
const actionPrimary = `${action} text-accent-foreground before:bg-accent hover:before:bg-accent-strong`;
const actionSecondary = `${action} text-foreground before:border before:border-border-strong hover:before:bg-surface-2`;

function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="border-b border-border">
      {items.map((item) => (
        <li key={item} className="border-t border-border py-3">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Group({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div className="grid content-start gap-2">
      <p className="text-sm font-medium text-muted">{label}</p>
      <List items={items} />
    </div>
  );
}

export function Packages({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["packages"];
}) {
  const formatPrice = numberFormat(locale).format;
  const { builder } = dictionary;

  return (
    <section
      id="packages"
      aria-labelledby="packages-title"
      className="relative z-10 bg-background pt-24 pb-36"
    >
      <div className={container}>
        <h2 id="packages-title" className={sectionTitle}>
          {dictionary.title}
        </h2>
        <p className={sectionLead}>{dictionary.lead}</p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {plans.map(({ id, price }) => {
            const plan = dictionary.plans[id];
            const nameId = `package-${id}`;
            const isFeatured = id === featured;

            return (
              <article
                key={id}
                aria-labelledby={nameId}
                className={`${card} ${isFeatured ? cardFeatured : cardBase}`}
              >
                <h3 id={nameId} className={cardTitle}>
                  {plan.name}
                </h3>
                <div className="grid gap-2">
                  <p className="flex flex-wrap items-baseline gap-2 tabular-nums">
                    <span className="text-[clamp(2.5rem,2.6vw+1.5rem,4rem)] leading-[0.95] font-light tracking-[-0.03em] whitespace-nowrap font-stretch-expanded">
                      {formatPrice(price)}
                    </span>
                    <span className="text-[1.5625rem] text-foreground-2">
                      ₸
                    </span>
                  </p>
                  <p className="text-muted">{plan.term}</p>
                </div>
                <Group label={dictionary.siteLabel} items={plan.site} />
                {"content" in plan && (
                  <Group label={dictionary.contentLabel} items={plan.content} />
                )}
                <a
                  href="#contacts"
                  aria-describedby={nameId}
                  className={isFeatured ? actionPrimary : actionSecondary}
                >
                  <span className={actionText}>{dictionary.choose}</span>
                </a>
              </article>
            );
          })}

          <article
            aria-labelledby="package-builder"
            className={`${card} ${cardBase}`}
          >
            <h3 id="package-builder" className={cardTitle}>
              {builder.name}
            </h3>
            <p className="max-w-[34ch] text-lead text-foreground-2">
              {builder.text}
            </p>
            <div className="row-span-2">
              <List items={builder.items} />
            </div>
            <a
              href="#builder"
              aria-describedby="package-builder"
              className={actionSecondary}
            >
              <span className={actionText}>{builder.cta}</span>
            </a>
          </article>
        </div>

        <p className="mt-16 text-lead text-pretty text-foreground-2">
          {dictionary.pilot}
        </p>
      </div>
    </section>
  );
}
