import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { useGetSpacificAssignmentForSpacificVideoQuery } from "../../features/assignments/assignmentsApi";
import {
  useGetSpacificAssignmentMarkForSpacificStudentQuery,
  useSubmitAssignmentMutation,
} from "../../features/assignmentMarks/assignmentMarksApi";
import { useSelector } from "react-redux";

const PopUpModal = ({ isModalOpen, control }) => {
  Modal.setAppElement("#root");
  const { videoId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [input, setInput] = useState("");
  const [disableInput, setDisableInput] = useState(false);
  const [fetchAssignmentMark, setFetchAssignmentMark] = useState(true);
  const { data: assignment, isLoading: assignmentLoading } =
    useGetSpacificAssignmentForSpacificVideoQuery(videoId);

  const { data: assignmentMark } =
    useGetSpacificAssignmentMarkForSpacificStudentQuery(
      {
        studentId: user?.id,
        assignmentId: assignment && assignment[0]?.id,
      },
      {
        skip: fetchAssignmentMark,
      }
    );

  const [
    submitAssignment,
    {
      isSuccess: isSubmitAssignmentSuccessfull,
      error,
      isError: isSubmitAssignmentError,
    },
  ] = useSubmitAssignmentMutation();

  const assignmentSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      student_id: user?.id,
      student_name: user?.name,
      assignment_id: assignment[0]?.id,
      title: assignment[0]?.video_title,
      createdAt: new Date().toISOString(),
      totalMark: 100,
      mark: 0,
      repo_link: input,
      status: "pending",
    };

    if (data) {
      submitAssignment({
        studentId: user?.id,
        assignmentId: assignment[0]?.id,
        data,
      });
    }
  };

  // based on the assignmentMark && assignment data that we get from the server. Then decide what to render as assignmentButton...
  let assignmentSubmitButton;
  if (assignment?.length > 0 && assignmentMark?.length > 0) {
    assignmentSubmitButton = (
      <button
        className="assignment-submit-button"
        disabled={
          input.trim().length === 0 || assignmentMark.length > 0 || assignmentLoading
        }
        type="submit"
      >
        এসাইনমেন্ট জমা দিয়েছেন।
      </button>
    );
  } else if (assignment?.length > 0 && assignmentMark?.length === 0) {
    assignmentSubmitButton = (
      <button
        className="assignment-submit-button"
        disabled={
          input.trim().length === 0 || assignmentMark.length > 0 || assignmentLoading
        }
        type="submit"
      >
        এসাইনমেন্ট জমা দিন
      </button>
    );
  }

  useEffect(() => {
    if (assignment?.length > 0 && assignment[0]?.id) {
      setFetchAssignmentMark(false);
    } else {
      setFetchAssignmentMark(true);
    }
  }, [assignment, fetchAssignmentMark]);

  useEffect(() => {
    if (assignmentMark?.length > 0 && assignmentMark[0]?.id) {
      setInput(assignmentMark[0]?.repo_link);
      setDisableInput(true);
    }
  }, [assignmentMark]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={control}
      overlayClassName="modal-overlay"
      className="modal-content"
      contentLabel="Assignment submit modal"
      closeTimeoutMS={100}
      shouldFocusAfterRender={true}
    >
      <div className="">
        <div className="model-close-botton-container">
          <button className="model-close-botton" onClick={control}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form method="POST" onSubmit={assignmentSubmitHandler}>
          <div className="modal-assignment-content">
            <h1 className="modal-headerline">
              <span>এসাইনমেন্ট </span>
              জমা দিন
            </h1>

            {/* assignment details */}
            <div className="modal-github-container mt-4 mb-8">
              <p className="header">এসাইনমেন্টের নাম :</p>
              <p className="header">{assignment[0]?.title}</p>

              {/* total Marks */}
              <div className="mt-4 header">
                <span className="mx-4  text-blue">Total Mark</span>
                <span className=" text-blue">{assignment[0]?.totalMark}</span>
              </div>

              {/* your marks */}
              {assignmentMark?.length > 0 && (
                <div className="my-4 header">
                  <span className="mx-4 text-blue">Your obtain Mark -</span>
                  {assignmentMark?.length > 0 &&
                  assignmentMark[0]?.status === "published" ? (
                    <span className="text-blue">{assignmentMark[0]?.mark}</span>
                  ) : (
                    <span className="text-blue">Pending</span>
                  )}
                </div>
              )}
            </div>
            <div className="modal-github-container">
              <p className="header">গিটহাব রিপোসিটরি লিঙ্ক *</p>
              <p className="normal-text">
                যে রিপোসিটরি লিঙ্কটি আপনি গিটহাব ক্লাসরুম থেকে পেয়েছেন
              </p>

              <div className="input-box-container">
                <input
                  type="text"
                  name="github-link"
                  className="input-box"
                  value={input}
                  disabled={disableInput}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            </div>
            <div className="model-close-botton-container">
              {assignmentSubmitButton}
            </div>
          </div>
        </form>
        {isSubmitAssignmentSuccessfull && (
          <div className="success">Successfully submitted</div>
        )}

        {isSubmitAssignmentError && <div className="error">{error?.data}</div>}
      </div>
    </Modal>
  );
};

export default PopUpModal;
