import { useEffect, useRef, useState, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
  useInView,
} from 'framer-motion';
import {
  ChevronDown,
  Heart,
  Anchor,
  Sun,
  Star,
  Infinity as InfinityIcon,
  Sparkles,
  Music,
  Volume2,
  VolumeX,
} from 'lucide-react';

// --- ASSETS ---
import one from './assets/h1.jpg';
import two from './assets/h2.jpg';
import three from './assets/h3.jpg';
import four from './assets/h4.jpg';
import five from './assets/h5.jpg';

const IMAGES = [one, two, three, four, five];

// --- ENHANCED EFFECTS ---

const FloatingHearts = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        startX:
          typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
        endX:
          typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
        scale: Math.random() * 0.5 + 0.5,
        startRotate: Math.random() * 360,
        endRotate: Math.random() * 360 + 360,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[45] overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-red-400/20"
          initial={{
            x: heart.startX,
            y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
            scale: heart.scale,
            rotate: heart.startRotate,
          }}
          animate={{
            y: -100,
            x: heart.endX,
            rotate: heart.endRotate,
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
        >
          <Heart className="w-8 h-8" fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

const Grain = () => (
  <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="4"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const StarField = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[40]">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Parallax Image with Hover Effects
const CinematicImage = ({ src, caption, align = 'center', chapter }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3],
  );

  return (
    <div
      ref={ref}
      className={`my-40 flex flex-col ${
        align === 'left'
          ? 'items-start'
          : align === 'right'
            ? 'items-end'
            : 'items-center'
      } px-6 md:px-20`}
    >
      <motion.div
        className="relative w-full md:w-[65vw] aspect-[3/4] overflow-hidden bg-[#101010] cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6 }}
        style={{ opacity }}
      >
        {/* Chapter Number */}
        {chapter && (
          <motion.div
            className="absolute top-6 left-6 z-10 text-[#e2d1c3]/30 text-8xl font-serif italic"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {chapter}
          </motion.div>
        )}

        <motion.div style={{ y, scale }} className="w-full h-full">
          <motion.img
            src={src}
            alt="Our Story"
            className="w-full h-full object-cover"
            animate={{
              filter: isHovered
                ? 'grayscale(0%) brightness(1.1)'
                : 'grayscale(0%) brightness(0.9)',
            }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Elegant Border */}
        <div className="absolute inset-0 border-2 border-[#e2d1c3]/20 pointer-events-none" />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#e2d1c3]/40" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#e2d1c3]/40" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#e2d1c3]/40" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#e2d1c3]/40" />

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {caption && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[1px] w-8 bg-[#e2d1c3]/30" />
            <Star className="w-4 h-4 text-[#e2d1c3]/50" />
            <div className="h-[1px] w-8 bg-[#e2d1c3]/30" />
          </div>
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#e2d1c3]/70 font-sans">
            {caption}
          </p>
        </motion.div>
      )}
    </div>
  );
};

const TextReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-15%' }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
    className="text-2xl md:text-5xl lg:text-6xl font-serif font-light leading-tight text-[#e2d1c3] text-center px-6 max-w-5xl mx-auto my-32"
  >
    {children}
  </motion.div>
);

const InteractiveQuote = ({ children, author }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 my-40"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.blockquote
        className="relative text-3xl md:text-5xl font-serif italic text-white/80 text-center cursor-pointer"
        onClick={() => setIsRevealed(!isRevealed)}
        whileHover={{ scale: 1.02 }}
      >
        <span className="text-[#e2d1c3] text-7xl opacity-20">"</span>
        <p className="my-6">{children}</p>
        <span className="text-[#e2d1c3] text-7xl opacity-20">"</span>

        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-sm uppercase tracking-[0.5em] text-[#e2d1c3]/50"
            >
              — {author}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.blockquote>

      {!isRevealed && (
        <motion.p
          className="text-center text-xs text-white/30 mt-4 uppercase tracking-widest"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Click to reveal
        </motion.p>
      )}
    </motion.div>
  );
};

// --- SECTIONS ---

