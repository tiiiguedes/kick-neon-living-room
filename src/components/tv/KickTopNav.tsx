import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Settings } from "lucide-react";

interface KickTopNavProps {
  onOpenSignIn: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  signedInUser: string | null;
}

export function KickLogo() {
  return (
    <span className="inline-flex items-center gap-1.5 select-none" aria-label="Kick">
      <svg viewBox="0 0 112 32" className="h-6 w-auto text-primary sm:h-7" fill="currentColor">
        <path d="M0 2h9v10h4V7h4V2h10v8h-4v4h-4v4h4v4h4v8H17v-5h-4v-5H9v10H0V2zm33 0h10v28H33V2zm16 0h25v9H59v10h15v9H49V2zm31 0h9v10h4V7h4V2h10v8h-4v4h-4v4h4v4h4v8H97v-5h-4v-5h-4v10h-9V2z" />
      </svg>
    </span>
  );
}

export function KickTopNav({
  onOpenSignIn,
  onOpenSearch,
  onOpenSettings,
  signedInUser,
}: KickTopNavProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const isBrowse = pathname === "/procurar";

  return (
    <header className="sticky top-0 z-30 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 bg-gradient-to-b from-background/95 via-background/75 to-transparent px-4 py-4 sm:px-10 sm:py-6">
      <Link
        to="/"
        className="shrink-0 rounded-md p-1 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <KickLogo />
      </Link>

      <nav aria-label="Navegação principal" className="flex min-w-0 items-center justify-center gap-4 sm:gap-9">
        <button
          type="button"
          onClick={onOpenSignIn}
          className="cursor-pointer truncate rounded-full px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:bg-tv-focus-surface focus-visible:text-tv-focus-foreground focus-visible:outline-none sm:text-base"
        >
          {signedInUser ? signedInUser : "Entrar"}
        </button>
        <Link
          to="/"
          className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition-all focus-visible:bg-tv-focus-surface focus-visible:text-tv-focus-foreground focus-visible:outline-none sm:text-base ${
            isHome
              ? "text-foreground underline decoration-primary decoration-2 underline-offset-8"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Início
        </Link>
        <Link
          to="/procurar"
          className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition-all focus-visible:bg-tv-focus-surface focus-visible:text-tv-focus-foreground focus-visible:outline-none sm:text-base ${
            isBrowse
              ? "text-foreground underline decoration-primary decoration-2 underline-offset-8"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Procurar
        </Link>
      </nav>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Buscar canais e categorias"
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-foreground/90 transition-all hover:bg-secondary hover:text-primary focus-visible:bg-tv-focus-surface focus-visible:text-tv-focus-foreground focus-visible:outline-none"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Configurações da TV"
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-foreground/90 transition-all hover:bg-secondary hover:text-primary focus-visible:bg-tv-focus-surface focus-visible:text-tv-focus-foreground focus-visible:outline-none"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}