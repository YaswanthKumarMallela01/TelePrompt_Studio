import { useState, useRef, useCallback, useEffect } from 'react';
import { Settings, ScrollerState } from '../types';

export function useScroller(
  containerRef: React.RefObject<HTMLDivElement>,
  settings: Settings,
  onEnd: () => void
) {
  const [state, setState] = useState<ScrollerState>({
    playback: 'stopped',
    progress: 0,
    countdownValue: null,
  });

  const rafId = useRef<number | null>(null);
  const lastTimestamp = useRef<number>(0);
  const isPlayingRef = useRef(false);
  const countdownTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const settingsRef = useRef(settings);
  const onEndRef = useRef(onEnd);

  // Keep refs in sync
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  const calculateProgress = useCallback((container: HTMLDivElement): number => {
    const { scrollTop, scrollHeight, clientHeight } = container;
    const maxScroll = Math.max(1, scrollHeight - clientHeight);
    let progress = scrollTop / maxScroll;

    if (settingsRef.current.scrollDirection === 'up') {
      progress = 1 - progress;
    }

    return Math.min(1, Math.max(0, progress));
  }, []);

  const scrollLoop = useCallback((timestamp: number) => {
    if (!isPlayingRef.current) return;

    const container = containerRef.current;
    if (!container) {
      rafId.current = requestAnimationFrame(scrollLoop);
      return;
    }

    if (lastTimestamp.current === 0) {
      lastTimestamp.current = timestamp;
      rafId.current = requestAnimationFrame(scrollLoop);
      return;
    }

    const deltaTime = (timestamp - lastTimestamp.current) / 1000;
    lastTimestamp.current = timestamp;

    const scrollAmount = settingsRef.current.scrollSpeed * 30 * deltaTime;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const maxScroll = scrollHeight - clientHeight;

    if (settingsRef.current.scrollDirection === 'down') {
      container.scrollTop += scrollAmount;

      if (scrollTop + scrollAmount >= maxScroll) {
        container.scrollTop = maxScroll;
        isPlayingRef.current = false;
        setState((prev) => ({
          ...prev,
          playback: 'stopped',
          progress: 1,
        }));
        onEndRef.current();
        return;
      }
    } else {
      container.scrollTop -= scrollAmount;

      if (scrollTop - scrollAmount <= 0) {
        container.scrollTop = 0;
        isPlayingRef.current = false;
        setState((prev) => ({
          ...prev,
          playback: 'stopped',
          progress: 1,
        }));
        onEndRef.current();
        return;
      }
    }

    const progress = calculateProgress(container);
    setState((prev) => ({ ...prev, progress }));

    rafId.current = requestAnimationFrame(scrollLoop);
  }, [containerRef, calculateProgress]);

  const cancelRaf = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    lastTimestamp.current = 0;
  }, []);

  const cancelCountdownTimers = useCallback(() => {
    countdownTimers.current.forEach((t) => clearTimeout(t));
    countdownTimers.current = [];
  }, []);

  const play = useCallback(() => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    lastTimestamp.current = 0;
    setState((prev) => ({ ...prev, playback: 'playing', countdownValue: null }));
    rafId.current = requestAnimationFrame(scrollLoop);
  }, [scrollLoop]);

  const pause = useCallback(() => {
    isPlayingRef.current = false;
    cancelRaf();
    setState((prev) => ({ ...prev, playback: 'paused' }));
  }, [cancelRaf]);

  const stop = useCallback(() => {
    isPlayingRef.current = false;
    cancelRaf();
    cancelCountdownTimers();

    const container = containerRef.current;
    if (container) {
      if (settingsRef.current.scrollDirection === 'down') {
        container.scrollTop = 0;
      } else {
        container.scrollTop = container.scrollHeight - container.clientHeight;
      }
    }

    setState({
      playback: 'stopped',
      progress: 0,
      countdownValue: null,
    });
  }, [containerRef, cancelRaf, cancelCountdownTimers]);

  const togglePlayPause = useCallback(() => {
    if (isPlayingRef.current) {
      pause();
    } else {
      play();
    }
  }, [play, pause]);

  const startWithCountdown = useCallback(() => {
    stop();

    const t1 = setTimeout(() => {
      setState((prev) => ({ ...prev, countdownValue: 3 }));
    }, 100);

    const t2 = setTimeout(() => {
      setState((prev) => ({ ...prev, countdownValue: 2 }));
    }, 1100);

    const t3 = setTimeout(() => {
      setState((prev) => ({ ...prev, countdownValue: 1 }));
    }, 2100);

    const t4 = setTimeout(() => {
      setState((prev) => ({ ...prev, countdownValue: null }));
      play();
    }, 3100);

    countdownTimers.current = [t1, t2, t3, t4];
  }, [stop, play]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelRaf();
      cancelCountdownTimers();
    };
  }, [cancelRaf, cancelCountdownTimers]);

  return {
    state,
    play,
    pause,
    stop,
    togglePlayPause,
    startWithCountdown,
  };
}
