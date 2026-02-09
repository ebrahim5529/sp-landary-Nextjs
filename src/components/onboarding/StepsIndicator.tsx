import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepsIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export function StepsIndicator({ currentStep, totalSteps = 2 }: StepsIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                isCompleted
                  ? "bg-primary text-primary-foreground border-primary"
                  : isCurrent
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-muted"
              )}
            >
              {isCompleted ? (
                <Check className="h-5 w-5" />
              ) : (
                <span className="font-semibold">{stepNumber}</span>
              )}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "w-16 h-0.5 transition-colors",
                  isCompleted ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

