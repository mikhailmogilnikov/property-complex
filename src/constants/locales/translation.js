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
          modal: {
            selectedItems: menu('content.room.modal.selectedItems'),
            removeItem: menu('content.room.modal.removeItem'),
            roomPickerTitle: menu('content.room.modal.roomPickerTitle'),
            navigatorTitle: menu('content.room.modal.navigatorTitle'),
          },
        },
      },
    },
  };
}
