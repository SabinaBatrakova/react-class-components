import { getTranslations } from 'next-intl/server';

export async function SearchForm() {
  const t = await getTranslations('main');
  return (
    <form className="flex gap-2 mb-4">
      <input
        name="search"
        className="flex-1 border rounded px-3 py-2"
        placeholder="Search pokemon..."
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {t('submit')}
      </button>
    </form>
  );
}

export default SearchForm;
