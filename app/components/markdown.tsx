"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";

interface Props {
  content: string;
}

export default function Markdown({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
      components={{
        p: ({ children }) => <p className="my-2">{children}</p>,
        code: ({ node, inline, className, children, ...props }: any) => {
          return !inline ? (
            <pre className="bg-gray-900 text-white p-3 rounded-lg overflow-x-auto my-2">
              <code {...props}>{children}</code>
            </pre>
          ) : (
            <code className="bg-gray-200 px-1 py-0.5 rounded">
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
