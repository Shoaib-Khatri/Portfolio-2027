import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Syne, Space_Grotesk } from 'next/font/google';
import { SmoothScroll } from '@/components/SmoothScroll';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const title = 'Rahul Karnekar — Product Designer';
const description =
  'Independent Product Designer working across B2B SaaS, FinTech, and AI products, designing experiences that are clear, useful, and thoughtfully crafted.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${plusJakartaSans.variable} ${syne.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-black text-white antialiased selection:bg-zinc-700 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
