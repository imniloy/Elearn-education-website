import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetAllVideosQuery } from "../../../features/videos/videosApi";
import QuizOption from "./QuizOption";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetSingleQuizQuery,
  useUpdateThisQuizMutation,
} from "../../../features/quizes/quizesApi";
import {
  clearOptionInputStatusChanger,
  removeOptionsForSingleQuiz,
} from "../../../features/quizes/quizesSlice";

const EditForm = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const { data: videos } = useGetAllVideosQuery();
  const [selectVideoId, setSelectVideoId] = useState(undefined);
  const [error, setError] = useState("");
  const { optionsForSingleQuiz } = useSelector((state) => state.videoQuizes);

  // get quiz data that admin want to edit...
  const { data: editingQuizData } = useGetSingleQuizQuery(quizId);

  const [
    updateThisQuiz,
    {
      isSuccess: updateQuizMutationIsSuccess,
      isLoading: updateQuizMutationIsLoading,
      isError: updateQuizMutationIsError,
      error: updateQuizMutationError,
    },
  ] = useUpdateThisQuizMutation();

  // a empty array fill with all 0 and length is 4. it will be needed for rendering fours options
  let newArray = Array.from(Array(4), () => 0);

  // render title of all videos that we get from the server as options inside the select and set the options value depending on videoId...
  let videoItemOptions;
  if (videos?.length > 0)
    videoItemOptions = videos?.map((videoItem) => (
      <option key={videoItem?.id} value={videoItem?.id}>
        {videoItem?.title}
      </option>
    ));

  // resetForm
  const resetForm = () => {
    setQuestion("");
    dispatch(removeOptionsForSingleQuiz());
  };

  // this function will called when the form is submitted
  const updateQuizHandler = (e) => {
    e.preventDefault();
    // find out the selected video information rely on videoId that was selected by the user...
    const video = videos?.find(
      (videoItem) => videoItem?.id === Number(selectVideoId)
    );

    //checkout is there any correct value as write answer...
    let minOneCorrectAnswer = optionsForSingleQuiz?.find(
      (option) => option.isCorrect == true
    );

    if (optionsForSingleQuiz?.length >= 2 && minOneCorrectAnswer?.isCorrect) {
      setError("");
      const quizData = {
        question: question.trim(),
        video_id: video?.id,
        video_title: video?.title,
        options: optionsForSingleQuiz,
      };

      // updateThisQuiz
      updateThisQuiz({ quizId, data: quizData });
    } else {
      setError(
        "You must assign minimum two options and at list one correct answer by checked the checkedBox for the quiz"
      );
    }
  };

  // if editingQuizData data is available then reset questionTitle and selectedVideoId...
  useEffect(() => {
    if (editingQuizData?.id) {
      const { question, video_id } = editingQuizData || {};
      setQuestion(question);
      setSelectVideoId(video_id);
    }
  }, [editingQuizData]);

  return (
    <div className="max-w-7xl px-5 lg:px-0 mx-auto py-3">
      <form className="mx-4" onSubmit={updateQuizHandler}>
        <div className="quiz-title-container my-4">
          <h3 className="my-4 text-2xl">Edit quiz name </h3>
          <input
            className="w-full"
            type="text"
            placeholder="Enter a quiz name"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="my-4">
          <h3 className="text-2xl my-4">Edit all options for the Quiz.</h3>
          {newArray.map((option, index) => (
            <QuizOption key={index} id={index + 1} />
          ))}
        </div>

        <div className=" selectVideoContainer my-4">
          <h3 className="text-2xl my-4">Select video</h3>

          <select
            name="videoDetails"
            className=""
            id="lws-videoDetails"
            required
            value={selectVideoId}
            onChange={(e) => setSelectVideoId(e.target.value)}
          >
            <option value={undefined}>Select Video</option>
            {videoItemOptions}
          </select>
        </div>

        <div className="quiz-button-container">
          <button
            type="submit"
            className="quiz-submit-button"
            disabled={
              question.trim().length === 0 ||
              selectVideoId === undefined ||
              selectVideoId === "Select Video" ||
              optionsForSingleQuiz?.length < 2 ||
              updateQuizMutationIsLoading
            }
          >
            Update Quiz
          </button>
        </div>
      </form>
      <div className="w-full horizontal-center vertical-center">
        {updateQuizMutationIsSuccess && (
          <div className="success">updating Successful</div>
        )}
        {updateQuizMutationIsError && (
          <div className="error">{updateQuizMutationError?.status}</div>
        )}
        {error?.length > 0 && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default EditForm;
