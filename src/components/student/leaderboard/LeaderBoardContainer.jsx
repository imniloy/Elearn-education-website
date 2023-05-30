import React from "react";
import MyPositionTable from "./MyPositionTable";
import TopStudentsPositionsTable from "./TopStudentsPositionsTable";
import { useDispatch } from "react-redux";
import { useGetAllAssignmentsMarksQuery } from "../../../features/assignmentMarks/assignmentMarksApi";
import { useGetAllQuizzesMarksQuery } from "../../../features/quizesMarks/quizMarksApi";
import { useGetAllStudentsQuery } from "../../../features/users/usersApi";
import { useEffect } from "react";
import { createLeaderBoard } from "../../../features/ranking/rankingSlice";

const LeaderBoardContainer = () => {
  const dispatch = useDispatch();
  const { data: allStudents } = useGetAllStudentsQuery();
  const { data: studentsAssignmentsMarksArray } =
    useGetAllAssignmentsMarksQuery();
  const { data: studentsQuizzesMarksArray } = useGetAllQuizzesMarksQuery();

  // this useEffect will run when [allStudents, studentsQuizzesMarksArray, studentsAssignmentsMarksArray] any of this value change..
  // dispatch(createLeaderBoard({...}))...
  useEffect(() => {
    if (
      allStudents?.length > 0 &&
      Array.isArray(studentsAssignmentsMarksArray) &&
      Array.isArray(studentsQuizzesMarksArray)
    ) {
      dispatch(
        createLeaderBoard({
          allStudents,
          studentsQuizzesMarksArray,
          studentsAssignmentsMarksArray,
        })
      );
    }
  }, [allStudents, studentsQuizzesMarksArray, studentsAssignmentsMarksArray]);

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="overflow-x-auto">
          <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
          <MyPositionTable />
        </div>

        <div className="my-8 overflow-x-auto">
          <h3 className="text-lg font-bold">Top 20 Result</h3>
          <TopStudentsPositionsTable />
        </div>
      </div>
    </section>
  );
};

export default LeaderBoardContainer;

// Here is an array that sorted decending order based on "totalMarks" and it has some objects. Every object contains a property called "totalMarks". How can i add a property called "rank" to particular objects based on its "totalMarks" property. the objects that contains highest "totalMarks" its rank property will 1 and second highest objects rank property will be increased based on totalMarks. all the objects that contain same totalMarks their rank will same
