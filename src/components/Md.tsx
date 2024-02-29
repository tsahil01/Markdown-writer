import { useState } from "react";
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
            <div className="outline-none rounded-lg dark:bg-zinc-800 block lg:w-1/2">
                <textarea
                    className="w-full h-full rounded-md p-3 resize-none outline-none dark:bg-zinc-900 dark:text-white bg-slate-200"
                    style={{ fontFamily: "inherit", fontSize: "16px" }}
                    autoFocus={true}
                    defaultValue={"Write the Code here"}
                    onChange={(e) => setMarkdown(e.target.value)}
                ></textarea>
            </div>

            <div className="rounded-lg lg:w-1/2  overflow-auto outline-none">
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
