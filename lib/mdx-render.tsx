import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import matter from "gray-matter";
import { useMDXComponents } from "@/lib/mdx-components";
import type { ArticleMeta } from "@/lib/mdx";

interface MDXRenderResult {
  content: React.ReactElement;
  frontmatter: ArticleMeta;
}

export async function renderMDX(raw: string): Promise<MDXRenderResult> {
  const { content: rawContent } = matter(raw);

  const { content, frontmatter } = await compileMDX<ArticleMeta>({
    source: rawContent,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [
          rehypeKatex,
          [
            rehypePrettyCode,
            {
              theme: "github-dark-dimmed",
              keepBackground: true,
            },
          ],
        ],
      },
    },
    components: useMDXComponents({}),
  });

  // Parse frontmatter separately since we stripped it
  const { data } = matter(raw);
  const meta: ArticleMeta = {
    title: data.title ?? "",
    area: data.area ?? "",
    slug: "",
    difficulty: data.difficulty ?? 1,
    concepts: data.concepts ?? [],
    status: data.status ?? "draft",
    date: data.date ?? "",
    description: data.description ?? "",
  };

  return { content, frontmatter: meta };
}
