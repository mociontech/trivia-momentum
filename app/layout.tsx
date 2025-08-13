import "./globals.css";
import { GlobalProvider } from "@/context/global";
export const metadata = {
  title: "Powered by Mocion",
  description: "Trivia WPX",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}