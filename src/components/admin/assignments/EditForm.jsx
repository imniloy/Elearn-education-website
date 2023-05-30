import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSingleAssignmentQuery,
  useUpdateAssignmentMutation,
} from "../../../features/assignments/assignmentsApi";
import { useEffect } from "react";
import { useGetAllVideosQuery } from "../../../features/videos/videosApi";

const EditForm = () => {
  const { assignmentId } = useParams();
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [totalMark, setTotalMark] = useState(0);
  const [videoId, setVideoId] = useState(undefined);
  const { data: videos } = useGetAllVideosQuery();

  const [
    updateAssignment,
    {
      isSuccess: updateMutationSuccess,
      isError: updateMutationIsError,
      error: updateMutationError,
    },
  ] = useUpdateAssignmentMutation();

  // this query is responsible for getting the single assignment...
  const {
    data: getSingleAssignment,
    isError,
    error,
  } = useGetSingleAssignmentQuery(assignmentId);

  // this function will be fired when admin submit the form and wants to add the assignment...
  const editAssignmentHandlerFunc = (e) => {
    e.preventDefault();

    // findout the selected video so that we assign assignment to the video...
    const SelectedVideoToAttachAssignment = videos?.find(
      (video) => video?.id === videoId
    );

    const data = {
      title: assignmentTitle.trim(),
      video_id: Number(SelectedVideoToAttachAssignment?.id),
      video_title: SelectedVideoToAttachAssignment?.title,
      totalMark: Number(totalMark),
    };

    updateAssignment({ assignmentId, videoId, data });
  };

  // render title of all videos that we get from the server as options inside the select and set the options value depending on videoId...
  let videoItemOptions;
  if (videos?.length > 0)
    videoItemOptions = videos?.map((videoItem) => (
      <option key={videoItem?.id} value={videoItem?.id}>
        {videoItem?.title}
      </option>
    ));

  // if getSingleAssignment is available then we need to set the assignment value to our local state value...
  useEffect(() => {
    if (getSingleAssignment?.id) {
      const { title, video_id, totalMark } = getSingleAssignment || {};
      setAssignmentTitle(title);
      setTotalMark(totalMark);
      setVideoId(video_id);
    }
  }, [getSingleAssignment]);

  return (
    <>
      <div className="">
        <div className="w-full horizontal-center">
          <form className="space-y-6" onSubmit={editAssignmentHandlerFunc}>
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
                disabled
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
                value={videoId}
                onChange={(e) => setVideoId(Number(e.target.value))}
              >
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
                Update
              </button>
            </div>
          </form>
        </div>
        <div className="w-full horizontal-center vertical-center">
          {updateMutationSuccess && (
            <div className="success">Update Successful</div>
          )}
          {updateMutationIsError && (
            <div className="error">{updateMutationError?.status}</div>
          )}
          {isError && <div className="error">{error?.status}</div>}
        </div>
      </div>
    </>
  );
};

export default EditForm;
