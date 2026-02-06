import baseApi from "../../baseApi";

export const superAdminUserManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // paymentCreate: builder.mutation({
    //   query: (body) => ({
    //     url: "/payments/subscription/create",
    //     method: "POST",
    //     body,
    //   }),
    // }),

    getsuperAdminUsermanagement: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetsuperAdminUsermanagementQuery } =
  superAdminUserManagementApi;
