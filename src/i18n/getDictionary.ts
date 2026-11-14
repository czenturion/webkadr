import en, { type Dictionary } from "./dictionaries/en";
import kz from "./dictionaries/kz";
import ru from "./dictionaries/ru";
import type { Locale } from "./locales";

const dictionaries: Record<Locale, Dictionary> = { en, ru, kz };

export const getDictionary = (locale: Locale): Dictionary =>
  dictionaries[locale];
