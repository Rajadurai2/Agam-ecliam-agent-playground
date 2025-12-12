'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone } from 'lucide-react';

export interface StartProps {
  onStart: (scenario: string) => void;
  startButtonText: string;
  disabled: boolean;
}

export default function StartPage({
  onStart,
  startButtonText,
  disabled,
}: StartProps) {
  const [scenario, setScenario] = useState("claim_status_verification");

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center space-y-8 px-4">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Voice AI Agent Test
          </h1>
          <p className="text-slate-400 text-sm font-light">
            Medical Billing Scenario Testing
          </p>
        </div>

        {/* Scenario selector card */}
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Select Test Scenario
          </label>
          <Select value={scenario} onValueChange={setScenario}>
            <SelectTrigger className="h-12 w-full border-slate-700 bg-slate-800/80 text-white hover:bg-slate-800">
              <SelectValue placeholder="Select Scenario" />
            </SelectTrigger>
            <SelectContent className="border-slate-700 bg-slate-800">
              <SelectItem value="claim_status_verification" className="text-white focus:bg-slate-700 focus:text-white">
                Claim Status Inquiry
              </SelectItem>
              <SelectItem value="benefit_verification" className="text-white focus:bg-slate-700 focus:text-white">
                Benefit Verification
              </SelectItem>
              <SelectItem value="pharmacy_verification" className="text-white focus:bg-slate-700 focus:text-white">
                Pharmacy Verification
              </SelectItem>
              <SelectItem value="benefit_by_cpt" className="text-white focus:bg-slate-700 focus:text-white">
                Prior Auth or Benefit By CPT
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Call button - prominent with icon */}
        <Button
          onClick={() => onStart(scenario)}
          disabled={disabled}
          className="group h-16 w-full max-w-md rounded-xl bg-blue-600 px-8 text-lg font-semibold text-white shadow-xl shadow-blue-900/50 transition-all duration-200 hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
        >
          <Phone className="h-6 w-6 group-hover:animate-pulse" />
          {startButtonText}
        </Button>
      </div>
    </div>
  );
}