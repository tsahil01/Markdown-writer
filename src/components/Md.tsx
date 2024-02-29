import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import 'highlight.js/styles/github.css';

export default function Md() {
    const [markdown, setMarkdown] = useState("# Hello");

    return (
        <div className="flex flex-row gap-5 justify-between p-5">

            <div className="border rounded-lg h-screen w-1/2">
                <textarea
                    className="w-full h-full p-3 overflow-auto b-0" // Adjusted padding for textarea
                    onChange={(e) => setMarkdown(e.target.value)}
                ></textarea>
            </div>

            <div className="border rounded-lg w-1/2 p-4 h-full bg-white overflow-auto"> {/* Added overflow-auto for scrollability */}
                <ReactMarkdown className="prose"
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
                </ReactMarkdown>
            </div>

        </div>
    );
}
