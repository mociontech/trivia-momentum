import { useEffect, useMemo, useRef, useState } from 'react';
import ConnectionBadge from '../components/ConnectionBadge.jsx';
import ReferenceScreen from '../components/ReferenceScreen.jsx';

const IDLE_SOURCES = ['/videos/Idle.mp4', '/videos/idle.mp4'];
const INCORRECT_SOURCES = ['/videos/Incorrecta.mp4', '/videos/incorrecta.mp4', '/videos/incorrect.mp4'];

function sourcesForCue(videoCue) {
  if (!videoCue) return IDLE_SOURCES;
  if (!videoCue.correct) return INCORRECT_SOURCES;
  return [`/videos/${videoCue.questionNumber}.mp4`];
}

function AvatarVideoPlayer({ state, socket }) {
  const videoRef = useRef(null);
  const videoCue = state?.phase === 'video' ? state?.videoCue : null;
  const [showIdle, setShowIdle] = useState(true);
  const [sourceIndex, setSourceIndex] = useState(0);
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

    video.currentTime = 0;
    video.muted = false;
    video.volume = 1;
    video.play().catch(() => {});
  }, [src]);

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
