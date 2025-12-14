import { useState } from "react";
import CheckoutStepper from "../components/CheckoutStepper";
import CartReview from "./CartReview";
import Payment from "./Payment";
import Confirmation from "./Confirmation";

export default function Checkout() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <CheckoutStepper currentStep={step} />

      {step === 0 && <CartReview onNext={() => setStep(1)} />}
      {step === 1 && (
        <Payment
          onNext={() => setStep(2)}
          onBack={() => setStep(0)}
        />
      )}
      {step === 2 && <Confirmation />}
    </div>
  );
}
