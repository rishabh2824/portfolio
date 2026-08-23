import { useCallback, useEffect, useRef } from "react";

export const useSounds = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const pressBufferRef = useRef<AudioBuffer | null>(null);
  const releaseBufferRef = useRef<AudioBuffer | null>(null);
  // Memoizes the in-flight load so the first press and release sound (fired
  // back-to-back on a keydown/keyup) share one fetch/decode instead of racing
  // two AudioContexts into existence.
  const loadPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  // Deferred until the first sound is actually needed — browsers suspend a
  // freshly-created AudioContext until a user gesture anyway, so decoding both
  // clips on mount was pure speculative work.
  const ensureLoaded = useCallback(() => {
    if (loadPromiseRef.current) return loadPromiseRef.current;

    loadPromiseRef.current = (async () => {
      try {
        const AudioContext =
          window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        audioContextRef.current = ctx;
        // Tie resume() to the originating gesture as tightly as possible —
        // after the fetch/decode awaits below it's late enough for iOS/Safari's
        // autoplay policy to refuse it, leaving the first press silent.
        ctx.resume().catch(() => {});

        const [pressResponse, releaseResponse] = await Promise.all([
          fetch("/assets/keycap-sounds/press.mp3"),
          fetch("/assets/keycap-sounds/release.mp3"),
        ]);

        [pressBufferRef.current, releaseBufferRef.current] = await Promise.all([
          ctx.decodeAudioData(await pressResponse.arrayBuffer()),
          ctx.decodeAudioData(await releaseResponse.arrayBuffer()),
        ]);
      } catch (error) {
        console.error("Failed to load UI sounds", error);
        // Let the next call retry instead of reusing this permanently
        // resolved, buffer-less promise for the rest of the session.
        loadPromiseRef.current = null;
      }
    })();

    return loadPromiseRef.current;
  }, []);

  const getContext = useCallback(() => {
    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume().catch(() => {});
    }
    return audioContextRef.current;
  }, []);

  const playSoundBuffer = useCallback(
    async (bufferRef: React.RefObject<AudioBuffer | null>) => {
      try {
        await ensureLoaded();
        const ctx = getContext();
        const buffer = bufferRef.current;
        if (!ctx || !buffer) return;

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.detune.value = Math.random() * 200 - 100;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.4;

        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(0);
      } catch (error) {
        console.error("Failed to play UI sound", error);
      }
    },
    [ensureLoaded, getContext],
  );

  const playPressSound = useCallback(() => {
    playSoundBuffer(pressBufferRef);
  }, [playSoundBuffer]);

  const playReleaseSound = useCallback(() => {
    playSoundBuffer(releaseBufferRef);
  }, [playSoundBuffer]);

  return {
    playPressSound,
    playReleaseSound,
  };
};
