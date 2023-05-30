import React from "react";
import AddForm from "./AddForm";

const AddNewAssignment = () => {
  return (
    <main className="">
      <div className="my-8">
        <h2 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Add a New Assignment
        </h2>
      </div>
      {/* add form */}
      <AddForm />
    </main>
  );
};

export default AddNewAssignment;
