import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOptionsForSingleQuiz,
  clearOptionInputStatusChanger,
} from "../../../features/quizes/quizesSlice";
import { useGetSingleQuizQuery } from "../../../features/quizes/quizesApi";
import { useParams } from "react-router-dom";

const QuizOption = ({ id }) => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const [optionInput, setOptionInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSkip, setIsSkip] = useState(true);
  const { clearOptionInputStatus } = useSelector((state) => state.videoQuizes);
  const { data: editingQuizData } = useGetSingleQuizQuery(quizId, {
    skip: isSkip,
  });

  useEffect(() => {
    if (optionInput.trim().length > 0) {
      const data = {
        id,
        option: optionInput.trim(),
        isCorrect,
      };

      dispatch(addOptionsForSingleQuiz(data));
    }
  }, [optionInput, isCorrect]);

  useEffect(() => {
    if (clearOptionInputStatus) {
      setOptionInput("");
      setIsCorrect(false);
      dispatch(clearOptionInputStatusChanger(false));
    }
  }, [clearOptionInputStatus]);

  
  // if quizId is not undefined then setIsSkip set to fase..
  // if editingQuizData data is available then set all the options...
  useEffect(() => {
    if (quizId !== undefined) {
      setIsSkip(false);
    }

    if (editingQuizData?.id) {
      const { options } = editingQuizData || {};
      // figure out the option value form the options for this option...here we are going to compare the [option.id] with id of this option that we get from props... if it same then set the option value to this option...
      const getThisOption = options.find((option) => option.id === id);

      if (getThisOption?.id) {
        setOptionInput(getThisOption?.option);
        setIsCorrect(getThisOption?.isCorrect);
      }
    }
  }, [editingQuizData, quizId]);

  return (
    <div className="quiz-option">
      <input
        type="text"
        placeholder={`Enter option ${id}`}
        name="quiz-option-name"
        value={optionInput}
        onChange={(e) => setOptionInput(e.target.value)}
      />

      <div className="checkbox-conatiner">
        <label htmlFor={`option-${id}`}>
          <input
            type="checkbox"
            checked={isCorrect}
            onChange={(e) => setIsCorrect(!isCorrect)}
            name={`option-${id}`}
            id={`option-${id}`}
          />
        </label>
      </div>
    </div>
  );
};

export default QuizOption;
