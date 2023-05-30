import apiSlice from "../api/apiSlice";

const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // this query is used to get assignment based on videoId ...
    getSpacificAssignmentForSpacificVideo: builder.query({
      query: (videoId) => `/assignments?video_id=${videoId}`,
    }),

    // this query is used to get all assignments ...
    getAllAssignments: builder.query({
      query: () => `/assignments`,
    }),

    // this query is used to get a single assignment...
    getSingleAssignment: builder.query({
      query: (assignmentId) => `/assignments/${assignmentId}`,
    }),

    // this mutation responsible for add new Assignment...
    addNewAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignments`,
        body: data,
        method: "POST",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const newAssignment = await queryFulfilled;

        if (newAssignment?.data?.id) {
          // here pasimistically add the new assignment in the getAllAssignments cache
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllAssignments",
              undefined,
              (draft) => {
                draft.push(newAssignment?.data);
              }
            )
          );
        }
      },
    }),

    // this mutation responsible for updating the particular assignment...
    updateAssignment: builder.mutation({
      query: ({ assignmentId, videoId, data }) => ({
        url: `/assignments/${assignmentId}`,
        method: `PATCH`,
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const assignmentId = arg.assignmentId;
        const videoId = arg.videoId;

        const updatedAssignment = await queryFulfilled;

        if (updatedAssignment?.data?.id) {
          // here passimistically update the getAllAssignments cache with the updated assignment value
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllAssignments",
              undefined,
              (draft) => {
                const indexToUpdate = draft.findIndex(
                  (draftAssignment) =>
                    draftAssignment?.id == assignmentId.toString()
                );

                draft[indexToUpdate] = updatedAssignment?.data;
              }
            )
          );

          // here passimistically update the getSingleAssignment cache with the updated assignment value
          dispatch(
            apiSlice.util.updateQueryData(
              "getSingleAssignment",
              assignmentId,
              (draft) => {
                Object.assign(draft, updatedAssignment?.data);
              }
            )
          );
        }
      },
    }),

    // this mutation responsible for deleting the particular assignment...
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // optimistically update the getAllAssignments cache...
        const assignmentIdToDelete = arg;
        const deleteAssignment = dispatch(
          apiSlice.util.updateQueryData(
            "getAllAssignments",
            undefined,
            (draft) => {
              const indexToDelete = draft.findIndex(
                (assignment) =>
                  assignment?.id == assignmentIdToDelete.toString()
              );

              if (indexToDelete !== -1) {
                draft.splice(indexToDelete, 1);
              }
            }
          )
        );

        try {
          const response = await queryFulfilled;
        } catch (e) {
          deleteAssignment.undo();
        }
      },
    }),
  }),
});

export default assignmentsApi;
export const {
  useGetSpacificAssignmentForSpacificVideoQuery,
  useGetAllAssignmentsQuery,
  useAddNewAssignmentMutation,
  useUpdateAssignmentMutation,
  useGetSingleAssignmentQuery,
  useDeleteAssignmentMutation,
} = assignmentsApi;
