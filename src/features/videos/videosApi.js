import apiSlice from "../api/apiSlice";

const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // if query is successful it will return all videos that available for the user...
    getAllVideos: builder.query({
      query: () => `/videos`,
    }),

    // if query is successful it will return a video based on id...
    getSingleVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),

    // update a single video information mutation
    updateThisVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const videoId = arg.id;
        const updatedVideoInfo = await queryFulfilled;

        // pasimistically update the getAllVideos cache...
        dispatch(
          apiSlice.util.updateQueryData("getAllVideos", undefined, (draft) => {
            const indexToUpdate = draft.findIndex(
              (draftvideo) => draftvideo.id == videoId.toString()
            );

            draft[indexToUpdate] = updatedVideoInfo?.data;
          })
        );

        // pasimistically update the getSingleVideo cache...
        dispatch(
          apiSlice.util.updateQueryData("getSingleVideo", videoId, (draft) => {
            Object.assign(draft, updatedVideoInfo?.data);
          })
        );
      },
    }),

    // add new video mutation
    addNewVideo: builder.mutation({
      query: (data) => ({
        url: `/videos`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // passimistically update the getAllVideos cache...
        const newVideo = await queryFulfilled;

        dispatch(
          apiSlice.util.updateQueryData("getAllVideos", undefined, (draft) => {
            draft.push(newVideo?.data);
          })
        );
      },
    }),

    // delete video mutation
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // here we are going to delete the video cache optimistically and update the getAllVideos cache...
        const videoId = arg;
        const deleteResult = dispatch(
          apiSlice.util.updateQueryData("getAllVideos", undefined, (draft) => {
            const indexToDelete = draft.findIndex(
              (draftVideo) => draftVideo.id == videoId
            );
            if (indexToDelete !== -1) {
              draft.splice(indexToDelete, 1);
            }
          })
        );
        try {
          const response = await queryFulfilled;
        } catch (err) {
          deleteResult.undo();
        }
      },
    }),
  }),
});

export default videosApi;
export const {
  useGetAllVideosQuery,
  useGetSingleVideoQuery,
  useDeleteVideoMutation,
  useAddNewVideoMutation,
  useUpdateThisVideoMutation,
} = videosApi;
