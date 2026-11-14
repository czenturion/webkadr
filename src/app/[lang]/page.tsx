import Link from "next/link";
import { getDictionary } from "@/i18n/getDictionary";
import { localeNames, locales, parseLocale } from "@/i18n/locales";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const currentLocale = parseLocale(lang);
  const { hero } = getDictionary(currentLocale);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm font-semibold tracking-widest uppercase">WebKadr</p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {hero.title}
      </h1>
      <p className="max-w-xl text-lg opacity-70">{hero.subtitle}</p>
      <nav className="flex gap-4 text-sm">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={`/${locale}/`}
            aria-current={locale === currentLocale ? "page" : undefined}
            className="underline-offset-4 hover:underline aria-[current=page]:font-semibold aria-[current=page]:underline"
          >
            {localeNames[locale]}
          </Link>
        ))}
      </nav>
    </main>
  );
}
