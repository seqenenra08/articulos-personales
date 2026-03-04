import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-10 mb-4 text-zinc-100">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-8 mb-3 text-zinc-200">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-2 text-zinc-300">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-zinc-400 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-zinc-400 mb-4 space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-zinc-400 mb-4 space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="text-zinc-400">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 my-4 text-zinc-500 italic">
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => {
      // Inline code (not inside pre)
      return (
        <code
          className="bg-zinc-800 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mb-4 text-sm">
        {children}
      </pre>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    hr: () => <hr className="border-zinc-800 my-8" />,
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full text-sm text-zinc-400">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="text-left px-3 py-2 border-b border-zinc-700 text-zinc-300 font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-3 py-2 border-b border-zinc-800">{children}</td>
    ),
    ...components,
  };
}
