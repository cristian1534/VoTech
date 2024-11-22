import { Inter, IBM_Plex_Sans } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import Footer from "../components/Footer";



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

export const metadata: Metadata = {
  title: "VoTech",
  description: "Software Development",
};
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug?: string };
}) {
  const isNotAuthPage = params?.slug === "signin" || params?.slug === "signup";

  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSans.variable} bg-gray-50`}>
        {isNotAuthPage ? (
          children
        ) : (
          <>
            {children}
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
