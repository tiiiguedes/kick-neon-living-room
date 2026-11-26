import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { TvHeroBackdrop } from "@/components/tv/TvHeroBackdrop";
import { CategoryCard, ChannelCard, HorizontalShelf } from "@/components/tv/TvShelves";
import { useTvApp } from "@/components/tv/TvAppShell";
import {
  getChannelById,
  KICK_CATEGORIES,
  KICK_CHANNELS,
  type KickCategory,
  type KickChannel,
} from "@/data/kick-tv-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Início — Kick TV" },
      {
        name: "description",
        content: "Explore canais ao vivo e categorias populares da Kick em uma interface para Smart TVs.",
      },
      { property: "og:title", content: "Início — Kick TV" },
      {
        property: "og:description",
        content: "Explore canais ao vivo e categorias populares da Kick em uma interface para Smart TVs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomeTvPage,
});

function HomeTvPage() {
  const { settings, openChannel } = useTvApp();

  const chattingChannels = useMemo(
    () => KICK_CHANNELS.filter((c) => c.categoryId === "apenas-conversa"),
    [],
  );
  const cs2Channels = useMemo(() => KICK_CHANNELS.filter((c) => c.categoryId === "cs2"), []);
  const gtaChannels = useMemo(() => KICK_CHANNELS.filter((c) => c.categoryId === "gta"), []);

  const [rowIdx, setRowIdx] = useState(0);
  const [colIdx, setColIdx] = useState(0);

  const rowLengths = [
    chattingChannels.length,
    KICK_CATEGORIES.length,
    cs2Channels.length,
    gtaChannels.length,
  ];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const len = rowLengths[rowIdx] ?? 1;
        setColIdx((c) => Math.min(len - 1, c + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setColIdx((c) => Math.max(0, c - 1));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setRowIdx((r) => {
          const next = Math.min(rowLengths.length - 1, r + 1);
          const nextLen = rowLengths[next] ?? 1;
          setColIdx((c) => Math.min(nextLen - 1, c));
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setRowIdx((r) => {
          const prev = Math.max(0, r - 1);
          const prevLen = rowLengths[prev] ?? 1;
          setColIdx((c) => Math.min(prevLen - 1, c));
          return prev;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [rowIdx, rowLengths]);

  const focusedCategory: KickCategory | null =
    rowIdx === 1 ? (KICK_CATEGORIES[colIdx] ?? KICK_CATEGORIES[0] ?? null) : null;

  const fallbackChannel = KICK_CHANNELS[0]!;
  let heroChannel: KickChannel = fallbackChannel;
  if (rowIdx === 0) heroChannel = chattingChannels[colIdx] ?? fallbackChannel;
  else if (rowIdx === 1 && focusedCategory) {
    heroChannel = getChannelById(focusedCategory.featuredChannelId) ?? fallbackChannel;
  } else if (rowIdx === 2) heroChannel = cs2Channels[colIdx] ?? fallbackChannel;
  else if (rowIdx === 3) heroChannel = gtaChannels[colIdx] ?? fallbackChannel;

  return (
    <main className="pb-16">
      <TvHeroBackdrop
        channel={heroChannel}
        focusedCategory={focusedCategory}
        ambientEnabled={settings.ambientBackdrop}
        onWatch={openChannel}
      />

      <div className="relative z-10 -mt-3 space-y-2">
        <HorizontalShelf title="Canais populares em Apenas Conversa">
          {chattingChannels.map((ch, idx) => (
            <ChannelCard
              key={ch.id}
              channel={ch}
              isFocused={rowIdx === 0 && colIdx === idx}
              onFocus={() => {
                setRowIdx(0);
                setColIdx(idx);
              }}
              onSelect={() => openChannel(ch)}
            />
          ))}
        </HorizontalShelf>

        <HorizontalShelf title="Categorias populares">
          {KICK_CATEGORIES.map((cat, idx) => {
            const featured = getChannelById(cat.featuredChannelId) ?? fallbackChannel;
            return (
              <CategoryCard
                key={cat.id}
                category={cat}
                isFocused={rowIdx === 1 && colIdx === idx}
                onFocus={() => {
                  setRowIdx(1);
                  setColIdx(idx);
                }}
                onSelect={() => openChannel(featured)}
              />
            );
          })}
        </HorizontalShelf>

        <HorizontalShelf title="Canais populares em Counter-Strike 2">
          {cs2Channels.map((ch, idx) => (
            <ChannelCard
              key={ch.id}
              channel={ch}
              isFocused={rowIdx === 2 && colIdx === idx}
              onFocus={() => {
                setRowIdx(2);
                setColIdx(idx);
              }}
              onSelect={() => openChannel(ch)}
            />
          ))}
        </HorizontalShelf>

        <HorizontalShelf title="Canais populares em Grand Theft Auto VI">
          {gtaChannels.map((ch, idx) => (
            <ChannelCard
              key={ch.id}
              channel={ch}
              isFocused={rowIdx === 3 && colIdx === idx}
              onFocus={() => {
                setRowIdx(3);
                setColIdx(idx);
              }}
              onSelect={() => openChannel(ch)}
            />
          ))}
        </HorizontalShelf>
      </div>
    </main>
  );
}
