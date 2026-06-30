import { motion } from 'framer-motion';
import { fita } from '../data';
import { SectionHeader } from './Story';

export function Measurements() {
  const last = fita[fita.length - 1];
  const first = fita[0];

  const deltas = {
    peitoral: (last.peitoral - first.peitoral).toFixed(1),
    braco: (last.braco - first.braco).toFixed(1),
    cintura: (last.cintura - first.cintura).toFixed(1),
  };

  return (
    <section className="px-5 py-12 hairline-t">
      <SectionHeader
        eyebrow="Fita métrica"
        title="O que a balança não vê"
        subtitle="Bioimpedância oscila com hidratação. Fita não mente."
      />

      <div className="mt-8 space-y-6">
        <Measure
          label="Peitoral"
          current={last.peitoral}
          previous={fita[fita.length - 2].peitoral}
          first={first.peitoral}
          unit="cm"
          delta={deltas.peitoral}
          goal="higher"
        />
        <Measure
          label="Braço"
          current={last.braco}
          previous={fita[fita.length - 2].braco}
          first={first.braco}
          unit="cm"
          delta={deltas.braco}
          goal="higher"
        />
        <Measure
          label="Cintura abdominal"
          current={last.cintura}
          previous={fita[fita.length - 2].cintura}
          first={first.cintura}
          unit="cm"
          delta={deltas.cintura}
          goal="lower"
        />
      </div>

      <div className="mt-10 px-4 py-4 bg-paperDark rounded-sm border-l-2 border-sage">
        <p className="text-xs text-inkSoft leading-relaxed">
          <span className="font-medium text-ink">Peitoral +3 cm e braços +1,7 cm em 35 dias</span> —
          hipertrofia real. A cintura oscilou mas voltou a cair. É recomposição
          corporal de verdade.
        </p>
      </div>
    </section>
  );
}

function Measure({ label, current, previous, first, unit, delta, goal }) {
  const isPositive = goal === 'lower' ? parseFloat(delta) < 0 : parseFloat(delta) > 0;
  const recentChange = (current - previous).toFixed(1);
  const recentPositive = goal === 'lower' ? parseFloat(recentChange) <= 0 : parseFloat(recentChange) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-eyebrow text-inkMuted uppercase">{label}</span>
        <span className="text-xs text-inkMuted tnum">
          de {first}{unit}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl tnum">{current}</span>
        <span className="text-base text-inkMuted">{unit}</span>
        <div className="flex-1" />
        <div className="text-right">
          <div className={`text-xs tnum font-medium ${recentPositive ? 'text-sage' : 'text-amber'}`}>
            {parseFloat(recentChange) > 0 ? '+' : ''}{recentChange}{unit}
          </div>
          <div className="text-[10px] text-inkMuted">desde anterior</div>
        </div>
      </div>
      {/* Mini barra visual */}
      <div className="mt-3 h-px bg-ruleSoft relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`absolute left-0 top-0 h-px ${isPositive ? 'bg-sage' : 'bg-amber'}`}
        />
      </div>
    </motion.div>
  );
}
