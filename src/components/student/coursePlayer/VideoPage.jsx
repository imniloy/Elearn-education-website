import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllVideosQuery } from "../../../features/videos/videosApi";

const VideoPage = () => {
  const navigate = useNavigate();
  const { data: videos } = useGetAllVideosQuery();

  useEffect(() => {
    // if the videos.length > 0 then we are going to redirect the user to the first Video...
    // the user will redirect to the ***[/videos/${firstVideoId}]...
    if (videos?.length > 0) {
      let firstVideoId = videos[0]?.id;
      navigate(`/videos/${firstVideoId}`);
    }
  }, [videos]);

  return <></>;
};

export default VideoPage;
