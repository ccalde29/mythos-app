// components/Onboarding/ProgressSteps.tsx
export default function ProgressSteps({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex space-x-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div 
            key={i}
            className={`h-2 w-8 rounded-full ${
              i < currentStep ? 'bg-amber-500' : 'bg-amber-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}