import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { KickTopNav } from "@/components/tv/KickTopNav";
import { TvPlayerOverlay } from "@/components/tv/TvPlayerOverlay";
import {
  TvSearchModal,
  TvSettingsModal,
  TvSignInModal,
  type TvSettings,
} from "@/components/tv/TvModals";
import type { KickChannel } from "@/data/kick-tv-data";

const SETTINGS_KEY = "kick-tv-settings-v1";
const USER_KEY = "kick-tv-user-v1";

const DEFAULT_SETTINGS: TvSettings = {
  quality: "1080p60",
  lowLatency: true,
  autoChat: true,
  ambientBackdrop: true,
};

interface TvAppContextValue {
  settings: TvSettings;
  openChannel: (channel: KickChannel) => void;
}

const TvAppContext = createContext<TvAppContextValue | null>(null);

export function useTvApp() {
  const ctx = useContext(TvAppContext);
  if (!ctx) throw new Error("useTvApp must be used inside TvAppProvider");
  return ctx;
}

export function TvAppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<TvSettings>(DEFAULT_SETTINGS);
  const [signedInUser, setSignedInUser] = useState<string | null>(null);
  const [activeChannel, setActiveChannel] = useState<KickChannel | null>(null);
  const [modal, setModal] = useState<"signin" | "search" | "settings" | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) setSettings({ ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<TvSettings>) });
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedUser) setSignedInUser(savedUser);
    } catch {
      // ignore storage errors
    }
  }, []);

  const updateSettings = (next: TvSettings) => {
    setSettings(next);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const handleSignIn = (user: string) => {
    setSignedInUser(user);
    try {
      localStorage.setItem(USER_KEY, user);
    } catch {
      // ignore storage errors
    }
  };

  const handleSignOut = () => {
    setSignedInUser(null);
    try {
      localStorage.removeItem(USER_KEY);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <TvAppContext.Provider value={{ settings, openChannel: setActiveChannel }}>
      <div className="min-h-screen bg-background text-foreground">
        <KickTopNav
          signedInUser={signedInUser}
          onOpenSignIn={() => setModal("signin")}
          onOpenSearch={() => setModal("search")}
          onOpenSettings={() => setModal("settings")}
        />
        {children}
      </div>

      {activeChannel && (
        <TvPlayerOverlay
          channel={activeChannel}
          initialChatOpen={settings.autoChat}
          defaultQuality={settings.quality}
          signedInUser={signedInUser}
          onClose={() => setActiveChannel(null)}
        />
      )}

      {modal === "signin" && (
        <TvSignInModal
          signedInUser={signedInUser}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          onClose={() => setModal(null)}
        />
      )}

      {modal === "search" && (
        <TvSearchModal
          onSelectChannel={setActiveChannel}
          onSelectCategory={() => navigate({ to: "/procurar" })}
          onClose={() => setModal(null)}
        />
      )}

      {modal === "settings" && (
        <TvSettingsModal
          settings={settings}
          onUpdate={updateSettings}
          onClose={() => setModal(null)}
        />
      )}
    </TvAppContext.Provider>
  );
}