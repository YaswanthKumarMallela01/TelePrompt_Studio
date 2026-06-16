import React from 'react';
import { ScrollerState } from '../types';

interface ControlStripProps {
  scrollerState: ScrollerState;
  speed: number;
  onTogglePlayPause: () => void;
  onStop: () => void;
  onRestart: () => void;
}

const ControlStrip: React.FC<ControlStripProps> = ({
  scrollerState,
  speed,
  onTogglePlayPause,
  onStop,
  onRestart,
}) => {
  const progressPercent = Math.round(scrollerState.progress * 100);
  const isPlaying = scrollerState.playback === 'playing';

  return (
    <div className="bg-[#171717] border-t border-neutral-800 shrink-0">
      {/* Progress bar */}
      <div className="flex items-center gap-2 px-3 pt-2">
        <div className="flex-1 h-1 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-[10px] text-neutral-400 w-8 text-right tabular-nums">
          {progressPercent}%
        </span>
      </div>

      {/* Control buttons */}
      <div className="flex items-center justify-center gap-3 px-3 py-2">
        {/* Play / Pause */}
        <button
          onClick={onTogglePlayPause}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
          style={{ minHeight: 44, minWidth: 44 }}
        >
          {isPlaying ? (
            /* Pause icon */
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            /* Play icon */
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="6,4 20,12 6,20" />
            </svg>
          )}
        </button>

        {/* Stop & Reset */}
        <button
          onClick={onStop}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
          title="Stop & Reset"
          style={{ minHeight: 44, minWidth: 44 }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
        </button>

        {/* Restart with Countdown */}
        <button
          onClick={onRestart}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
          title="Restart with Countdown"
          style={{ minHeight: 44, minWidth: 44 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>

        {/* Speed readout */}
        <div className="flex items-center justify-center px-3 py-1 bg-neutral-800 rounded-full">
          <span className="text-xs text-neutral-300 font-medium tabular-nums">
            {speed.toFixed(1)}×
          </span>
        </div>
      </div>
    </div>
  );
};

export default ControlStrip;
