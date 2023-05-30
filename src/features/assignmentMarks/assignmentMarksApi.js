import apiSlice from "../api/apiSlice";

const assignmentMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSpacificAssignmentMarkForSpacificStudent: builder.query({
      query: ({ studentId, assignmentId }) =>
        `/assignmentMark?student_id=${studentId}&assignment_id=${assignmentId}`,
    }),

    submitAssignment: builder.mutation({
      query: ({ studentId, assignmentId, data }) => ({
        url: `/assignmentMark`,
        method: "POST",
        body: data,
      }),

      // passimistic update of the getSpacificAssignmentMarkForSpacificStudent cache after successfully submitAssignment mutation happens...
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const newAssignmentMark = await queryFulfilled;

        if (newAssignmentMark?.data?.id) {
          // silent entry to quizMarks cache table
          const studentId = arg.studentId;
          const assignmentId = arg.assignmentId;

          // dispatching for update of the getSpacificQuizMarkForSpacificStudent cache...
          dispatch(
            apiSlice.util.updateQueryData(
              "getSpacificAssignmentMarkForSpacificStudent",
              { studentId, assignmentId },
              (draft) => {
                draft.push(newAssignmentMark?.data);
              }
            )
          );
        }
      },
    }),

    getAllAssignmentsMarks: builder.query({
      query: () => `/assignmentMark`,
    }),

    getSingleAssignmentMark: builder.query({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
      }),
    }),

    updateAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const assignmentMarkId = arg.id;
        const updatedAssignmentMark = await queryFulfilled;

        // update the getSingleAssignmentMark cache...
        dispatch(
          apiSlice.util.updateQueryData(
            "getSingleAssignmentMark",
            updatedAssignmentMark?.data?.id,
            (draft) => {
              Object.assign(draft, updatedAssignmentMark?.data);
            }
          )
        );

        // update the getAllAssignmentsMarks cache...
        dispatch(
          apiSlice.util.updateQueryData(
            "getAllAssignmentsMarks",
            undefined,
            (draft) => {
              const indexToUpdate = draft.findIndex(
                (draftAssignmentMarkItem) =>
                  draftAssignmentMarkItem.id == assignmentMarkId.toString()
              );

              draft[indexToUpdate] = updatedAssignmentMark?.data;
            }
          )
        );
      },
    }),
  }),
});

export default assignmentMarksApi;
export const {
  useGetSpacificAssignmentMarkForSpacificStudentQuery,
  useGetAllAssignmentsMarksQuery,
  useGetSingleAssignmentMarkQuery,
  useSubmitAssignmentMutation,
  useUpdateAssignmentMarkMutation,
  useDeleteAllAssignmentsMarkRecordsMutation,
} = assignmentMarksApi;
