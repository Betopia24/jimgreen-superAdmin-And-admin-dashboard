import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PlanType = "monthly" | "annually";

interface PaymentState {
  planId: string;
  planType: PlanType | null;
}

const initialState: PaymentState = {
  planId: "",
  planType: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPlan: (
      state,
      action: PayloadAction<{ planId: string; planType: PlanType }>,
    ) => {
      state.planId = action.payload.planId;
      state.planType = action.payload.planType;
    },

    resetPlan: () => initialState,
  },
});

export const { setPlan, resetPlan } = paymentSlice.actions;
export default paymentSlice.reducer;
