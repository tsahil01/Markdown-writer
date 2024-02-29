import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import 'highlight.js/styles/github.css';

export default function Md() {
    const [markdown, setMarkdown] = useState("# Hello");

    return (
        <div className="flex md:flex-row flex-col gap-5 justify-between p-5">

            <div className="border outline-none rounded-lg min-h-1/2 bg-zinc-800 block lg:w-1/2">
                <textarea
                    className="w-full min-h-1/2 p-3 resize-none outline-none bg-zinc-800 text-white"
                    style={{ fontFamily: "inherit", fontSize: "16px" }}
                    onChange={(e) => setMarkdown(e.target.value)}
                ></textarea>
            </div>

            <div className="rounded-lg lg:w-1/2 min-h-1/2 overflow-auto outline-none">
                <ReactMarkdown className="markdown w-full min-h-1/2 overflow-auto outline-none bg-zinc-800 p-4 text-white"
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');

                            return !inline && match ? (
                                <SyntaxHighlighter className="rounded-lg mx-4" style={vscDarkPlus} PreTag="div" language={match[1]} {...props}>
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
                </ReactMarkdown>
            </div>

        </div>
    );
}
