import "./globals.css";

export const metadata = {
  title: "Trivia Mortal Kombat",
  description: "Mortal Kombat Trivia Game",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Preload de imágenes críticas */}
        <link rel="preload" as="image" href="/assets/Login-background.png" />
        <link rel="preload" as="image" href="/assets/mortal-kombat-logo.png" />
        <link rel="preload" as="image" href="/assets/Agrega ID.png" />
        <link rel="preload" as="image" href="/assets/enter.png" />
        <link rel="preload" as="image" href="/assets/background-id-section.png" />
        {/* Preload de fuentes críticas */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/oracle-sans/OracleSans-Regular.woff2" crossOrigin="anonymous" />
        {/* DNS prefetch para Firebase */}
        <link rel="dns-prefetch" href="//firestore.googleapis.com" />
        <link rel="dns-prefetch" href="//firebase.googleapis.com" />
        {/* Preconnect para APIs externas */}
        <link rel="preconnect" href="https://mocion.app" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
