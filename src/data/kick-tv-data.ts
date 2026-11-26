import streamPodcast from "@/assets/stream-podcast.jpg";
import streamIrl from "@/assets/stream-irl.jpg";
import streamFps from "@/assets/stream-fps.jpg";
import streamGta from "@/assets/stream-gta.jpg";
import catChatting from "@/assets/cat-chatting.jpg";
import catGta from "@/assets/cat-gta.jpg";
import catFps from "@/assets/cat-fps.jpg";
import catIrl from "@/assets/cat-irl.jpg";
import catBattle from "@/assets/cat-battle.jpg";
import catMoba from "@/assets/cat-moba.jpg";
import catMusic from "@/assets/cat-music.jpg";
import catSports from "@/assets/cat-sports.jpg";

export interface KickChannel {
  id: string;
  name: string;
  title: string;
  categoryId: string;
  categoryName: string;
  viewers: string;
  viewersNum: number;
  thumbnail: string;
  avatarInitials: string;
  verified: boolean;
  language: string;
}

export interface KickCategory {
  id: string;
  name: string;
  viewers: string;
  cover: string;
  featuredChannelId: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  colorClass: string;
  text: string;
  badge?: "MOD" | "SUB" | "VIP";
}

export const KICK_CHANNELS: KickChannel[] = [
  { id: "kamikat", name: "KamiKat", title: "Livezinha na Madruga! | !cortes - !pix - !sociais - !runas", categoryId: "apenas-conversa", categoryName: "Apenas Conversa", viewers: "14,2 mil", viewersNum: 14200, thumbnail: streamPodcast, avatarInitials: "KK", verified: true, language: "Português" },
  { id: "junitombl", name: "JUNITOMBL", title: "RESENHA AO VIVO NA KICK — Notícias, react e papo com o chat", categoryId: "apenas-conversa", categoryName: "Apenas Conversa", viewers: "8,7 mil", viewersNum: 8700, thumbnail: streamIrl, avatarInitials: "JM", verified: true, language: "Português" },
  { id: "forcageek", name: "ForcaGeek", title: "ESPECIAL MADRUGADA | Comentando lançamentos e trailers da semana", categoryId: "apenas-conversa", categoryName: "Apenas Conversa", viewers: "6,4 mil", viewersNum: 6400, thumbnail: streamPodcast, avatarInitials: "FG", verified: false, language: "Português" },
  { id: "jordiiney", name: "Jordiiney", title: "IRL NOTURNO EM TÓQUIO | Explorando ruas e fliperamas ao vivo", categoryId: "apenas-conversa", categoryName: "Apenas Conversa", viewers: "5,3 mil", viewersNum: 5300, thumbnail: streamIrl, avatarInitials: "JD", verified: true, language: "Português" },
  { id: "chombilomfilas", name: "Chombilomfilas", title: "Bate-papo aberto + ouvindo músicas indicadas pelo chat", categoryId: "apenas-conversa", categoryName: "Apenas Conversa", viewers: "4,1 mil", viewersNum: 4100, thumbnail: streamPodcast, avatarInitials: "CH", verified: false, language: "Português" },
  { id: "pgl-cs2", name: "PGL_CS2_BR", title: "PGL CS2 Major Singapore 2026 — Playoffs AO VIVO em Português", categoryId: "cs2", categoryName: "Counter-Strike 2", viewers: "92,4 mil", viewersNum: 92400, thumbnail: streamFps, avatarInitials: "PG", verified: true, language: "Português" },
  { id: "cpt-ferreira", name: "Cpt_Ferreira", title: "RANKED FACEIT LVL 10 | Subindo elo sem perder nenhuma hoje", categoryId: "cs2", categoryName: "Counter-Strike 2", viewers: "11,8 mil", viewersNum: 11800, thumbnail: streamFps, avatarInitials: "CF", verified: true, language: "Português" },
  { id: "kramujo-fps", name: "Kramujo", title: "Treino de mira + Premier 25k pontos com a tropa da Kick", categoryId: "cs2", categoryName: "Counter-Strike 2", viewers: "7,9 mil", viewersNum: 7900, thumbnail: streamFps, avatarInitials: "KR", verified: false, language: "Português" },
  { id: "thyago-fps", name: "Thyago_I", title: "ANALISANDO DEMOS DO MAJOR + Clutchs absurdos da rodada", categoryId: "cs2", categoryName: "Counter-Strike 2", viewers: "5,1 mil", viewersNum: 5100, thumbnail: streamFps, avatarInitials: "TH", verified: true, language: "Português" },
  { id: "batzera", name: "batzera", title: "GTA VI RP — Corrida clandestina na costa ao pôr do sol! | !loja", categoryId: "gta", categoryName: "Grand Theft Auto VI", viewers: "28,6 mil", viewersNum: 28600, thumbnail: streamGta, avatarInitials: "BZ", verified: true, language: "Português" },
  { id: "micalateia", name: "Micalateia", title: "MODO HISTÓRIA + TUNAGEM PESADA NO NOVO MAPA DE VICE CITY", categoryId: "gta", categoryName: "Grand Theft Auto VI", viewers: "16,5 mil", viewersNum: 16500, thumbnail: streamGta, avatarInitials: "MC", verified: true, language: "Português" },
  { id: "anj0w1", name: "anj0w1", title: "ROLEPLAY POLICIAL NA MADRUGA | Perseguição em alta velocidade", categoryId: "gta", categoryName: "Grand Theft Auto VI", viewers: "9,2 mil", viewersNum: 9200, thumbnail: streamGta, avatarInitials: "A1", verified: false, language: "Português" },
];

