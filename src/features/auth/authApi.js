import apiSlice from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: `/register`,
        body: data,
        method: "POST",
      }),

      // onQueryStarted will run while the mutation is started ...
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;

          // in the response variables we are going to get user accessToken and information we need to store the information in the localStorage so that we can use it in our authentication mechanism...
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: response.data.accessToken,
              user: {
                email: response.data.user.email,
                name: response.data.user.name,
                id: response.data.user.id,
                role: response.data.user.role,
              },
            })
          );

          // dispatch userLoggedIn actions so that we can save the user information in out redux store..
          dispatch(
            userLoggedIn({
              accessToken: response.data.accessToken,
              user: {
                email: response.data.user.email,
                name: response.data.user.name,
                id: response.data.user.id,
                role: response.data.user.role,
              },
            })
          );
        } catch (e) {
          // do nothing
        }
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `/login`,
        body: data,
        method: "POST",
      }),

      // onQueryStarted will run while the mutation is started ...
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;

          // in the response variables we are going to get user accessToken and information we need to store the information in the localStorage so that we can use it in our authentication mechanism...
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: response.data.accessToken,
              user: {
                email: response.data.user.email,
                name: response.data.user.name,
                id: response.data.user.id,
                role: response.data.user.role,
              },
            })
          );

          // dispatch userLoggedIn actions so that we can save the user information in out redux store..
          dispatch(
            userLoggedIn({
              accessToken: response.data.accessToken,
              user: {
                email: response.data.user.email,
                name: response.data.user.name,
                id: response.data.user.id,
                role: response.data.user.role,
              },
            })
          );
        } catch (e) {
          // do nothing
        }
      },
    }),
  }),
});

export default authApi;
export const { useLoginMutation, useRegistrationMutation } = authApi;
