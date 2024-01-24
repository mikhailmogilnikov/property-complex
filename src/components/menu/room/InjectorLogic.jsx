import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import Breaker from '@/components/primitives/Breaker';
import Text from '@/components/primitives/Text';
import icons from '@/constants/icons';
import { useStore } from '@/store/store';

function SelectedItems({ translate, selectedItemsList, selectedItemsIds }) {
  return (
    <div className='bg-white/30 dark:bg-default/30 rounded-2xl flex flex-col gap-0 overflow-clip overflow-y-visible shadow-small dark:shadow-none'>
      {selectedItemsList.map((item, itemIndex) => (
        <>
          <div className='h-min flex flex-row flex-none items-center text-start px-5 py-4'>
            <div className='flex gap-1 w-full items-center'>
              <Text tag='h5' content={item.name} />
            </div>

            <Tooltip content={translate.menu.content.room.modal.removeItem}>
              <Button
                radius='md'
                variant='flat'
                size='sm'
                isIconOnly
                className='flex flex-col gap-1'
              >
                {icons.menu.content.room.modal.minus}
              </Button>
            </Tooltip>
          </div>
          {itemIndex < selectedItemsIds.length - 1 && <Breaker />}
        </>
      ))}
    </div>
  );
}

function InjectorLogic({ translate, selectedItemsIds }) {
  const { menuStore, databaseStore } = useStore();
  const currentRoom = menuStore.getActiveRoom();
  const items = databaseStore.getItems();

  console.log(currentRoom)

  const selectedItemsList = selectedItemsIds.map((id) =>
    items.find((item) => id === item.id),
  );

  return (
    <div className='flex flex-col gap-6'>
      <SelectedItems
        translate={translate}
        selectedItemsList={selectedItemsList}
        selectedItemsIds={selectedItemsIds}
      />
    </div>
  );
}

export default InjectorLogic;
