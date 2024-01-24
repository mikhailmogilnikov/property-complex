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
        injectButton: menu('tooltip.injectButton'),
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
          popover: {
            placeholder: menu('content.room.popover.placeholder'),
            cost: menu('content.room.popover.cost'),
            lifetime: menu('content.room.popover.lifetime')
          },
          modal: {
            removeItem: menu('content.room.modal.removeItem'),
          },
        },
      },
    },
  };
}
