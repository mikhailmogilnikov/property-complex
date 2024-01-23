import { useTranslations } from 'next-intl';

export default function translation() {
  const menu = useTranslations('menu');

  return {
    menu: {
      tooltip: {
        visibility: {
          visible: menu('tooltip.visibility.visible'),
          hidden: menu('tooltip.visibility.hidden'),
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
        room: {
          owner: menu('content.room.owner'),
          items: menu('content.room.items'),
        },
      },
    },
  };
}
