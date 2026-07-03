import { useState } from 'react';
import { siteContent } from '../data/stories';
import logoSvg from '../assets/logo.svg';
import { MenuOverlay } from './MenuOverlay';

interface NavigationProps {
  currentPage: 'home' | 'history';
  setCurrentPage: (page: 'home' | 'history') => void;
}

export function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const { nav } = siteContent;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Adapt background container style depending on page (dark vs light theme)
  const containerStyle = currentPage === 'history'
    ? 'bg-[#FAF8F5]/70 border-[#6E1F1F]/10 shadow-[0_8px_32px_rgba(110,31,31,0.04)]'
    : 'bg-white/5 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.02)]';

  return (
    <>
      <header className="pointer-events-none absolute inset-x-0 top-[21px] z-50 flex justify-center px-4">
        <nav
          className="pointer-events-auto relative flex h-[100px] w-full max-w-[924px] items-start"
          aria-label="Navigasi utama"
        >
          <div className={`relative mt-[6px] flex h-[88px] w-full items-center justify-between overflow-visible rounded-[16px] backdrop-blur-[24px] border transition-colors duration-500 ${containerStyle}`}>
            <div className="flex items-center pl-6">
              <img
                src={logoSvg}
                alt="Bukittinggi Heritage"
                className="h-[76px] w-auto object-contain cursor-pointer"
                onClick={() => setCurrentPage('home')}
              />
            </div>

            <button
              onClick={() => setIsMenuOpen(true)}
              type="button"
              className="group mr-6 flex items-center gap-3 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] cursor-pointer"
              aria-label="Buka menu"
            >
              <span className="font-cormorant text-[22px] font-bold tracking-wide text-[#6E1F1F]">
                {nav.menuLabel}
              </span>
              <span className="flex h-[24px] w-[24px] items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6E1F1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="transition-transform duration-300"
                >
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
              </span>
            </button>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <MenuOverlay
          currentPage={currentPage}
          onClose={() => setIsMenuOpen(false)}
          onNavigate={(page) => {
            setCurrentPage(page);
            setIsMenuOpen(false);
          }}
        />
      )}
    </>
  );
}


