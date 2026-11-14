import { notFound } from "next/navigation";

export const locales = ["en", "ru", "kz"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const htmlLang: Record<Locale, string> = {
  en: "en",
  ru: "ru",
  kz: "kk",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  kz: "Қазақша",
};

const hasLocale = (value: string): value is Locale =>
  locales.some((locale) => locale === value);

export const parseLocale = (value: string): Locale => {
  if (!hasLocale(value)) notFound();

  return value;
};
