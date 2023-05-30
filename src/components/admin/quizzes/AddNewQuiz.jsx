import React from "react";
import AddForm from "./AddForm";

const AddNewQuiz = () => {
  return (
    <main className="">
      <div className="my-8">
        <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">
          Add a New Quiz
        </h1>
      </div>
      {/* add form */}
      <AddForm />
    </main>
  );
};

export default AddNewQuiz;
