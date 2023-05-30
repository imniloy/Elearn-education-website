import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleVideoQuery } from "../../../features/videos/videosApi";
import moment from "moment/moment";
import { useGetQuizesForSpacificVideoQuery } from "../../../features/quizes/quizesApi";
import { useSelector } from "react-redux";
import { useGetSpacificQuizMarkForSpacificStudentQuery } from "../../../features/quizesMarks/quizMarksApi";
import { useGetSpacificAssignmentForSpacificVideoQuery } from "../../../features/assignments/assignmentsApi";
import { useGetSpacificAssignmentMarkForSpacificStudentQuery } from "../../../features/assignmentMarks/assignmentMarksApi";
import { useState } from "react";
import { useEffect } from "react";

const Player = ({ control }) => {
  const [fetchAssignmentMark, setFetchAssignmentMark] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const { videoId } = useParams();
  const { data: quizes } = useGetQuizesForSpacificVideoQuery(videoId);
  // Every individual student should have different ***[quizMark]*** for different videos if they perticipated in quizzes...
  // This ***[useGetSpacificQuizMarkForSpacificStudentQuery]*** will return the ***[quizMark]*** based on different studentId and different  videoId...
  const { data: quizMark } = useGetSpacificQuizMarkForSpacificStudentQuery({
    videoId,
    studentId: user?.id,
  });

  // depending on videoId this ***[useGetSingleVideoQuery]*** will return different video if they exist in server...
  const {
    data: video,
    error: VideoFetchingError,
    isError,
  } = useGetSingleVideoQuery(videoId);

  // Depending on videoId if assignment exists in server this query will return the assignment...
  const { data: assignment, isLoading: assignmentLoading } =
    useGetSpacificAssignmentForSpacificVideoQuery(videoId);

  // Depending on the studentId and assignmentId if assignmentMark is available this query will return the assignmentMark...
  // here depending on ***[fetchAssignmentMark]*** ***[useGetSpacificAssignmentMarkForSpacificStudentQuery]*** will called .
  // if the ***[fetchAssignmentMark]*** is false the query happens else the query will skip...
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

  const { title, id, createdAt, description, url } = video || {};

  // here quizesButton && assignmentButton variable is responsible for redering jsx element for the quiz button && assignment button...
  let assignmentButton;
  let quizesButton;

  // based on the ***[quizMark]*** && ***[quizes]*** data that we get from the server.
  //  Then decide what to render as quizesButton...
  if (quizMark?.length > 0 && quizes?.length > 0) {
    quizesButton = (
      <Link
        to={`/videos/${videoId}/quizes`}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        কুইজে অংশগ্রহণ করেছেন।
      </Link>
    );
  } else if (quizMark?.length === 0 && quizes?.length > 0) {
    quizesButton = (
      <Link
        to={`/videos/${videoId}/quizes`}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        কুইজে বাকি আছে।
      </Link>
    );
  } else if (quizMark?.length === 0 && quizes?.length === 0) {
    quizesButton = (
      <button
        disabled={true}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        কুইজে নাই।
      </button>
    );
  }

  // based on the ***[assignmentMark]*** && ***[assignment]*** data that we get from the server.
  // Then decide what to render as assignmentButton...
  if (assignment?.length > 0 && assignmentMark?.length > 0) {
    assignmentButton = (
      <button
        disabled={assignmentLoading}
        onClick={control}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        এসাইনমেন্ট জমা দিয়েছেন।
      </button>
    );
  } else if (assignment?.length > 0 && assignmentMark?.length === 0) {
    assignmentButton = (
      <button
        disabled={assignmentLoading}
        onClick={control}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        এসাইনমেন্ট জমা দেননি।
      </button>
    );
  }

  // this useEffect will run if the value of ***[assignment, fetchAssignmentMark]*** is changed...
  useEffect(() => {
    // here we check if ***[assignment[0].id]*** exists then ***[setFetchAssignmentMark]*** false... else ***[setFetchAssignmentMark]*** true...
    if (assignment?.length > 0 && assignment[0]?.id) {
      setFetchAssignmentMark(false);
    } else {
      setFetchAssignmentMark(true);
    }
  }, [assignment, fetchAssignmentMark]);

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      {isError ? (
        <>
          {VideoFetchingError?.status === 404 && (
            <div className="error">This video doesn't exist</div>
          )}
        </>
      ) : (
        <div className="">
          {/* Video */}

          <iframe
            width="100%"
            className="aspect-video"
            src={url}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          {/* Descriptions and titles */}
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
              {title}
            </h1>
            {createdAt && (
              <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                Uploaded on{" "}
                {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </h2>
            )}

            <div className="flex gap-4 text-center">
              {/* assignment button */}
              {assignmentButton}
              {/* quiz button */}
              {quizesButton}
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-6">
              {description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
