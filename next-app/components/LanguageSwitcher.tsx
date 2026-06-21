'use client';
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();

  const router = useRouter();
  const switchLanguage = () => router.push(`/${locale === 'ru' ? 'en' : 'ru'}`);

  return <button onClick={switchLanguage}>Language swither ru/en</button>;
}
