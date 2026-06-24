import { siteContent } from '../data/stories';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function HeroSection() {
  const { hero } = siteContent;
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[760px] w-full overflow-visible bg-[#fbf8ef]"
      aria-label="Hero Bukittinggi Heritage"
    >
      <div className="absolute inset-x-0 top-0 h-[720px] overflow-hidden bg-[#16100d]">
        <img
          src="/assets/hero-bg.png"
          alt="Pemandangan pegunungan Bukittinggi saat fajar"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          width={1513}
          height={857}
          fetchPriority="high"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,214,153,0.18)_0%,rgba(255,214,153,0.05)_28%,rgba(19,12,10,0)_52%),linear-gradient(180deg,rgba(10,6,5,0.72)_0%,rgba(18,12,10,0.34)_45%,rgba(251,248,239,0.12)_75%,#fbf8ef_100%)]"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-[#fbf8ef]/42 to-[#fbf8ef]"
          aria-hidden="true"
        />
      </div>

      <div
        className={`absolute left-8 lg:left-20 z-30 bottom-[-150px] w-[240px] max-w-[45vw] transition-all duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] sm:w-[320px] md:w-[390px] lg:w-[460px] xl:w-[520px] ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <img
          src="/assets/jam-gadang-hero.png"
          alt="Jam Gadang Bukittinggi"
          className="h-auto w-full object-contain drop-shadow-[0_28px_56px_rgba(0,0,0,0.34)]"
          width={1237}
          height={1856}
        />
      </div>

      <div className="relative z-20 mx-auto flex min-h-[720px] w-full max-w-[1512px] flex-col items-center justify-center px-6 pt-20 text-center">
        <div
          className={`mb-7 flex flex-col items-center transition-all duration-[900ms] delay-100 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isVisible
              ? 'translate-y-0 opacity-100 blur-0'
              : 'translate-y-10 opacity-0 blur-sm'
          }`}
        >
          <div className="mb-5 rounded-full border border-white/25 bg-white/10 px-5 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
            <p className="font-cormorant text-[34px] font-bold leading-none text-white [text-shadow:0_4px_18px_rgba(0,0,0,0.55)] md:text-[48px]">
              Bukittinggi Heritage
            </p>
          </div>

          <p className="font-cormorant text-[22px] font-bold leading-none text-white/95">
            {hero.eyebrow}
          </p>
        </div>

        <h1
          className={`max-w-[900px] font-cormorant text-[28px] font-bold leading-tight tracking-[0.04em] text-white transition-all duration-[900ms] delay-200 ease-[cubic-bezier(0.32,0.72,0,1)] [text-shadow:0_8px_28px_rgba(0,0,0,0.7)] md:text-[34px] ${
            isVisible
              ? 'translate-y-0 opacity-100 blur-0'
              : 'translate-y-12 opacity-0 blur-sm'
          }`}
        >
          {hero.tagline}
        </h1>
      </div>
    </section>
  );
}
