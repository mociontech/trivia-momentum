import TouchScreen from './screens/TouchScreen.jsx';
import VideoScreen from './screens/VideoScreen.jsx';
import ContentScreen from './screens/ContentScreen.jsx';
import { useTriviaSocket } from './hooks/useTriviaSocket.js';

function RouteHelp() {
  return (
    <main className="route-help">
      <h1>EnRuta Empresarial · Trivia tríptico</h1>
      <p>Abre una URL distinta en cada televisor.</p>
      <div className="route-grid">
        <a href="/touch"><strong>1. Pantalla táctil</strong><span>/touch</span></a>
        <a href="/video"><strong>2. Pantalla de video</strong><span>/video</span></a>
        <a href="/content"><strong>3. Pantalla de contenido</strong><span>/content</span></a>
      </div>
    </main>
  );
}

export default function App() {
  const trivia = useTriviaSocket();
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  if (path === '/touch') return <TouchScreen {...trivia} />;
  if (path === '/video') return <VideoScreen {...trivia} />;
  if (path === '/content') return <ContentScreen {...trivia} />;
  return <RouteHelp />;
}
