import baseApi from "../baseApi";

export const subscriptionPanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    paymentCreate: builder.mutation({
      query: (body) => ({
        url: "/payments/subscription/create",
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

export const { useGetActiveSubscriptionPanQuery, usePaymentCreateMutation } =
  subscriptionPanApi;
