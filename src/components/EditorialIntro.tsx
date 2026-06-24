import { siteContent } from '../data/stories';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function EditorialIntro() {
  const { intro } = siteContent;
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative z-10 bg-[#fbf8ef] pb-24 pt-28 md:pb-32 md:pt-36"
      aria-labelledby="intro-heading"
    >
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <p
          className={`font-corinthia mb-3 text-[58px] font-bold leading-none text-[#8C1D24] underline decoration-solid underline-offset-4 md:text-[86px] ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {intro.scriptTitle}
        </p>

        <h2
          id="intro-heading"
          className={`font-cormorant mb-8 text-[34px] font-bold leading-tight text-[#8C1D24] md:text-[54px] ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {intro.heading}
        </h2>

        <div
          className={`max-w-2xl mx-auto text-center px-4 leading-relaxed text-neutral-600 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-12 opacity-0 blur-sm'
          } transition-all duration-[900ms] delay-150 ease-[cubic-bezier(0.32,0.72,0,1)]`}
        >
          {intro.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="font-poppins mb-2 text-[14px] font-normal leading-[inherit] text-inherit md:text-[16px]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div
          className={`mt-10 flex items-center justify-center gap-2 transition-all duration-[800ms] delay-200 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0 blur-sm'
          }`}
          aria-hidden="true"
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <img
              key={index}
              src="/assets/jam-gadang-icon.png"
              alt=""
              className="h-7 w-7 object-cover"
              width={28}
              height={28}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
