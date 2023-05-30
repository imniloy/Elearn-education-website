import React from "react";
import { useState } from "react";
import { useAddNewVideoMutation } from "../../../features/videos/videosApi";

const AddVideoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [error, setError] = useState("");
  const [
    addNewVideo,
    { isLoading, isError, error: addNewMutationError, isSuccess },
  ] = useAddNewVideoMutation();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDuration("");
    setViews("");
    setUrl("");
  };

  const addNewVideoHandlerFunc = (e) => {
    e.preventDefault();
    setError("");
    const data = {
      title: title.trim(),
      description: description.trim(),
      duration: duration.trim(),
      url: url.trim(),
      views: views.trim(),
      createdAt: new Date().toISOString(),
    };

    addNewVideo(data);
    resetForm();
  };

  return (
    <section className="py-4 bg-primary">
      <h2 className="my-8 text-3xl font-bold text-center text-gray-800">
        Add new video
      </h2>
      <p className="my-4 text-lg">Please fillup the form to add new video</p>

      <div className="">
        <form className="space-y-6 mt-6" onSubmit={addNewVideoHandlerFunc}>
          <div className="inputField space-y-3">
            <label htmlFor="video-title">Title</label>
            <input
              type="text"
              name="video-title"
              required
              placeholder="Enter Video Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="inputField space-y-3">
            <label htmlFor="video-description">Description</label>
            <textarea
              className="textarea"
              rows="2"
              value={description}
              placeholder="Enter video description"
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
                placeholder="Enter video duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="inputField space-y-3">
              <label htmlFor="video-url">Video url</label>
              <input
                type="text"
                name="video-url"
                required
                placeholder="Enter video url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="inputField space-y-3">
              <label htmlFor="video-views">Views</label>
              <input
                type="number"
                min={0}
                name="video-views"
                required
                placeholder="Enter video views"
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
              Add New Video
            </button>
          </div>
        </form>
        {error.length > 0 && <div className="error">{error}</div>}
        {isSuccess && <div className="success">New Video Added</div>}
        {isError && <div className="error">{addNewMutationError?.status}</div>}
      </div>
    </section>
  );
};

export default AddVideoForm;
