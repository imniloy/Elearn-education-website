import React from "react";
import AllQuizzesTable from "./AllQuizzesTable";
import { Link, useNavigate } from "react-router-dom";

const Quizzes = () => {
  const navigate = useNavigate();

  const addNewQuiz = () => {
    navigate(`/admin/quizzes/add-new-quiz`);
  };

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex justify-end">
            <button className="btn ml-auto" onClick={addNewQuiz}>
              Add Quiz
            </button>
          </div>
          <div className="overflow-x-auto mt-4">
            <AllQuizzesTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quizzes;
