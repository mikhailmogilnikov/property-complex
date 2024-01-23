import {
  PiUserCircleBold,
  PiListMagnifyingGlassBold,
  PiMapPinBold,
  PiMagnifyingGlassBold,
  PiCaretRightBold,
  PiKeyBold,
  PiPackageBold,
  PiArrowFatLineRightBold,
} from 'react-icons/pi';
import { TbMap2 } from 'react-icons/tb';

export default {
  menu: {
    header: {
      location: <PiMapPinBold className='w-4 h-4 flex-shrink-0' />,
    },
    content: {
      list: {
        search: <PiMagnifyingGlassBold className='w-full h-full' />,
        caret: <PiCaretRightBold className='w-full h-full' />,
        owner: <PiKeyBold className='w-full h-full' />,
        items: <PiPackageBold className='w-full h-full' />,
      },
      room: {
        process: <PiArrowFatLineRightBold className='w-5 h-5' />,
      },
    },
    nav: {
      list: <PiListMagnifyingGlassBold className='w-full h-full' />,
      locations: <TbMap2 className='w-full h-full' />,
      profile: <PiUserCircleBold className='w-full h-7' />,
    },
  },
};
