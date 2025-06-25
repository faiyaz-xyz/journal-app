import { app } from "../../firebaseConfig"
import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "../components/toasts/ToastProvider"


export const metadata: Metadata = {
  title: "Journal application for everyone",
  description: "Faiyaz is amazing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <ToastProvider>
            {children}
          </ToastProvider>
      </body>
    </html>
  );
}
