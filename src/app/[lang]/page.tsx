import { getDictionary } from "@/i18n/getDictionary";
import { parseLocale } from "@/i18n/locales";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const { hero } = getDictionary(parseLocale(lang));

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {hero.title}
      </h1>
      <p className="max-w-xl text-lg text-muted">{hero.subtitle}</p>
    </main>
  );
}
