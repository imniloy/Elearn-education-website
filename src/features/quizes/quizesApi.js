import apiSlice from "../api/apiSlice";

const quizesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // this query is responsible for showing different quizzes based on videoId...
    getQuizesForSpacificVideo: builder.query({
      query: (videoId) => `/quizzes?video_id=${videoId}`,
    }),
    // get all quizzes...
    getAllQuizzes: builder.query({
      query: () => `/quizzes`,
    }),

    // get single quiz...
    getSingleQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,
    }),

    // when admin wants to create a new quiz this will do work...
    createNewQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizzes`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const quizId = arg.quizId;
        const newQuiz = await queryFulfilled;

        if (newQuiz?.data?.id) {
          // here passimistically update the getAllQuizzes cache with the new quiz value...
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllQuizzes",
              undefined,
              (draft) => {
                draft.push(newQuiz?.data);
              }
            )
          );
        }
      },
    }),

    // when admin wants to create a new quiz this will do work...
    updateThisQuiz: builder.mutation({
      query: ({ quizId, data }) => ({
        url: `/quizzes/${quizId}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const quizId = arg.quizId;
        const updatedQuiz = await queryFulfilled;

        if (updatedQuiz?.data?.id) {
          // here passimistically update the getAllQuizzes cache with the updated quiz value...
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllQuizzes",
              undefined,
              (draft) => {
                const indexToUpdate = draft.findIndex(
                  (draftquiz) => draftquiz?.id == quizId.toString()
                );

                draft[indexToUpdate] = updatedQuiz?.data;
              }
            )
          );

          // here passimistically update the getSingleQuiz cache with the updated quiz value
          dispatch(
            apiSlice.util.updateQueryData("getSingleQuiz", quizId, (draft) => {
              Object.assign(draft, updatedQuiz?.data);
            })
          );
        }
      },
    }),

    // when admin wants to delete a quiz this will do work...
    deleteParticularQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const deletedId = arg;
        // optimistically update the getAllQuizzes caches...
        const deleteResult = dispatch(
          apiSlice.util.updateQueryData("getAllQuizzes", undefined, (draft) => {
            const indexToDelete = draft.findIndex(
              (draftquiz) => draftquiz?.id == deletedId.toString()
            );

            if (indexToDelete !== -1) {
              draft.splice(indexToDelete, 1);
            }
          })
        );

        try {
          const deletedQuiz = await queryFulfilled;
        } catch (e) {
          deleteResult.undo();
        }
      },
    }),
  }),
});

export default quizesApi;
export const {
  useGetQuizesForSpacificVideoQuery,
  useGetSingleQuizQuery,
  useGetAllQuizzesQuery,
  useCreateNewQuizMutation,
  useUpdateThisQuizMutation,
  useDeleteParticularQuizMutation,
} = quizesApi;
