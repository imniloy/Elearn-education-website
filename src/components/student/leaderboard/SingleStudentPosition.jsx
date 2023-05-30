import React from "react";

const SingleStudentPosition = ({ style, student }) => {
  const {
    id,
    name,
    rank,
    totalAssignmentMark,
    totalMarks,
    totalQuizMark,
  } = student || {};

  return (
    <tr className={`${style}`}>
      <td className="table-td text-center">{rank}</td>
      <td className="table-td text-center">{name}</td>
      <td className="table-td text-center">{totalQuizMark}</td>
      <td className="table-td text-center">{totalAssignmentMark}</td>
      <td className="table-td text-center">{totalMarks}</td>
    </tr>
  );
};

export default SingleStudentPosition;
