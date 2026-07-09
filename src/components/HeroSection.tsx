import { siteContent } from '../data/stories';
import { useScrollReveal } from '../hooks/useScrollReveal';
import bgSvg from '../assets/bg.svg';
import subSvg from '../assets/sub.svg';

export function HeroSection() {
  const { hero } = siteContent;
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative min-h-[720px] sm:min-h-[760px] w-full overflow-hidden bg-white"
      aria-label="Hero Bukittinggi Heritage"
    >
      {/* CSS Keyframes for Sun Flare & Rays */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sunRayRotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes sunGlowPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.08); }
        }
      `}} />

      <div className="absolute inset-x-0 top-0 h-[720px] sm:h-[760px] overflow-hidden bg-white">
        <img
          src={bgSvg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
          fetchPriority="high"
          decoding="sync"
          draggable={false}
        />
      </div>

      {/* ☀️ SUNLIGHT EFFECTS (Top-Right Corner) */}
      {/* 1. Ambient Warm Glow */}
      <div 
        className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] pointer-events-none z-10 opacity-70"
        style={{
          background: 'radial-gradient(circle at 100% 0%, rgba(255, 238, 186, 0.4) 0%, rgba(255, 190, 110, 0.15) 35%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(40px)',
        }}
      />
      
      {/* 2. Pulsing Golden Core */}
      <div 
        className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at 100% 0%, rgba(255, 248, 220, 0.8) 0%, rgba(255, 220, 140, 0.4) 20%, rgba(255, 150, 50, 0.1) 50%, rgba(255, 255, 255, 0) 80%)',
          filter: 'blur(15px)',
          animation: 'sunGlowPulse 8s ease-in-out infinite',
          transformOrigin: '100% 0%',
        }}
      />

      {/* 3. Slow Rotating Sun Rays */}
      <div 
        className="absolute -top-[10%] -right-[10%] w-[100vw] h-[100vw] max-w-[900px] max-h-[900px] pointer-events-none z-10 mix-blend-screen opacity-[0.22] md:opacity-[0.28]"
        style={{
          background: 'conic-gradient(from 180deg at 100% 0%, transparent 0deg, rgba(255, 235, 160, 0.25) 12deg, transparent 24deg, rgba(255, 235, 160, 0.2) 40deg, transparent 60deg, rgba(255, 235, 160, 0.3) 95deg, transparent 130deg, rgba(255, 235, 160, 0.15) 170deg, transparent 210deg)',
          filter: 'blur(10px)',
          transformOrigin: '100% 0%',
          animation: 'sunRayRotate 60s linear infinite',
        }}
      />

      {/* 4. Glowing Sun Disk (Realistic sun effect at the top-right corner) */}
      <div 
        className="absolute top-[-50px] right-[-50px] sm:top-[-70px] sm:right-[-70px] w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] rounded-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at center, #FFFFFF 0%, #FFFDE7 20%, #FFF59D 45%, #FFEB3B 70%, rgba(255, 193, 7, 0.5) 90%, transparent 100%)',
          boxShadow: '0 0 100px 40px rgba(255, 235, 59, 0.65), 0 0 180px 90px rgba(255, 152, 0, 0.45), 0 0 280px 140px rgba(255, 87, 34, 0.25)',
          opacity: 0.95,
          mixBlendMode: 'screen',
        }}
      />

      {/* Hero Content Container */}
      <div className="relative z-20 mx-auto flex min-h-[720px] sm:min-h-[760px] w-full max-w-[1512px] flex-col items-center justify-center px-6 pt-24 text-center">
        {/* Eyebrow: Journey Of */}
        <p
          className={`font-cormorant text-[18px] sm:text-[20px] md:text-[24px] font-bold italic tracking-widest text-white/90 mb-4 transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
        >
          {hero.eyebrow}
        </p>

        {/* Logo Text: sub.svg */}
        <div
          className={`mb-8 max-w-[280px] sm:max-w-[340px] md:max-w-[440px] transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-3 opacity-0 scale-95'
          }`}
        >
          <img
            src={subSvg}
            alt="Bukittinggi Heritage"
            className="h-auto w-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] select-none"
            draggable={false}
          />
        </div>

        {/* Tagline */}
        <h1
          className={`max-w-[900px] font-cormorant text-[14px] sm:text-[18px] md:text-[22px] font-bold tracking-[0.22em] text-white/95 transition-all duration-[1200ms] delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] [text-shadow:0_4px_16px_rgba(0,0,0,0.55)] ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          {hero.tagline}
        </h1>
      </div>
    </section>
  );
}

