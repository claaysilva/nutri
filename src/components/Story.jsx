import { motion } from 'framer-motion';
import { fases, bia } from '../data';

const phaseColor = {
  tirzepatida: 'bg-rust',
  restricao: 'bg-amber',
  plano: 'bg-sage',
};

export function Story() {
  const phases = ['tirzepatida', 'restricao', 'plano'];
  // Calcula extensão de cada fase em medições
  const counts = phases.map(p => bia.filter(b => b.phase === p).length);
  const total = counts.reduce((a, b) => a + b, 0);

  return (
    <section className="px-5 py-12 hairline-t">
      <SectionHeader
        eyebrow="Três fases"
        title="A jornada"
        subtitle="Como o corpo respondeu a cada estratégia"
      />

      {/* Barra horizontal proporcional */}
      <div className="mt-6 flex h-1 rounded-full overflow-hidden">
        {phases.map((p, i) => (
          <div
            key={p}
            className={`${phaseColor[p]} h-full`}
            style={{ width: `${(counts[i] / total) * 100}%` }}
          />
        ))}
      </div>

      {/* Fases */}
      <div className="mt-8 space-y-8">
        {fases.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="grid grid-cols-[28px_1fr] gap-3"
          >
            <div className="flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full ${phaseColor[f.id]} mt-2`} />
              <div className="text-eyebrow text-inkFaint mt-2 -rotate-0 tnum">
                0{i + 1}
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="font-display text-xl">{f.label}</h3>
                <span className="text-xs text-inkMuted tnum">{f.period}</span>
              </div>
              <p className="text-sm text-inkSoft leading-relaxed">{f.description}</p>
              <p className="mt-2 text-sm font-medium text-ink italic">
                {f.verdict}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <>
      <div className="text-eyebrow text-inkMuted uppercase mb-2">{eyebrow}</div>
      <h2 className="font-display text-display">{title}</h2>
      {subtitle && <p className="text-sm text-inkMuted mt-1.5">{subtitle}</p>}
    </>
  );
}
