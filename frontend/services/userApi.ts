import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { ILoginFormData, IUserData } from "interfaces/formdata.interface";
import IUser from "interfaces/user.interface";
import { authSlice } from "reducers/authSlice";

import { AppState } from "store";

export const userApi = createApi({
  reducerPath: "user",
  tagTypes: ["user"],
  keepUnusedDataFor: 60,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BACKEND_URL}/api/users`,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AppState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation<Partial<IUser>, ILoginFormData>({
      query: ({ email, password }) => ({
        url: "login",

        method: "POST",
        body: { email, password },
        headers: {
          "Content-Type": "application/json",
        },
      }),

      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {
        dispatch(
          authSlice.actions.setCredentials({
            token: (await cacheDataLoaded).data.token as string,
            user: (await cacheDataLoaded).data as IUser,
          })
        );
      },
    }),
    register: builder.mutation<Partial<IUser>, IUserData>({
      query: ({ email, password, name }) => ({
        url: "/",
        method: "POST",
        body: { name, email, password },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getCurrentUser: builder.query<Partial<IUser>, { token: string }>({
      query: ({ token }) => ({
        url: "/profile",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAllUsers: builder.query<IUser[], null>({
      query: () => `/`,
      providesTags: ["user"],
    }),
    getUserById: builder.query<IUser, { id: string }>({
      query: ({ id }) => `/${id}`,
    }),
    updateUserProfile: builder.mutation<Partial<IUser>, IUserData>({
      query: ({ ...body }) => ({
        url: "/profile",
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${body.token}`,
        },
      }),
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation<IUser, { id: string; body: IUserData }>({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation<string, { id: string; token: string }>({
      query: ({ id, token }) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    tokenLogin: builder.mutation<Partial<IUser>, { token: string }>({
      query: ({ token }) => ({
        url: "tokenLogin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
  useTokenLoginMutation,
} = userApi;
