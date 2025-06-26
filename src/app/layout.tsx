import type { Metadata } from "next"
import { ToastProvider } from "../components/toasts/ToastProvider"
import { StoreProvider } from "@/store/StoreProvider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Journal application for everyone",
  description: "Faiyaz is amazing.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <ToastProvider>{children}</ToastProvider>
        </body>
      </html>
    </StoreProvider>
  )
}
