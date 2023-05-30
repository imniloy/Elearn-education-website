import React from "react";
import VideosTable from "./VideosTable";
import { useNavigate } from "react-router-dom";

const Videos = () => {
  const navigate = useNavigate();

  const addVideoRedirect = () => {
    navigate("/admin/videos/add-new-video");
  };

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <button className="btn ml-auto" onClick={addVideoRedirect}>
              Add Video
            </button>
          </div>
          <div className="overflow-x-auto mt-4">
            <VideosTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;
