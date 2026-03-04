import Link from "next/link";
import type { ArticleMeta } from "@/lib/mdx";
import { getAreaLabel, getAreaIcon } from "@/lib/mdx";

interface ArticleCardProps {
  article: ArticleMeta;
}

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < level ? "bg-indigo-400" : "bg-zinc-700"
          }`}
        />
      ))}
    </div>
  );
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/${article.area}/${article.slug}`}>
      <article className="group border border-zinc-800 rounded-lg p-5 hover:border-indigo-500/50 hover:bg-zinc-900/50 transition-all duration-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-zinc-500 flex items-center gap-1">
            <span>{getAreaIcon(article.area)}</span>
            {getAreaLabel(article.area)}
          </span>
          <DifficultyDots level={article.difficulty} />
        </div>

        <h3 className="text-lg font-semibold text-zinc-200 group-hover:text-indigo-400 transition-colors mb-2">
          {article.title}
        </h3>

        {article.description && (
          <p className="text-sm text-zinc-500 mb-3 line-clamp-2">
            {article.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {article.concepts.slice(0, 3).map((concept) => (
              <span
                key={concept}
                className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full"
              >
                {concept}
              </span>
            ))}
          </div>
          {article.status === "draft" && (
            <span className="text-xs text-amber-500/70">borrador</span>
          )}
        </div>

        {article.date && (
          <p className="text-xs text-zinc-600 mt-3">{article.date}</p>
        )}
      </article>
    </Link>
  );
}
