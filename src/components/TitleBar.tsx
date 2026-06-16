import React from 'react';
import { AppMode } from '../types';
import { getCurrentWindow } from '@tauri-apps/api/window';

interface TitleBarProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  settingsOpen: boolean;
  onToggleSettings: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({
  mode,
  onModeChange,
  settingsOpen,
  onToggleSettings,
}) => {
  const handleMinimize = () => {
    getCurrentWindow().minimize();
  };

  const handleClose = () => {
    getCurrentWindow().close();
  };

  return (
    <div
      data-tauri-drag-region
      className="flex items-center justify-between px-3 bg-[#171717] select-none shrink-0"
      style={{ height: 36 }}
    >
      {/* Left: App name */}
      <div
        data-tauri-drag-region
        className="text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-400 whitespace-nowrap"
      >
        TELEPROMPT STUDIO
      </div>

      {/* Center: Mode pill switcher */}
      <div
        data-tauri-drag-region
        className="flex items-center bg-neutral-800 rounded-full p-0.5"
      >
        <button
          onClick={() => onModeChange('edit')}
          className={`px-3 text-xs font-medium rounded-full transition-colors ${
            mode === 'edit'
              ? 'bg-white text-black'
              : 'text-neutral-400 hover:text-white'
          }`}
          style={{ minHeight: 24 }}
        >
          Edit
        </button>
        <button
          onClick={() => onModeChange('teleprompter')}
          className={`px-3 text-xs font-medium rounded-full transition-colors ${
            mode === 'teleprompter'
              ? 'bg-white text-black'
              : 'text-neutral-400 hover:text-white'
          }`}
          style={{ minHeight: 24 }}
        >
          Read
        </button>
      </div>

      {/* Right: Settings, minimize, close */}
      <div data-tauri-drag-region className="flex items-center gap-1">
        {/* Settings gear icon */}
        <button
          onClick={onToggleSettings}
          className={`p-1.5 rounded transition-colors ${
            settingsOpen
              ? 'text-white bg-neutral-700'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Settings"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>

        {/* Minimize button */}
        <button
          onClick={handleMinimize}
          className="p-1.5 rounded text-neutral-400 hover:text-white transition-colors"
          title="Minimize"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="p-1.5 rounded text-neutral-400 hover:text-red-400 transition-colors"
          title="Close"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
