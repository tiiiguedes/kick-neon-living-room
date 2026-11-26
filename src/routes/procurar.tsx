import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { CategoryCard, ChannelCard, HorizontalShelf } from "@/components/tv/TvShelves";
import { useTvApp } from "@/components/tv/TvAppShell";
import {
  getChannelById,
  KICK_CATEGORIES,
  KICK_CHANNELS,
  type KickCategory,
} from "@/data/kick-tv-data";

export const Route = createFileRoute("/procurar")({
  head: () => ({
    meta: [
      { title: "Procurar Categorias — Kick TV" },
      {
        name: "description",
        content: "Navegue por todas as categorias e jogos ao vivo na Kick TV.",
      },
      { property: "og:title", content: "Procurar Categorias — Kick TV" },
      {
        property: "og:description",
        content: "Navegue por todas as categorias e jogos ao vivo na Kick TV.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrowseTvPage,
});

function BrowseTvPage() {
  const { openChannel } = useTvApp();
  const [focusedIdx, setFocusedIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<KickCategory | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setFocusedIdx((i) => Math.min(KICK_CATEGORIES.length - 1, i + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusedIdx((i) => Math.max(0, i - 1));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const categoryChannels = selectedCategory
    ? KICK_CHANNELS.filter((ch) => ch.categoryId === selectedCategory.id)
    : [];
  const resolvedChannels =
    categoryChannels.length > 0
      ? categoryChannels
      : selectedCategory
        ? [getChannelById(selectedCategory.featuredChannelId) ?? KICK_CHANNELS[0]!]
        : [];

  return (
    <main className="px-4 pt-3 pb-16 sm:px-10 sm:pt-5">
      <h1 className="sr-only">Procurar categorias na Kick TV</h1>

      {selectedCategory && (
        <div className="mb-8 rounded-xl border border-border bg-card/70 pt-3 pb-2">
          <div className="flex items-center justify-between px-4 sm:px-6">
            <p className="text-sm font-semibold text-primary">
              Canais ao vivo em {selectedCategory.name}
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              aria-label="Fechar filtro de categoria"
              className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground hover:bg-accent"
            >
              <X className="h-3.5 w-3.5" />
              Fechar
            </button>
          </div>
          <HorizontalShelf title={selectedCategory.name}>
            {resolvedChannels.map((ch) => (
              <ChannelCard
                key={ch.id}
                channel={ch}
                isFocused={false}
                onFocus={() => {}}
                onSelect={() => openChannel(ch)}
              />
            ))}
          </HorizontalShelf>
        </div>
      )}

      <section
        aria-label="Grade de categorias"
        className="grid grid-cols-2 gap-x-4 gap-y-8 pt-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"
      >
        {KICK_CATEGORIES.map((cat, idx) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            fluid
            isFocused={focusedIdx === idx}
            onFocus={() => setFocusedIdx(idx)}
            onSelect={() => setSelectedCategory(cat)}
          />
        ))}
      </section>
    </main>
  );
}