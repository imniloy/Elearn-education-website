import apiSlice from "../api/apiSlice";

const quizMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // this query will responsible for getting spacific quizzes against spacific videoId and studentId/student...
    getSpacificQuizMarkForSpacificStudent: builder.query({
      query: ({ videoId, studentId }) =>
        `/quizMark?video_id=${videoId}&student_id=${studentId}`,
    }),

    // this mutation will be called when the student wants to submit his/her quizzes answer...
    addQuizzesMarks: builder.mutation({
      query: ({ videoId, studentId, data }) => ({
        url: `/quizMark`,
        method: "POST",
        body: data,
      }),

      // passimistic update of the getSpacificQuizMarkForSpacificStudent && 
      // getAllQuizzesMarks  cache after successfully addQuizzesMarks mutation happens...
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const newQuizzesMark = await queryFulfilled;

        if (newQuizzesMark?.data?.id) {
          // silent entry to quizMarks cache table
          const videoId = arg.videoId;
          const studentId = arg.studentId;

          // dispatching for update of the getSpacificQuizMarkForSpacificStudent cache...
          dispatch(
            apiSlice.util.updateQueryData(
              "getSpacificQuizMarkForSpacificStudent",
              { videoId, studentId },
              (draft) => {
                draft.push(newQuizzesMark?.data);
              }
            )
          );
 
          // dispatching for update of the getAllQuizzesMarks cache...
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllQuizzesMarks",
              undefined,
              (draft) => {
                draft.push(newQuizzesMark?.data);
              }
            )
          );
        }
      },
    }),

    getAllQuizzesMarks: builder.query({
      query: () => `/quizMark`,
    }),
  }),
});

export default quizMarksApi;
export const {
  useGetSpacificQuizMarkForSpacificStudentQuery,
  useAddQuizzesMarksMutation,
  useGetAllQuizzesMarksQuery,
} = quizMarksApi;