const Hero = () => {
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubtext(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <StarField />

      {/* Radial Gradient Background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1a0a0a] via-[#050505] to-[#000000]" />

      <div className="z-10 text-center space-y-8 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            className="text-[18vw] md:text-[15vw] leading-[0.8] font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e2d1c3] to-[#c9a882]"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Adunni
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex items-center justify-center gap-6"
        >
          <motion.div
            className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#e2d1c3] to-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Sparkles className="w-5 h-5 text-[#e2d1c3]" />
          <span className="text-sm md:text-xl uppercase tracking-[0.6em] text-[#e2d1c3]">
            The Muse
          </span>
          <Sparkles className="w-5 h-5 text-[#e2d1c3]" />
          <motion.div
            className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#e2d1c3] to-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[12vw] md:text-[10vw] leading-[0.8] font-serif text-white/30 italic"
        >
          Elizabeth
        </motion.h2>

        <AnimatePresence>
          {showSubtext && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/40 max-w-md mx-auto mt-8"
            >
              A love letter written in moments, sealed with forever
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute bottom-12 text-[#e2d1c3] cursor-pointer"
        onClick={() =>
          window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
        }
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>
    </section>
  );
};

const Opening = () => (
  <section className="min-h-screen flex items-center justify-center py-32 px-6 bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="text-center space-y-12"
      >
        <Heart
          className="w-16 h-16 text-red-400/60 mx-auto"
          fill="currentColor"
        />

        <h2 className="text-4xl md:text-6xl font-serif italic text-[#e2d1c3]">
          Before You...
        </h2>

        <p className="text-xl md:text-3xl text-white/60 font-light leading-relaxed">
          Life was a series of moments.
          <br />
          <span className="text-[#e2d1c3]">You made them matter.</span>
        </p>

        <motion.div
          className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#e2d1c3] to-transparent mx-auto"
          animate={{ scaleX: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </div>
  </section>
);

const StoryStream = () => (
  <section className="py-20 bg-[#050505] relative">
    <FloatingHearts />

    {/* Chapter Title */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-32"
    >
      <p className="text-xs uppercase tracking-[0.6em] text-white/30 mb-4">
        Chapter One
      </p>
      <h2 className="text-5xl md:text-7xl font-serif italic text-[#e2d1c3]">
        Our Genesis
      </h2>
    </motion.div>

    <TextReveal>
      "She came into my life when things were{' '}
      <span className="italic text-white">uncertain.</span>"
    </TextReveal>

    <CinematicImage
      src={one}
      align="center"
      caption="The Beginning"
      chapter="I"
    />

    <InteractiveQuote author="My Heart">
      In a world of noise, her voice was the only frequency I needed to hear
    </InteractiveQuote>

    <TextReveal delay={0.2}>
      "She stayed when things were hard.
      <br />
      She <span className="text-white italic">believed</span> when I doubted."
    </TextReveal>

    <CinematicImage
      src={two}
      align="left"
      caption="The Strength"
      chapter="II"
    />

    <div className="max-w-4xl mx-auto px-6 my-40">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
      >
        {[
          { label: 'Days', value: 'Countless' },
          { label: 'Moments', value: 'Infinite' },
          { label: 'Love', value: 'Eternal' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="border border-[#e2d1c3]/20 p-8 bg-white/[0.02]"
          >
            <p className="text-4xl font-serif text-[#e2d1c3] mb-2">
              {item.value}
            </p>
            <p className="text-xs uppercase tracking-widest text-white/40">
              {item.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>

    <TextReveal>
      "She is my <span className="text-white italic">peace</span>, my gravity,
      my safe place."
    </TextReveal>

    <CinematicImage
      src={three}
      align="right"
      caption="The Peace"
      chapter="III"
    />

    <InteractiveQuote author="My Soul">
      In her arms, I found a home I didn't know I was searching for
    </InteractiveQuote>

    <TextReveal delay={0.3}>
      "She has seen my flaws and still{' '}
      <span className="italic text-white">chose me.</span>"
    </TextReveal>

    <CinematicImage
      src={four}
      align="center"
      caption="The Choice"
      chapter="IV"
    />

    <div className="h-32" />

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="text-center px-6"
    >
      <Star className="w-12 h-12 text-[#e2d1c3] mx-auto mb-8 opacity-50" />
      <h2 className="text-4xl md:text-7xl font-serif italic text-white leading-tight">
        "She is not just my love.
        <br />
        She is my{' '}
        <span className="text-[#e2d1c3] relative">
          home
          <motion.span
            className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e2d1c3]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </span>
        ."
      </h2>
    </motion.div>

    <div className="h-40" />
  </section>
);

const Identity = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section className="py-40 bg-gradient-to-b from-[#e2d1c3] via-[#d4c5b3] to-[#e2d1c3] text-[#050505] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <p className="text-xs uppercase tracking-[0.6em] text-black/40 mb-4">
          The Meaning
        </p>
        <h2 className="text-5xl md:text-7xl font-serif italic">In Her Names</h2>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          {
            name: 'Adunni',
            mean: 'Beauty',
            desc: 'The joy that is pleasant to have. A radiance that lights up every room, every moment, every heartbeat.',
            symbol: '✦',
          },
          {
            name: 'Ibukun',
            mean: 'Blessing',
            desc: 'A divine gift I never deserved. Grace manifested in human form, a miracle I thank God for daily.',
            symbol: '✧',
          },
          {
            name: 'Elizabeth',
            mean: 'Promise',
            desc: 'My vow, my covenant, my forever. A commitment etched not in words, but in every breath I take.',
            symbol: '✵',
          },
        ].map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            onMouseEnter={() => setActiveCard(i)}
            onMouseLeave={() => setActiveCard(null)}
            className="relative group cursor-pointer"
          >
            <motion.div
              className="relative p-12 bg-white/40 backdrop-blur-sm border-2 border-black/10"
              animate={{
                scale: activeCard === i ? 1.05 : 1,
                y: activeCard === i ? -10 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-5xl"
                animate={{ rotate: activeCard === i ? 360 : 0 }}
                transition={{ duration: 0.6 }}
              >
                {n.symbol}
              </motion.div>

              <h3 className="text-6xl md:text-7xl font-serif italic mb-6 text-center">
                {n.name}
              </h3>

              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-black/20 to-transparent mb-6" />

              <p className="text-xs uppercase tracking-[0.5em] font-bold mb-4 text-center">
                {n.mean}
              </p>

              <motion.p
                className="font-sans opacity-70 leading-relaxed text-center text-sm md:text-base"
                animate={{ opacity: activeCard === i ? 1 : 0.7 }}
              >
                {n.desc}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Pillars = () => {
  const [hoveredPillar, setHoveredPillar] = useState(null);

  return (
    <section className="py-40 px-6 bg-gradient-to-b from-[#080808] to-[#0a0a0a] relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <p className="text-xs font-sans uppercase tracking-[0.6em] text-white/30 mb-4">
          The Foundation
        </p>
        <h2 className="text-5xl md:text-7xl font-serif italic text-[#e2d1c3]">
          Why I Choose You
        </h2>
        <motion.div
          className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#e2d1c3] to-transparent mx-auto mt-8"
          animate={{ scaleX: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
        {[
          {
            icon: Anchor,
            title: 'My Strength',
            text: 'You stood by me when the world felt heavy. When I was sinking, you became my anchor, holding me steady in the storm.',
            color: 'from-blue-400/20 to-cyan-400/20',
          },
          {
            icon: Heart,
            title: 'My Heart',
            text: "You pray for me in ways I don't even know how to ask for. Your love speaks a language my soul understands without words.",
            color: 'from-red-400/20 to-pink-400/20',
          },
          {
            icon: Sun,
            title: 'My Calm',
            text: 'In the chaos of life, your voice is the frequency that centers me. You are my sunrise after the darkest night.',
            color: 'from-yellow-400/20 to-orange-400/20',
          },
          {
            icon: Star,
            title: 'My Better Half',
            text: "You don't just complete me; you improve me. You challenge me to be the man worthy of your love.",
            color: 'from-purple-400/20 to-indigo-400/20',
          },
        ].map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            onMouseEnter={() => setHoveredPillar(i)}
            onMouseLeave={() => setHoveredPillar(null)}
            className="group relative p-12 border-2 border-white/10 bg-white/[0.02] hover:border-[#e2d1c3]/30 transition-all duration-500 overflow-hidden"
          >
            {/* Gradient Overlay */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div className="relative z-10">
              <motion.div
                animate={{
                  scale: hoveredPillar === i ? 1.2 : 1,
                  rotate: hoveredPillar === i ? 360 : 0,
                }}
                transition={{ duration: 0.6 }}
              >
                <c.icon className="w-12 h-12 text-[#e2d1c3] mb-8 opacity-60 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              <h4 className="text-3xl font-serif text-[#e2d1c3] mb-6">
                {c.title}
              </h4>

              <motion.div
                className="w-16 h-[2px] bg-[#e2d1c3]/30 mb-6"
                animate={{ width: hoveredPillar === i ? '100%' : '4rem' }}
                transition={{ duration: 0.4 }}
              />

              <p className="text-white/60 group-hover:text-white/90 transition-colors font-sans leading-relaxed text-base">
                {c.text}
              </p>
            </div>

            {/* Corner Decorations */}
            <motion.div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#e2d1c3]/0 group-hover:border-[#e2d1c3]/40 transition-all duration-500" />
            <motion.div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#e2d1c3]/0 group-hover:border-[#e2d1c3]/40 transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Interactive Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 max-w-4xl mx-auto"
      >
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#e2d1c3]/30 to-transparent" />

          {['First Glance', 'First Words', 'First Promise', 'Forever'].map(
            (moment, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`relative flex items-center mb-16 ${
                  i % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`w-5/12 ${i % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}
                >
                  <p className="text-xl font-serif text-[#e2d1c3]">{moment}</p>
                </div>

                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#e2d1c3]"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ),
          )}
        </div>
      </motion.div>
    </section>
  );
};

const Promises = () => {
  const promises = [
    'To love you fiercely, even on days when life feels heavy',
    'To choose you, every single day, in every single way',
    'To be your safe place when the world gets too loud',
    'To grow with you, not apart from you',
    'To see you, truly see you, in all your beauty and complexity',
    'To build a life where your dreams have room to breathe',
  ];

  return (
    <section className="py-40 bg-gradient-to-b from-[#0a0a0a] to-[#050505] relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <p className="text-xs uppercase tracking-[0.6em] text-white/30 mb-4">
          My Vows
        </p>
        <h2 className="text-5xl md:text-7xl font-serif italic text-[#e2d1c3]">
          I Promise You
        </h2>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 space-y-8">
        {promises.map((promise, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 10 }}
            className="flex items-start gap-6 group cursor-pointer"
          >
            <motion.div className="mt-2 w-2 h-2 rounded-full bg-[#e2d1c3]/50 group-hover:bg-[#e2d1c3] group-hover:scale-150 transition-all" />
            <p className="text-xl md:text-2xl text-white/70 group-hover:text-white font-light leading-relaxed transition-colors">
              {promise}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Finale = () => {
  const [heartBeats, setHeartBeats] = useState(0);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={five}
          className="w-full h-full object-cover"
          initial={{ scale: 1.2, filter: 'grayscale(100%) brightness(0.3)' }}
          animate={{
            scale: 1,
            filter: 'grayscale(80%) brightness(0.25)',
          }}
          transition={{ duration: 2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/70 to-[#050505]/90" />
      </div>

      <StarField />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          {/* Interactive Heart */}
          <motion.div
            className="mx-auto mb-12 cursor-pointer"
            onClick={() => setHeartBeats(heartBeats + 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            >
              <Heart
                className="w-20 h-20 text-red-400 opacity-80"
                fill="currentColor"
              />
            </motion.div>
            <AnimatePresence>
              {heartBeats > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xs text-white/40 mt-4"
                >
                  {heartBeats} heartbeat{heartBeats > 1 ? 's' : ''} for you
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <InfinityIcon className="w-16 h-16 text-[#e2d1c3] mx-auto mb-8 opacity-80" />

          <motion.h2
            className="text-6xl md:text-9xl font-serif text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Forever{' '}
            <motion.span
              className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#e2d1c3] via-[#f5e6d3] to-[#e2d1c3]"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Yours
            </motion.span>
            .
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <p className="text-xs uppercase tracking-[0.6em] text-white/40">
              Happy Valentine's Day
            </p>

            <motion.div
              className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#e2d1c3] to-transparent mx-auto"
              animate={{ scaleX: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <p className="text-sm text-white/50 italic font-serif mt-8">
              February 14, 2026
            </p>
          </motion.div>

          {/* Final Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16 p-8 border border-[#e2d1c3]/20 bg-black/30 backdrop-blur-sm"
          >
            <p className="text-lg md:text-2xl text-[#e2d1c3] font-light leading-relaxed">
              In every lifetime, in every universe,
              <br />
              my soul would find yours.
              <br />
              <span className="text-white italic">
                This is my promise. This is my truth.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient Light Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(226, 209, 195, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(226, 209, 195, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(226, 209, 195, 0.05) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </section>
  );
};

// --- MAIN APP ---

export default function App() {
  const [entered, setEntered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-[#e2d1c3] font-serif selection:bg-[#e2d1c3] selection:text-black overflow-x-hidden">
      <Grain />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            className="fixed inset-0 z-[110] bg-[#050505] flex items-center justify-center"
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Heart className="w-12 h-12 text-[#e2d1c3]" />
            </motion.div>
          </motion.div>
        ) : !entered ? (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[100] bg-gradient-to-br from-[#050505] via-[#0a0508] to-[#050505] flex items-center justify-center"
            exit={{ opacity: 0, transition: { duration: 2 } }}
          >
            <motion.div
              className="text-center cursor-pointer space-y-8"
              onClick={() => setEntered(true)}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-16 h-16 text-[#e2d1c3] mx-auto opacity-60" />
              </motion.div>

              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-white/40 mb-6">
                  A Love Letter For
                </p>
                <motion.h1
                  className="text-5xl md:text-7xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#e2d1c3] via-white to-[#e2d1c3]"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  Adunni
                </motion.h1>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgba(226, 209, 195, 0.6)',
                }}
                whileTap={{ scale: 0.95 }}
                className="mt-12 px-12 py-4 border-2 border-[#e2d1c3]/30 rounded-full text-xs uppercase tracking-[0.4em] text-[#e2d1c3] hover:bg-[#e2d1c3]/10 transition-all"
              >
                Open Your Heart
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block ml-3"
                >
                  →
                </motion.span>
              </motion.button>

              <motion.p
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs text-white/30 mt-8"
              >
                Click to begin
              </motion.p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Hero />
            <Opening />
            <StoryStream />
            <Identity />
            <Pillars />
            <Promises />
            <Finale />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
