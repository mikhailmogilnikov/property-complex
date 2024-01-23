import strings from '@/constants/strings';
import List from './list';
import Locations from './locations';
import Settings from './settings';
import Room from './room';

function Content({ translate, activeTab, setActiveRoom }) {
  let visibleContent;

  switch (activeTab) {
    case strings.menu.states.list:
      visibleContent = (
        <List translate={translate} setActiveRoom={setActiveRoom} />
      );
      break;
    case strings.menu.states.locations:
      visibleContent = <Locations />;
      break;
    case strings.menu.states.profile:
      visibleContent = <Settings />;
      break;
    case strings.menu.states.room:
      visibleContent = <Room translate={translate} />;
      break;
    default:
      throw new Error(`Unknown active tab: ${activeTab}`);
  }

  return (
    <div className='h-full overflow-hidden flex-shrink-[2]'>
      {visibleContent}
    </div>
  );
}

export default Content;
