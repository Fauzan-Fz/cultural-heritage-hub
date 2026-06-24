import { EditorialIntro } from './components/EditorialIntro';
import { HeroSection } from './components/HeroSection';
import { Navigation } from './components/Navigation';
import { TimelineSection } from './components/TimelineSection';

function App() {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#fbf8ef]">
      <Navigation />
      <main>
        <HeroSection />
        <EditorialIntro />
        <TimelineSection />
      </main>
    </div>
  );
}

export default App;
