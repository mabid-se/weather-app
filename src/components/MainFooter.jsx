import React from "react";
import { Link } from "react-router-dom";

const MainFooter = () => {
  const footerItems = [
    {
      label: "current weather data",
      link: "https://rapidapi.com/wettercom-wettercom-default/api/forecast9",
    },
    {
      label: "forecast",
      link: "https://rapidapi.com/worldapi/api/open-weather13/",
    },
    {
      label: "open weather",
      link: "https://rapidapi.com/worldapi/api/open-weather13/",
    },
  ];

  return (
    <div className="mt-6 p-6 justify-center items-center bg-[#F8FAFC] dark:bg-[#202b3b]">
      <div className="pb-3 border-b-2 border-[#94a3b8] dark:border-[#263345] flex flex-col sm:flex-row text-center sm:justify-between">
        {footerItems.map((item, index) => (
          <Link
            key={index}
            to={{ pathname: item.link }}
            className="my-1 capitalize color-[#334155] dark:text-[#94a3b8] hover:text-[#fd7f4c] hover:dark:text-[#fd7f4c] text-lg font-bold"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <h6 className="mt-1 text-[#334155] text-center dark:text-[#94a3b8] text-md font-semibold">
        Take Home Test for Code Ivy - Built By MUHAMMAD ABID
      </h6>
    </div>
  );
};

export default MainFooter;
