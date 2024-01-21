import { PiUserCircleBold, PiListMagnifyingGlassBold, PiMapPinBold, PiMagnifyingGlassBold } from "react-icons/pi";
import { TbMap2 } from "react-icons/tb";

export default {
  menu: {
    header: {
      location: <PiMapPinBold className="w-4 h-4 flex-shrink-0" />,
    },
    content: {
      list: {
        search: <PiMagnifyingGlassBold className="w-full h-full"/>,
      },
    },
    nav: {
      list: <PiListMagnifyingGlassBold className="w-full h-full"/>,
      locations: <TbMap2 className="w-full h-full"/>,
      menu: <PiUserCircleBold className="w-full h-7"/>,
    }
  }
}