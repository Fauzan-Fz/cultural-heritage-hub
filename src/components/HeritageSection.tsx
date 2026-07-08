import imgSejarah from '../assets/11.svg';
import imgBudaya from '../assets/12.svg';
import imgKuliner from '../assets/13.svg';
import imgPariwisata from '../assets/14.svg';
import imgPeta from '../assets/15.svg';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function HeritageSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  const cards = [
    { title: 'Sejarah', img: imgSejarah },
    { title: 'Budaya', img: imgBudaya },
    { title: 'Kuliner', img: imgKuliner },
    { title: 'Pariwisata', img: imgPariwisata },
    { title: 'Peta', img: imgPeta },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-white py-20 md:py-28 overflow-hidden"
      aria-labelledby="heritage-heading"
    >
      <div className="mx-auto max-w-[1512px] px-6">
        
        {/* Heading and Subtitle */}
        <div
          className={`text-center mb-16 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <h2
            id="heritage-heading"
            className="font-cormorant text-[#6E1F1F] text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-[0.15em] uppercase mb-4"
          >
            JELAJAHI WARISAN BUKITTINGGI
          </h2>
          <p className="font-poppins text-neutral-600 text-[14px] sm:text-[16px] max-w-2xl mx-auto leading-relaxed">
            Dari jejak sejarah hingga keindahan alam, setiap sudut Bukittinggi menyimpan cerita yang menunggu untuk ditemukan.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col items-center gap-4">
          
          {/* Row 1: Sejarah, Budaya, Kuliner */}
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {cards.slice(0, 3).map((card, idx) => (
              <div
                key={card.title}
                className={`relative transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]
                  w-[320px] h-[413px] sm:w-[370px] sm:h-[478px] md:w-[477px] md:h-[616px]`}
                style={{
                  transitionDelay: `${idx * 150}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                
                {/* Precision Overlay & Title aligned perfectly with the inner 413x552 card of the SVG */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Burgundy gradient overlay at the bottom half of the inner image */}
                  <div 
                    className="absolute left-[6.7%] right-[6.7%] bottom-[6.5%] h-[40%] bg-gradient-to-t from-[#6E1F1F] via-[#6E1F1F]/40 to-transparent pointer-events-none"
                    style={{ borderRadius: '0 0 24px 24px' }}
                  />
                  {/* Title positioned inside the inner image area */}
                  <h3 className="absolute bottom-[10%] left-[12%] font-corinthia text-white text-[56px] sm:text-[64px] md:text-[72px] font-bold leading-none select-none z-10">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Pariwisata, Peta */}
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {cards.slice(3, 5).map((card, idx) => (
              <div
                key={card.title}
                className={`relative transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]
                  w-[320px] h-[413px] sm:w-[370px] sm:h-[478px] md:w-[477px] md:h-[616px]`}
                style={{
                  transitionDelay: `${(idx + 3) * 150}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                
                {/* Precision Overlay & Title aligned perfectly with the inner 413x552 card of the SVG */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Burgundy gradient overlay at the bottom half of the inner image */}
                  <div 
                    className="absolute left-[6.7%] right-[6.7%] bottom-[6.5%] h-[40%] bg-gradient-to-t from-[#6E1F1F] via-[#6E1F1F]/40 to-transparent pointer-events-none"
                    style={{ borderRadius: '0 0 24px 24px' }}
                  />
                  {/* Title positioned inside the inner image area */}
                  <h3 className="absolute bottom-[10%] left-[12%] font-corinthia text-white text-[56px] sm:text-[64px] md:text-[72px] font-bold leading-none select-none z-10">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
