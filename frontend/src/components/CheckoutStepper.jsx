const steps = ["Cart", "Payment", "Confirmation"];

export default function CheckoutStepper({ currentStep }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center gap-6">
        {steps.map((step, index) => {
          const active = index <= currentStep;

          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold
                ${active ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {index + 1}
              </div>
              <span className={`text-sm font-medium ${active ? "text-orange-600" : "text-gray-400"}`}>
                {step}
              </span>
              {index < steps.length - 1 && (
                <div className="w-10 h-0.5 bg-gray-300 mx-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
