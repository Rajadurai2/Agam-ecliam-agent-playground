'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export interface InstructionInputProps {
  values: {
    apiKey: string;
    apiName: string;
    urlKey: string;
    secretKey: string;
    instruction: string;
    mcpUrls: string[];
  };
  onChange: (field: string, value: string | string[]) => void; // allow array
  onStartCall: () => void;
  startButtonText: string;
  disabled: boolean;
}

export default function InstructionInput({
  values,
  onChange,
  onStartCall,
  startButtonText,
  disabled,
}: InstructionInputProps) {
  const [showInputs, setShowInputs] = useState(false);

  return (
    <div
      inert={disabled ? true : undefined}
      className="relative z-10 mx-auto flex min-h-screen w-full flex-col items-center justify-center bg-black px-4 py-10 text-center"
    >
      <h1 className="my-8 flex items-center text-3xl font-semibold text-white">
        🔧 Configure Your Agent
      </h1>

      {/* Textarea always visible */}
      <textarea
        value={values.instruction}
        onChange={(e) => onChange('instruction', e.target.value)}
        className="bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 no-scrollbar min-h-30 w-full max-w-2xl resize-none rounded-2xl border border-gray-600 px-6 py-5 text-lg text-gray-100 placeholder-gray-400 shadow-xl transition-all duration-700 focus:outline-none focus-visible:ring-[3px]"
        rows={4}
        placeholder="✍️ Enter your instruction here..."
      />

      {/* ✅ Add Button */}

      {/* Inputs with transition */}
      {/* Config dropdown panel */}
      {showInputs && (
        <div className="absolute right-10 bottom-25 z-30 w-80 rounded-2xl border border-gray-700 bg-black/95 p-6 shadow-2xl">
          <input
            type="text"
            value={values.apiName}
            onChange={(e) => onChange('apiName', e.target.value)}
            className="bg-input/30 mb-4 w-full rounded-xl border border-gray-600 px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            placeholder="🔠 API Name"
          />

          <input
            type="text"
            value={values.urlKey}
            onChange={(e) => onChange('urlKey', e.target.value)}
            className="bg-input/30 mb-4 w-full rounded-xl border border-gray-600 px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            placeholder="🔑 URL Key"
          />

          <input
            type="text"
            value={values.apiKey}
            onChange={(e) => onChange('apiKey', e.target.value)}
            className="bg-input/30 mb-4 w-full rounded-xl border border-gray-600 px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            placeholder="🧩 API Key"
          />

          <input
            type="text"
            value={values.secretKey}
            onChange={(e) => onChange('secretKey', e.target.value)}
            className="bg-input/30 mb-4 w-full rounded-xl border border-gray-600 px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            placeholder="🔒 Secret Key"
          />
        </div>
      )}

      {/* ✅ Render dynamic MCP URL inputs */}
      {values.mcpUrls.map((val, idx) => (
        <div key={idx} className="relative my-4 w-full max-w-2xl">
          {/* The input itself */}
          <input
            type="text"
            value={val}
            onChange={(e) => {
              const updated = [...values.mcpUrls];
              updated[idx] = e.target.value;
              onChange('mcpUrls', updated); // ✅ push change up
            }}
            className="bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-2xl border border-gray-600 px-6 py-5 text-lg text-gray-100 placeholder-gray-400 shadow-xl transition-all duration-700 focus:outline-none focus-visible:ring-[3px]"
            placeholder={`MCP URL ${idx + 1}`}
          />

          {/* Small ❌ button positioned above/right of input */}
          <button
            type="button"
            onClick={() => {
              const updated = values.mcpUrls.filter((_, i) => i !== idx);
              onChange('mcpUrls', updated); // ✅ remove that index
            }}
            className="text-md absolute -top-3 -right-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full p-1 font-bold text-white shadow"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={() => onChange('mcpUrls', [...values.mcpUrls, ''])} // ✅ add empty input
        className="my-4 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
      >
        ➕ Add MCP URL
      </button>

      {/* Start Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={onStartCall}
        className="mt-10 w-64 bg-gray-800 py-4 font-mono text-lg text-white hover:bg-gray-600"
        disabled={disabled}
      >
        {startButtonText}
      </Button>
      <button
        onClick={() => setShowInputs(!showInputs)}
        className="absolute right-15 bottom-10 z-20 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-xl transition-all hover:bg-gray-200"
      >
        {showInputs ? 'Hide Config' : 'Show Config'}
      </button>
    </div>
  );
}
