import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAreas,
  getAllArticles,
  getArticleContent,
  getArticleMeta,
  getAreaLabel,
  getAreaIcon,
  type ArticleArea,
} from "@/lib/mdx";
import { renderMDX } from "@/lib/mdx-render";

interface ArticlePageProps {
  params: Promise<{ area: string; slug: string }>;
}

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({
    area: a.area,
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { area, slug } = await params;
  try {
    const meta = getArticleMeta(area, slug);
    return {
      title: `${meta.title} — Knowledge System`,
      description: meta.description,
    };
  } catch {
    return {};
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { area, slug } = await params;

  if (!getAreas().includes(area as ArticleArea)) {
    notFound();
  }

  let raw: string;
  try {
    raw = getArticleContent(area, slug);
  } catch {
    notFound();
  }

  const meta = getArticleMeta(area, slug);
  const { content } = await renderMDX(raw);

  return (
    <article>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-zinc-300 transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link
          href={`/${area}`}
          className="hover:text-zinc-300 transition-colors"
        >
          {getAreaIcon(area as ArticleArea)} {getAreaLabel(area as ArticleArea)}
        </Link>
        <span>/</span>
        <span className="text-zinc-400">{meta.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          {meta.status === "draft" && (
            <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">
              Borrador
            </span>
          )}
          <span className="text-xs text-zinc-600">
            Dificultad: {meta.difficulty}/5
          </span>
        </div>
        <h1 className="text-4xl font-bold text-zinc-100 mb-3">{meta.title}</h1>
        {meta.description && (
          <p className="text-lg text-zinc-500">{meta.description}</p>
        )}
        <div className="flex gap-2 mt-4 flex-wrap">
          {meta.concepts.map((c) => (
            <span
              key={c}
              className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full"
            >
              {c}
            </span>
          ))}
        </div>
        {meta.date && (
          <p className="text-xs text-zinc-600 mt-3">{meta.date}</p>
        )}
      </header>

      {/* Content */}
      <div className="prose-custom">{content}</div>

      {/* Footer Navigation */}
      <div className="border-t border-zinc-800 mt-16 pt-8">
        <Link
          href={`/${area}`}
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          ← Volver a {getAreaLabel(area as ArticleArea)}
        </Link>
      </div>
    </article>
  );
}
