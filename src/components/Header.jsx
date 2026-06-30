import { useEffect, useState } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/85 backdrop-blur-md hairline-b' : 'bg-paper'
      }`}
    >
      <div className="max-w-md mx-auto flex items-center justify-between px-5 py-3.5">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-base font-medium italic">Atlas</span>
          <span className="text-eyebrow text-inkMuted uppercase">Clayton</span>
        </div>
        <div className="text-eyebrow text-inkMuted uppercase tnum">
          {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
        </div>
      </div>
    </header>
  );
}
