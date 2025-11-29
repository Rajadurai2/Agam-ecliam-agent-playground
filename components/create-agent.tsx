'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CreateFlow from '@/components/userplayground-components/CreateFlow';
import DetailInfo from '@/components/userplayground-components/DetailInfo';
import ExtraFeatures from '@/components/userplayground-components/ExtraFeatures';
import Prompt from '@/components/userplayground-components/Prompt';
import Tools from '@/components/userplayground-components/Tools';
import Voice from '@/components/userplayground-components/Voice';
import { Button } from './ui/button';

type RoleSection = {
  agent_name: string;
  context: string;
  identity: string;
  prompt: string;
};

type VoiceOptionsSection = {
  language: string;
  accent: string;
  voice_gender: string;
  speech_speed: number;
  temp: number;
};

type SettingsSection = {
  call_recording: boolean;
  call_transcription: boolean;
  fillers: boolean;
  opt_out: boolean;
  background_music: boolean;
};

type AgentData = {
  role: RoleSection;
  voice_options: VoiceOptionsSection;
  settings: SettingsSection;
  tools: string[];
};

export interface InstructionInputProps {
  instruction: string;
  onInstructionChange: (instruction: string) => void;
  onStartCall: () => void;
  startButtonText: string;
  disabled: boolean;
}
type AgentSection = 'role' | 'voice_options' | 'settings' | 'tools';
const CreateAgentPage = ({ onStartCall, startButtonText, disabled }: InstructionInputProps) => {
  const [criticalError, setCriticalError] = useState<string | null>(null);
  const instructionMap: Record<string, string> = {
    '1': 'You are a health care practice agent. You can answer questions about health care services, schedule appointments, and provide information about medical procedures.',
    '2': 'You are a hotel concierge agent. You can assist guests with reservations, provide information about local attractions, and help with any special requests.',
    '3': 'You are a customer support agent. You can help customers with their inquiries, troubleshoot issues, and provide information about products and services.',
  };
  const searchParams = useSearchParams();
  const instructionId = searchParams.get('id');
  const initialInstruction =
    instructionId && instructionMap[instructionId] ? instructionMap[instructionId] : '';
  const [instruction, setInstruction] = useState(initialInstruction);

  const [currentStep, setCurrentStep] = useState('Detailed Information');
  const [agentData, setAgentData] = useState<AgentData>({
    role: {
      agent_name: '',
      context: '',
      identity: '',
      prompt: instruction,
    },
    voice_options: {
      language: '',
      accent: '',
      voice_gender: '',
      speech_speed: 50,
      temp: 50,
    },
    settings: {
      call_recording: false,
      call_transcription: false,
      fillers: false,
      opt_out: false,
      background_music: false,
    },
    tools: [],
  });

  const updateAgentData = (
    section: AgentSection,
    data: RoleSection | VoiceOptionsSection | SettingsSection | string[]
  ) => {
    setAgentData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleSubmit = async () => {
    // if (!agentData.role.agent_name) {
    //   setCriticalError('Please fill in agent name in detailed information.');
    //   return;
    // }

    const payload = {
      ...agentData,
      updated_at: new Date().toISOString(),
    };
    console.log('Submitting agent data to server:', payload);

    try {
      const res = await fetch('/api/connection-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        onStartCall();
      } else {
        const errorData = await res.json();
        console.error('Server error:', errorData);
      }
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <main className="h-screen w-full p-6">
      {criticalError && (
        <div className="bg-opacity-80 fixed inset-0 z-100 flex h-full items-center justify-center bg-black">
          <div className="mx-4 w-full max-w-lg rounded bg-white p-8 text-red-800 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
            <p className="mb-4">{criticalError}</p>
            <button
              onClick={() => {
                setCriticalError(null);
                // router.back(); // Redirect to home or refresh
              }}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Create a New Agent</h1>
      </div>
      <div className="flex w-full gap-20 pt-10">
        <div className="shrink-0">
          <CreateFlow currentStep={currentStep} onStepChange={setCurrentStep} />
        </div>
        <div className="flex-1">
          {currentStep === 'Detailed Information' && (
            <DetailInfo
              data={agentData.role}
              onUpdate={(data: RoleSection) => updateAgentData('role', data)}
              onStepChange={setCurrentStep}
            />
          )}
          {currentStep === 'Prompt' && (
            <Prompt
              data={agentData.role}
              onUpdate={(data: RoleSection) => {
                updateAgentData('role', data);
                setInstruction(data.prompt);
              }}
              onStepChange={setCurrentStep}
            />
          )}
          {currentStep === 'Voice' && (
            <Voice
              data={agentData.voice_options}
              onUpdate={(data: VoiceOptionsSection) => updateAgentData('voice_options', data)}
              onStepChange={setCurrentStep}
            />
          )}
          {currentStep === 'Extra Features' && (
            <ExtraFeatures
              data={agentData.settings}
              onUpdate={(data: SettingsSection) => updateAgentData('settings', data)}
              onStepChange={setCurrentStep}
            />
          )}
          {currentStep === 'Tools' && (
            <Tools
              data={agentData.tools}
              onUpdate={(toolsArray: string[]) => updateAgentData('tools', toolsArray)}
              onSubmit={handleSubmit}
              onStepChange={setCurrentStep}
            />
          )}
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            className="fixed right-1/4 bottom-10 z-1 w-64 -translate-x-1/2 transform rounded-xl bg-gray-800 py-4 text-lg text-white hover:bg-gray-700"
            disabled={disabled}
          >
            {startButtonText}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CreateAgentPage;
