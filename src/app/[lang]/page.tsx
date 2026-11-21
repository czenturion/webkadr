import { Builder } from "@/components/builder/Builder";
import { Hero } from "@/components/Hero";
import { Packages } from "@/components/Packages";
import { Services } from "@/components/Services";
import { getDictionary } from "@/i18n/getDictionary";
import { parseLocale } from "@/i18n/locales";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const locale = parseLocale(lang);
  const { hero, mock, services, packages, builder } = getDictionary(locale);

  return (
    <main className="cover-scope flex-1">
      <Hero hero={hero} mock={mock} />
      <Services dictionary={services} />
      <Packages locale={locale} dictionary={packages} />
      <Builder locale={locale} texts={builder} />
    </main>
  );
}
