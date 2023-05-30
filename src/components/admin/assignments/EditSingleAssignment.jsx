import React from "react";
import EditForm from "./EditForm";

const EditSingleAssignment = () => {
  return (
    <main className="">
      <div className="my-8">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Edit a Assignment
        </h1>
      </div>

      <EditForm />
    </main>
  );
};

export default EditSingleAssignment;
