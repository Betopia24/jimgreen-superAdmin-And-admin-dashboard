import React from "react";
import StripeProvider from "./StripeProvider";
import CheckoutForm from "./CheckoutForm";
import { usePaymentCreateMutation } from "@/redux/api/subscriptoinPan/subscriptionPlanSliceApi";

const RootPaymentFIle = () => {
  //   const res = await fetch("/api/subscription", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       planId: "69807d522884161248cd4783",
  //       planType: "monthly",
  //     }),
  //   });

  //   const data = await res.json();

  const [paymentPost, { isLoading }] = usePaymentCreateMutation();
  return (
    <div>
      <StripeProvider clientSecret={"data.data.clientSecret"}>
        <CheckoutForm />
      </StripeProvider>
      ;
    </div>
  );
};

export default RootPaymentFIle;
