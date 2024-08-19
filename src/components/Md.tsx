import { forwardRef, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import "highlight.js/styles/github.css";
import { useReactToPrint } from "react-to-print";

const defaultText = `
# Markdown Writer App

**Write and preview Markdown in real-time with this user-friendly ReactJS app.**

## Features
- **Live Preview:** See Markdown rendering as you type.
- **User-Friendly Interface:** Split-screen layout for an intuitive experience.
- **Markdown Syntax Support:** Format text easily.

## Technologies
- **ReactJS**
- **TypeScript**
- **react-markdown**
- **Tailwind and Aceternity UI**

## Usage
1. Open [**<span style="color:orange; '"> eznote.vercel.app</span>**](https://eznote.vercel.app/) in your browser.
2. Write Markdown on the left, view the preview on the right.

- View [**README.md**](https://github.com/tsahil01/Markdown-writer/blob/master/README.md) for some common syntax
`;

type PrintableMarkdownProps = {
  markdown: string;
};

const PrintableMarkdown = forwardRef(({ markdown }: PrintableMarkdownProps, ref) => (
  <div ref={ref}>
    <ReactMarkdown
      className="markdown w-full h-full overflow-auto outline dark:bg-zinc-900 p-4 bg-white dark:text-white"
      remarkPlugins={[remarkGfm]}
      components={{
        //@ts-ignore
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              className="rounded-lg mx-4"
              style={coldarkDark}
              PreTag="div"
              language={match[1]}
              wrapLongLines={true} // Added to wrap long lines
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className={className}
              style={{
                whiteSpace: "pre-wrap", // Ensures that code wraps within its container
                wordBreak: "break-word", // Breaks long words
              }}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  </div>
));

export default function Md() {
  const [markdown, setMarkdown] = useState(defaultText);
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <button
        className="bg-white text-black self-end p-2 rounded-md flex justify-center mx-auto hover:bg-zinc-300 font-bold"
        onClick={handlePrint}
      >
        Print
      </button>
      <div className="flex md:flex-row flex-col gap-4 justify-between px-5 py-2">
        <div className="outline-none rounded-lg md:min-h-1/2 dark:bg-zinc-800 block md:w-1/2 p-1">
          <Editor
            className="w-1/2 md:h-auto h-[30vh]"
            defaultLanguage="markdown"
            theme="vs-dark"
            onChange={(e) => {
              const newValue: any = e;
              setMarkdown(newValue);
            }}
            defaultValue={"// Enter your markdown text here"}
            loading={<h3>Loading..</h3>}
          />
        </div>
        <div className="rounded-lg lg:w-1/2 h-1/2 overflow-auto outline-none">
          <PrintableMarkdown ref={componentRef} markdown={markdown}  />
        </div>
      </div>
    </>
  );
}
