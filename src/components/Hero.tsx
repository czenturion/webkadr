import type { Dictionary } from "@/i18n/dictionaries/en";
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
          <p className="mt-6 max-w-[44ch] text-[clamp(1.125rem,0.35vw+1rem,1.375rem)] leading-[1.45] text-balance">
            {hero.lead}
          </p>
          <a
            href="#contacts"
            className="mt-10 inline-flex min-h-12 items-center justify-center bg-accent px-6 leading-none font-medium whitespace-nowrap text-accent-foreground transition-[background-color,translate] duration-200 ease-out hover:bg-accent-strong focus-visible:outline-offset-3 active:translate-y-px motion-reduce:transition-none motion-reduce:active:translate-y-0"
          >
            {hero.cta}
          </a>
        </div>
        <HeroMock dictionary={mock} />
      </div>
    </section>
  );
}
