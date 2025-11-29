'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type ToolsProps = {
  data?: string[];
  onUpdate: (updatedTools: string[]) => void;
  onSubmit: () => void;
  onStepChange?: Dispatch<SetStateAction<string>>; // optional since it's unused
};

export default function Tools({ data, onUpdate }: ToolsProps) {
  const toolsList = [
    {
      id: 'rag',
      label: 'RAG Tools',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
    {
      id: 'sentiment',
      label: 'Sentiment Tools',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
  ];

  const [selectedTools, setSelectedTools] = useState<string[]>(Array.isArray(data) ? data : []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setSelectedTools(data);
    }
  }, [data]);

  const toggleTool = (id: string) => {
    const updatedTools = selectedTools.includes(id)
      ? selectedTools.filter((tool) => tool !== id)
      : [...selectedTools, id];

    setSelectedTools(updatedTools);
    onUpdate?.(updatedTools);
  };

  return (
    <div className="border-[#90A1B9]/ relative rounded border px-16">
      <div className="-mt-3.5 w-fit border-x bg-black px-8 text-lg font-semibold text-white">
        Tools
      </div>

      <div className="h-80 overflow-auto py-10">
        {toolsList.map((tool) => (
          <div key={tool.id} className="mt-6 flex items-start gap-3">
            <Checkbox
              id={tool.id}
              checked={selectedTools.includes(tool.id)}
              onCheckedChange={() => toggleTool(tool.id)}
            />
            <div className="grid gap-2">
              <Label htmlFor={tool.id}>{tool.label}</Label>
              <p className="text-muted-foreground text-sm">{tool.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
