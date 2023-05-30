import React from "react";
import AssignmentMarkItem from "./AssignmentMarkItem";
import { useGetAllAssignmentsMarksQuery } from "../../../features/assignmentMarks/assignmentMarksApi";
import { useSelector } from "react-redux";

const AllAssignmentsMarkTable = () => {
  const { status, countByStatus } = useSelector(
    (state) => state.assignmentsMark
  );
  const {
    data: allAssignmentMarkItems,
    isLoading,
    isError,
    error,
  } = useGetAllAssignmentsMarksQuery();


  // filter by status ...
  const filterByStatus = (assignment) => {
    if (status === "all") {
      return assignment;
    } else if (status === "pending") {
      return assignment?.status.toLowerCase() === "pending";
    } else if (status === "published") {
      return assignment?.status.toLowerCase() === "published";
    }
  };

  // rendering logic...
  let content;
  if (isLoading)
    content = (
      <tr>
        <td>Loading</td>
      </tr>
    );

  if (!isLoading && isError)
    content = (
      <tr>
        <td>{error?.status}</td>
      </tr>
    );

  if (!isLoading && !isError && allAssignmentMarkItems?.length === 0)
    content = (
      <tr>
        <td>No Assignment Item Found</td>
      </tr>
    );

  if (!isLoading && !isError && allAssignmentMarkItems?.length > 0) {
    let contentToShow;
    contentToShow = allAssignmentMarkItems
      ?.filter(filterByStatus)
      ?.map((assignmentItem) => (
        <AssignmentMarkItem
          key={assignmentItem?.id}
          assignmentItem={assignmentItem}
        />
      ));

    if (contentToShow?.length === 0) {
      content = (
        <tr>
          <td>No Assignment Item Found</td>
        </tr>
      );
    } else if (contentToShow?.length > 0) {
      content = contentToShow;
    }
  }

  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Assignment</th>
          <th className="table-th">Date</th>
          <th className="table-th">Student Name</th>
          <th className="table-th">Repo Link</th>
          <th className="table-th">Mark</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-600/50">{content}</tbody>
    </table>
  );
};

export default AllAssignmentsMarkTable;
