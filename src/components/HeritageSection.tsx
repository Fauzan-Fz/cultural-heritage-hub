import imgSejarah from '../assets/11.webp';
import imgBudaya from '../assets/12.webp';
import imgKuliner from '../assets/13.webp';
import imgPariwisata from '../assets/14.webp';
import imgPeta from '../assets/15.webp';
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
                className={`relative overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]
                  w-[320px] h-[413px] sm:w-[370px] sm:h-[478px] md:w-[477px] md:h-[616px]`}
                style={{
                  transitionDelay: `${idx * 150}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  opacity: isVisible ? 1 : 0,
                  borderRadius: '24px',
                  border: '1.5px solid #F9CE65',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                  draggable={false}
                />
                
                {/* Burgundy gradient overlay at the bottom */}
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#6E1F1F] via-[#6E1F1F]/40 to-transparent pointer-events-none"
                    style={{ borderRadius: '0 0 24px 24px' }}
                  />
                  {/* Title */}
                  <h3 className="absolute bottom-[8%] left-[8%] font-corinthia text-white text-[56px] sm:text-[64px] md:text-[72px] font-bold leading-none select-none z-10">
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
                className={`relative overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]
                  w-[320px] h-[413px] sm:w-[370px] sm:h-[478px] md:w-[477px] md:h-[616px]`}
                style={{
                  transitionDelay: `${(idx + 3) * 150}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  opacity: isVisible ? 1 : 0,
                  borderRadius: '24px',
                  border: '1.5px solid #F9CE65',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                  draggable={false}
                />
                
                {/* Burgundy gradient overlay at the bottom */}
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#6E1F1F] via-[#6E1F1F]/40 to-transparent pointer-events-none"
                    style={{ borderRadius: '0 0 24px 24px' }}
                  />
                  {/* Title */}
                  <h3 className="absolute bottom-[8%] left-[8%] font-corinthia text-white text-[56px] sm:text-[64px] md:text-[72px] font-bold leading-none select-none z-10">
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
