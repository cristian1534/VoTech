"use client";

import { Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import ClientLayout from "./ClientLayout";
import { SessionProvider, useSession } from "../context/SessionContext";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-inter",
});

const ibmPlexSans = IBM_Plex_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-ibmplexsans",
});

function LayoutWithFooter({ children }: { children: React.ReactNode }) {
  const { sessionToken} = useSession();
  
  return (
    <>
      {children}
      {sessionToken && <Footer />}
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSans.variable} bg-gray-50`}>
        <SessionProvider>
          <ClientLayout>
            <LayoutWithFooter>{children}</LayoutWithFooter>
          </ClientLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
