import baseApi from "../../baseApi";

export const superAdminCompanyManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // paymentCreate: builder.mutation({
    //   query: (body) => ({
    //     url: "/payments/subscription/create",
    //     method: "POST",
    //     body,
    //   }),
    // }),

    getAllCompany: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
    }),

    getCompanySingle: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCompanyQuery, useGetCompanySingleQuery } =
  superAdminCompanyManagementApi;
