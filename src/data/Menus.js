import cloudsIcoLight from "../assets/icons/clouds-lightning-light.png";
import cloudsIcoDark from "../assets/icons/clouds-lightning-light.png";
import listIcoLight from "../assets/icons/list-light.png";
import listIcoDark from "../assets/icons/list-dark.png";
import mapIcoLight from "../assets/icons/map-light.png";
import mapIcoDark from "../assets/icons/map-dark.png";
import settingIcoLight from "../assets/icons/map-light.png";
import settingIcoDark from "../assets/icons/map-dark.png";

export const SidebarMenuItems = [
  {
    id: 1,
    title: "Weather",
    link: "/",
    imgLight: cloudsIcoLight,
    imgDark: cloudsIcoDark,
  },
  {
    id: 2,
    title: "Cities",
    link: "",
    imgLight: listIcoLight,
    imgDark: listIcoDark,
  },
  {
    id: 3,
    title: "Map",
    link: "/map-view",
    imgLight: mapIcoLight,
    imgDark: mapIcoDark,
  },
  {
    id: 4,
    title: "Settings",
    link: "",
    imgLight: settingIcoLight,
    imgDark: settingIcoDark,
  },
];
