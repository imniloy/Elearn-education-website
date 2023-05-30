import React from "react";
import EditForm from "./EditForm";

const EditQuiz = () => {
  return (
    <main className="">
      <div className="my-8">
        <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">
          Edit this Quiz
        </h1>
      </div>
      {/* edit form */}
      <EditForm />
    </main>
  );
};

export default EditQuiz;