export const KICK_CATEGORIES: KickCategory[] = [
  { id: "apenas-conversa", name: "Apenas Conversa", viewers: "294 mil espectadores", cover: catChatting, featuredChannelId: "kamikat" },
  { id: "gta", name: "Grand Theft Auto VI", viewers: "276 mil espectadores", cover: catGta, featuredChannelId: "batzera" },
  { id: "cs2", name: "Counter-Strike 2", viewers: "233 mil espectadores", cover: catFps, featuredChannelId: "pgl-cs2" },
  { id: "lol", name: "League of Legends", viewers: "198 mil espectadores", cover: catMoba, featuredChannelId: "kamikat" },
  { id: "irl", name: "IRL", viewers: "182 mil espectadores", cover: catIrl, featuredChannelId: "jordiiney" },
  { id: "fortnite", name: "Fortnite", viewers: "121 mil espectadores", cover: catBattle, featuredChannelId: "cpt-ferreira" },
  { id: "esportes", name: "EA Sports FC 26", viewers: "101 mil espectadores", cover: catSports, featuredChannelId: "forcageek" },
  { id: "musica", name: "Música", viewers: "76 mil espectadores", cover: catMusic, featuredChannelId: "chombilomfilas" },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  { id: "m1", user: "anj0w1", colorClass: "text-primary", text: "Qualidade absurda nessa live na TV!", badge: "SUB" },
  { id: "m2", user: "Thyago_I", colorClass: "text-chart-2", text: "Essa jogada foi surreal demais, clipa isso!" },
  { id: "m3", user: "Micalateia", colorClass: "text-chart-4", text: "Salve chat da Kick! Quem tá assistindo da sala?", badge: "VIP" },
  { id: "m4", user: "Kramujo", colorClass: "text-chart-5", text: "Sem travar nada em 1080p60" },
  { id: "m5", user: "ModKickBR", colorClass: "text-primary", text: "Bem-vindos à transmissão! Respeitem as regras do chat.", badge: "MOD" },
];

export function getChannelById(id: string): KickChannel | undefined {
  return KICK_CHANNELS.find((ch) => ch.id === id);
}