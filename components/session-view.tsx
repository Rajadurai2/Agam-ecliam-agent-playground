import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { type ReceivedChatMessage } from '@livekit/components-react';
import { AgentControlBar } from '@/components/livekit/agent-control-bar/agent-control-bar';
import { ChatEntry } from '@/components/livekit/chat/chat-entry';
import { ChatMessageView } from '@/components/livekit/chat/chat-message-view';
import { MediaTiles } from '@/components/livekit/media-tiles';
import useChatAndTranscription from '@/hooks/useChatAndTranscription';
import { useDebugMode } from '@/hooks/useDebug';
import { cn } from '@/lib/utils';

interface SessionViewProps {
  disabled: boolean;
  capabilities: {
    supportsChatInput: boolean;
    supportsVideoInput: boolean;
    supportsScreenShare: boolean;
  };
  sessionStarted: boolean;
}

export const SessionView = ({
  disabled,
  capabilities,
  sessionStarted,
  ref,
}: React.ComponentProps<'div'> & SessionViewProps) => {
  const [chatOpen, setChatOpen] = useState(false);
  const { messages, send } = useChatAndTranscription();

  useDebugMode();

  async function handleSendMessage(message: string) {
    await send(message);
  }

  return (
    <main
      ref={ref}
      inert={disabled}
      className={
        // prevent page scrollbar
        // when !chatOpen due to 'translate-y-20'
        cn(
          !chatOpen && 'max-h-svh overflow-hidden',
          'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative text-white'
        )
      }
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
      <ChatMessageView
        messages={messages}
        className={cn(
          'mx-auto min-h-svh w-full max-w-2xl px-3 pt-32 pb-40 transition-[opacity,translate] duration-300 ease-out md:px-0 md:pt-36 md:pb-48',
          chatOpen ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-20 opacity-0'
        )}
      >
        <div className="space-y-3 whitespace-pre-wrap">
          <AnimatePresence>
            {messages.map((message: ReceivedChatMessage) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 1, height: 'auto', translateY: 0.001 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <ChatEntry hideName key={message.id} entry={message} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ChatMessageView>

      <div className="fixed top-0 right-0 left-0 h-32 md:h-36 pointer-events-none z-10">
        {/* skrim */}
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-slate-950 to-transparent" />
      </div>

      <MediaTiles chatOpen={chatOpen} />

      <div className="fixed right-0 bottom-0 left-0 z-50 px-3 pt-2 pb-3 md:px-12 md:pb-12 pointer-events-none">
        <motion.div
          key="control-bar"
          initial={{ opacity: 0, translateY: '100%' }}
          animate={{
            opacity: sessionStarted ? 1 : 0,
            translateY: sessionStarted ? '0%' : '100%',
          }}
          transition={{ duration: 0.3, delay: sessionStarted ? 0.5 : 0, ease: 'easeOut' }}
        >
          <div className="relative z-10 mx-auto w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: sessionStarted && messages.length === 0 ? 1 : 0,
                transition: {
                  ease: 'easeIn',
                  delay: messages.length > 0 ? 0 : 0.8,
                  duration: messages.length > 0 ? 0.2 : 0.5,
                },
              }}
              aria-hidden={messages.length > 0}
              className={cn(
                'absolute inset-x-0 -top-12 text-center',
                sessionStarted && messages.length === 0 && 'pointer-events-none'
              )}
            >
              <p className="animate-text-shimmer inline-block !bg-clip-text text-sm font-semibold text-transparent bg-gradient-to-r from-slate-400 via-white to-slate-400">
                Agent is listening, ask it a question
              </p>
            </motion.div>

            <AgentControlBar
              capabilities={capabilities}
              onChatOpenChange={setChatOpen}
              onSendMessage={handleSendMessage}
              className="pointer-events-auto rounded-2xl border border-slate-800 bg-slate-900/50 p-4 shadow-2xl backdrop-blur-sm"
            />
          </div>
          {/* skrim */}
          <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-slate-950 to-transparent -z-10" />
        </motion.div>
      </div>
    </main>
  );
};
