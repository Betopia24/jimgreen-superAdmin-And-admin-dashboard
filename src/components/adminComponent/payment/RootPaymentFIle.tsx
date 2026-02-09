"use client";
import StripeProvider from "./StripeProvider";
import CheckoutForm from "./CheckoutForm";
import { usePaymentCreateMutation } from "@/redux/api/subscriptoinPan/subscriptionPlanSliceApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const RootPaymentFIle = () => {
  const clientSecret = useSelector(
    (state: RootState) => state.payment.clientSecret,
  );
  console.log("clientSecret", clientSecret);

  const [paymentPost, { isLoading }] = usePaymentCreateMutation();
  return (
    <div>
      <StripeProvider clientSecret={`${clientSecret}`}>
        <CheckoutForm />
      </StripeProvider>
      ;
    </div>
  );
};

export default RootPaymentFIle;
