'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  page: number;
}

export default function Pagination({ page }: PaginationProps) {
  const router = useRouter();
  const t = useTranslations('main');

  const onNext = () => router.push(`?page=${page + 1}`);
  const onPrev = () => router.push(`?page=${page - 1}`);
  return (
    <div>
      <button
        className="px-8 py-2 rounded-3xl bg-blue-400 hover:bg-amber-200 cursor-pointer hover:text-blue-950"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        {t('prev')}
      </button>
      <span className="px-4 py-2 font-bold">{page}</span>

      <button
        className="px-8 py-2 rounded-3xl bg-blue-400 hover:bg-amber-200 cursor-pointer hover:text-blue-950"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        {t('next')}
      </button>
    </div>
  );
}
