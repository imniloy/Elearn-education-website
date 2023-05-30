import React from "react";
import SingleStudentPosition from "./SingleStudentPosition";
import { useSelector } from "react-redux";

const TopStudentsPositionsTable = () => {
  const { leaderBoardArray } = useSelector((state) => state.ranking);

  return (
    <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
      <thead>
        <tr className="border-b border-slate-600/50">
          <th className="table-th !text-center">Rank</th>
          <th className="table-th !text-center">Name</th>
          <th className="table-th !text-center">Quiz Mark</th>
          <th className="table-th !text-center">Assignment Mark</th>
          <th className="table-th !text-center">Total</th>
        </tr>
      </thead>

      <tbody>
        {leaderBoardArray?.length > 0 &&
          leaderBoardArray.map((student) => {
            if (student?.rank < 21) {
              return (
                <SingleStudentPosition
                  key={student?.id}
                  student={student}
                  style="border-b border-slate-600/50"
                />
              );
            } else {
              return false;
            }
          })}
      </tbody>
    </table>
  );
};

export default TopStudentsPositionsTable;
