'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function ExtraFeatures({ data, onUpdate, onStepChange }) {
  const handleChange = (field, value) => {
    onUpdate({ ...data, [field]: value }); // ✅ fix: pass only updated data object
  };

  const handleNext = () => {
    onStepChange('Tools'); // ✅ no need to call onUpdate again — state is already synced
  };

  return (
    <div className="border-[#90A1B9]/ relative rounded border px-16">
      <div className="-mt-3.5 w-fit border-x bg-black px-8 text-lg font-semibold">
        Extra Features
      </div>

      <div className="space-y-6 overflow-auto py-10">
        {[
          ['call_recording', 'Call Recordings'],
          ['call_transcription', 'Call Transcriptions'],
          ['fillers', 'Fillers'],
          ['opt_out', 'Opt Out'],
          ['background_music', 'Background Music'],
        ].map(([key, label]) => (
          <div key={key} className="flex items-center justify-between gap-10">
            <label htmlFor={key} className="text-[18px] font-medium whitespace-nowrap">
              {label}
            </label>
            <Switch
              id={key}
              checked={data[key]}
              onCheckedChange={(val) => handleChange(key, val)} // ✅ fix: use current key
            />
          </div>
        ))}

        <div className="mt-30 flex justify-end gap-20">
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
