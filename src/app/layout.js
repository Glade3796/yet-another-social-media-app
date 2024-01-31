import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yet Another Social Media APP",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <header>
            <h1>{metadata.title}</h1>
            <UserButton afterSignOutUrl="/" />
          </header>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
