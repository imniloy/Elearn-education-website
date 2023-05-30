import React from "react";
import { Link } from "react-router-dom";

const SingelVideo = ({ video }) => {
  const { title, id, views, duration } =
    video || {};

  return (
    <Link to={`/videos/${id}`}>
      <div className="w-full flex flex-row gap-10 cursor-pointer hover:bg-slate-900 p-2 py-3 overflow-hidden">
        {/* py-3 makes thumbnail small */}
        {/* <!-- Thumbnail --> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
          />
        </svg>
        {/* <!-- title and others info bellow --> */}
        <div clas="flex flex-col w-full">
          <div className="">
            <p className="text-slate-50 text-sm font-medium text-wrapper w-minus50px">
              {title}
            </p>
          </div>

          <div className=" w-minus50px">
            <span className="text-gray-400 text-xs mt-1">{duration} Mins</span>
            <span className="text-gray-400 text-xs mt-1"> | </span>
            <span className="text-gray-400 text-xs mt-1">{views} views</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingelVideo;
