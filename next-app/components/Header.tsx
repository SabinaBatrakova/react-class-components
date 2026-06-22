'use client';

import {Link} from '@/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';


function Header() {
  const t = useTranslations('header');
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 w-full">
      <Link href="/about">{t('about')}</Link>
      <LanguageSwitcher/>
    </div>
  );
}

export default Header;
