import { forwardRef, useRef, useState } from "react"
import Editor from "@monaco-editor/react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { useReactToPrint } from "react-to-print"
import { PrinterIcon, SunIcon, MoonIcon } from "lucide-react"
import { Button } from "./ui/button"


const defaultText = `
# Markdown Writer App

**Write and preview Markdown in real-time with this user-friendly React app.**

## Features
- **Live Preview:** See Markdown rendering as you type.
- **User-Friendly Interface:** Split-screen layout for an intuitive experience.
- **Markdown Syntax Support:** Format text easily.
- **Theme Switcher:** Toggle between light and dark modes.

## Technologies
- **React**
- **TypeScript**
- **react-markdown**
- **Tailwind CSS**

## Usage
1. Open [**<span style="color:orange;"> eznote.vercel.app</span>**](https://eznote.vercel.app/) in your browser.
2. Write Markdown on the left, view the preview on the right.
3. Use the theme switcher in the top-right corner to change between light and dark modes.

- View [**README.md**](https://github.com/tsahil01/Markdown-writer/blob/master/README.md) for some common syntax
`

const PrintableMarkdown = forwardRef<HTMLDivElement, { markdown: string }>(
  ({ markdown }, ref) => (
    <div ref={ref} className="p-8">
      <ReactMarkdown
        className="prose dark:prose-invert max-w-none"
        remarkPlugins={[remarkGfm]}
        components={{
          // @ts-ignore
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <SyntaxHighlighter
              // @ts-ignore
                style={coldarkDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
)

PrintableMarkdown.displayName = "PrintableMarkdown"

export default function Md() {
  const [markdown, setMarkdown] = useState(defaultText)
  const componentRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Markdown Writer</h1>
        <div className="flex space-x-2 font-bold">
          <Button onClick={handlePrint} variant="outline" size="md">
            <PrinterIcon className="w-6 h-6" />
            Print
          </Button>

        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-600">
          <Editor
            defaultLanguage="markdown"
            theme={"vs-light"}
            onChange={(value) => setMarkdown(value || "")}
            value={markdown}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "off",
              wordWrap: "on",
              wrappingIndent: "indent",
              padding: { top: 16, bottom: 16 },
            }}
          />
        </div>
        <div className="w-1/2 overflow-auto bg-white dark:bg-gray-800">
          <PrintableMarkdown ref={componentRef} markdown={markdown} />
        </div>
      </div>
    </div>
  )
}