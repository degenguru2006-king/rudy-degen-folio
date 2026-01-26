'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownRight,
  Twitter,
  Send,
  Brain,
  Rocket,
  TrendingUp,
  Cpu,
  Laugh,
  Briefcase,
  Shield,
  DollarSign,
  Zap,
} from 'lucide-react';

export default function Page() {
  const [solPrice, setSolPrice] = useState<number | null>(null);
  const [change24h, setChange24h] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // SOL price fetch
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setPriceLoading(true);
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true',
          { cache: 'no-store' }
        );
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setSolPrice(data.solana.usd);
        setChange24h(data.solana.usd_24h_change);
      } catch (error) {
        console.error('Failed to fetch SOL price:', error);
      } finally {
        setPriceLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 240000);
    return () => clearInterval(interval);
  }, []);

  // Track active section for nav highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = 'home';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 180 && rect.bottom >= 180) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0D12]/90 backdrop-blur-xl border-b border-[#00F5D4]/20 shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="text-white font-orbitron font-bold text-xl sm:text-2xl tracking-tight">
          Rudyiseverywhere
        </div>

        <div className="flex items-center gap-6 sm:gap-10">
          <div className="hidden sm:flex items-center gap-8">
            {['home', 'about'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`text-base font-medium transition-all duration-300 ${
                  activeSection === id
                    ? 'text-[#00F5D4] scale-105'
                    : 'text-white/70 hover:text-[#00F5D4]'
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>

          <motion.a
            href="https://t.me/rudyiseverywhere"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(0,245,212,0.5)' }}
            whileTap={{ scale: 0.96 }}
            className="px-6 py-2.5 bg-gradient-to-r from-[#00F5D4] to-[#9F7AEA] text-[#0A0D12] font-orbitron font-semibold text-base rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(0,245,212,0.6)] transition-all duration-300 border border-[#00F5D4]/40 flex items-center gap-2"
          >
            Work with Me
            <ArrowUpRight size={18} />
          </motion.a>
        </div>
      </div>
    </nav>
  );

  const Hero = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-100px' });

    return (
      <motion.section
        id="home"
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1 }}
        className="min-h-screen flex flex-col justify-center items-center text-center px-5 sm:px-8 relative overflow-hidden scroll-mt-20"
      >
        <FloatingIcons />

        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-orbitron font-extrabold bg-gradient-to-r from-[#9F7AEA] via-[#00F5D4] to-[#ED64A6] bg-clip-text text-transparent mb-6 md:mb-8 tracking-tight leading-tight animate-gradient-x">
            Architecting the Future of Solana Liquidity
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto mb-10 md:mb-14 font-light leading-relaxed">
            Strategic advisory, deep-tier research, and venture insights for protocols that demand more than just hype.<br className="hidden sm:block" />
            I help builders scale from concept to core infrastructure.
          </p>

          <motion.a
            href="https://t.me/rudyiseverywhere"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,245,212,0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#00F5D4] to-[#9F7AEA] text-[#0A0D12] font-orbitron font-bold text-xl sm:text-2xl rounded-xl shadow-2xl hover:shadow-[0_0_60px_rgba(0,245,212,0.7)] transition-all duration-500 border border-[#00F5D4]/40 hover:border-white/60"
          >
            Get on the Radar
            <ArrowUpRight className="ml-3" size={28} />
          </motion.a>
        </div>
      </motion.section>
    );
  };

  const SocialSidebar = () => (
    <div className="fixed left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5 sm:gap-7">
      <motion.a
        href="https://twitter.com/rudyonton_"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ scale: 1.25, x: 10 }}
        className="text-[#00F5D4]/70 hover:text-[#00F5D4] transition-all duration-300 drop-shadow-md"
      >
        <Twitter size={26} className="sm:size-8" />
      </motion.a>

      <motion.a
        href="https://t.me/rudyiseverywhere"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        whileHover={{ scale: 1.25, x: 10 }}
        className="text-[#00F5D4]/70 hover:text-[#00F5D4] transition-all duration-300 drop-shadow-md"
      >
        <Send size={26} className="sm:size-8 rotate-45" />
      </motion.a>
    </div>
  );

  const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-100px' });

    return (
      <motion.section
        id="about"
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1 }}
        className="py-20 sm:py-28 bg-[#0A0D12] relative overflow-hidden scroll-mt-20 min-h-[70vh] flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-orbitron font-extrabold bg-gradient-to-r from-[#9F7AEA] via-[#00F5D4] to-[#ED64A6] bg-clip-text text-transparent mb-10">
            About Rudy
          </h2>

          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-5xl mx-auto leading-relaxed font-light">
            Rudy is an investor active in meme markets, AI, and technology. He focuses on early-stage opportunities, on-chain ecosystems, and projects driven by strong communities and real technical execution.
            <br /><br />
            Rudy also funds degens who has a low portfolio based on our terms and conditions.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10 text-[#00F5D4]/80">
            <Brain size={48} className="sm:size-16" />
            <Rocket size={48} className="sm:size-16" />
            <TrendingUp size={48} className="sm:size-16" />
            <Cpu size={48} className="sm:size-16" />
          </div>
        </div>
      </motion.section>
    );
  };

  const SolanaTracker = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-100px' });

    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1 }}
        className="py-16 sm:py-20 bg-[#0A0D12] relative overflow-hidden scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 backdrop-blur-2xl border border-[#00F5D4]/30 rounded-2xl p-6 sm:p-8 max-w-lg mx-auto shadow-2xl shadow-[#00F5D4]/15"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">SOL Live</h2>
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="flex items-center text-[#00F5D4] text-sm sm:text-base font-medium"
              >
                <Zap size={18} className="mr-1.5" /> LIVE
              </motion.span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-center">
              <div>
                <p className="text-white/60 text-xs sm:text-sm uppercase tracking-wider mb-1">Price (USD)</p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                  {priceLoading ? '—' : solPrice ? `$${solPrice.toFixed(2)}` : 'Error'}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-xs sm:text-sm uppercase tracking-wider mb-1">24h Change</p>
                <p
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
                    change24h && change24h >= 0 ? 'text-[#00F5D4]' : 'text-red-400'
                  }`}
                >
                  {priceLoading || change24h === null ? '—' : `${change24h.toFixed(2)}%`}
                  {change24h && change24h >= 0 ? (
                    <ArrowUpRight className="inline ml-2 size-7 sm:size-8" />
                  ) : change24h ? (
                    <ArrowDownRight className="inline ml-2 size-7 sm:size-8" />
                  ) : null}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    );
  };

  const SocialHub = () => (
    <motion.section
      className="py-16 sm:py-24 bg-gradient-to-b from-[#0A0D12] to-[#0A0D12]/80 relative overflow-hidden border-t border-[#00F5D4]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-extrabold bg-gradient-to-r from-[#9F7AEA] via-[#00F5D4] to-[#ED64A6] bg-clip-text text-transparent mb-6 animate-gradient-x"
        >
          Stay in the Loop
        </motion.h2>

        <p className="text-lg sm:text-xl text-white/70 mb-12 max-w-3xl mx-auto">
          Real-time alpha, deep insights, and direct access — choose your channel.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24">
          <motion.a
            href="https://twitter.com/rudyonton_"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, y: -6 }}
            whileTap={{ scale: 0.96 }}
            className="group flex flex-col items-center text-center max-w-xs"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#00F5D4]/10 to-transparent border border-[#00F5D4]/30 group-hover:border-[#00F5D4]/70 group-hover:shadow-[0_0_40px_rgba(0,245,212,0.5)] transition-all duration-500">
              <Twitter size={72} className="text-[#00F5D4] group-hover:text-white transition-colors" />
            </div>
            <h3 className="mt-6 text-2xl font-orbitron font-bold text-white group-hover:text-[#00F5D4] transition-colors">
              X (Twitter)
            </h3>
            <p className="mt-3 text-white/70 text-base">
              Real-time market takes and Solana alpha.
            </p>
          </motion.a>

          <motion.a
            href="https://t.me/rudyiseverywhere"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, y: -6 }}
            whileTap={{ scale: 0.96 }}
            className="group flex flex-col items-center text-center max-w-xs"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#00F5D4]/10 to-transparent border border-[#00F5D4]/30 group-hover:border-[#00F5D4]/70 group-hover:shadow-[0_0_40px_rgba(0,245,212,0.5)] transition-all duration-500">
              <Send size={72} className="text-[#00F5D4] group-hover:text-white transition-colors rotate-45" />
            </div>
            <h3 className="mt-6 text-2xl font-orbitron font-bold text-white group-hover:text-[#00F5D4] transition-colors">
              Telegram
            </h3>
            <p className="mt-3 text-white/70 text-base">
              Direct access for high-level collaboration.
            </p>
          </motion.a>
        </div>
      </div>
    </motion.section>
  );

  const LiveRadar = () => {
    useEffect(() => {
      if (!document.getElementById('twitter-wjs')) {
        const script = document.createElement('script');
        script.id = 'twitter-wjs';
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        document.body.appendChild(script);
      }
    }, []);

    const featuredPosts = [
      {
        url: "https://x.com/i/status/1947655162107204077",
        excerpt: "100x he made from this post @ekayakiii Quanttttttt",
        highlight: "Massive 100x call spotted — pure alpha vibes 🔥"
      },
      {
        url: "https://x.com/i/status/2012121342943092995",
        excerpt: "AI/tech runners everywhere today. Don’t FOMO yourself into poverty😂 Blind apes get rekt. DYOR or hold the L. WAGMI.",
        highlight: "Timeless wisdom: DYOR or get rekt — classic Rudy take 📈"
      },
      {
        url: "https://x.com/i/status/2012167748646744178",
        excerpt: "AI + X play built by @JIMMYEDGAR with @BagsApp integration. $AZY is an AI social network on Solana. Bags founder approved it. Still at a low market cap. Feels like a hidden gem.",
        highlight: "Hidden Solana AI gem alert — $AZY loading... 💎"
      },
      {
        url: "https://x.com/i/status/2012626564089815436",
        excerpt: "This Tech looks interesting I grabbed some Let’s see how it goes",
        highlight: "Rudy aping into fresh tech — watch this space 🚀"
      },
      {
        url: "https://x.com/i/status/2012864100884205618",
        excerpt: "In a time of myth and legend, a black cat appeared... Long live the King of Cat Flaps 🐾👑 $PEPITO",
        highlight: "Mythic cat lore + $PEPITO energy — legendary degen post 🐱"
      },
    ];

    return (
      <motion.section
        className="py-16 sm:py-24 bg-gradient-to-b from-[#0A0D12] to-[#0A0D12]/80 relative overflow-hidden border-t border-[#00F5D4]/20"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-extrabold bg-gradient-to-r from-[#9F7AEA] via-[#00F5D4] to-[#ED64A6] bg-clip-text text-transparent mb-6 text-center animate-gradient-x">
            Live Radar
          </h2>

          <p className="text-lg sm:text-xl text-white/70 mb-10 text-center max-w-3xl mx-auto">
            Real-time takes, Solana alpha, and market pulse — straight from the trenches.
          </p>

          {/* Twitter Timeline Embed */}
          <div className="max-w-4xl mx-auto bg-[#0A0D12]/70 backdrop-blur-md border border-[#00F5D4]/20 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-[#00F5D4]/10 overflow-hidden mb-12">
            <a
              className="twitter-timeline"
              href="https://twitter.com/rudyonton_"
              data-tweet-limit="6"
              data-chrome="noheader nofooter noborders transparent"
              data-height="620"
              data-theme="dark"
            >
              Tweets by @rudyonton_
            </a>
          </div>

          {/* Featured Recent Posts - Interactive Cards */}
          <div className="mt-12">
            <h3 className="text-3xl sm:text-4xl font-orbitron font-bold bg-gradient-to-r from-[#00F5D4] to-[#9F7AEA] bg-clip-text text-transparent mb-8 text-center">
              Rudy Latest Alpha Drops
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredPosts.map((post, index) => (
                <motion.a
                  key={index}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,245,212,0.6)' }}
                  className="group bg-[#0A0D12]/60 backdrop-blur-md border border-[#00F5D4]/30 rounded-xl p-6 hover:border-[#00F5D4]/70 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-[#00F5D4] text-3xl group-hover:scale-110 transition-transform">
                      <Zap />
                    </div>
                    <div>
                      <p className="text-white/90 text-base leading-relaxed mb-2">
                        {post.excerpt}
                      </p>
                      <p className="text-[#00F5D4] text-sm font-medium group-hover:underline">
                        {post.highlight} →
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <motion.a
              href="https://twitter.com/rudyonton_"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00F5D4]/20 to-transparent border border-[#00F5D4]/40 text-[#00F5D4] font-orbitron font-medium text-lg rounded-xl hover:bg-[#00F5D4]/10 hover:border-[#00F5D4]/70 transition-all duration-300"
            >
              Follow @rudyonton_ for more live updates
              <ArrowUpRight className="ml-2" size={20} />
            </motion.a>
          </div>
        </div>
      </motion.section>
    );
  };

  const Services = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-100px' });

    const services = [
      {
        title: "Meme Asset Research & Analysis",
        desc: "Independent research and structured analysis of meme-based digital assets, focusing on community dynamics, token distribution, liquidity structure, and market behavior.",
        icon: Laugh,
      },
      {
        title: "AI & Technology Investment Research",
        desc: "Evaluation of AI-driven and technology-focused projects, with attention to product fundamentals, technical design, and ecosystem relevance.",
        icon: Brain,
      },
      {
        title: "Early-Stage Digital Asset Evaluation",
        desc: "Assessment of early-stage digital asset projects, including meme, AI, and tech sectors, based on publicly available information and market indicators.",
        icon: Rocket,
      },
      {
        title: "Market Intelligence & Trend Monitoring",
        desc: "Continuous monitoring of meme culture trends, AI innovation cycles, and technology adoption, translating market activity into actionable insight.",
        icon: TrendingUp,
      },
      {
        title: "Portfolio Strategy Support",
        desc: "Strategic support for diversified exposure across memes, AI, and technology assets, aligned with defined risk tolerance and market conditions.",
        icon: Briefcase,
      },
      {
        title: "Advisory (Non-Custodial)",
        desc: "General strategic insights and research discussion. No custody of assets. No financial guarantees.",
        icon: Shield,
      },
    ];

    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1 }}
        className="py-16 sm:py-20 bg-[#0A0D12] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-extrabold bg-gradient-to-r from-[#9F7AEA] via-[#00F5D4] to-[#ED64A6] bg-clip-text text-transparent mb-10 sm:mb-12 text-center animate-gradient-x">
            Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-2xl border border-[#00F5D4]/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl group"
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                    className="mb-5 text-[#00F5D4] drop-shadow-[0_0_12px_rgba(0,245,212,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(0,245,212,0.9)] transition-all"
                  >
                    <service.icon size={56} className="stroke-[1.8]" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#9F7AEA] to-[#00F5D4] bg-clip-text text-transparent mb-4">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  };

  const Footer = () => (
    <footer className="py-10 sm:py-12 bg-[#0A0D12] border-t border-[#00F5D4]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/60 text-base sm:text-lg">
        © {new Date().getFullYear()} Rudyiseverywhere • Solana degenerate forever
      </div>
    </footer>
  );

  const FloatingIcons = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 sm:opacity-35">
      {Array.from({ length: 8 }).map((_, i) => {
        const icons = [DollarSign, Zap, ArrowUpRight, Cpu, ArrowDownRight, Brain, Rocket, TrendingUp];
        const Icon = icons[i % icons.length];
        const delay = i * 3 + Math.random() * 5;
        const duration = 25 + Math.random() * 20;
        const size = 24 + Math.random() * 24;

        return (
          <motion.div
            key={i}
            className="absolute text-[#00F5D4]/60"
            initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, scale: 0.6, rotate: Math.random() * 360 }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: [0, 360],
              scale: [0.6, 1.1, 0.6],
            }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
              delay,
            }}
          >
            <Icon size={size} />
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-[#0A0D12] text-white min-h-screen font-sans">
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap"
        rel="stylesheet"
      />
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          overscroll-behavior: none;
        }
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 12s ease infinite;
        }
      `}</style>

      <Navbar />
      <SocialSidebar />
      <main className="pt-16">
        <Hero />
        <About />
        <SolanaTracker />
        <SocialHub />
        <LiveRadar />
        <Services />
      </main>
      <Footer />
    </div>
  );
}