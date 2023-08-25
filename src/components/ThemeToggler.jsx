import React, { Fragment, useEffect, useState } from "react";
import { changeTheme } from "../store/ThemeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import LightIcon from "../assets/icons/LightIcon";
import DarkIcon from "../assets/icons/DarkIcon";
import SystemIcon from "../assets/icons/SystemIcon";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ThemeToggler = () => {
  const themeValue = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const htmlDoc = document.documentElement;
  const themeSytem = window.matchMedia("(prefers-color-scheme: dark)");

  const [activeTheme, setActiveTheme] = useState("dark");

  if (themeValue === "light") {
    htmlDoc.classList.remove("dark");
    localStorage.theme = "light";
  }
  if (themeValue === "dark") {
    htmlDoc.classList.add("dark");
    localStorage.theme = "dark";
  }
  if (themeValue === "system") {
    localStorage.removeItem("theme");
    if (!("theme" in localStorage) && themeSytem.matches) {
      htmlDoc.classList.add("dark");
    } else {
      htmlDoc.classList.remove("dark");
    }
  }

  const themeChangeHandler = (theme) => {
    dispatch(changeTheme(theme));
    setActiveTheme(theme);
  };

  const options = [
    { label: "light", icon: <LightIcon /> },
    { label: "dark", icon: <DarkIcon /> },
    { label: "system", icon: <SystemIcon /> },
  ];

  return (
    <>
      <Menu as="div" className="relative inline-block my-1 md:my-2">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-full p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-[#94a3b8] dark:ring-[#64748b]">
            {activeTheme === "light" && <LightIcon />}
            {activeTheme === "dark" && <DarkIcon />}
            {activeTheme === "system" && <SystemIcon />}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white dark:bg-[#1e293b] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {options.map((item, index) => (
                <Menu.Item
                  key={index}
                  className={classNames(
                    activeTheme === item.label
                      ? "text-[#0ea5e9]"
                      : "text-[#334155] dark:text-[#cbd5e1]",
                    "block px-4 py-2 text-sm capitalize font-bold hover:bg-[#f8fafc] dark:hover:bg-[#2a3749]"
                  )}
                >
                  <button
                    onClick={() => themeChangeHandler(item.label)}
                    className="w-full flex gap-x-2"
                  >
                    {item.icon} {item.label}
                  </button>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default ThemeToggler;
