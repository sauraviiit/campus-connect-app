import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ConnectionProvider } from "@/context/ConnectionContext";
import { MessageProvider } from "@/context/MessageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Connect",
  description: "Connect with mentors and peers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ConnectionProvider>
            <MessageProvider>
              {children}
            </MessageProvider>
          </ConnectionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
