import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { ILoginFormData, IUserData } from "interfaces/formdata.interface";
import IUser from "interfaces/user.interface";
import { HYDRATE } from "next-redux-wrapper";
import { authSlice } from "reducers/authSlice";
import { REHYDRATE } from "redux-persist";

import { AppState } from "store";

export const userApi = createApi({
  reducerPath: "user",
  tagTypes: ["user"],
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
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },

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

    getUserById: builder.query<IUser, { id: string; token: string }>({
      query: ({ id, token }) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
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
    updateUser: builder.mutation<
      IUser,
      { id: string; body: Partial<IUserData>; token: string }
    >({
      query: ({ id, body, token }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
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

    tokenLogin: builder.mutation<Partial<IUser>, string>({
      query: (token) => {
        return {
          url: "tokenlogin",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getAllUsers: builder.query<IUser[], string>({
      query: (token) => ({
        url: `/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["user"],
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

  util: { getRunningOperationPromises },
} = userApi;

export const { tokenLogin, getAllUsers, getUserById } = userApi.endpoints;
