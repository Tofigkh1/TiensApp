import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function Home() {
  const { t, i18n } = useTranslation('common');

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <Head>
        <title>{t('welcome')}</title>
      </Head>
      <main>
        <h1>{t('welcome')}</h1>
        <button onClick={() => changeLanguage('az')}>{t('change_language')} (AZ)</button>
        <button onClick={() => changeLanguage('en')}>{t('change_language')} (EN)</button>
      </main>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
