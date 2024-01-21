import { useTranslations } from 'next-intl';

export default function translation() {
  return {
    title: {
      name: useTranslations('title')('name'),
      university: useTranslations('title')('university'),
    },
  };
}
