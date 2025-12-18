'use client';
import { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import Markdown from './components/markdown';
import 'katex/dist/katex.min.css';

export default function Page() {
  const { messages, status, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    try {
      // Scroll the whole page to the bottom so new messages are visible
      // even when the page grows (no fixed container height).
      setTimeout(() => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      }, 50);
    } catch (e) {
      /* ignore */
    }
  }, [messages]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
    console.log(status)
  };

  function renderMessage(text: string) {
  
    return <Markdown content={text}></Markdown>;
}
const role = messages.map(message => message.role);
  return (
    <div className="container flex justify-center items-center w-screen h-screen mx-auto bg-zinc-950 p-4">
      <div className='bg-zinc-900 border-2 border-solid border-zinc-700 w-[50%] max-w-[90%] mx-auto p-4 rounded-lg'>
        <div ref={containerRef} className="pr-2">
          {messages.map(message => {
            const isUser = message.role == "user";
            return (
              <div
                key={message.id}
                className={`py-2 rounded-xl w-fit px-6 max-w-[80%] mb-4 min-h-12 flex ${isUser ? 'self-end w-fit border-solid border-2 border-blue-950 ml-auto bg-gray-900 text-right' : 'self-start text-left'}`}
              >
                <div className="flex-1 whitespace-pre-wrap">
                  {message.parts.map((part, index) => {
                    switch (part.type) {
                      case 'text':
                        return <span key={index}>{renderMessage(part.text)}</span>;
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            className="w-full p-2 mt-4 bg-zinc-900 border-2 border-solid border-zinc-700 rounded text-white"
            placeholder="Send a message..."
            onChange={e => setInput(e.target.value)}
            disabled={status !== 'ready'}
          />
        </form>
      </div>
    </div>
  );
}