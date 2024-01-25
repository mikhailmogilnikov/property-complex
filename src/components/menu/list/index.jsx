import { useMemo } from 'react';
import { useStore } from '@/store/store';
import Search from './Search';
import ActualRooms from './ActualRooms';
import useSearch, { createReqSearchObject } from '@/app/hooks/useSearch';

function List({ translate }) {
  const { databaseStore } = useStore();


  const ReqSearchObject = useMemo(() => createReqSearchObject([
    ["rooms", "name"],
    ["rooms", "owner"],
    ["items", "id"],
    ["items", "name", true],
  ]), []);

  const {searchValue, setSearchValue, returnedActualData} = useSearch({
    dataList: {
        "rooms": databaseStore.getRooms(),
        "items": databaseStore.getItems()
      },
      reqList: ReqSearchObject,
      mainDataId: "rooms"
  });

  /*
  [
        {
          reqDataId: "rooms",
          reqParamName: "name",
          reqIsWave: false
        },
        {
          reqDataId: "rooms",
          reqParamName: "owner",
          reqIsWave: false
        },
        {
          reqDataId: "items",
          reqParamName: "id",
          reqIsWave: false
        },
        {
          reqDataId: "items",
          reqParamName: "name",
          reqIsWave: true
        },
      ]
  */

  /*
  const [searchValue, setSearchValue] = useState('');
  const [foundList, setFoundList] = useState([]);

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
  */

  return (
    <div className='w-full h-full flex flex-col'>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        translate={translate}
      />
      <ActualRooms foundList={returnedActualData} />
    </div>
  );
}

export default List;
