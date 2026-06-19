'use client';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  page: number;
}

export default function Pagination({ page }: PaginationProps) {
  const router = useRouter();

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
        Prev
      </button>
      <span className="px-4 py-2 font-bold">{page}</span>

      <button
        className="px-8 py-2 rounded-3xl bg-blue-400 hover:bg-amber-200 cursor-pointer hover:text-blue-950"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        Next
      </button>
    </div>
  )
}


