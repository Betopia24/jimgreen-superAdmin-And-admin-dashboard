import baseApi from "../baseApi";

export const subscriptionPanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRowMaterials: builder.mutation({
      query: (body) => ({
        url: "/raw-materials",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SubscriptionPan"],
    }),

    getActiveSubscriptionPan: builder.query({
      query: (id) => ({
        url: `/plans/active`,
        method: "GET",
      }),
      providesTags: ["SubscriptionPan"],
    }),
  }),
});

export const { useGetActiveSubscriptionPanQuery } = subscriptionPanApi;
