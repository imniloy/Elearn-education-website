import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaderBoardArray: [],
};

const rankingSlice = createSlice({
  name: "ranking",
  initialState,
  reducers: {
    createLeaderBoard: (state, action) => {
      const {
        allStudents,
        studentsQuizzesMarksArray,
        studentsAssignmentsMarksArray,
      } = action?.payload;

      const leaderBoard = [];
      let rank = 0;

      allStudents?.forEach((student) => {
        // by this filtering we are going to get this student all quizzes marks array...
        const getStudentQuzziesMarks = studentsQuizzesMarksArray.filter(
          (quiz) => quiz?.student_id === student?.id
        );

        // by this filtering we are going to get this student submitted all assignments marks array...
        const getAssignmentsMarks = studentsAssignmentsMarksArray?.filter(
          (assignment) => assignment?.student_id === student?.id
        );

        // calculateStudentTotalQuizMarks
        const studentTotalQuizMarks = getStudentQuzziesMarks?.reduce(
          (totalMarks, current) => {
            return totalMarks + Number(current?.mark);
          },
          0
        );

        // calculateStudentTotalAssignmentMarks
        const studentTotalAssignmentMarks = getAssignmentsMarks?.reduce(
          (totalMarks, current) => {
            return totalMarks + Number(current?.mark);
          },
          0
        );

        // studentInformation that will push to the leaderBoard array...
        const studentInfo = {
          id: student?.id,
          name: student?.name,
          role: student?.role,
          totalMarks: Number(
            studentTotalQuizMarks + studentTotalAssignmentMarks
          ),
          totalQuizMark: Number(studentTotalQuizMarks),
          totalAssignmentMark: Number(studentTotalAssignmentMarks),
        };

        leaderBoard.push(studentInfo);
      });

      // sort the array in descending order based on totalMarks.....
      leaderBoard?.length > 0 &&
        leaderBoard?.sort(
          (studentOne, studentTwo) =>
            studentTwo?.totalMarks - studentOne?.totalMarks
        );

      // loop through the sorted array and assign rank...
      leaderBoard?.forEach((student, index, studentsArray) => {
        if (student?.totalMarks !== studentsArray[index - 1]?.totalMarks) {
          rank++;
        }
        student.rank = rank;
      });

      //
      state.leaderBoardArray = leaderBoard;
    },
  },
});

export default rankingSlice.reducer;
export const { createLeaderBoard } = rankingSlice.actions;
