'use client';

import React from 'react';

const steps = ['Detailed Information', 'Prompt', 'Voice', 'Extra Features', 'Tools'];

export default function CreateFlow({ currentStep, onStepChange }) {
  return (
    <div className="flex flex-col gap-10">
      {steps.map((step, i) => (
        <div className="flex items-center gap-6" key={step}>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
              step === currentStep
                ? 'bg-[#0a162f] text-sky-400 ring-2 ring-sky-500'
                : 'bg-[#90A1B9]/20 text-white/75'
            }`}
          >
            {i + 1}
          </div>
          <button
            type="button"
            className={`cursor-pointer whitespace-nowrap hover:underline ${
              step === currentStep ? 'text-sky-400 underline' : 'text-white/75'
            }`}
            onClick={() => onStepChange(step)}
            aria-current={step === currentStep ? 'step' : undefined}
            aria-pressed={step === currentStep}
          >
            {step}
          </button>
        </div>
      ))}
    </div>
  );
}
