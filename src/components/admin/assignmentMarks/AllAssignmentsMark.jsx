import React from "react";
import AllAssignmentsMarkTable from "./AllAssignmentsMarkTable";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  setCountByStatus,
} from "../../../features/assignmentMarks/assignmentsMarksSlice";
import { useGetAllAssignmentsMarksQuery } from "../../../features/assignmentMarks/assignmentMarksApi";
import { useEffect } from "react";

const AllAssignmentsMark = () => {
  const { data: allAssignmentMarkItems } = useGetAllAssignmentsMarksQuery();
  const dispatch = useDispatch();
  const { status, countByStatus } = useSelector(
    (state) => state.assignmentsMark
  );

  // this function will change the status depending on the status the assignments marks items will render...
  const handleStatus = (value) => {
    dispatch(changeStatus(value));
  };

  useEffect(() => {
    // setCountByStatus
    if (allAssignmentMarkItems?.length > 0) {
      dispatch(setCountByStatus(allAssignmentMarkItems));
    }
  }, [allAssignmentMarkItems]);

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <ul className="assignment-status">
            <li onClick={() => handleStatus("all")}>
              Total <span>{countByStatus?.total}</span>
            </li>
            <li onClick={() => handleStatus("pending")}>
              Pending <span>{countByStatus?.pending}</span>
            </li>
            <li onClick={() => handleStatus("published")}>
              Mark Sent <span>{countByStatus?.published}</span>
            </li>
          </ul>
          <div className="overflow-x-auto mt-4">
            <AllAssignmentsMarkTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllAssignmentsMark;
