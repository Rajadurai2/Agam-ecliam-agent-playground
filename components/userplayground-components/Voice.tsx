'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

type VoiceOptions = {
  speech_speed: number;
  temp: number;
  accent: string;
  voice_gender: string;
  language: string;
};

type VoiceProps = {
  data: VoiceOptions;
  onUpdate: (updated: VoiceOptions) => void;
  onStepChange: (step: string) => void;
};

export default function Voice({ data, onUpdate, onStepChange }: VoiceProps) {
  const [voiceOptions, setVoiceOptions] = useState<VoiceOptions>({
    speech_speed: 50,
    temp: 50,
    accent: '',
    voice_gender: '',
    language: '',
  });

  useEffect(() => {
    if (data) {
      setVoiceOptions({
        speech_speed: data?.speech_speed || 50,
        temp: data.temp || 50,
        accent: data.accent ?? '',
        voice_gender: data.voice_gender ?? '',
        language: data.language ?? '',
      });
    }
  }, [data]);

  const updateField = (field: keyof VoiceOptions, value: string | number) => {
    const updated = { ...voiceOptions, [field]: value };
    setVoiceOptions(updated);
    onUpdate?.(updated);
  };

  const handleNext = () => {
    onUpdate?.(voiceOptions);
    onStepChange?.('Extra Features');
  };

  return (
    <div className="border-[#90A1B9]/ relative rounded border px-16">
      <div className="-mt-3.5 w-fit border-x bg-black px-8 text-lg font-semibold">Voice</div>

      <div className="h-125 overflow-auto py-10">
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center justify-between gap-20">
            <div>
              <label className="mb-5 block font-semibold text-[#0A162F] dark:text-white">
                Speech Speed{' '}
                <span className="ml-2 rounded bg-sky-400/50 px-2 py-1">
                  {voiceOptions?.speech_speed}
                </span>
              </label>
              <Slider
                value={[voiceOptions.speech_speed]}
                onValueChange={([val]) => updateField('speech_speed', val)}
                max={100}
                step={1}
                className="w-[400px]"
              />
            </div>

            <div>
              <label className="mb-5 block font-semibold text-[#0A162F] dark:text-white">
                Temperature{' '}
                <span className="ml-2 rounded bg-sky-400/50 px-2 py-1">{voiceOptions.temp}</span>
              </label>
              <Slider
                value={[voiceOptions.temp]}
                onValueChange={([val]) => updateField('temp', val)}
                max={100}
                step={1}
                className="w-[400px]"
              />
            </div>
          </div>
        </div>

        <div className="mt-15 flex items-center justify-end gap-10">
          <div>
            <Select value={voiceOptions.accent} onValueChange={(v) => updateField('accent', v)}>
              <SelectTrigger className="w-[180px] rounded">
                <SelectValue placeholder="Accent" />
              </SelectTrigger>
              <SelectContent className="rounded border border-sky-400/50 bg-black">
                <SelectItem value="us">US</SelectItem>
                <SelectItem value="uk">UK</SelectItem>
                <SelectItem value="au">Australian</SelectItem>
                <SelectItem value="in">Indian</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={voiceOptions.voice_gender}
              onValueChange={(v) => updateField('voice_gender', v)}
            >
              <SelectTrigger className="w-[180px] rounded">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent className="rounded border border-sky-400/50 bg-black">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={voiceOptions.language} onValueChange={(v) => updateField('language', v)}>
              <SelectTrigger className="w-[180px] rounded">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="rounded border border-sky-400/50 bg-black">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-50 flex justify-end gap-20">
          <Button className="rounded border border-white font-semibold" variant="outline" disabled>
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
