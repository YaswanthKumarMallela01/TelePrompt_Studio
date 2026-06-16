import { useEffect, useRef } from 'react';
import { register, unregisterAll } from '@tauri-apps/plugin-global-shortcut';

export interface HotkeyActions {
  togglePlayPause: () => void;
  restart: () => void;
  stop: () => void;
  speedUp: () => void;
  speedDown: () => void;
  openFile: () => void;
  exitToEdit: () => void;
}

export function useHotkeys(actions: HotkeyActions, enabled: boolean) {
  const actionsRef = useRef<HotkeyActions>(actions);

  // Keep the ref up to date without triggering re-registration
  useEffect(() => {
    actionsRef.current = actions;
  }, [actions]);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const registerAll = async () => {
      try {
        await register('Space', (event) => {
          if (event.state === 'Pressed' && !cancelled) {
            actionsRef.current.togglePlayPause();
          }
        });

        await register('KeyR', (event) => {
          if (event.state === 'Pressed' && !cancelled) {
            actionsRef.current.restart();
          }
        });

        await register('KeyS', (event) => {
          if (event.state === 'Pressed' && !cancelled) {
            actionsRef.current.stop();
          }
        });

        await register('ArrowUp', (event) => {
          if (event.state === 'Pressed' && !cancelled) {
            actionsRef.current.speedUp();
          }
        });

        await register('ArrowDown', (event) => {
          if (event.state === 'Pressed' && !cancelled) {
            actionsRef.current.speedDown();
          }
        });

        await register('CmdOrCtrl+KeyO', (event) => {
          if (event.state === 'Pressed' && !cancelled) {
            actionsRef.current.openFile();
          }
        });

        await register('Escape', (event) => {
          if (event.state === 'Pressed' && !cancelled) {
            actionsRef.current.exitToEdit();
          }
        });
      } catch (err) {
        console.error('Failed to register global shortcuts:', err);
      }
    };

    registerAll();

    return () => {
      cancelled = true;
      unregisterAll().catch((err) => {
        console.error('Failed to unregister global shortcuts:', err);
      });
    };
  }, [enabled]);
}
