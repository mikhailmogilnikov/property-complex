import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import findSubstring from '@/utility/findSubstring';
import Search from './Search';
import ActualRooms from './ActualRooms';

function List({ translate }) {
  const { databaseStore } = useStore();
  const [searchValue, setSearchValue] = useState('');
  const [foundList, setFoundList] = useState([]);

  // const countItems = () => {
  //   const items = databaseStore.getItems();

  //   return items.reduce((acc, item) => {
  //     acc[item.roomId] = (acc[item.roomId] || 0) + 1;
  //     return acc;
  //   }, {});
  // };

  // const itemsAmountInRooms = countItems();

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
      .sort((a, b) => a.name.localeCompare(b.name));

    const foundData = searchValue.toString().length
      ? actualRoomsData
      : roomList.sort((a, b) => a.name.localeCompare(b.name));

    setFoundList(foundData);
  }, [searchValue]);

  return (
    <div className='w-full h-full flex flex-col'>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        translate={translate}
      />
      <ActualRooms foundList={foundList} />
    </div>
  );
}

export default List;
