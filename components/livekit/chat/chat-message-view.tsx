import { type RefObject, useEffect, useRef } from 'react';
import { type ReceivedChatMessage } from '@livekit/components-react';
import { cn } from '@/lib/utils';

export function useAutoScroll(
  scrollContentContainerRef: RefObject<Element | null>,
  messages: ReceivedChatMessage[]
) {
  useEffect(() => {
    function scrollToBottom() {
      if (scrollContentContainerRef.current) {
        scrollContentContainerRef.current.scrollTo({
          top: scrollContentContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }

    scrollToBottom();
  }, [scrollContentContainerRef, messages]);
}

interface ChatProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  messages: ReceivedChatMessage[];
}

export const ChatMessageView = ({ className, children, messages, ...props }: ChatProps) => {
  const scrollContentRef = useRef<HTMLDivElement>(null);
  useAutoScroll(scrollContentRef, messages);

  return (
    <div
      ref={scrollContentRef}
      className={cn('scrollbar-dark flex h-screen flex-col overflow-y-auto px-2', className)}
      {...props}
    >
      {children}
    </div>
  );
};
