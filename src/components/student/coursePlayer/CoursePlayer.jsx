import React, { useState } from "react";
import Player from "./Player";
import AllVideosList from "./AllVideosList";
import { useGetAllVideosQuery } from "../../../features/videos/videosApi";
import { useNavigate } from "react-router-dom";
import PopUpModal from "../../utils/PopUpModal";

const CoursePlayer = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: videos, isLoading, isError, error } = useGetAllVideosQuery();

  // this controlModal will  be used to  change the corrent state of isModalOpen and based on this isModalOpen state the PopUpModal will display or not...
  const controlModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  let content;
  if (isLoading) content = <div className="">Loading</div>;
  if (!isLoading && isError)
    content = <div className="error">{error?.status}</div>;
  if (!isLoading && !isError && videos?.length == 0)
    content = <div className="">No videos Found!</div>;
  if (!isLoading && !isError && videos?.length > 0)
    content = (
      <div className="grid grid-cols-3 gap-2 lg:gap-8">
        {/* Video players && assignment && Quiz sections */}
        <Player control={controlModal} />
        {/* all Videos sections */}
        <AllVideosList videos={videos} />
      </div>
    );

  return (
    <section className="py-6 bg-primary modalContainer">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        {content}
        {isModalOpen && (
          <PopUpModal isModalOpen={isModalOpen} control={controlModal} />
        )}
      </div>
    </section>
  );
};

export default CoursePlayer;
