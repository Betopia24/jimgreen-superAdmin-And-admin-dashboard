// "use client";

// import {
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { useState } from "react";

// export default function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     setLoading(true);

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: "http://localhost:3000/payment-success",
//       },
//       redirect: "if_required",
//     });

//     if (error) {
//       setError(error.message || "Payment failed");
//     } else if (paymentIntent?.status === "succeeded") {
//       console.log("✅ Payment completed");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <button disabled={!stripe || loading}>
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//     </form>
//   );
// }

"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-success",
      },
      redirect: "if_required",
    });

    if (error) {
      setError(error.message || "Payment failed");
    } else if (paymentIntent?.status === "succeeded") {
      console.log("✅ Payment completed");
      toast.success("✅ Payment completed");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-6 rounded-xl bg-white p-6 shadow-md"
    >
      {/* Stripe Card Element */}
      <PaymentElement />

      {/* Error message */}
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Pay Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-white transition-all ${
          loading || !stripe
            ? "cursor-not-allowed bg-gray-400"
            : "bg-primary hover:bg-primary/90 active:scale-[0.98]"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing payment…
          </>
        ) : (
          <>
            <Lock className="h-5 w-5" />
            Pay Securely
          </>
        )}
      </button>

      {/* Footer trust text */}
      <p className="text-center text-xs text-gray-500">
        🔒 Payments are secured and encrypted by Stripe
      </p>
    </form>
  );
}
