import React from "react";
import QuizItem from "./QuizItem";
import { useGetAllQuizzesQuery } from "../../../features/quizes/quizesApi";

const AllQuizzesTable = () => {
  const { data: quizzes, isLoading, isError, error } = useGetAllQuizzesQuery();

  // decide what to render based on situations...
  let content;
  if (isLoading)
    content = (
      <tr className="">
        <td>Loading...</td>
      </tr>
    );
  if (!isLoading && isError)
    content = (
      <tr className="error">
        <td>{error?.status}</td>
      </tr>
    );

  if (!isLoading && !isError && quizzes?.length === 0)
    content = (
      <tr className="">
        <td>No quiz found</td>
      </tr>
    );
  
  if (!isLoading && !isError && quizzes?.length > 0)
    content = quizzes?.map((quiz) => <QuizItem key={quiz?.id} quiz={quiz} />);

  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <thead>
        <tr>
          <th className="table-th">Question</th>
          <th className="table-th">Video</th>
          <th className="table-th justify-center">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-600/50">{content}</tbody>
    </table>
  );
};

export default AllQuizzesTable;
