import { Input } from '@nextui-org/input';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { useEffect, useState } from 'react';
import icons from '@/constants/icons';
import { useStore } from '@/store/store';
import findSubstring from '@/utility/findSubstring';
import Breaker from '@/components/primitives/Breaker';

function ActualRooms({ foundList, itemsAmount }) {
  function Room({ name, owner, roomIndex, roomId }) {
    function AddInfo({ icon, content }) {
      return (
        <div className='flex flex-row gap-2 items-center'>
          <div className='w-4 h-4'>{icon}</div>
          <p className='w-full text-sm font-normal'>{content}</p>
        </div>
      );
    }

    return (
      <>
        <button
          type='button'
          className='h-24 flex flex-row items-center text-start px-5 hover:bg-black/5 hover:dark:bg-white/5 active:bg-black/10 active:dark:bg-white/10 transition-colors'
        >
          <div className='flex flex-col gap-1 w-full'>
            <h6 className='w-full text-md font-medium'>{name}</h6>
            <div className='opacity-60 flex flex-col gap-1'>
              <AddInfo icon={icons.menu.content.list.owner} content={owner} />
              <AddInfo
                icon={icons.menu.content.list.items}
                content={itemsAmount[roomId]}
              />
            </div>
          </div>

          <div className='w-5 h-5 opacity-70 flex-shrink-0'>
            {icons.menu.content.list.caret}
          </div>
        </button>
        {roomIndex < foundList.length - 1 && <Breaker />}
      </>
    );
  }

  return (
    <ScrollShadow className='w-full h-full px-6 py-4 flex flex-col gap-4'>
      <div className='bg-white/80 dark:bg-default/20 rounded-2xl flex flex-col overflow-clip overflow-y-visible shadow-small dark:shadow-none'>
        {foundList.map((foundRoom, index) => (
          <Room
            key={`rId-${foundRoom.id}`}
            name={foundRoom.name}
            owner={foundRoom.owner}
            roomIndex={index}
            roomId={foundRoom.id}
          />
        ))}
      </div>
    </ScrollShadow>
  );
}

function Search({ searchValue, setSearchValue, translate }) {
  return (
    <Input
      isClearable
      radius='lg'
      placeholder={translate.menu.content.list.search.placeholder}
      classNames={{
        base: 'h-9 px-6 pt-1 mb-4',
        label: 'text-black/90 dark:text-white/90',
        input: [
          'bg-transparent',
          'text-black/90 dark:text-white/50',
          'placeholder:text-default-700/80 dark:placeholder:text-white/60',
        ],
        innerWrapper: 'bg-transparent h-full',
        inputWrapper: [
          'p-0',
          'px-2',
          'h-full',
          'shadow-small',
          'bg-default-200/40',
          'dark:bg-default/40',
          'group-data-[focused=true]:bg-default-200/50',
          'dark:group-data-[focused=true]:bg-default/60',
          '!cursor-text',
        ],
      }}
      onClear={() => console.log('input cleared')}
      value={searchValue}
      onValueChange={setSearchValue}
      startContent={
        <div className='w-5 h-full flex items-center justify-center flex-shrink-0 opacity-60 mx-1'>
          {icons.menu.content.list.search}
        </div>
      }
    />
  );
}

function List({ translate }) {
  const { databaseStore } = useStore();
  const [searchValue, setSearchValue] = useState('');
  const [foundList, setFoundList] = useState([]);

  const countItems = () => {
    const items = databaseStore.getItems();

    return items.reduce((acc, item) => {
      acc[item.roomId] = (acc[item.roomId] || 0) + 1;
      return acc;
    }, {});
  };

  const itemsAmountInRooms = countItems();

  useEffect(() => {
    const roomList = databaseStore.getRooms();
    const itemList = databaseStore.getItems();
    const normalize = searchValue.toString().toLowerCase();

    const findValues = [
      ...findSubstring(normalize, roomList, 'name'),
      ...findSubstring(normalize, roomList, 'owner'),
      ...findSubstring(normalize, itemList, 'id'),
      ...findSubstring(normalize, itemList, 'name', true),
    ];

    const uniqueIds = [...new Set(findValues)];

    const actualRoomsData = uniqueIds
      .map((id) => roomList.find((room) => id === room.id))
      .sort((a, b) => a.name - b.name);

    const foundData = searchValue.toString().length
      ? actualRoomsData
      : roomList.sort((a, b) => a.name - b.name);

    setFoundList(foundData);
  }, [searchValue]);

  return (
    <div className='w-full h-full flex flex-col'>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        translate={translate}
      />
      <ActualRooms foundList={foundList} itemsAmount={itemsAmountInRooms} />
    </div>
  );
}

export default List;
