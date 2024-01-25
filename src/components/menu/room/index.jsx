import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useStore } from '@/store/store';
import Text from '@/components/primitives/Text';
import RoomItemsList from './items';
import Chip from '@/components/primitives/Chip';
import Injector from './Injector';

const Room = observer(({ translate }) => {
  const { menuStore, databaseStore, galleryStore } = useStore();
  const [groupSelected, setGroupSelected] = useState([]);

  useEffect(() => {
    setGroupSelected([]);
  }, [menuStore.getActiveRoom()]);

  const locations = databaseStore.getLocations();
  const rooms = databaseStore.getRooms();
  const items = databaseStore.getItems();
  const currentRoomId = menuStore.getActiveRoom();

  const currentRoom = rooms.find((room) => currentRoomId === room.id);
  const currentRoomItems = items.filter(
    (item) => currentRoomId === item.roomId,
  );

  const currentLocationId = currentRoom.locationId;

  const selectedItemsList = groupSelected.map((id) =>
    items.find((item) => id === item.id),
  );

  const unpinItem = (itemId) => {
    setGroupSelected((prev) => prev.filter((prevId) => prevId !== itemId));
  };

  const moveItems = (endpointRoomId) => {
    const newItemsState = items.map((item) =>
      groupSelected.includes(item.id)
        ? { ...item, roomId: Number(endpointRoomId) }
        : item,
    );
    databaseStore.setItems(newItemsState);
    setGroupSelected([]);
  };

  const isItemSelected = groupSelected.length > 0;

  const getRoomsInFloor = (locName) => {
    const locId = locations.find((loc) => loc.name === locName).id;
    return rooms.filter((room) => room.locationId === locId);
  };

  const imageLink = `/images/4th-floor/${currentRoom.name}.jpg`;

  const setGalleryImage = (id, link) => {
    galleryStore.setSelectedId(id);
    galleryStore.setImageLink(link);
  };

  return (
    <div className='w-full h-full flex flex-col overflow-hidden relative'>
      <ScrollShadow
        hideScrollBar
        className='w-full h-full flex flex-col flex-shrink rounded-t-4xl'
      >
        <motion.button
          type='button'
          onClick={() => setGalleryImage(currentRoom.id, imageLink)}
          className='w-hull aspect-video w-auto h-auto bg-black/10 overflow-hidden dark:bg-default/20 flex-none rounded-t-4xl'
        >
          <Image
            src={imageLink}
            width={384}
            height={216}
            alt={currentRoom.name}
          />
        </motion.button>
        <div className='h-full flex flex-col gap-6 p-6'>
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
            translate={translate}
            roomItems={currentRoomItems}
            groupSelected={groupSelected}
            setGroupSelected={setGroupSelected}
          />
        </div>
      </ScrollShadow>

      <Injector
        translate={translate}
        isItemSelected={isItemSelected}
        selectedItems={groupSelected}
        selectedItemsList={selectedItemsList}
        unpinItem={unpinItem}
        moveItems={moveItems}
        locations={locations}
        currentLocationId={currentLocationId}
        getRoomsInFloor={getRoomsInFloor}
        currentRoomId={currentRoomId}
      />
    </div>
  );
});

export default Room;
