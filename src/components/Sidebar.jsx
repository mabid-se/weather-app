import React from "react";
import { SidebarMenuItems } from "../data/Menus";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ open }) => {
  const location = useLocation();
  return (
    <div>
      <>
        <div className="flex flex-column justify-between">
          <ul className="py-16">
            {SidebarMenuItems.map((Menu, index) => (
              <Link
                key={index}
                to={Menu.link}
                className={`${
                  location.pathname === Menu.link
                    ? "text-[#fd7f4c]"
                    : "text-[#0f172a] dark:text-[#ece8f0]"
                } hover:text-[#fd7f4c] text-md font-semibold capitalize`}
              >
                <li
                  key={index}
                  className={`my-12 flex flex-col p-2 cursor-pointer items-center gap-x-4 ${
                    Menu.gap ? "mt-9" : "mt-2"
                  } ${index === 0 && "bg-light-white"} `}
                >
                  <img
                    src={Menu.imgDark}
                    width={20}
                    className="hidden dark:block"
                  />
                  <img src={Menu.imgLight} width={20} className="dark:hidden" />
                  <span className={`${!open && "hidden"} mt-1`}>
                    {Menu.title}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </>
    </div>
  );
};

export default Sidebar;
