"use client"
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export default function MessageList({ messages }: { messages: any[] }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // this forces a rerender
    setHydrated(true)
  }, [])

  if (!hydrated) {
    // this returns null on first render, so the client and server match
    return null
  }

  return (
    <div className="space-y-3" suppressHydrationWarning={true}>
      <AnimatePresence initial={false}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`p-3 rounded-xl text-sm w-fit max-w-[100%] text-wrap text-foreground prose prose-invert break-words ${msg.role === "user" ? "ml-auto bg-muted border-1 border-muted" : "mr-auto bg-background border-1 border-muted"
              }`}
            suppressHydrationWarning={true}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
              table: ({ children }) => (
                <Table className="w-full text-sm">
                  {children}
                </Table>
              ),
              thead: ({ children }) => <TableHeader>{children}</TableHeader>,
              tbody: ({ children }) => <TableBody>{children}</TableBody>,
              tr: ({ children }) => <TableRow>{children}</TableRow>,
              th: ({ children }) => <TableHead>{children}</TableHead>,
              td: ({ children }) => <TableCell>{children}</TableCell>,
            }}>
              {msg.content}
            </ReactMarkdown>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
