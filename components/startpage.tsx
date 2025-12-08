'use client';

import { useState } from 'react';
import LiquidEther from '@/components/LiquidEther';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [scenario, setScenario] = useState("claim_status");
  return (
    <div
      className="relative z-10 mx-auto flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black" // bg color for dark backdrop
    >
      <div className="mb-8 w-64">
        <Select value={scenario} onValueChange={setScenario}>
          <SelectTrigger className="w-full text-black bg-white">
            <SelectValue placeholder="Select Scenario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="claim_status">Claim Status</SelectItem>
            <SelectItem value="benefit_verification">Benefit Verification</SelectItem>
            <SelectItem value="pharmacy_verification">Pharmacy Verification</SelectItem>
            <SelectItem value="prior_auth">Prior Auth</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Start Button */}
      <Button
        variant="primary" // or primary if you want to keep hover effect
        size="lg"
        onClick={() => onStart(scenario)}
        className="relative z-10 mt-10 w-64 rounded-full bg-white py-8 font-mono text-lg text-black shadow-md transition-colors duration-300 hover:bg-gray-300"
        disabled={disabled}
      >
        {startButtonText}
      </Button>
    </div>
  );
}
