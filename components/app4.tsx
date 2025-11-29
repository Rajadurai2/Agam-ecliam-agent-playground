'use client';

import * as React from 'react';
import { Room, RoomEvent } from 'livekit-client';
import { motion } from 'motion/react';
import { RoomAudioRenderer, RoomContext, StartAudio } from '@livekit/components-react';
import { SessionView } from '@/components/session-view';
import { Toaster } from '@/components/ui/sonner';
import type { AppConfig } from '@/lib/types';
import StartPage from './startpage';
import usedemoDetails from '@/hooks/useDemoDetails';

const MotionSessionView = motion.create(SessionView);

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  const [criticalError, setCriticalError] = React.useState<string | null>(null);

  const [sessionStarted, setSessionStarted] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    apiKey: "devkey1",
    apiName: "survey-agent",
    urlKey: "ws://20.121.44.96:7880",
    secretKey: "secret",
  });

  const { startButtonText } = appConfig;

  const capabilities = {
    supportsChatInput: false,
    supportsVideoInput: false,
    supportsScreenShare: false,
  };

  const { demoDetails, refreshdemoDetails, error } = usedemoDetails();

  React.useEffect(() => {
    if (error) {
      setSessionStarted(false);
      setCriticalError(error);
    }
  }, [error]);

  const room = React.useMemo(() => new Room(), []);
  React.useEffect(() => {
    const onDisconnected = () => {
      setSessionStarted(false);
      refreshdemoDetails();
    };
    const onMediaDevicesError = (error: Error) => {
      setCriticalError(error + 'Encountered an error with your media devices.');
    };
    room.on(RoomEvent.MediaDevicesError, onMediaDevicesError);
    room.on(RoomEvent.Disconnected, onDisconnected);
    return () => {
      room.off(RoomEvent.Disconnected, onDisconnected);
      room.off(RoomEvent.MediaDevicesError, onMediaDevicesError);
    };
  }, [room, refreshdemoDetails]);

  React.useEffect(() => {
    console.log("&%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log("Demo details =", demoDetails)
    console.log("&%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    if (sessionStarted && room.state === 'disconnected' && demoDetails) {
      Promise.all([
        room.connect(demoDetails.serverUrl, demoDetails.participantToken),
      ]).catch((error) => {
        setCriticalError(error + ' There was an error connecting to the agent.');
      });
    }
    if (room.state === 'connected') {
      room.localParticipant.setMicrophoneEnabled(true, undefined, {
        preConnectBuffer: true,
      });
    }

    return () => {
      if (room.state === 'connected') {
        room.disconnect();
      }
    };
  }, [room, sessionStarted, demoDetails]);

  async function handlestart() {
    await refreshdemoDetails(); // wait for it to fetch new details
    setSessionStarted(true);
  }
  //   try {
  //     console.log('📦 Sending formValues:', formValues);
  //     console.log('📦 Sending to /api/demo');
  //     const res = await fetch('/api/demo', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ formValues }),

  //     });
  //     if (res.ok) {
  //       await refreshdemoDetails(); // wait for it to fetch new details
  //       setSessionStarted(true);
  //     } else {
  //       const err = await res.json();
  //       throw new Error(err?.error || 'Failed to fetch connection details');
  //     }
  //   } catch (error) {
  //     setCriticalError(error + 'Error sending instruction to server.');
  //   }
  // }


  return (
    <div className="relative h-screen w-full">
      {criticalError && (
        <div className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="mx-4 w-full max-w-lg rounded bg-white p-8 text-red-800 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
            <p className="max-h-64·overflow-y-auto·text-sm·break-words·whitespace-pre-wrap mb-4">
              {criticalError}
            </p>
            <button
              onClick={() => {
                setCriticalError(null);
              }}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {!sessionStarted && (
        <div>
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: sessionStarted ? 0 : 1 }}
            transition={{ duration: 0.5, ease: 'linear', delay: sessionStarted ? 0 : 0.5 }}
          >
            <StartPage
              startButtonText={startButtonText}
              onStart={handlestart}
              disabled={sessionStarted}
            />
          </motion.div>
        </div>
      )}

      {sessionStarted && (
        <RoomContext.Provider value={room}>
          <RoomAudioRenderer />
          <StartAudio label="Start Audio" />

          <MotionSessionView
            key="session-view"
            capabilities={capabilities}
            sessionStarted={sessionStarted}
            disabled={!sessionStarted}
            initial={{ opacity: 0 }}
            animate={{ opacity: sessionStarted ? 1 : 0 }}
            transition={{
              duration: 0.5,
              ease: 'linear',
              delay: sessionStarted ? 0.5 : 0,
            }}
          />
        </RoomContext.Provider>
      )}
      <Toaster />
    </div>
  );
}
