import React from "react";
import VideoItem from "./VideoItem";
import { useGetAllVideosQuery } from "../../../features/videos/videosApi";

const VideosTable = () => {
  const { data: videos, isError, error, isLoading } = useGetAllVideosQuery();

  let content;
  if (isLoading)
    content = (
      <tr className="">
        <td className="">Loading...</td>
      </tr>
    );
  if (!isLoading && isError)
    content = (
      <tr className="">
        <td className="error">{error?.status}</td>
      </tr>
    );
  if (!isLoading && !isError && videos?.length === 0)
    content = (
      <tr className="">
        <td className="">No Videos Found!...</td>
      </tr>
    );

  if (!isLoading && !isError && videos?.length > 0)
    content = videos.map((video) => (
      <VideoItem key={video?.id} video={video} />
    ));

  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Video Title</th>
          <th className="table-th">Description</th>
          <th className="table-th">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-600/50">{content}</tbody>
    </table>
  );
};

export default VideosTable;
