import React, { useState, useRef, useCallback } from 'react';
import { AppMode } from './types';
import { useSettings } from './hooks/useSettings';
import { useScroller } from './hooks/useScroller';
import { useHotkeys } from './hooks/useHotkeys';
import TitleBar from './components/TitleBar';
import SettingsPanel from './components/SettingsPanel';
import TeleprompterView from './components/TeleprompterView';
import ControlStrip from './components/ControlStrip';
import Countdown from './components/Countdown';
import { open } from '@tauri-apps/plugin-dialog';
import { readTextFile } from '@tauri-apps/plugin-fs';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('edit');
  const [script, setScript] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { settings, updateSetting, resetSettings } = useSettings();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollEnd = useCallback(() => {
    // Playback has ended — the scroller hook already sets state to stopped
  }, []);

  const scroller = useScroller(containerRef, settings, handleScrollEnd);

  const loadFile = useCallback(async () => {
    try {
      const selected = await open({
        filters: [{ name: 'Text Files', extensions: ['txt'] }],
      });

      if (selected && typeof selected === 'string') {
        const contents = await readTextFile(selected);
        setScript(contents);
      }
    } catch (err) {
      console.error('Failed to load file:', err);
    }
  }, []);

  const switchToTeleprompter = useCallback(() => {
    if (script.trim() === '') return;
    setMode('teleprompter');
  }, [script]);

  const switchToEdit = useCallback(() => {
    if (scroller.state.playback === 'playing') {
      scroller.pause();
    }
    scroller.stop();
    setMode('edit');
  }, [scroller]);

  const handleModeChange = useCallback(
    (newMode: AppMode) => {
      if (newMode === 'teleprompter') {
        switchToTeleprompter();
      } else {
        switchToEdit();
      }
    },
    [switchToTeleprompter, switchToEdit]
  );

  useHotkeys(
    {
      togglePlayPause: scroller.togglePlayPause,
      restart: scroller.startWithCountdown,
      stop: scroller.stop,
      speedUp: () =>
        updateSetting(
          'scrollSpeed',
          Math.min(10, +(settings.scrollSpeed + 0.5).toFixed(1))
        ),
      speedDown: () =>
        updateSetting(
          'scrollSpeed',
          Math.max(0.1, +(settings.scrollSpeed - 0.5).toFixed(1))
        ),
      openFile: loadFile,
      exitToEdit: switchToEdit,
    },
    mode === 'teleprompter'
  );

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Title Bar — always visible */}
      <TitleBar
        mode={mode}
        onModeChange={handleModeChange}
        settingsOpen={settingsOpen}
        onToggleSettings={() => setSettingsOpen((prev) => !prev)}
      />

      {/* Settings Panel — conditional */}
      {settingsOpen && (
        <SettingsPanel
          settings={settings}
          onUpdateSetting={updateSetting}
          onReset={resetSettings}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 relative overflow-hidden">
        <TeleprompterView
          mode={mode}
          script={script}
          onScriptChange={setScript}
          settings={settings}
          scrollerState={scroller.state}
          containerRef={containerRef}
          onLoadFile={loadFile}
          onStartTeleprompter={switchToTeleprompter}
        />

        {/* Countdown overlay — within the content area */}
        <Countdown value={scroller.state.countdownValue} />
      </div>

      {/* Control Strip — bottom bar, only in teleprompter mode */}
      {mode === 'teleprompter' && (
        <ControlStrip
          scrollerState={scroller.state}
          speed={settings.scrollSpeed}
          onTogglePlayPause={scroller.togglePlayPause}
          onStop={scroller.stop}
          onRestart={scroller.startWithCountdown}
        />
      )}
    </div>
  );
};

export default App;
