import React, { Fragment, useEffect, useState } from "react";
import { changeTheme } from "../store/ThemeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ThemeToggler = () => {
  const themeValue = useSelector((state) => state.theme.theme);
  console.log("theme value", themeValue);
  const dispatch = useDispatch();
  const htmlDoc = document.documentElement;
  const themeSytem = window.matchMedia("(prefers-color-scheme: dark)");
  console.log("theme system: ", themeSytem);

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
  // const changeSystemDark = (e) => {
  //   if (!("theme" in localStorage)) {
  //     if (e.matches) {
  //       htmlDoc.classList.add("dark");
  //     } else {
  //       htmlDoc.classList.remove("dark");
  //     }
  //   }
  // };
  // useEffect(() => {
  //   themeSytem.addEventListener("change", changeSystemDark);
  //   return () => {
  //     window.removeEventListener("change", changeSystemDark);
  //   };
  // }, [themeValue]);

  const themeChangeHandler = (theme) => {
    dispatch(changeTheme(theme));
    setActiveTheme(theme);
  };

  const LightIcon = () => {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="w-6 h-6"
      >
        <path
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          className="stroke-slate-400 dark:stroke-slate-500"
        ></path>
        <path
          d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
          className="stroke-slate-400 dark:stroke-slate-500"
        ></path>
      </svg>
    );
  };

  const DarkIcon = () => {
    return (
      <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
          class="fill-transparent"
        ></path>
        <path
          d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
          class="fill-slate-400 dark:fill-slate-500"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
          class="fill-slate-400 dark:fill-slate-500"
        ></path>
      </svg>
    );
  };

  const SystemIcon = () => {
    return (
      <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6">
        <path
          d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
          stroke-width="2"
          stroke-linejoin="round"
          class="stroke-slate-400 dark:stroke-slate-500"
        ></path>
        <path
          d="M14 15c0 3 2 5 2 5H8s2-2 2-5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="stroke-slate-400 dark:stroke-slate-500"
        ></path>
      </svg>
    );
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
              {options.map((item) => (
                <Menu.Item
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
