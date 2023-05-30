import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetSpacificQuizMarkForSpacificStudentQuery } from "../../../features/quizesMarks/quizMarksApi";
import { useParams } from "react-router-dom";
import {
  addAnotherOptionToSelect,
  removeAnotherSeletedOption,
  singleAnsweredQuiz,
} from "../../../features/quizes/quizesSlice";

const CheckBox = ({ id, quiz, option }) => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { participantedQuizs } = useSelector((state) => state.videoQuizes);

  // Every Individual student can perticipate the quizzes based on their participation
  // and result a *** [quizzesMark] *** should be  different...
  // so ***[useGetSpacificQuizMarkForSpacificStudentQuery]*** depends on the ***[videoId && studentId]***
  const { data: quizzesMark } = useGetSpacificQuizMarkForSpacificStudentQuery({
    videoId,
    studentId: user?.id,
  });

  // **[selectedOptionFunc]** is called when the user wants to change the checkbox/input field value...
  const selectedOptionFunc = (e, option) => {
    setIsChecked(!isChecked);
    // figure out participantedQuiz index from the participantedQuizs and store it the isparticipanted variable...
    const isparticipanted = participantedQuizs?.findIndex(
      (participant) => participant?.id === id
    );

    // if isParticipanted === -1 && selected option is checked then dispatch(singleAnsweredQuiz{...})...
    // else  if isParticipanted > -1 && e.target.checked dispatch(addAnotherOptionToSelect({...}))...
    // else dispatch(removeAnotherSeletedOption{...})...
    // see info about **[singleAnsweredQuiz, addAnotherOptionToSelect, removeAnotherSeletedOption]**
    // in ** [quizesSlice] ** file..
    
    if (isparticipanted === -1 && e.target.checked) {
      dispatch(
        singleAnsweredQuiz({
          ...quiz,
          selectedOptions: [option],
        })
      );
    } else if (isparticipanted > -1 && e.target.checked) {
      dispatch(
        addAnotherOptionToSelect({
          id,
          newOption: option,
        })
      );
    } else if (isparticipanted > -1 && e.target.checked === false) {
      dispatch(
        removeAnotherSeletedOption({
          id,
          removeOption: option,
        })
      );
    }
  };

  // useEffect will rund when the value of **[quizzesMark]** changers...
  useEffect(() => {
    // if the (quizzesMark.length > 0 && quizzesMark[0]?.id) condition is satisfied then setIsDisabled(true) and do other stuff...
    if (quizzesMark?.length > 0 && quizzesMark[0]?.id) {
      setIsChecked(option?.isCorrect);
      setIsDisable(true);
    }
  }, [quizzesMark]);

  return (
    <label htmlFor={`option${id}_q${option?.id}`}>
      <input
        id={`option${id}_q${option?.id}`}
        type="checkbox"
        checked={isChecked}
        disabled={isDisable}
        onChange={(e) => selectedOptionFunc(e, option)}
      />
      <span>{option?.option}</span>
    </label>
  );
};

export default CheckBox;
