import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, MessageSquare, Pause, Play, Send, Volume2, VolumeX } from "lucide-react";
import { INITIAL_CHAT_MESSAGES, type ChatMessage, type KickChannel } from "@/data/kick-tv-data";

interface TvPlayerOverlayProps {
  channel: KickChannel;
  initialChatOpen: boolean;
  defaultQuality: string;
  signedInUser: string | null;
  onClose: () => void;
}

const QUALITIES = ["Auto", "1080p60", "720p60", "480p"] as const;

export function TvPlayerOverlay({
  channel,
  initialChatOpen,
  defaultQuality,
  signedInUser,
  onClose,
}: TvPlayerOverlayProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showChat, setShowChat] = useState(initialChatOpen);
  const [quality, setQuality] = useState(defaultQuality);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        user: signedInUser ?? "VisitanteTV",
        colorClass: "text-primary",
        text,
        badge: "SUB",
      },
    ]);
    setDraft("");
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background lg:flex-row">
      <div className="relative flex flex-1 flex-col justify-between overflow-hidden bg-background">
        <img
          src={channel.thumbnail}
          alt={channel.title}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isPlaying ? "opacity-95" : "opacity-55"
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/95" />

        <div className="relative z-10 flex items-center justify-between gap-4 p-4 sm:p-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-viewer-pill px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>

          <div className="flex items-center gap-2.5">
            <span className="rounded-sm bg-primary px-2.5 py-1 text-xs font-extrabold text-primary-foreground uppercase">
              AO VIVO
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-viewer-pill px-3 py-1 text-xs font-semibold text-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {channel.viewers}
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-4 p-4 sm:p-6">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold text-foreground ring-2 ring-primary">
              {channel.avatarInitials}
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold text-foreground sm:text-lg">{channel.name}</p>
              <p className="truncate text-sm text-muted-foreground">{channel.title}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                aria-label={isPlaying ? "Pausar transmissão" : "Retomar transmissão"}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
              </button>
              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                aria-label={isMuted ? "Ativar som" : "Silenciar"}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-accent"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = QUALITIES[(QUALITIES.indexOf(quality as (typeof QUALITIES)[number]) + 1) % QUALITIES.length] ?? "Auto";
                  setQuality(next);
                }}
                className="cursor-pointer rounded-full bg-secondary px-3.5 py-2 text-xs font-bold text-foreground transition-colors hover:bg-accent"
              >
                {quality}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowChat((c) => !c)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                showChat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              {showChat ? "Ocultar Chat" : "Mostrar Chat"}
            </button>
          </div>
        </div>
      </div>

      {showChat && (
        <aside className="flex h-72 w-full flex-col border-t border-border bg-card lg:h-full lg:w-88 lg:border-t-0 lg:border-l">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-sm font-bold text-foreground">Chat da Transmissão</span>
            <span className="text-xs font-medium text-primary">{channel.language}</span>
          </div>

          <div className="flex-1 space-y-2.5 overflow-y-auto px-4 py-3 text-sm">
            {messages.map((msg) => (
              <p key={msg.id} className="leading-snug text-foreground/90">
                {msg.badge && (
                  <span className="mr-1.5 inline-block rounded-xs bg-primary/20 px-1 py-0.5 text-[10px] font-bold text-primary">
                    {msg.badge}
                  </span>
                )}
                <span className={`font-bold ${msg.colorClass}`}>{msg.user}:</span> {msg.text}
              </p>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Enviar mensagem no chat..."
              className="min-w-0 flex-1 rounded-md bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Enviar mensagem"
              className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-md bg-primary text-primary-foreground transition-transform hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </aside>
      )}
    </div>
  );
}