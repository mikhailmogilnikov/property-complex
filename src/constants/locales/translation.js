import { useTranslations } from 'next-intl';

export default function translation() {
  const menu = useTranslations('menu');

  return {
    menu: {
      tooltip: {
        visibility: {
          visible: 'Скрыть меню',
          hidden: 'Показать меню',
        },
      },
      title: {
        name: menu('title.name'),
        university: menu('title.university'),
      },
      content: {
        list: {
          search: {
            placeholder: menu('content.list.search.placeholder'),
          },
        },
      },
    },
  };
}
