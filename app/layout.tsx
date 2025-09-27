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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
