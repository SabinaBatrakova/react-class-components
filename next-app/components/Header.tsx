'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';


function Header() {
  const t = useTranslations('header');
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 w-full">
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}

export default Header;
