import React from "react";
import SingelVideo from "./SingelVideo";

const AllVideosList = ({ videos }) => {
  let content;
  if (videos?.length === 0)
    content = <div className="error">No Videos Available</div>;

  if (videos?.length > 0)
    content = videos?.map((video) => (
      <SingelVideo key={video?.id} video={video} />
    ));

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
};

export default AllVideosList;
