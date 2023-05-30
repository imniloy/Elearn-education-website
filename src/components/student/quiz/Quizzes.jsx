import React, { useState } from "react";
import SingleQuiz from "./SingleQuiz";
import { useNavigate, useParams } from "react-router-dom";
import { useGetQuizesForSpacificVideoQuery } from "../../../features/quizes/quizesApi";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddQuizzesMarksMutation,
  useGetSpacificQuizMarkForSpacificStudentQuery,
} from "../../../features/quizesMarks/quizMarksApi";
import { clearParticipantedQuizs } from "../../../features/quizes/quizesSlice";
import { useEffect } from "react";

const Quizzes = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // this ***[participantedQuizs]*** is by default an empty [] that store in redux store.
  // if the user selects any quiz that will push to the array...
  const { participantedQuizs } = useSelector((state) => state.videoQuizes);
  // based on the ***[videoId]*** the quizzes should change...
  // ***[useGetQuizesForSpacificVideoQuery]** will return different quizzes depending on videoId...
  const {
    data: quizes,
    isLoading,
    isError,
    error: responseError,
  } = useGetQuizesForSpacificVideoQuery(videoId);

  // Every Individual student can perticipate the quizzes based on their participation
  // and result a *** [quizzesMark] *** should be  different...
  // so ***[useGetSpacificQuizMarkForSpacificStudentQuery]*** depends on the ***[videoId && studentId]***
  const { data: quizzesMark } = useGetSpacificQuizMarkForSpacificStudentQuery({
    videoId,
    studentId: user?.id,
  });

  // debugging
  // console.log(participantedQuizs);

  // ***[useAddQuizzesMarksMutation]*** return a ***[addQuizzesMarks]*** function...
  // ***[addQuizzesMarks]*** function will used when user want to submit quizzes...
  const [addQuizzesMarks, { isSuccess: isAddQuizzesMarksSuccess }] =
    useAddQuizzesMarksMutation();

  let content;
  if (isLoading) content = <div className="">Loading</div>;
  if (!isLoading && isError)
    content = <div className="error">{responseError?.status}</div>;
  if (!isLoading && !isError && quizes?.length === 0)
    content = <div className="error">No Quizzes Found for the video</div>;
  if (!isLoading && !isError && quizes?.length > 0)
    content = quizes.map((quiz, index) => (
      <SingleQuiz
        key={quiz?.id}
        quiz={quiz}
        index={index}
        quizzesMark={quizzesMark}
      />
    ));

  // this function will return the quiz mark thet the current student obtain in [quiz/quizzes] that views in the page..
  const studentMarksCalculator = () => {
    return quizzesMark[0]?.mark;
  };

  // this function will return totalMarks of this [quiz/quizzes]...
  const totalMarksCalculator = () => {
    return quizzesMark[0]?.totalMark;
  };

  // this function will called when the student wants to submit the quizzes...
  const handleQuizzesSubmit = () => {
    let totalQuiz = 0;
    let totalCorrect = 0;
    let totalWrong = 0;

    // here ***[participantedQuizs]*** is all the quizzes of this page that the student
    // have[answered / participated] and it stored in *** redux store ***...
    // by default ***[participantedQuizs]*** is an empty array [] contains in redux store...

    participantedQuizs?.forEach((participantedQuiz) => {
      // ***[participantedQuiz?.selectedOptions]*** is an array.
      // if students select any[option / options] of a participantedQuiz is going to store in ***[participant?.selectedOptions]***

      // ***[participantedQuiz?.options]*** is an array... it contains all the options that have in a participantedQuiz...
      if (
        Array.isArray(participantedQuiz.selectedOptions) &&
        participantedQuiz.selectedOptions.length > 0 &&
        Array.isArray(participantedQuiz.options) &&
        participantedQuiz.options.length > 0
      ) {
        let getAllWrongSelectedOptions;
        let getAllCorrectSelectedOptions;
        let getAllCorrectOptions;

        // if the student selects any wrong options...
        getAllWrongSelectedOptions = participantedQuiz?.selectedOptions.find(
          (option) => !option.isCorrect
        );

        getAllCorrectOptions = participantedQuiz.options.filter(
          (option) => option.isCorrect
        );

        getAllCorrectSelectedOptions =
          participantedQuiz?.selectedOptions.filter(
            (option) => option.isCorrect
          );

        // if getAllWrongSelectedOptions is not undefined || getAllCorrectOptions?.length !== getAllCorrectSelectedOptions?.length...
        // then totalWorng++..

        // else check getAllWrongSelectedOptions is undefined &&
        // getAllWrongSelectedOptions?.length === getAllCorrectSelectedOptions?.length then totalCorrect++..

        // after that totalQuiz++..

        getAllWrongSelectedOptions ||
        getAllCorrectOptions?.length !== getAllCorrectSelectedOptions?.length
          ? totalWrong++
          : !getAllWrongSelectedOptions &&
            getAllCorrectOptions?.length ===
              getAllCorrectSelectedOptions?.length &&
            totalCorrect++;

        totalQuiz++;
      }
    });

    // check if user has perticipate all the quizzes then setError("") && proceed him/her to submit the quizzes..
    // else setError("You must answer all quizzes for submit answers");
    // the student must have to participate all the quizzes that available to the page to submit the quizzes answers..

    if (quizes?.length === totalQuiz) {
      setError("");
      // debugging
      // console.log(`totalQuiz + ${totalQuiz}`);
      // console.log(`totalWrong + ${totalWrong}`);
      // console.log(`totalCorrect + ${totalCorrect}`);

      const data = {
        student_id: user?.id,
        student_name: user?.name,
        video_id: Number(videoId),
        video_title: quizes[0]?.video_title,
        totalQuiz,
        totalCorrect,
        totalWrong,
        totalMark: Number(totalQuiz * 5),
        mark: Number(totalCorrect * 5),
      };
      addQuizzesMarks({ videoId, studentId: user?.id, data });
      // after submit navigate to the leaderboard
      navigate("/leaderboard");
    } else {
      setError("You must answer all quizzes for submit answers");
    }
  };

  // if the videoId changes the ***[participantedQuizs]*** should be an empty []..
  // so clear the existing elements...
  useEffect(() => {
    if (videoId) dispatch(clearParticipantedQuizs([]));
  }, [videoId]);

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        {/* Video Title*/}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Quizzes for {quizes?.length > 0 && quizes[0]?.video_title}
          </h1>
          <p className="text-sm text-slate-200">
            Each question contains 5 Mark
          </p>
          {quizzesMark?.length > 0 && (
            <p className="my-4 text-2xl font-bold text-blue">
              You got {studentMarksCalculator()} Marks out of{" "}
              {totalMarksCalculator()}
            </p>
          )}
        </div>
        {/*Quiz Questions Sections */}
        <div className="space-y-8 ">{content}</div>

        <button
          className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 quiz-submit-btn"
          disabled={quizzesMark?.length > 0}
          onClick={handleQuizzesSubmit}
        >
          Submit
        </button>
        {error && <div className="error">{error}</div>}
        {isAddQuizzesMarksSuccess && (
          <div className="success">Successfully submitted</div>
        )}
      </div>
    </section>
  );
};

export default Quizzes;
