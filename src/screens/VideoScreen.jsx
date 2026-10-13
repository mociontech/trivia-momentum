import { useEffect, useMemo, useRef, useState } from 'react';
import ConnectionBadge from '../components/ConnectionBadge.jsx';
import ReferenceScreen from '../components/ReferenceScreen.jsx';

const IDLE_SOURCES = ['/videos/Idle.mp4', '/videos/idle.mp4'];
const INCORRECT_SOURCES = ['/videos/Incorrecta.mp4', '/videos/incorrecta.mp4', '/videos/incorrect.mp4'];

function sourcesForCue(videoCue) {
  if (!videoCue) return IDLE_SOURCES;
  if (!videoCue.correct) return INCORRECT_SOURCES;

  const sources = [];
  if (videoCue.questionNumber) sources.push(`/videos/${videoCue.questionNumber}.mp4`);
  if (videoCue.roundQuestion && videoCue.roundQuestion !== videoCue.questionNumber) {
    sources.push(`/videos/${videoCue.roundQuestion}.mp4`);
  }
  sources.push('/videos/correct.mp4');
  return sources;
}

function AvatarVideoPlayer({ state, socket }) {
  const videoRef = useRef(null);
  const audioUnlockedRef = useRef(false);
  const videoCue = state?.phase === 'video' ? state?.videoCue : null;
  const [showIdle, setShowIdle] = useState(true);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const activeSources = useMemo(
    () => (showIdle ? IDLE_SOURCES : sourcesForCue(videoCue)),
    [showIdle, videoCue],
  );
  const src = activeSources[sourceIndex] || IDLE_SOURCES[0];
  const loop = showIdle;

  useEffect(() => {
    if (state?.phase !== 'video' || !videoCue?.nonce) {
      setShowIdle(true);
      setSourceIndex(0);
      return;
    }

    setShowIdle(false);
    setSourceIndex(0);
  }, [state?.phase, videoCue?.nonce]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    async function playVideo() {
      video.currentTime = 0;
      video.volume = 1;
      video.muted = showIdle && !audioUnlockedRef.current;

      try {
        await video.play();
        if (!cancelled) setAudioBlocked(false);
        return;
      } catch (error) {
        video.muted = true;
      }

      try {
        await video.play();
        if (!cancelled) setAudioBlocked(!showIdle);
      } catch (mutedError) {
        if (!cancelled) setAudioBlocked(true);
      }
    }

    playVideo();

    return () => {
      cancelled = true;
    };
  }, [showIdle, src]);

  const enableAudio = async () => {
    const video = videoRef.current;
    audioUnlockedRef.current = true;
    setAudioBlocked(false);

    if (!video) return;

    video.muted = false;
    video.volume = 1;

    try {
      await video.play();
    } catch (error) {
      setAudioBlocked(true);
    }
  };

  const handleEnded = () => {
    if (!showIdle) {
      socket.emit('video:ended', { nonce: videoCue?.nonce });
      setShowIdle(true);
      setSourceIndex(0);
    }
  };

  const handleError = () => {
    if (sourceIndex < activeSources.length - 1) {
      setSourceIndex((current) => current + 1);
      return;
    }

    if (!showIdle) {
      socket.emit('video:ended', { nonce: videoCue?.nonce });
      setShowIdle(true);
      setSourceIndex(0);
    }
  };

  return (
    <div className="avatar-video-window">
      <video
        ref={videoRef}
        key={src}
        src={src}
        autoPlay
        playsInline
        preload="auto"
        loop={loop}
        onEnded={handleEnded}
        onError={handleError}
      />
      {audioBlocked && (
        <button className="video-audio-unlock" type="button" onClick={enableAudio}>
          Activar sonido
        </button>
      )}
    </div>
  );
}

export default function VideoScreen({ socket, state, connected }) {
  return (
    <main className="display-root">
      <ConnectionBadge connected={connected} />
      <ReferenceScreen src="/Contenido/marcoAvatar.png" alt="Marco avatar" className="avatar-video-screen">
        <AvatarVideoPlayer socket={socket} state={state} />
      </ReferenceScreen>
    </main>
  );
}
