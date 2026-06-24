import { siteContent } from '../data/stories';

export function Navigation() {
  const { nav } = siteContent;

  return (
    <header className="pointer-events-none absolute inset-x-0 top-[21px] z-50 flex justify-center px-4">
      <nav
        className="pointer-events-auto relative flex h-[100px] w-full max-w-[924px] items-start"
        aria-label="Navigasi utama"
      >
        <div className="relative mt-[6px] flex h-[88px] w-full items-center justify-end overflow-visible rounded-[16px] backdrop-blur-[9px] bg-[rgba(217,217,217,0.25)]">
          <div className="absolute left-[24px] top-0 flex h-[100px] w-[200px] items-center justify-center bg-[#6E1F1F]">
            <span className="font-cormorant text-[22px] font-bold tracking-[0.12em] text-white">
              {nav.brandLabel}
            </span>
          </div>

          <button
            type="button"
            className="group mr-6 flex items-center gap-3 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            aria-label="Buka menu"
          >
            <span className="font-cormorant text-[24px] font-bold leading-normal text-[#6E1F1F]">
              {nav.menuLabel}
            </span>
            <span className="flex h-[22px] w-[22px] items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
              <img
                src="/assets/hamburger.png"
                alt=""
                className="h-[22px] w-[22px]"
                width={22}
                height={22}
              />
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
