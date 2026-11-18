import type { Dictionary } from "@/i18n/dictionaries/en";

const card = "bg-surface p-6 text-sm text-muted shadow-card";
const cardTitle =
  "text-xl leading-[1.2] font-light font-stretch-expanded text-foreground";
const bar = "block h-2 bg-border-strong";

export function HeroMock({ dictionary }: { dictionary: Dictionary["mock"] }) {
  const rows = [
    [dictionary.client, "w-[55%]"],
    [dictionary.items, "w-[80%]"],
    [dictionary.total, "w-[35%]"],
  ];

  return (
    <figure aria-hidden="true" className="m-0 grid grid-cols-12">
      <div className={`${card} col-span-11 row-start-1 lg:col-span-8`}>
        <p className={cardTitle}>{dictionary.formTitle}</p>
        {[dictionary.fieldName, dictionary.fieldPhone].map((field) => (
          <div key={field} className="mt-4 grid gap-1">
            <span>{field}</span>
            <i className="block h-9 border border-border-strong" />
          </div>
        ))}
        <span className="mt-4 inline-flex min-h-9 items-center bg-accent px-4 font-medium text-accent-foreground">
          {dictionary.submit}
        </span>
      </div>

      <div
        className={`${card} relative z-10 col-span-11 col-start-2 row-start-2 mt-3 bg-surface-2 lg:col-span-8 lg:col-start-5 lg:-mt-16`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <p className={cardTitle}>{dictionary.orderTitle}</p>
          <time className="tabular-nums">11:42</time>
        </div>
        <dl className="mt-3 grid grid-cols-[auto_minmax(0,1fr)]">
          {rows.map(([label, width]) => (
            <div key={label} className="contents">
              <dt className="border-t border-border-strong py-3 pr-6">
                {label}
              </dt>
              <dd className="flex items-center border-t border-border-strong py-3">
                <span className={`${bar} ${width}`} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        className={`${card} relative z-20 col-span-11 row-start-3 mt-3 lg:col-span-8 lg:col-start-2 lg:-mt-4`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <p className={cardTitle}>{dictionary.reviewTitle}</p>
          <time className="tabular-nums">12:10</time>
        </div>
        <div className="mt-3 flex gap-1 text-accent">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} viewBox="0 0 24 24" className="size-4 fill-current">
              <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
            </svg>
          ))}
        </div>
        <div className="mt-3 grid gap-2">
          <span className={`${bar} w-[90%]`} />
          <span className={`${bar} w-[60%]`} />
        </div>
      </div>
    </figure>
  );
}
