import { useRef, type ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { KickCategory, KickChannel } from "@/data/kick-tv-data";

interface ChannelCardProps {
  channel: KickChannel;
  isFocused: boolean;
  onFocus: () => void;
  onSelect: () => void;
}

export function ChannelCard({ channel, isFocused, onFocus, onSelect }: ChannelCardProps) {
  return (
    <button
      type="button"
      onMouseEnter={onFocus}
      onFocus={onFocus}
      onClick={onSelect}
      className={`group w-[16.5rem] shrink-0 cursor-pointer text-left transition-transform duration-200 focus-visible:outline-none sm:w-[19.5rem] ${
        isFocused ? "scale-[1.03]" : "hover:scale-[1.02]"
      }`}
    >
      <div
        className={`relative aspect-video overflow-hidden rounded-md bg-card transition-all duration-200 ${
          isFocused
            ? "ring-[3px] ring-primary kick-glow"
            : "ring-1 ring-border group-hover:ring-2 group-hover:ring-primary/70"
        }`}
      >
        <img
          src={channel.thumbnail}
          alt={channel.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-2.5 left-2.5 rounded-sm bg-primary px-2 py-0.5 text-[11px] font-extrabold tracking-wide text-primary-foreground uppercase">
          AO VIVO
        </span>
        <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-sm bg-viewer-pill px-2 py-0.5 text-xs font-semibold text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {channel.viewers} espectadores
        </span>
      </div>

      <div className="mt-3 flex min-w-0 items-start gap-3">
        <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold text-foreground ring-2 ring-primary/80">
          {channel.avatarInitials}
          {channel.verified && (
            <span className="absolute -right-0.5 -bottom-0.5 grid h-4 w-4 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-2.5 w-2.5 stroke-[3]" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-foreground">{channel.title}</p>
          <p className="truncate text-xs font-medium text-muted-foreground">{channel.name}</p>
          <p className="truncate text-xs text-muted-foreground/80">{channel.categoryName}</p>
        </div>
      </div>
    </button>
  );
}

interface CategoryCardProps {
  category: KickCategory;
  isFocused: boolean;
  onFocus: () => void;
  onSelect: () => void;
  fluid?: boolean;
}

export function CategoryCard({
  category,
  isFocused,
  onFocus,
  onSelect,
  fluid = false,
}: CategoryCardProps) {
  return (
    <button
      type="button"
      onMouseEnter={onFocus}
      onFocus={onFocus}
      onClick={onSelect}
      className={`group relative cursor-pointer rounded-md text-left transition-all duration-200 focus-visible:outline-none ${
        fluid ? "w-full" : "w-[9.5rem] shrink-0 sm:w-[11rem]"
      } ${
        isFocused
          ? "z-10 -translate-y-1 bg-tv-focus-surface p-2 text-tv-focus-foreground shadow-2xl ring-2 ring-primary"
          : "p-2 text-foreground hover:-translate-y-0.5"
      }`}
    >
      <div
        className={`relative aspect-[3/4] overflow-hidden rounded-sm bg-card shadow-md transition-transform duration-200 ${
          isFocused ? "-mt-3.5 shadow-xl" : ""
        }`}
      >
        <img
          src={category.cover}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-2.5 px-0.5 pb-1">
        <p
          className={`truncate text-sm font-bold ${
            isFocused ? "text-tv-focus-foreground" : "text-foreground"
          }`}
        >
          {category.name}
        </p>
        <p
          className={`truncate text-xs font-medium ${
            isFocused ? "text-tv-focus-muted" : "text-muted-foreground"
          }`}
        >
          {category.viewers}
        </p>
      </div>
    </button>
  );
}

interface HorizontalShelfProps {
  title: string;
  children: ReactNode;
}

export function HorizontalShelf({ title, children }: HorizontalShelfProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.max(360, el.clientWidth * 0.72), behavior: "smooth" });
  };

  return (
    <section className="relative py-3 sm:py-4">
      <h2 className="mb-3 px-4 text-lg font-bold tracking-tight text-foreground sm:px-10 sm:text-xl">
        {title}
      </h2>
      <div className="group/shelf relative">
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          aria-label={`Rolar ${title} para a esquerda`}
          className="kick-glow absolute top-1/2 left-2 z-20 hidden h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all group-hover/shelf:opacity-100 hover:scale-110 focus-visible:opacity-100 sm:grid"
        >
          <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
        </button>

        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-4 overflow-x-auto px-4 pt-4 pb-3 sm:gap-5 sm:px-10"
        >
          {children}
        </div>

        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          aria-label={`Rolar ${title} para a direita`}
          className="kick-glow absolute top-1/2 right-3 z-20 hidden h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110 focus-visible:outline-none sm:grid"
        >
          <ChevronRight className="h-5 w-5 stroke-[2.5]" />
        </button>
      </div>
    </section>
  );
}