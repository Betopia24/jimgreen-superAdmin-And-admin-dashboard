import baseApi from "../baseApi";

export const teamMemberManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTeamMember: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/company/${id}/members`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["UserManagement"],
    }),
    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserManagement"],
    }),

    teamMemberSuspend: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["UserManagement"],
    }),

    getsuperAdminUsermanagement: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["UserManagement"],
    }),

    getsuperAdminUsermanagementSingle: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["UserManagement"],
    }),
  }),
});

export const { useCreateTeamMemberMutation } = teamMemberManagementApi;
