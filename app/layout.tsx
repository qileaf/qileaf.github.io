import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Faeliq - Clinical AI & Automation Developer",
  description:
    "Selected software projects, experiments, and open-source work by qileaf.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Faeliq - Clinical AI & Automation Developer",
    description: "Building thoughtful software from systems to interfaces.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
