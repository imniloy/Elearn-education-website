import React from "react";
import SingleStudentPosition from "./SingleStudentPosition";
import { useDispatch, useSelector } from "react-redux";

const MyPositionTable = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { leaderBoardArray } = useSelector((state) => state.ranking);

  const loggedInStudentPosition = leaderBoardArray?.find(
    (student) => student.id === user?.id
  );

  return (
    <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
      <thead>
        <tr>
          <th className="table-th !text-center">Rank</th>
          <th className="table-th !text-center">Name</th>
          <th className="table-th !text-center">Quiz Mark</th>
          <th className="table-th !text-center">Assignment Mark</th>
          <th className="table-th !text-center">Total</th>
        </tr>
      </thead>

      <tbody>
        {loggedInStudentPosition?.id && (
          <SingleStudentPosition
            key={loggedInStudentPosition?.id}
            student={loggedInStudentPosition}
            style="border-2 border-cyan"
          />
        )}
      </tbody>
    </table>
  );
};

export default MyPositionTable;
