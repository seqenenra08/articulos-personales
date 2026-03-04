import Link from "next/link";
import { getAreas, getAreaLabel, getAreaIcon } from "@/lib/mdx";

export default function Navbar() {
  const areas = getAreas();

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold text-zinc-100 hover:text-indigo-400 transition-colors"
        >
          knowledge.system
        </Link>
        <div className="flex gap-4">
          {areas.map((area) => (
            <Link
              key={area}
              href={`/${area}`}
              className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1"
            >
              <span>{getAreaIcon(area)}</span>
              <span className="hidden sm:inline">{getAreaLabel(area)}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
