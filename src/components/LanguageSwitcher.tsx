import Link from "next/link";
import { htmlLang, localeNames, locales, type Locale } from "@/i18n/locales";

export function LanguageSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  return (
    <nav aria-label={label}>
      <ul className="flex gap-1 text-sm">
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={`/${locale}/`}
              hrefLang={htmlLang[locale]}
              lang={htmlLang[locale]}
              title={localeNames[locale]}
              aria-current={locale === current ? "page" : undefined}
              className="rounded-md px-2 py-1.5 text-muted uppercase hover:text-foreground aria-[current=page]:bg-surface aria-[current=page]:text-foreground"
            >
              {locale}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
