import { notFound } from "next/navigation";
import {
  getAreas,
  getArticlesByArea,
  getAreaLabel,
  getAreaIcon,
  type ArticleArea,
} from "@/lib/mdx";
import ArticleCard from "@/components/ArticleCard";

interface AreaPageProps {
  params: Promise<{ area: string }>;
}

export function generateStaticParams() {
  return getAreas().map((area) => ({ area }));
}

export async function generateMetadata({ params }: AreaPageProps) {
  const { area } = await params;
  if (!getAreas().includes(area as ArticleArea)) return {};
  return {
    title: `${getAreaLabel(area as ArticleArea)} — Knowledge System`,
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { area } = await params;

  if (!getAreas().includes(area as ArticleArea)) {
    notFound();
  }

  const articles = getArticlesByArea(area as ArticleArea);
  const label = getAreaLabel(area as ArticleArea);
  const icon = getAreaIcon(area as ArticleArea);

  return (
    <div>
      <div className="mb-10">
        <span className="text-4xl mb-2 block">{icon}</span>
        <h1 className="text-3xl font-bold text-zinc-100">{label}</h1>
        <p className="text-zinc-500 mt-2">
          {articles.length} {articles.length === 1 ? "artículo" : "artículos"}
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-zinc-500">
            No hay artículos en {label} todavía.
          </p>
        </div>
      )}
    </div>
  );
}
