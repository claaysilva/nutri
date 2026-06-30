import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Signature } from './components/Signature';
import { Story } from './components/Story';
import { Composition } from './components/Composition';
import { Measurements } from './components/Measurements';
import { Targets } from './components/Targets';
import { Labs } from './components/Labs';
import { Protocol } from './components/Protocol';
import { Plan } from './components/Plan';
import { Actions } from './components/Actions';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main className="max-w-md mx-auto pb-32">
        <Hero />
        <Signature />
        <Story />
        <Composition />
        <Measurements />
        <Targets />
        <Labs />
        <Protocol />
        <Plan />
        <Actions />
        <Footer />
      </main>
    </div>
  );
}
