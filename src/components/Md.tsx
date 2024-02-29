import { useState } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import 'highlight.js/styles/github.css'; // Import a stylesheet for highlighting styles

export default function Md() {
    const [markdown, setMarkdown] = useState("# Hello");

    return (
        <div className="flex flex-row h-screen gap-5 justify-between w-full p-5">

            <div className="border rounded-lg w-1/2 h-full">
                <textarea className="w-full h-full" onChange={(e) => setMarkdown(e.target.value)}></textarea>
            </div>

            <div className="border rounded-lg w-1/2 h-full bg-white">
            <Markdown className="prose"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');

                    return !inline && match ? (
                        <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...props}>
                        {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                        {children}
                        </code>
                    );
                    },
                }}
                >
            {markdown}
            </Markdown>
            </div>

        </div>
    );
}