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
          noItems: menu('content.room.noItems'),
          popover: {
            placeholder: menu('content.room.popover.placeholder'),
            inventoryNumber: menu('content.room.popover.inventoryNumber'),
            cost: menu('content.room.popover.cost'),
            lifetime: menu('content.room.popover.lifetime'),
          },
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
