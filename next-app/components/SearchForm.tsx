import { getTranslations } from "next-intl/server";

export async function SearchForm() {
  const t = await getTranslations('main');
  return (
    <form>
      <input name="search"></input>
      <button>{t('submit')}</button>
    </form>
  );
}

export default SearchForm;
