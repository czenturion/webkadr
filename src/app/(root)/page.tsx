import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, localeNames, locales } from "@/i18n/locales";

export const metadata: Metadata = {
  title: "WebKadr",
  robots: { index: false, follow: true },
};

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
      <main>
        <h1>WebKadr</h1>
        <ul>
          {locales.map((locale) => (
            <li key={locale}>
              <Link href={`/${locale}/`}>{localeNames[locale]}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
