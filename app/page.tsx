'use client';
import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import Markdown from './components/markdown';
import 'katex/dist/katex.min.css';

export default function Page() {
  const { messages, status, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
    console.log(status)
  };

  function renderMessage(text: string) {
  // Split by $$...$$ for block math
  
    return <Markdown content={text}></Markdown>;
}
const role = messages.map(message => message.role);
  return (
    <div className="container mx-auto bg-zinc-950 p-4">
      <div className='bg-zinc-900 border-2 border-solid border-zinc-700 max-w-3xl mx-auto p-4 rounded-lg'>
        {messages.map(message => (
          <div className={`${message.role == "user" ? "text-right ml-auto bg-gray-800" : "text-left  bg-gray-700"} p-3 rounded-xl w-fit max-w-[80%] mb-4`} key={message.id}>
            {message.parts.map((part, index) => {
              switch (part.type) {
                case 'text':
                  return <span key={index}>{renderMessage(part.text)}</span>;
                // other cases can handle images, tool calls, etc erugfyqoulegryoatgrygf
              }
            })}
          </div>
        ))}
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