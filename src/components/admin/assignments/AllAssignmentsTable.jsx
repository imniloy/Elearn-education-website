import React from "react";
import AssignmentItem from "./AssignmentItem";
import { useGetAllAssignmentsQuery } from "../../../features/assignments/assignmentsApi";

const AllAssignmentsTable = () => {
  const {
    data: assignments,
    isLoading,
    isError,
    error,
  } = useGetAllAssignmentsQuery();

  // this content variable will show different things depending on the status of the useGetAllAssignmentsQuery
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
        <td className="error">{error?.status}</td>
      </tr>
    );

  if (!isLoading && !isError && assignments?.length === 0)
    content = (
      <tr>
        <td>No assignment Found! You can add new assignments</td>
      </tr>
    );

  if (!isLoading && !isError && assignments?.length > 0)
    content = assignments?.map((assignment) => (
      <AssignmentItem key={assignment?.id} assignment={assignment} />
    ));

  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Title</th>
          <th className="table-th">Video Title</th>
          <th className="table-th">Mark</th>
          <th className="table-th">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-600/50">{content}</tbody>
    </table>
  );
};

export default AllAssignmentsTable;
