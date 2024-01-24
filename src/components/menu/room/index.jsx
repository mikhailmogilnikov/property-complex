import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/store';
import Text from '@/components/primitives/Text';
import RoomItemsList from './items';
import Chip from '@/components/primitives/Chip';
import Injector from './Injector';

const Room = observer(({ translate }) => {
  const { menuStore, databaseStore } = useStore();
  const [groupSelected, setGroupSelected] = useState([]);

  useEffect(() => {
    setGroupSelected([]);
  }, [menuStore.getActiveRoom()]);

  const currentRoomId = menuStore.getActiveRoom();
  const rooms = databaseStore.getRooms();
  const items = databaseStore.getItems();

  const currentRoom = rooms.find((room) => currentRoomId === room.id);
  const currentRoomItems = items.filter(
    (item) => currentRoomId === item.roomId,
  );

  const isItemSelected = groupSelected.length > 0;

  return (
    <div className='w-full h-full relative flex flex-col'>
      <div className='w-hull aspect-video bg-black/10 dark:bg-default/20 flex-none rounded-t-4xl' />
      <ScrollShadow className='h-full flex flex-col gap-6 p-6'>
        <Text tag='h1' content={currentRoom.name} />
        <div className='flex flex-row flex-wrap gap-2'>
          <Chip
            title={translate.menu.content.room.owner}
            content={currentRoom.owner}
          />
          <Chip
            title={translate.menu.content.room.items}
            content={currentRoomItems.length}
          />
        </div>
        <RoomItemsList
          roomItems={currentRoomItems}
          groupSelected={groupSelected}
          setGroupSelected={setGroupSelected}
        />
      </ScrollShadow>
      <Injector
        translate={translate}
        isItemSelected={isItemSelected}
        selectedItemsLength={groupSelected.length}
      />
    </div>
  );
});

export default Room;
