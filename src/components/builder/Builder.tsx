"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { htmlLang, type Locale, numberFormat } from "@/i18n/locales";
import { buttonPrimary } from "../button";
import { container, sectionLead, sectionTitle } from "../section";
import {
  groups,
  initialQuantities,
  type Item,
  type ItemId,
  items,
  maxQuantity,
} from "./catalog";
import { type Channel, channelIds, channels, formatContact } from "./contact";
import { botLink } from "@/links";
import { copyAndOpenChat, hasEndpoint, postRequest } from "./send";

type Texts = Dictionary["builder"];

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");

const stepButton =
  "grid size-9 cursor-pointer place-items-center transition-colors duration-200 ease-out hover:bg-surface-2 focus-visible:-outline-offset-2 active:bg-border disabled:cursor-not-allowed disabled:bg-transparent disabled:text-muted disabled:opacity-55 motion-reduce:transition-none";

function Icon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className="size-3.5"
    >
      <path d={path} />
    </svg>
  );
}

export function Builder({ locale, texts }: { locale: Locale; texts: Texts }) {
  const [selected, setSelected] = useState<ReadonlySet<ItemId>>(new Set());
  const [quantities, setQuantities] = useState(initialQuantities);
  const [channel, setChannel] = useState<Channel>("tg");
  const [contacts, setContacts] = useState<Record<Channel, string>>({
    tg: "",
    wa: "",
  });
  const [contactError, setContactError] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [barReady, setBarReady] = useState(false);
  const [barShown, setBarShown] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLInputElement>(null);
  const sendingRef = useRef(false);

  useEffect(() => {
    const catalog = catalogRef.current;
    const summary = summaryRef.current;
    if (!catalog || !summary) return;

    const seen = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) seen.set(entry.target, entry.isIntersecting);
      setBarShown(Boolean(seen.get(catalog)) && !seen.get(summary));
    });
    observer.observe(catalog);
    observer.observe(summary);
    setBarReady(true);

    return () => observer.disconnect();
  }, []);

  const number = numberFormat(locale);
  const money = (value: number) => `${number.format(value)} ₸`;
  const from = (value: number) => fill(texts.from, { n: number.format(value) });

  const picked = items.filter((item) => selected.has(item.id));
  let once = 0;
  let yearly = 0;
  let monthly = 0;
  for (const item of picked) {
    monthly += item.monthly ?? 0;
    if (item.price === null) continue;
    if (item.yearly) yearly += item.price;
    else once += item.price * quantities[item.id];
  }
  const onRequest = picked.some((item) => item.price === null);
  const contact = formatContact(channel, contacts[channel]);
  const rules = channels[channel];

  const select = (item: Item, on: boolean) =>
    setSelected((current) => {
      const next = new Set(current);
      if (!on) {
        next.delete(item.id);
        return next;
      }
      for (const other of items)
        if (item.choice && other.choice === item.choice) next.delete(other.id);
      next.add(item.id);
      return next;
    });

  const step = (item: Item, delta: number) => {
    setQuantities((current) => ({
      ...current,
      [item.id]: Math.min(maxQuantity, Math.max(1, current[item.id] + delta)),
    }));
    if (!selected.has(item.id)) select(item, true);
  };

  const lineName = (item: Item) =>
    texts.items[item.id].name +
    (item.quantity ? ` × ${quantities[item.id]}` : "");

  const linePrice = (item: Item) => {
    if (item.price === null) return texts.units.request;
    if (item.yearly) return `${money(item.price)} ${texts.units.year}`;
    return money(item.price * quantities[item.id]);
  };

  const message = () => {
    let total = fill(texts.message.total, { p: from(once) });
    if (yearly) total += ` ${fill(texts.message.yearly, { p: money(yearly) })}`;
    if (monthly)
      total += ` ${fill(texts.message.monthly, { p: money(monthly) })}`;

    return [
      texts.message.hello,
      ...picked.map((item) => `- ${lineName(item)}: ${linePrice(item)}`),
      total,
      fill(texts.message.contact, { c: contact }),
    ].join("\n");
  };

  const changeContact = (raw: string) => {
    const value = raw.startsWith(rules.prefix)
      ? raw.slice(rules.prefix.length)
      : raw;
    setContacts((current) => ({ ...current, [channel]: value }));
    if (contactError && formatContact(channel, value)) setContactError(false);
  };

  const changeChannel = (next: Channel) => {
    setChannel(next);
    setContactError(false);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendingRef.current) return;
    const website = String(
      new FormData(event.currentTarget).get("website") ?? "",
    );
    if (!picked.length) {
      setStatus(texts.empty);
      return;
    }
    if (!contact) {
      setContactError(true);
      fieldRef.current?.focus();
      return;
    }

    const text = message();
    if (!hasEndpoint) {
      setStatus(
        copyAndOpenChat(text) === "copied" ? texts.sent : texts.copyFail,
      );
      return;
    }

    sendingRef.current = true;
    setBusy(true);
    const result = await postRequest({
      lang: htmlLang[locale],
      contact,
      text,
      website,
    });
    sendingRef.current = false;
    setBusy(false);
    setStatus(result === "sent" ? texts.done : texts.failed);
  };

  return (
    <section
      id="builder"
      aria-labelledby="builder-title"
      className="relative z-10 border-t border-border bg-background pt-24 pb-36"
    >
      <div className={container}>
        <h2 id="builder-title" className={sectionTitle}>
          {texts.title}
        </h2>
        <p className={sectionLead}>{texts.lead}</p>

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
          <div ref={catalogRef} className="grid gap-16">
            {groups.map((group) => (
              <div key={group}>
                <h3
                  id={`builder-${group}`}
                  className="mb-4 text-sm font-medium text-muted"
                >
                  {texts.groups[group]}
                </h3>
                <ul
                  aria-labelledby={`builder-${group}`}
                  className="border-t border-border"
                >
                  {items
                    .filter((item) => item.group === group)
                    .map((item) => {
                      const inputId = `builder-item-${item.id}`;
                      const { name, desc } = texts.items[item.id];

                      return (
                        <li
                          key={item.id}
                          className="group relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 border-b border-border px-1 py-4 transition-colors duration-200 ease-out hover:bg-surface has-checked:bg-surface has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus motion-reduce:transition-none sm:grid-cols-[auto_minmax(0,1fr)_auto_11rem] sm:px-3"
                        >
                          <input
                            id={inputId}
                            type="checkbox"
                            checked={selected.has(item.id)}
                            onChange={(event) =>
                              select(item, event.target.checked)
                            }
                            className="absolute size-px opacity-0"
                          />
                          <span
                            aria-hidden="true"
                            className="col-start-1 row-start-1 grid size-5 place-items-center border border-border-strong bg-background text-accent-foreground transition-colors duration-200 ease-out group-has-checked:border-accent group-has-checked:bg-accent motion-reduce:transition-none"
                          >
                            <svg
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="square"
                              className="size-3.5 opacity-0 group-has-checked:opacity-100"
                            >
                              <path d="M3 8.5l3 3 7-7" />
                            </svg>
                          </span>
                          <label
                            htmlFor={inputId}
                            className="col-span-2 col-start-2 row-start-1 cursor-pointer after:absolute after:inset-0 sm:col-span-1"
                          >
                            <span className="block font-medium">{name}</span>
                            <span className="mt-1 block text-sm text-muted">
                              {desc}
                            </span>
                          </label>
                          {item.id === "assistant" && (
                            <a
                              href={botLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative z-10 col-span-2 col-start-2 row-start-3 justify-self-start text-sm text-accent underline decoration-1 underline-offset-4 transition-colors duration-200 ease-out hover:text-foreground motion-reduce:transition-none sm:col-span-1 sm:col-start-2 sm:row-start-2"
                            >
                              {texts.tryBot}
                            </a>
                          )}
                          {item.quantity && (
                            <div
                              role="group"
                              aria-label={`${texts.qty}: ${name}`}
                              className="relative z-10 col-start-2 row-start-2 inline-flex items-center justify-self-start border border-border-strong sm:col-start-3 sm:row-start-1"
                            >
                              <button
                                type="button"
                                aria-label={texts.less}
                                disabled={quantities[item.id] <= 1}
                                onClick={() => step(item, -1)}
                                className={stepButton}
                              >
                                <Icon path="M3 8h10" />
                              </button>
                              <output className="min-w-[2.5ch] text-center tabular-nums">
                                {quantities[item.id]}
                              </output>
                              <button
                                type="button"
                                aria-label={texts.more}
                                disabled={quantities[item.id] >= maxQuantity}
                                onClick={() => step(item, 1)}
                                className={stepButton}
                              >
                                <Icon path="M3 8h10M8 3v10" />
                              </button>
                            </div>
                          )}
                          <p
                            className={`row-start-2 text-right text-foreground-2 tabular-nums sm:col-span-1 sm:col-start-4 sm:row-start-1 ${item.quantity ? "col-start-3" : "col-span-2 col-start-2"}`}
                          >
                            {item.price === null
                              ? texts.units.request
                              : from(item.price)}
                            {item.unit && item.unit !== "request" && (
                              <span className="block text-sm text-muted">
                                {texts.units[item.unit]}
                              </span>
                            )}
                            {item.monthly && (
                              <span className="block text-sm text-muted">
                                {fill(texts.plusMonthly, {
                                  p: money(item.monthly),
                                })}
                              </span>
                            )}
                          </p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>

          <aside
            ref={summaryRef}
            id="builder-summary"
            aria-labelledby="builder-estimate"
            className="grid gap-4 bg-surface-2 px-4 py-6 shadow-card max-lg:mt-2 sm:px-6 sm:py-10 lg:sticky lg:top-6"
          >
            <h3 id="builder-estimate" className="text-title font-medium">
              {texts.estimate}
            </h3>
            <ol
              aria-live="polite"
              tabIndex={0}
              aria-labelledby="builder-estimate"
              className="overflow-y-auto text-sm lg:max-h-[40vh]"
            >
              {picked.length ? (
                picked.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between gap-4 border-b border-border-strong py-2"
                  >
                    <span>{lineName(item)}</span>
                    <span
                      className={`text-right text-foreground-2 tabular-nums ${item.price === null ? "" : "shrink-0 whitespace-nowrap"}`}
                    >
                      {linePrice(item)}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-muted">{texts.emptyEstimate}</li>
              )}
            </ol>

            <div className="grid gap-2">
              <div className="grid gap-1 pt-2">
                <p className="text-sm text-muted">{texts.totalFrom}</p>
                <p className="flex flex-wrap items-baseline gap-2 tabular-nums">
                  <span className="text-[clamp(2.5rem,2.6vw+1.5rem,3.5rem)] leading-[0.95] font-light tracking-[-0.03em] whitespace-nowrap font-stretch-expanded">
                    {number.format(once)}
                  </span>
                  <span className="text-[1.5625rem] text-foreground-2">₸</span>
                </p>
              </div>
              {yearly > 0 && (
                <p className="text-sm text-foreground-2">
                  {fill(texts.yearly, { p: money(yearly) })}
                </p>
              )}
              {monthly > 0 && (
                <p className="text-sm text-foreground-2">
                  {fill(texts.monthly, { p: money(monthly) })}
                </p>
              )}
              {onRequest && (
                <p className="text-sm text-foreground-2">{texts.requestNote}</p>
              )}
            </div>
            <p className="text-sm text-muted">{texts.note}</p>

            <form noValidate onSubmit={submit} className="grid gap-3">
              <fieldset className="grid min-w-0 gap-2">
                <legend className="mb-2 text-sm font-medium text-muted">
                  {texts.contact}
                </legend>
                <div className="grid grid-cols-2">
                  {channelIds.map((id, index) => (
                    <div key={id} className="relative">
                      <input
                        id={`builder-channel-${id}`}
                        type="radio"
                        name="channel"
                        value={id}
                        checked={channel === id}
                        onChange={() => changeChannel(id)}
                        className="peer absolute size-px opacity-0"
                      />
                      <label
                        htmlFor={`builder-channel-${id}`}
                        className={`grid min-h-10 cursor-pointer place-items-center border border-border-strong px-3 text-sm text-muted transition-colors duration-200 ease-out peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus hover:text-foreground peer-checked:hover:text-background motion-reduce:transition-none ${index > 0 ? "border-l-0" : ""}`}
                      >
                        {channels[id].name}
                      </label>
                    </div>
                  ))}
                </div>
                <label htmlFor="builder-contact" className="sr-only">
                  {channel === "tg" ? texts.tgLabel : texts.waLabel}
                </label>
                <div
                  className={`flex min-h-11 items-center border bg-background focus-within:outline-2 focus-within:-outline-offset-3 focus-within:outline-focus ${contactError ? "border-danger" : "border-muted"}`}
                >
                  <span
                    aria-hidden="true"
                    className="w-8 shrink-0 text-center text-muted"
                  >
                    {rules.prefix}
                  </span>
                  <input
                    ref={fieldRef}
                    id="builder-contact"
                    name="contact"
                    type={rules.type}
                    inputMode={rules.inputMode}
                    autoComplete={rules.autoComplete}
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder={rules.placeholder}
                    value={contacts[channel]}
                    onChange={(event) => changeContact(event.target.value)}
                    aria-invalid={contactError || undefined}
                    aria-describedby="builder-contact-help"
                    className="min-h-10.5 w-0 min-w-0 flex-1 bg-transparent pr-3 outline-none placeholder:text-muted placeholder:opacity-70"
                  />
                </div>
                <p
                  id="builder-contact-help"
                  aria-live="polite"
                  className="min-h-lh text-sm text-danger"
                >
                  {contactError
                    ? channel === "tg"
                      ? texts.tgBad
                      : texts.waBad
                    : ""}
                </p>
              </fieldset>
              <div aria-hidden="true" className="sr-only">
                <label htmlFor="builder-website">Website</label>
                <input
                  id="builder-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </div>
              <button
                type="submit"
                aria-disabled={!picked.length}
                aria-busy={busy || undefined}
                className={`${buttonPrimary} w-full cursor-pointer aria-busy:cursor-progress aria-disabled:opacity-55`}
              >
                {texts.send}
              </button>
              <p
                aria-live="polite"
                className="min-h-[2lh] text-sm text-foreground-2"
              >
                {status}
              </p>
            </form>
          </aside>
        </div>
      </div>

      <div
        hidden={!barReady}
        inert={!barShown}
        className={`fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 border-t border-border-strong bg-surface-2 px-6 py-3 transition-transform duration-200 ease-out motion-reduce:transition-none lg:hidden ${barShown ? "" : "translate-y-full"}`}
      >
        <p className="text-lg whitespace-nowrap tabular-nums">{from(once)}</p>
        <a href="#builder-summary" className={`${buttonPrimary} min-h-11`}>
          {texts.toSummary}
        </a>
      </div>
    </section>
  );
}
