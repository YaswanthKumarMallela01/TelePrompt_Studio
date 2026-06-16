export type AppMode = 'edit' | 'teleprompter';
export type ScrollDirection = 'down' | 'up';
export type TextAlign = 'left' | 'center';
export type FontFamily = 'inter' | 'georgia' | 'courier';
export type PlaybackState = 'playing' | 'paused' | 'stopped';

export interface Settings {
  fontSize: number;
  fontFamily: FontFamily;
  textColor: string;
  bgColor: string;
  lineHeight: number;
  textAlign: TextAlign;
  padding: number;
  scrollSpeed: number;
  scrollDirection: ScrollDirection;
  mirror: boolean;
  overlayOpacity: number;
}

export interface ScrollerState {
  playback: PlaybackState;
  progress: number;
  countdownValue: number | null;
}

export const DEFAULT_SETTINGS: Settings = {
  fontSize: 32,
  fontFamily: 'inter',
  textColor: '#ffffff',
  bgColor: '#000000',
  lineHeight: 1.6,
  textAlign: 'left',
  padding: 24,
  scrollSpeed: 1,
  scrollDirection: 'down',
  mirror: false,
  overlayOpacity: 1,
};

export const FONT_MAP: Record<FontFamily, string> = {
  inter: "'Inter', sans-serif",
  georgia: "Georgia, serif",
  courier: "'Courier New', monospace",
};
