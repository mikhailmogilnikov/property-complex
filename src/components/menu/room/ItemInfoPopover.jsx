import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import Text from '@/components/primitives/Text';

function ItemInfoPopover({ translate, item }) {
  return (
    <Popover backdrop='blur' placement='right'>
      <PopoverTrigger>
        <button
          className='w-min h-min outline-none'
          aria-label='open popover'
          type='button'
        >
          <Text
            tag='p'
            className='opacity-50 underline'
            content={translate.menu.content.room.popover.placeholder}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className='max-w-80'>
        <div className='px-1 py-2 flex flex-col gap-4 select-text'>
          <div className='text-small font-bold'>{item.name}</div>
          <div className='flex flex-col opacity-60'>
            <Text
              tag='h5'
              className='cursor-auto'
              content={`${translate.menu.content.room.popover.inventoryNumber}: ${item.id}`}
            />
            <Text
              tag='h5'
              className='cursor-auto'
              content={`${translate.menu.content.room.popover.lifetime}: ${item.lifetime}`}
            />
            <Text
              tag='h5'
              className='cursor-auto'
              content={`${translate.menu.content.room.popover.cost}: ${item.cost}`}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ItemInfoPopover;
