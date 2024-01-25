import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import {
  Autocomplete,
  // AutocompleteSection,
  // AutocompleteItem,
} from '@nextui-org/autocomplete';
import { useMemo, useState } from 'react';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import Breaker from '@/components/primitives/Breaker';
import Text from '@/components/primitives/Text';
import icons from '@/constants/icons';
import ItemInfoPopover from './ItemInfoPopover';

function SelectedItems({
  translate,
  selectedItemsList,
  selectedItemsIds,
  unpinItem,
}) {
  return (
    <div className='flex flex-col gap-3'>
      <Text
        tag='h5'
        className='opacity-60'
        content={translate.menu.content.room.modal.selectedItems}
      />
      <div className='bg-white/30 dark:bg-default/30 rounded-2xl flex flex-col gap-0 overflow-clip overflow-y-visible shadow-small dark:shadow-none'>
        {selectedItemsList.map((item, itemIndex) => (
          <div key={`pin_${item.id}`}>
            <div className='h-min flex flex-row flex-none items-center text-start px-5 py-4 gap-4'>
              <div className='flex flex-col gap-3 w-full items-start'>
                <Text
                  tag='h5'
                  className='select-text cursor-auto'
                  content={item.name}
                />
                <ItemInfoPopover translate={translate} item={item} />
              </div>

              <Tooltip content={translate.menu.content.room.modal.removeItem}>
                <Button
                  radius='md'
                  variant='flat'
                  size='sm'
                  isIconOnly
                  className='flex flex-col gap-1'
                  onClick={() => unpinItem(item.id)}
                >
                  {icons.menu.content.room.modal.minus}
                </Button>
              </Tooltip>
            </div>
            {itemIndex < selectedItemsIds.length - 1 && <Breaker />}
          </div>
        ))}
      </div>
    </div>
  );
}

function LocationPicker({ translate, locations, currentLocationId }) {
  const locs = useMemo(() => locations.map((loc) => loc.name), [locations]);
  const initLoc = useMemo(
    () => locations.find((loc) => loc.id === currentLocationId)?.name,
    [locs, currentLocationId],
  );

  const [selectedKeys, setSelectedKeys] = useState(
    new Set(initLoc ? [initLoc] : []),
  );

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys],
  );

  return (
    <div className='flex flex-col gap-3'>
      <Text
        tag='h5'
        className='opacity-60'
        content={translate.menu.content.room.modal.roomPickerTitle}
      />
      <Dropdown backdrop='opaque' className='w-full'>
        <DropdownTrigger>
          <Button variant='flat' className='h-14 rounded-2xl'>
            <div className='flex w-full justify-between px-1'>
              <Text tag='h4' content={selectedValue} />
              <div className='flex w-5 h-5'>
                {icons.menu.content.list.caret}
              </div>
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Single selection'
          variant='flat'
          disallowEmptySelection
          selectionMode='single'
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {locs.map((loc) => (
            <DropdownItem key={loc}>
              <Text tag='h5' content={loc} />
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

function RoomsNavigator({ translate }) {
  return (
    <div className='flex flex-col gap-3'>
      <Text
        tag='h5'
        className='opacity-60'
        content={translate.menu.content.room.modal.navigatorTitle}
      />
      <Autocomplete
        aria-label='Select an room'
        placeholder='Поиск по комнатам'
        startContent={
          <div className='w-6 h-6 mr-1 opacity-60'>
            {icons.menu.content.list.search}
          </div>
        }
        className='w-full'
        inputProps={{
          classNames: {
            inputWrapper: 'rounded-2xl px-4',
            selectorButton: 'w-5 h-5',
          },
        }}
      >
        {/* {animals.map((animal) => (
          <AutocompleteItem key={animal.value} value={animal.value}>
            {animal.label}
          </AutocompleteItem>
        ))} */}
      </Autocomplete>
    </div>
  );
}

function InjectorLogic({
  translate,
  selectedItemsIds,
  selectedItemsList,
  unpinItem,
  locations,
  currentLocationId,
  getRoomsInFloor,
}) {
  return (
    <ScrollShadow className='flex flex-col gap-10 px-5 py-3'>
      <SelectedItems
        translate={translate}
        selectedItemsList={selectedItemsList}
        selectedItemsIds={selectedItemsIds}
        unpinItem={unpinItem}
      />
      <LocationPicker
        translate={translate}
        locations={locations}
        currentLocationId={currentLocationId}
      />
      <RoomsNavigator translate={translate} getRoomsInFloor={getRoomsInFloor} />
    </ScrollShadow>
  );
}

export default InjectorLogic;
