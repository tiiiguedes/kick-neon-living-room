import { useEffect, useState } from "react";
import { RefreshCw, Search, Tv, X } from "lucide-react";
import {
  KICK_CATEGORIES,
  KICK_CHANNELS,
  type KickCategory,
  type KickChannel,
} from "@/data/kick-tv-data";

export interface TvSettings {
  quality: "Auto" | "1080p60" | "720p60" | "480p";
  lowLatency: boolean;
  autoChat: boolean;
  ambientBackdrop: boolean;
}

function generatePairingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const pick = (n: number) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)] ?? "K").join("");
  return `${pick(3)}-${pick(3)}`;
}

function ModalFrame({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl border border-border bg-card p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function TvSignInModal({
  signedInUser,
  onSignIn,
  onSignOut,
  onClose,
}: {
  signedInUser: string | null;
  onSignIn: (username: string) => void;
  onSignOut: () => void;
  onClose: () => void;
}) {
  const [code, setCode] = useState("K8X-49M");
  const [username, setUsername] = useState("");

  return (
    <ModalFrame title={signedInUser ? "Conta conectada na TV" : "Entrar na Kick TV"} onClose={onClose}>
      {signedInUser ? (
        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-lg bg-secondary/70 p-4">
            <Tv className="h-6 w-6 text-primary" />
            <div>
              <p className="text-base font-bold text-foreground">{signedInUser}</p>
              <p className="text-xs text-muted-foreground">Conectado neste dispositivo de TV</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="w-full cursor-pointer rounded-md bg-secondary py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-accent"
          >
            Desconectar conta
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Acesse <span className="font-bold text-primary">kick.com/ativar</span> no celular ou computador e digite o código abaixo:
          </p>
          <div className="flex items-center justify-between rounded-lg border border-primary/40 bg-background px-5 py-4">
            <span className="font-display text-3xl font-bold tracking-[0.22em] text-primary">
              {code}
            </span>
            <button
              type="button"
              onClick={() => setCode(generatePairingCode())}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Novo código
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const cleaned = username.trim();
              onSignIn(cleaned || "ViewerKickBR");
              onClose();
            }}
            className="space-y-3 border-t border-border pt-4"
          >
            <label className="block text-xs font-semibold text-muted-foreground">
              Ou entre rápido para testar a interface na TV
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu nome de usuário na Kick"
                className="min-w-0 flex-1 rounded-md bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
              >
                Conectar
              </button>
            </div>
          </form>
        </div>
      )}
    </ModalFrame>
  );
}

export function TvSearchModal({
  onSelectChannel,
  onSelectCategory,
  onClose,
}: {
  onSelectChannel: (channel: KickChannel) => void;
  onSelectCategory: (category: KickCategory) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const matchedChannels = KICK_CHANNELS.filter(
    (c) => !q || c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.categoryName.toLowerCase().includes(q),
  ).slice(0, 5);
  const matchedCategories = KICK_CATEGORIES.filter((cat) => !q || cat.name.toLowerCase().includes(q)).slice(0, 4);

  return (
    <ModalFrame title="Buscar na Kick TV" onClose={onClose}>
      <div className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar canais ao vivo ou categorias..."
            className="w-full rounded-lg bg-input py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <div className="max-h-80 space-y-4 overflow-y-auto pr-1">
          {matchedChannels.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Canais ao vivo</p>
              {matchedChannels.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    onSelectChannel(ch);
                    onClose();
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-secondary focus-visible:bg-tv-focus-surface focus-visible:text-tv-focus-foreground focus-visible:outline-none"
                >
                  <img src={ch.thumbnail} alt={ch.title} className="h-11 w-20 shrink-0 rounded-sm object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{ch.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{ch.title}</p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-primary">{ch.viewers}</span>
                </button>
              ))}
            </div>
          )}

          {matchedCategories.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Categorias</p>
              <div className="grid grid-cols-2 gap-2">
                {matchedCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat);
                      onClose();
                    }}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg bg-secondary/70 p-2 text-left transition-colors hover:bg-secondary"
                  >
                    <img src={cat.cover} alt={cat.name} className="h-12 w-9 shrink-0 rounded-xs object-cover" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-foreground">{cat.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{cat.viewers}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedChannels.length === 0 && matchedCategories.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Nenhum canal ou categoria encontrado para "{query}".
            </p>
          )}
        </div>
      </div>
    </ModalFrame>
  );
}

export function TvSettingsModal({
  settings,
  onUpdate,
  onClose,
}: {
  settings: TvSettings;
  onUpdate: (next: TvSettings) => void;
  onClose: () => void;
}) {
  const qualities: TvSettings["quality"][] = ["Auto", "1080p60", "720p60", "480p"];

  return (
    <ModalFrame title="Configurações da TV" onClose={onClose}>
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Qualidade padrão do vídeo</p>
          <div className="grid grid-cols-4 gap-2">
            {qualities.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onUpdate({ ...settings, quality: q })}
                className={`cursor-pointer rounded-md py-2 text-xs font-bold transition-colors ${
                  settings.quality === q
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-accent"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {(
          [
            ["lowLatency", "Baixa latência", "Reduz o atraso do vídeo em transmissões ao vivo"],
            ["autoChat", "Abrir chat automaticamente", "Mostra o chat da Kick ao abrir uma live"],
            ["ambientBackdrop", "Fundo dinâmico na Início", "Exibe a prévia ampliada do canal selecionado"],
          ] as const
        ).map(([key, label, desc]) => (
          <label key={key} className="flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-secondary/50 p-3.5">
            <div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <input
              type="checkbox"
              checked={settings[key]}
              onChange={(e) => onUpdate({ ...settings, [key]: e.target.checked })}
              className="h-5 w-5 accent-primary"
            />
          </label>
        ))}
      </div>
    </ModalFrame>
  );
}