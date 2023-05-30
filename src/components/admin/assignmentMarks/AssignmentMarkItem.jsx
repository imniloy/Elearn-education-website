import moment from "moment";
import React from "react";
import { useState } from "react";
import {
  useGetSingleAssignmentMarkQuery,
  useUpdateAssignmentMarkMutation,
} from "../../../features/assignmentMarks/assignmentMarksApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCountByStatus } from "../../../features/assignmentMarks/assignmentsMarksSlice";

const AssignmentMarkItem = ({ assignmentItem }) => {
  const dispatch = useDispatch();
  const [givenMark, setGivenMark] = useState("");
  const [isSkip, setIsSkip] = useState(true);
  const { id, title, student_name, createdAt, totalMark, repo_link } =
    assignmentItem || {};
  const { data: assignmentMarkData } = useGetSingleAssignmentMarkQuery(id, {
    skip: isSkip,
  });
  const [updateAssignmentMark, {}] = useUpdateAssignmentMarkMutation();

  useEffect(() => {
    if (id !== undefined && id !== null) {
      setIsSkip(false);
    }
  }, [id]);

  // when the admin give the number and click on the submit button..
  const provideMarkHandlerFunc = () => {
    if (givenMark.trim().length === 0) return;
    if (Number(givenMark.trim()) > Number(totalMark)) return;
    if (Number(givenMark.trim()) < 0) return;
    if (Number(givenMark.trim()) > totalMark) return;
    const data = {
      mark: Number(givenMark.trim()),
      status: "published",
    };

    updateAssignmentMark({ id, data });
    dispatch(updateCountByStatus());
  };

  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">
        {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>

      {/* conditional rendering of the mark input box and mark data. if assignmentMarkData?.status.toString() === "pending" then show input box so that the admin can give number else show the marks value  */}
      {assignmentMarkData?.status.toString() === "pending" ? (
        <td className="table-td input-mark">
          <input
            min={0}
            max={totalMark}
            type="number"
            value={givenMark}
            onChange={(e) => setGivenMark(e.target.value)}
          />
          <div className="" onClick={provideMarkHandlerFunc}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </td>
      ) : (
        <td className="table-td">{assignmentMarkData?.mark}</td>
      )}
    </tr>
  );
};

export default AssignmentMarkItem;
