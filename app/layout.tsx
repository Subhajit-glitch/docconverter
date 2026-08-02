import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "DocConvert | Document conversion", description: "Convert PDFs and Word documents securely." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
