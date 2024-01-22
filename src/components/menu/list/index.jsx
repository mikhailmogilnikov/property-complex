import { Input } from '@nextui-org/input';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { useEffect, useState } from 'react';
import icons from '@/constants/icons';
import { useStore } from '@/store/store';
import findSubstring from '@/utility/findSubstring';

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
  // const [foundList, setFoundList] = useState([]);

  useEffect(() => {
    const roomList = databaseStore.getRooms();
    const itemList = databaseStore.getItems();
    const normalize = searchValue.toString().toLowerCase();

    // const foundRooms = findSubstring(searchValue.toString(), roomList, "name");

    console.log([
      ...findSubstring(normalize, roomList, "name"),
      ...findSubstring(normalize, roomList, "owner"),
      ...findSubstring(normalize, itemList, "id"),
      ...findSubstring(normalize, itemList, "name", true),
    ]);
    // setFoundList(foundRooms);
  }, [searchValue])

  return (
    <div className='w-full h-full flex flex-col'>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} translate={translate} />
      <ScrollShadow className='w-full h-full px-6 py-4' />
    </div>
  );
}

export default List;
