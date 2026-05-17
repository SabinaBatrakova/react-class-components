interface PaginationProps {
  page: number;
  onNext: () => void;
  onPrev: () => void;
}

export function Pagination({ onNext, onPrev }: PaginationProps) {
  return (
    <div>
      <button
        className="px-8 py-2 rounded-3xl bg-blue-400 hover:bg-amber-200 cursor-pointer hover:text-blue-950"
        onClick={onPrev}
      >
        Prev
      </button>

      <button
        className="px-8 py-2 rounded-3xl bg-blue-400 hover:bg-amber-200 cursor-pointer hover:text-blue-950"
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}
export default Pagination;
