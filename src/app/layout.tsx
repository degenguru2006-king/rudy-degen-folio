import type { Metadata } from 'next';
import './globals.css'; 

export const metadata: Metadata = {
  title: 'Rudyiseverywhere | Solana Liquidity Architect & Degen Investor',
  description: 'Strategic advisory, deep-tier research, meme alpha, AI/tech insights, and venture support on Solana. Scaling protocols from concept to core infrastructure. Rudy also funds degens with low portfolios under strict terms.',

  // Basic SEO tags (helps search engines and social previews)
  keywords: 'Solana, meme coins, AI, degen, liquidity, research, advisory, Rudyiseverywhere, alpha, investment',
  authors: [{ name: 'Rudyiseverywhere' }],


  openGraph: {
    title: 'Rudyiseverywhere | Solana Liquidity Architect & Degen Investor',
    description: 'Strategic advisory, deep-tier research, meme alpha, AI/tech insights, and venture support on Solana. Scaling protocols from concept to core infrastructure.',
    url: 'https://rudyiseverwhere.com', 
    siteName: 'Rudyiseverywhere',
    locale: 'en_US',
    type: 'website',
  },

  // Twitter/X Card (for X shares)
  twitter: {
    card: 'summary_large_image',
    title: 'Rudyiseverywhere | Solana Liquidity Architect & Degen Investor',
    description: 'Strategic advisory, deep-tier research, meme alpha, AI/tech insights, and venture support on Solana. Scaling protocols from concept to core infrastructure.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}