import { ScrollShadow } from '@nextui-org/scroll-shadow';
import strings from '@/constants/strings';
import List from './list';
import Locations from './locations';
import Settings from './settings';

function Content({ translate, activeTab }) {
  let visibleContent;

  switch (activeTab) {
    case strings.menu.states.list:
      visibleContent = <List translate={translate} />;
      break;
    case strings.menu.states.locations:
      visibleContent = <Locations />;
      break;
    case strings.menu.states.menu:
      visibleContent = <Settings />;
      break;
    default:
      throw new Error(`Unknown active tab: ${activeTab}`);
  }

  return (
    <ScrollShadow className='h-full flex-shrink-[2]'>
      {visibleContent}
    </ScrollShadow>
  );
}

export default Content;
