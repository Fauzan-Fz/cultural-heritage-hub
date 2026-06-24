import { useScrollReveal } from '../hooks/useScrollReveal';

interface CinematicImageProps {
  src: string;
  alt: string;
  index: number;
}

export function CinematicImage({ src, alt, index }: CinematicImageProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`relative z-20 w-full transition-all duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden w-full max-w-5xl mx-auto aspect-[21/9] lg:aspect-[24/10] my-12 shadow-xl bg-[#efe5d7]">
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </div>
    </article>
  );
}
