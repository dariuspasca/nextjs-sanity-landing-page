import { Inter, Poppins } from "next/font/google";

import "~/styles/globals.css";
import { siteConfig } from "config/site";
import { cn } from "lib/utils";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { SiteFooter } from "~/components/site-footer";
import { MainNav } from "~/components/main-nav";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-heading",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ["Next.js", "React"],
  authors: [
    {
      name: "Darius Pasca",
      url: "https://github.com/dariuspasca",
    },
  ],
  creator: "Darius Pasca",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: "@dariuspasca",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <div className="flex min-h-screen flex-col">
          <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6">
              <MainNav />
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <TailwindIndicator />
      </body>
    </html>
  );
}
