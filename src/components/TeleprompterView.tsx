import React from 'react';
import { AppMode, Settings, ScrollerState, FONT_MAP } from '../types';

interface TeleprompterViewProps {
  mode: AppMode;
  script: string;
  onScriptChange: (script: string) => void;
  settings: Settings;
  scrollerState: ScrollerState;
  containerRef: React.RefObject<HTMLDivElement>;
  onLoadFile: () => void;
  onStartTeleprompter: () => void;
}

const TeleprompterView: React.FC<TeleprompterViewProps> = ({
  mode,
  script,
  onScriptChange,
  settings,
  scrollerState,
  containerRef,
  onLoadFile,
  onStartTeleprompter,
}) => {
  if (mode === 'edit') {
    return (
      <div className="flex flex-col h-full p-4 gap-3">
        {/* Script textarea */}
        <textarea
          value={script}
          onChange={(e) => onScriptChange(e.target.value)}
          placeholder="Paste your script here or load a .txt file..."
          className="flex-1 w-full bg-neutral-900 text-white border border-neutral-700 rounded-lg p-4 text-sm resize-none outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-500"
          spellCheck={false}
        />

        {/* Action buttons row */}
        <div className="flex items-center gap-2">
          <button
            onClick={onLoadFile}
            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm font-medium rounded-lg transition-colors"
            style={{ minHeight: 44 }}
          >
            Load .txt File
          </button>
          <button
            onClick={() => onScriptChange('')}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm font-medium rounded-lg transition-colors"
            style={{ minHeight: 44 }}
          >
            Clear
          </button>
        </div>

        {/* Start Teleprompter button */}
        <button
          onClick={onStartTeleprompter}
          disabled={script.trim() === ''}
          className={`w-full py-3 text-sm font-semibold rounded-lg transition-all ${
            script.trim() === ''
              ? 'bg-emerald-800/40 text-emerald-300/40 cursor-not-allowed opacity-50'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
          }`}
          style={{ minHeight: 44 }}
        >
          Start Teleprompter
        </button>
      </div>
    );
  }

  // Teleprompter Mode
  const showEndIndicator =
    scrollerState.playback === 'stopped' && scrollerState.progress >= 0.99;

  return (
    <div
      className="relative h-full"
      style={{ opacity: settings.overlayOpacity }}
    >
      {/* Scrollable text container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto hide-scrollbar"
        style={{ backgroundColor: settings.bgColor }}
      >
        <div
          style={{
            transform: settings.mirror ? 'scaleX(-1)' : undefined,
            padding: `80px ${settings.padding}px`,
            fontSize: settings.fontSize,
            fontFamily: FONT_MAP[settings.fontFamily],
            color: settings.textColor,
            lineHeight: settings.lineHeight,
            textAlign: settings.textAlign,
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            minHeight: '100%',
          }}
        >
          {script}

          {/* End of Script indicator */}
          {showEndIndicator && (
            <div
              className="text-center py-8"
              style={{
                color: settings.textColor,
                opacity: 0.3,
                fontSize: Math.max(14, settings.fontSize * 0.5),
              }}
            >
              — End of Script —
            </div>
          )}
        </div>
      </div>

      {/* Top fade mask */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 80,
          background: `linear-gradient(to bottom, ${settings.bgColor}, transparent)`,
        }}
      />

      {/* Bottom fade mask */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 80,
          background: `linear-gradient(to top, ${settings.bgColor}, transparent)`,
        }}
      />
    </div>
  );
};

export default TeleprompterView;
