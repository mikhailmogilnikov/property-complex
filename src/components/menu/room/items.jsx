import { CheckboxGroup, Checkbox } from '@nextui-org/checkbox';
import Breaker from '@/components/primitives/Breaker';

function RoomItemsList({ translate, roomItems, groupSelected, setGroupSelected }) {
  return (
    <div className='w-full flex flex-col gap-3 mt-4'>
      <h4 className='font-medium text-sm px-1'>{translate.menu.content.room.items}</h4>
      <CheckboxGroup
        classNames={{
          base: 'bg-white/30 dark:bg-default/30 rounded-2xl flex flex-col gap-0 overflow-clip overflow-y-visible shadow-small dark:shadow-none',
          wrapper: 'gap-0',
        }}
        value={groupSelected}
        onChange={setGroupSelected}
      >
        {roomItems.map((item, itemIndex) => (
          <div className='w-full h-min' key={item.id}>
            <Checkbox
              value={item.id}
              classNames={{
                base: 'w-full max-w-full h-min flex-row-reverse flex-none gap-2 items-center text-start px-4 py-3 hover:bg-black/5 hover:dark:bg-white/5 active:bg-black/10 active:dark:bg-white/10 transition-colors m-0',
                label: 'w-full',
                icon: 'text-orange-200',
              }}
            >
              <div className='flex flex-col gap-1 w-full '>
                <h6 className='w-full text-start text-sm font-normal'>
                  {item.name}
                </h6>
                <div className='opacity-60 flex flex-col gap-1' />
              </div>
            </Checkbox>
            {itemIndex < roomItems.length - 1 && <Breaker />}
          </div>
        ))}
      </CheckboxGroup>
    </div>
  );
}

export default RoomItemsList;
