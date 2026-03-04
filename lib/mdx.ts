import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type ArticleArea = "math" | "data-science" | "frontend" | "backend";

export interface ArticleMeta {
  title: string;
  area: ArticleArea;
  slug: string;
  difficulty: number;
  concepts: string[];
  status: "draft" | "published";
  date: string;
  description: string;
}

export function getAreas(): ArticleArea[] {
  return ["math", "data-science", "frontend", "backend"];
}

export function getAreaLabel(area: ArticleArea): string {
  const labels: Record<ArticleArea, string> = {
    math: "Matemáticas",
    "data-science": "Data Science",
    frontend: "Frontend",
    backend: "Backend",
  };
  return labels[area];
}

export function getAreaIcon(area: ArticleArea): string {
  const icons: Record<ArticleArea, string> = {
    math: "∑",
    "data-science": "📊",
    frontend: "🎨",
    backend: "⚙️",
  };
  return icons[area];
}

export function getAllArticles(): ArticleMeta[] {
  const areas = getAreas();
  const articles: ArticleMeta[] = [];

  for (const area of areas) {
    const areaDir = path.join(contentDir, area);
    if (!fs.existsSync(areaDir)) continue;

    const files = fs.readdirSync(areaDir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(areaDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);

      articles.push({
        title: data.title ?? slug,
        area: data.area ?? area,
        slug,
        difficulty: data.difficulty ?? 1,
        concepts: data.concepts ?? [],
        status: data.status ?? "draft",
        date: data.date ?? "",
        description: data.description ?? "",
      });
    }
  }

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticlesByArea(area: ArticleArea): ArticleMeta[] {
  return getAllArticles().filter((a) => a.area === area);
}

export function getArticleContent(area: string, slug: string): string {
  const filePath = path.join(contentDir, area, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Article not found: ${area}/${slug}`);
  }
  return fs.readFileSync(filePath, "utf-8");
}

export function getArticleMeta(area: string, slug: string): ArticleMeta {
  const raw = getArticleContent(area, slug);
  const { data } = matter(raw);
  return {
    title: data.title ?? slug,
    area: (data.area ?? area) as ArticleArea,
    slug,
    difficulty: data.difficulty ?? 1,
    concepts: data.concepts ?? [],
    status: data.status ?? "draft",
    date: data.date ?? "",
    description: data.description ?? "",
  };
}
