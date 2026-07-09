import { useState } from 'react';
import { EditorialIntro } from './components/EditorialIntro';
import { HeroSection } from './components/HeroSection';
import { Navigation } from './components/Navigation';
import { HistoryPage } from './components/HistoryPage';
import { BudayaPage } from './components/BudayaPage';
import { ParijsSection } from './components/ParijsSection';
import { HeritageSection } from './components/HeritageSection';
import menaraSvg from './assets/menara.svg';

type Page = 'home' | 'history' | 'budaya';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-white">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="transition-all duration-500 overflow-x-hidden w-full">
        {currentPage === 'home' ? (
          <>
            {/* Home wrapper — relative container for Hero + Editorial */}
            <div className="relative overflow-x-hidden">

              {/* ============================================================
                  Jam Gadang Tower — absolutely positioned from this wrapper,
                  left-0 = flush with the very left edge of the screen.
                  top-0 = extends all the way up to the very top.
                  bottom-0 = anchored to bottom of Editorial section.
              ============================================================ */}
              <div
                style={{ position: 'absolute', left: 0, top: 0, bottom: 0 }}
                className="pointer-events-none z-10 md:z-[60]
                  w-[55vw] sm:w-[40vw] md:w-[380px] lg:w-[500px] xl:w-[620px]
                  opacity-[0.25] md:opacity-100 transition-all duration-[800ms] ease-out
                  flex items-end justify-start"
                aria-hidden="true"
              >
                <img
                  src={menaraSvg}
                  alt=""
                  aria-hidden="true"
                  className="h-[90%] w-auto max-w-none object-contain object-left-bottom drop-shadow-[0_25px_60px_rgba(0,0,0,0.18)] select-none"
                  fetchPriority="high"
                  loading="eager"
                  decoding="sync"
                  draggable={false}
                />
              </div>

              <HeroSection />
              <EditorialIntro />
            </div>
            <ParijsSection />
            <HeritageSection />
          </>
        ) : currentPage === 'history' ? (
          <HistoryPage />
        ) : (
          <BudayaPage />
        )}
      </main>
    </div>
  );
}

export default App;
