'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function DetailInfo({ data, onUpdate, onStepChange }) {
  const handleNext = () => {
    onStepChange('Prompt');
  };

  const handleChange = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="relative rounded border border-[#90A1B9] px-16">
      <div className="-mt-3.5 w-fit border-x bg-black px-8 text-lg font-semibold whitespace-nowrap">
        Detailed Information
      </div>
      <div className="h-125 space-y-6 overflow-auto py-10">
        <div>
          <label
            className="mb-3 block font-semibold text-[#0A162F] dark:text-white"
            htmlFor="agent_name"
          >
            Agent Name
          </label>
          <Input
            id="agent_name"
            value={data.agent_name || ''}
            onChange={(e) => handleChange('agent_name', e.target.value)}
          />
        </div>

        <div>
          <label
            className="mb-3 block font-semibold text-[#0A162F] dark:text-white"
            htmlFor="identity"
          >
            Identity
          </label>
          <Input
            id="identity"
            value={data.identity || ''}
            onChange={(e) => handleChange('identity', e.target.value)}
          />
        </div>

        <div>
          <label
            className="mb-3 block font-semibold text-[#0A162F] dark:text-white"
            htmlFor="context"
          >
            Context
          </label>
          <Textarea
            id="context"
            value={data.context || ''}
            onChange={(e) => handleChange('context', e.target.value)}
          />
        </div>

        {/* Add remaining fields like role, tone, goal, guard_rails similarly here */}

        <div className="mt-20 flex justify-end gap-20">
          <Button className="rounded border border-white font-semibold" variant="outlined" disabled>
            Cancel
          </Button>
          <Button className="rounded border border-white font-semibold" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
