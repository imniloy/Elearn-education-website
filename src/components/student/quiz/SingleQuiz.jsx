import React from "react";
import CheckBox from "./CheckBox";

const SingleQuiz = ({ quiz, index }) => {
  const { id, options, question } = quiz || {};

  let content;
  if (options?.length > 0)
    content = options.map((option) => (
      <CheckBox key={option?.id} id={id} quiz={quiz} option={option} />
    ));

  return (
    <div className="quiz">
      <h4 className="question">
        Quiz {index + 1} - {question}
      </h4>
      <form className="quizOptions">
        {/* Options */}
        {content}
      </form>
    </div>
  );
};

export default SingleQuiz;
