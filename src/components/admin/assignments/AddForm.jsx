import React from "react";
import { useState } from "react";
import { useGetAllVideosQuery } from "../../../features/videos/videosApi";
import { useAddNewAssignmentMutation } from "../../../features/assignments/assignmentsApi";

const AddForm = () => {
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [totalMark, setTotalMark] = useState(0);
  const [videoId, setVideoId] = useState(undefined);
  const { data: videos } = useGetAllVideosQuery();
  const [addNewAssignment, { isSuccess, isError, error }] =
    useAddNewAssignmentMutation();
  const [clientError, setClientError] = useState("");

  const resetForm = () => {
    setAssignmentTitle("");
    setTotalMark(0);
    setVideoId(undefined);
  };

  // this function will be fired when admin submit the form and wants to add the assignment...
  const addNewAssignmentHandlerFunc = (e) => {
    e.preventDefault();
    // find out the selected video information rely on videoId that was selected by the user...
    const video = videos.find((videoItem) => videoItem?.id === Number(videoId));
    if (totalMark > -1) {
      const data = {
        title: assignmentTitle.trim(),
        video_id: Number(video?.id),
        video_title: video?.title,
        totalMark: Number(totalMark),
      };
      addNewAssignment(data);
      resetForm();
    } else if (totalMark < 0) {
      setClientError("You can't give negative total marks");
    }
  };

  // render title of all videos that we get from the server as options inside the select and set the options value depending on videoId...
  let videoItemOptions;
  if (videos?.length > 0)
    videoItemOptions = videos?.map((videoItem) => (
      <option key={videoItem?.id} value={videoItem?.id}>
        {videoItem?.title}
      </option>
    ));

  return (
    <>
      <div className="">
        <div className="w-full horizontal-center">
          <form className="space-y-6" onSubmit={addNewAssignmentHandlerFunc}>
            <div className="fieldContainer">
              <label htmlFor="lws-assignmentTitle">Assignment Name</label>
              <input
                type="text"
                name="assignmentTitle"
                id="lws-assignmentTitle"
                required
                placeholder="Assignment Name"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
              />
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-Marks">Total Marks</label>
              <input
                type="number"
                min={0}
                name="lws-Marks"
                id="lws-Marks"
                required
                placeholder="Total Marks"
                value={totalMark}
                onChange={(e) => setTotalMark(e.target.value)}
              />
            </div>

            <div className="fieldContainer">
              <label>Select Video</label>
              <select
                name="videoDetails"
                id="lws-videoDetails"
                required
                onChange={(e) => setVideoId(e.target.value)}
              >
                <option value={undefined} defaultValue>
                  Select Video
                </option>
                {videoItemOptions}
              </select>
            </div>

            <div className="flex justify-end ml-auto">
              <button
                type="submit"
                className="assignment-submit-button"
                disabled={
                  assignmentTitle.trim().length === 0 ||
                  videoId === undefined ||
                  videoId === "Select Video"
                }
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="w-full horizontal-center vertical-center">
          {isSuccess && <div className="success">Added Successful</div>}
          {isError && <div className="error">{error?.status}</div>}
          {clientError.length > 0 && <div className="error">{clientError}</div>}
        </div>
      </div>
    </>
  );
};

export default AddForm;
