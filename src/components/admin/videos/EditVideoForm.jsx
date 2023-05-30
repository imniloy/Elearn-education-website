import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSingleVideoQuery,
  useUpdateThisVideoMutation,
} from "../../../features/videos/videosApi";

const EditVideoForm = () => {
  const { videoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");

  const { data: videoToEdit } = useGetSingleVideoQuery(videoId);

  const [updateThisVideo, { isSuccess, isError, error }] =
    useUpdateThisVideoMutation();

  const EditThisVideoHandler = (e) => {
    e.preventDefault();
    const data = {
      title: title.trim(),
      description: description.trim(),
      duration: duration.trim(),
      url: url.trim(),
      views: views.trim(),
      createdAt: new Date().toISOString(),
      id: videoId,
    };

    updateThisVideo({ id: videoId, data });
  };

  // if video available, then set all the state value accordingly to this editing video...
  useEffect(() => {
    if (videoToEdit?.id) {
      const { title, description, duration, views, url } = videoToEdit || {};
      setTitle(title);
      setDescription(description);
      setDuration(duration);
      setViews(views);
      setUrl(url);
    }
  }, [videoToEdit]);

  return (
    <section className="py-4 bg-primary">
      <h2 className="my-8 text-3xl font-bold text-center text-gray-800">
        Edit this video
      </h2>

      <div className="">
        <form className="space-y-6 mt-6" onSubmit={EditThisVideoHandler}>
          <div className="inputField space-y-3">
            <label htmlFor="video-title">Title</label>
            <input
              type="text"
              required
              name="video-title"
              placeholder="Enter Video Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="inputField space-y-3">
            <label htmlFor="video-description">Description</label>
            <textarea
              className="textarea"
              rows="4"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="inputField-container">
            <div className="inputField space-y-3">
              <label htmlFor="video-duration">Duration</label>
              <input
                type="number"
                name="video-duration"
                min="0"
                step="0.01"
                required
                placeholder="Enter duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="inputField space-y-3">
              <label htmlFor="video-url">Video url</label>
              <input
                type="text"
                name="video-url"
                placeholder="Enter video url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="inputField space-y-3">
              <label htmlFor="video-views">Views</label>
              <input
                type="text"
                name="video-views"
                placeholder="Enter views"
                required
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full quiz-button-container">
            <button
              type="submit"
              className="quiz-submit-button"
              disabled={
                title.trim().length === 0 ||
                duration.trim().length === 0 ||
                views.trim().length === 0 ||
                url.trim().length === 0
              }
            >
              Update
            </button>
          </div>
        </form>
        {/* {error.length > 0 && <div className="error">{error}</div>} */}
        {isSuccess && <div className="success">Update Successful</div>}
        {isError && <div className="error">{error?.status}</div>}
      </div>
    </section>
  );
};

export default EditVideoForm;
