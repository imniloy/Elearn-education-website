import apiSlice from "../api/apiSlice";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => `/users?role=student`,
    }),
  }),
});

export default usersApi;
export const { useGetAllStudentsQuery } = usersApi;
