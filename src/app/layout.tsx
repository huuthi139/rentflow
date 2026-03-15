import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { DataProvider } from "@/lib/store";
import { ToastProvider } from "@/components/ui/Toast";
import { AuthProvider } from "@/lib/auth";
import AuthGuard from "@/components/layout/AuthGuard";
import { NotificationProvider } from "@/lib/notifications";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "WeHome - Property Management SaaS",
  description: "Manage 1000+ rental properties, tenants, contracts, payments, and maintenance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-display bg-background-light dark:bg-slate-900 text-slate-900 dark:text-slate-100 antialiased`}>
        <I18nProvider><NotificationProvider><DataProvider><AuthProvider><ToastProvider><AuthGuard><AppShell>{children}</AppShell></AuthGuard></ToastProvider></AuthProvider></DataProvider></NotificationProvider></I18nProvider>
      </body>
    </html>
  );
}
