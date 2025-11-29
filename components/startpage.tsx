'use client';

import { useState } from 'react';
import LiquidEther from '@/components/LiquidEther';
import { Button } from '@/components/ui/button';

export interface StartProps {
  onStart: () => void;
  startButtonText: string;
  disabled: boolean;
}

export default function StartPage({
  onStart,
  startButtonText,
  disabled,
}: StartProps) {
  return (
    <div
      className="relative z-10 mx-auto flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black" // bg color for dark backdrop
    >

      {/* Start Button */}
      <Button
        variant="primary" // or primary if you want to keep hover effect
        size="lg"
        onClick={onStart}
        className="relative z-10 mt-10 w-64 rounded-full bg-white py-8 font-mono text-lg text-black shadow-md transition-colors duration-300 hover:bg-gray-300"
        disabled={disabled}
      >
        {startButtonText}
      </Button>
    </div>
  );
}
