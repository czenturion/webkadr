import type { Dictionary } from "@/i18n/dictionaries/en";
import { botLink, botName, channelLink, channelName, chatLink } from "@/links";
import {
  actionPrimary,
  actionSecondary,
  actionText,
  card,
  cardBase,
  cardFeatured,
  cardTitle,
} from "./card";
import { container, sectionLead, sectionTitle } from "./section";

const ways = [
  { id: "dm", href: chatLink, handle: channelName, featured: true },
  { id: "bot", href: botLink, handle: botName, featured: false },
] as const;

const fact =
  "grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-border py-4 md:grid-cols-1 md:gap-1 md:border-b-0 md:py-6 md:pr-6";
const factLabel = "pt-0.5 text-sm font-medium text-muted md:pt-0";
const factLink =
  "underline decoration-border-strong decoration-1 underline-offset-4 transition-colors duration-200 ease-out hover:decoration-accent motion-reduce:transition-none";

export function Contacts({
  dictionary,
}: {
  dictionary: Dictionary["contacts"];
}) {
  return (
    <section
      id="contacts"
      aria-labelledby="contacts-title"
      className="relative z-10 border-t border-border bg-background pt-24 pb-36"
    >
      <div className={container}>
        <h2 id="contacts-title" className={sectionTitle}>
          {dictionary.title}
        </h2>
        <p className={sectionLead}>{dictionary.lead}</p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {ways.map(({ id, href, handle, featured }) => {
            const way = dictionary[id];
            const nameId = `contacts-${id}`;

            return (
              <article
                key={id}
                aria-labelledby={nameId}
                className={`${card} row-span-4 ${featured ? cardFeatured : cardBase}`}
              >
                <h3 id={nameId} className={cardTitle}>
                  {way.name}
                </h3>
                <p className="max-w-[38ch] text-foreground-2">{way.text}</p>
                <p className="text-lead wrap-anywhere text-muted">@{handle}</p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby={nameId}
                  className={`${featured ? actionPrimary : actionSecondary} row-start-4`}
                >
                  <span className={actionText}>{way.action}</span>
                </a>
              </article>
            );
          })}
        </div>

        <dl className="mt-16 grid border-t border-border md:grid-cols-3 md:border-b">
          <div className={fact}>
            <dt className={factLabel}>{dictionary.channel}</dt>
            <dd>
              <a
                href={channelLink}
                target="_blank"
                rel="noopener noreferrer"
                className={factLink}
              >
                @{channelName}
              </a>
            </dd>
          </div>
          <div className={fact}>
            <dt className={factLabel}>{dictionary.builder.name}</dt>
            <dd>
              <a href="#builder" className={factLink}>
                {dictionary.builder.text}
              </a>
            </dd>
          </div>
          <div className={fact}>
            <dt className={factLabel}>{dictionary.place.name}</dt>
            <dd>{dictionary.place.value}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
