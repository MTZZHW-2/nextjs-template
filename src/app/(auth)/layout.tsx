import type React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from '@/components/base/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '模板项目',
  description: '模板项目',
};

type RootLayoutProps = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="zh-Hans">
      <body className={`${geistSans.variable} ${geistMono.variable} flex h-screen w-screen antialiased`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
