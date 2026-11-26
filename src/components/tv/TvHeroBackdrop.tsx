import { Play } from "lucide-react";
import type { KickCategory, KickChannel } from "@/data/kick-tv-data";

interface TvHeroBackdropProps {
  channel: KickChannel;
  focusedCategory?: KickCategory | null;
  ambientEnabled: boolean;
  onWatch: (channel: KickChannel) => void;
}

export function TvHeroBackdrop({
  channel,
  focusedCategory,
  ambientEnabled,
  onWatch,
}: TvHeroBackdropProps) {
  const backdropSrc = focusedCategory ? focusedCategory.cover : channel.thumbnail;

  return (
    <section className="relative -mt-20 min-h-[22rem] overflow-hidden pt-24 pb-8 sm:-mt-24 sm:min-h-[25rem] sm:pt-28 sm:pb-10">
      {ambientEnabled && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={backdropSrc}
            alt=""
            aria-hidden="true"
            className="h-full w-full scale-105 object-cover object-center opacity-55 transition-all duration-500"
          />
          <div className="tv-hero-scrim absolute inset-0" />
        </div>
      )}

      <div className="relative z-10 flex items-center gap-5 px-4 sm:gap-7 sm:px-10">
        {focusedCategory && (
          <img
            src={focusedCategory.cover}
            alt={focusedCategory.name}
            className="hidden h-36 w-28 shrink-0 rounded-md object-cover shadow-2xl ring-1 ring-border sm:block"
          />
        )}

        <div className="min-w-0 max-w-2xl space-y-1.5">
          <p className="text-sm font-medium text-foreground/90 sm:text-base">{channel.name}</p>
          <p className="text-sm font-medium text-muted-foreground sm:text-base">
            {focusedCategory ? focusedCategory.name : channel.categoryName}
          </p>
          <h1 className="line-clamp-2 text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl">
            {channel.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => onWatch(channel)}
              className="kick-glow inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-tv-focus-surface focus-visible:outline-none"
            >
              <Play className="h-4 w-4 fill-current" />
              Assistir Agora
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-viewer-pill px-3 py-1.5 text-xs font-semibold text-foreground sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {channel.viewers} espectadores
            </span>
            <span className="rounded-md bg-secondary/90 px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
              {channel.language}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}