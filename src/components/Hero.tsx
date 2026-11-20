import type { Dictionary } from "@/i18n/dictionaries/en";
import { buttonPrimary } from "./button";
import { HeroCollage } from "./HeroCollage";
import { HeroMock } from "./HeroMock";

export function Hero({
  hero,
  mock,
}: {
  hero: Dictionary["hero"];
  mock: Dictionary["mock"];
}) {
  return (
    <section className="relative isolate grid items-center overflow-hidden bg-(--veil) py-16 lg:sticky lg:top-0 lg:min-h-[calc(100svh-4rem)]">
      <HeroCollage />
      <div className="cover-fade relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="settle">
          <h1 className="min-w-0 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.06] font-light tracking-[-0.015em] text-balance wrap-break-word font-stretch-expanded">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[44ch] text-lead text-balance">
            {hero.lead}
          </p>
          <a href="#contacts" className={`mt-10 ${buttonPrimary}`}>
            {hero.cta}
          </a>
        </div>
        <HeroMock dictionary={mock} />
      </div>
    </section>
  );
}
