import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { getDictionary } from "@/i18n/getDictionary";
import { parseLocale } from "@/i18n/locales";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const { hero, mock, services } = getDictionary(parseLocale(lang));

  return (
    <main className="cover-scope flex-1">
      <Hero hero={hero} mock={mock} />
      <Services dictionary={services} />
    </main>
  );
}
