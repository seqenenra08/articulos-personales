import Link from "next/link";
import { getAllArticles, getAreas, getAreaLabel, getAreaIcon } from "@/lib/mdx";
import ArticleCard from "@/components/ArticleCard";

export default function Home() {
  const articles = getAllArticles();
  const areas = getAreas();

  const publishedArticles = articles.filter((a) => a.status === "published");
  const draftArticles = articles.filter((a) => a.status === "draft");

  return (
    <div>
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-3 text-zinc-100">
          Knowledge System
        </h1>
        <p className="text-lg text-zinc-500 max-w-2xl">
          Sistema personal de artículos y notas técnicas. Matemáticas, Data
          Science, Frontend y Backend Architecture.
        </p>
      </section>

      {/* Areas */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          Áreas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {areas.map((area) => {
            const count = articles.filter((a) => a.area === area).length;
            return (
              <Link
                key={area}
                href={`/${area}`}
                className="border border-zinc-800 rounded-lg p-4 hover:border-indigo-500/50 hover:bg-zinc-900/50 transition-all group"
              >
                <span className="text-2xl">{getAreaIcon(area)}</span>
                <h3 className="text-sm font-semibold text-zinc-300 mt-2 group-hover:text-indigo-400 transition-colors">
                  {getAreaLabel(area)}
                </h3>
                <p className="text-xs text-zinc-600 mt-1">
                  {count} {count === 1 ? "artículo" : "artículos"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Published */}
      {publishedArticles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Publicados
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {publishedArticles.map((article) => (
              <ArticleCard key={`${article.area}/${article.slug}`} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Drafts */}
      {draftArticles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Borradores
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {draftArticles.map((article) => (
              <ArticleCard key={`${article.area}/${article.slug}`} article={article} />
            ))}
          </div>
        </section>
      )}

      {articles.length === 0 && (
        <section className="text-center py-20">
          <p className="text-zinc-500 text-lg">
            No hay artículos todavía. Crea tu primer <code>.mdx</code> en{" "}
            <code>/content</code>.
          </p>
        </section>
      )}
    </div>
  );
}
