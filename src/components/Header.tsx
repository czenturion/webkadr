import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Locale } from "@/i18n/locales";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { container } from "./section";
import { ThemeToggle } from "./ThemeToggle";

export function Header({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["header"];
}) {
  return (
    <header className="border-b border-border">
      <div
        className={`${container} flex h-16 items-center justify-between gap-4`}
      >
        <Link
          href={`/${locale}/`}
          className="text-lg font-semibold tracking-tight"
        >
          WebKadr
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} label={dictionary.language} />
          <ThemeToggle label={dictionary.theme} />
        </div>
      </div>
    </header>
  );
}
