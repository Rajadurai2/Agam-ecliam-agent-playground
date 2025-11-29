'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function Prompt({ data, onUpdate, onStepChange }) {
  const [fileContent, setFileContent] = useState('');

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length) {
      readFile(droppedFiles[0]);
    }
  };

  const handleBrowse = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      readFile(selectedFile);
    }
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFileContent(reader.result);
        onUpdate({ ...data, prompt: reader.result }); // ✅ Save prompt from file
      }
    };
    reader.readAsText(file);
  };

  const handleNext = () => {
    onStepChange('Voice');
  };

  return (
    <div className="relative rounded border border-[#90A1B9] px-16">
      <div className="-mt-3.5 w-fit border-x bg-black px-8 text-lg font-semibold">Prompt</div>

      <div className="h-125 space-y-6 overflow-auto py-10">
        <Textarea
          id="prompt"
          placeholder="Enter prompt or upload .txt file"
          value={data.prompt || ''}
          onChange={(e) => onUpdate({ ...data, prompt: e.target.value })} // ✅ Fix
        />

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full cursor-pointer rounded border border-dashed border-[#90A1B9] p-6 text-center"
        >
          Drag & Drop .txt file here or{' '}
          <label htmlFor="file-upload" className="cursor-pointer text-sky-400 underline">
            browse
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".txt"
            onChange={handleBrowse}
            className="hidden"
          />
        </div>

        <div className="mt-50 flex justify-end gap-20">
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
