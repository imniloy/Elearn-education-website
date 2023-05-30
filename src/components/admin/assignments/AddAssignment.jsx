import React from "react";
import AllAssignmentsTable from "./AllAssignmentsTable";
import { useNavigate } from "react-router-dom";

const AddAssignment = () => {
  const navigate = useNavigate();
  const addNewAssignmentHandler = () => {
    navigate(`/admin/assignments/add-new-assignment`)
  };

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <button className="btn ml-auto" onClick={addNewAssignmentHandler}>
              Add Assignment
            </button>
          </div>
          <div className="overflow-x-auto mt-4">
            <AllAssignmentsTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAssignment;
