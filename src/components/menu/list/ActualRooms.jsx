import { ScrollShadow } from '@nextui-org/scroll-shadow';
import icons from '@/constants/icons';
import Breaker from '@/components/primitives/Breaker';
import { useStore } from '@/store/store';
import strings from '@/constants/strings';
import AddInfo from '@/components/primitives/AddInfo';

function ActualRooms({ foundList }) {
  const { menuStore } = useStore();

  function Room({ name, owner, roomIndex, roomId }) {
    const setActiveRoom = () => {
      menuStore.setActiveTab(strings.menu.states.room);
      menuStore.setActiveRoom(roomId);
    };

    return (
      <>
        <button
          type='button'
          onClick={setActiveRoom}
          className='h-min flex flex-row flex-none items-center text-start px-5 py-4 hover:bg-black/5 hover:dark:bg-white/5 active:bg-black/10 active:dark:bg-white/10 transition-colors'
        >
          <div className='flex flex-col gap-1 w-full'>
            <h6 className='w-full text-md font-medium'>{name}</h6>
            <div className='opacity-60 flex flex-col gap-1'>
              <AddInfo icon={icons.menu.content.list.owner} content={owner} />
           
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
    <ScrollShadow className='w-full h-full px-6 py-4 flex flex-col flex-grow-0 gap-3'>
      <h4 className='font-medium text-sm px-1'>Помещения</h4>
      <div className='bg-white/30 dark:bg-default/30 rounded-2xl flex flex-col overflow-clip overflow-y-visible shadow-small dark:shadow-none'>
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

export default ActualRooms;
