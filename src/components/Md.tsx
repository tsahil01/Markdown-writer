import { useState } from "react";
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import 'highlight.js/styles/github.css';

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
`

export default function Md() {
    const [markdown, setMarkdown] = useState(defaultText);

    return (
        <div className="flex md:flex-row flex-col gap-4 justify-between p-5">
            <div className="outline-none rounded-lg h-1/2 dark:bg-zinc-800 block lg:w-1/2">
            <Editor
                    className="w-full md:h-full h-[50vh]"
                    defaultLanguage="markdown"
                    theme='vs-dark'
                    onChange={(e) => {
                        console.log(e);
                        const newValue:any = e;
                        setMarkdown(newValue);
                    }}
                    defaultValue={"// Enter your markdown text here"}
                    loading= {<><h3>Loading..</h3></>}
                />
            </div>

            <div className="rounded-lg lg:w-1/2 h-1/2 overflow-auto outline-none">
                <ReactMarkdown className="markdown w-full h-full overflow-auto outline-none dark:bg-zinc-900 p-4 bg-slate-200 dark:text-white"
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        //@ts-ignore
                        code({ node, inline, className, children, ...props }: { node: any, inline: boolean, className: string, children: any, props: any }) {
                            const match = /language-(\w+)/.exec(className || '');

                            return !inline && match ? (
                                <SyntaxHighlighter className="rounded-lg mx-4" style={coldarkDark} PreTag="div" language={match[1]} {...props}>
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
