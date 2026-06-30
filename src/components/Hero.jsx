import { motion } from 'framer-motion';
import { bia, fita } from '../data';

export function Hero() {
  const latest = bia[bia.length - 1];
  const first = bia[0];
  const deltaPeso = (latest.peso - first.peso).toFixed(1);
  const latestFita = fita[fita.length - 1];

  return (
    <section className="px-5 pt-8 pb-16 relative">
      {/* Marca d'água lateral */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-rule pointer-events-none" />

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-eyebrow text-inkMuted uppercase mb-8 flex items-center gap-3"
      >
        <span className="w-6 h-px bg-inkMuted" />
        <span>Janeiro — Junho</span>
        <span className="tnum text-inkFaint">·</span>
        <span>Cento e setenta e nove dias</span>
      </motion.div>

      {/* Hero — duas linhas */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="space-y-2"
      >
        <div className="flex items-start">
          <span className="font-display text-mega tnum leading-none">{latest.pgc}</span>
          <span className="font-display text-3xl mt-4 ml-1 text-inkMuted">%</span>
        </div>
        <div className="font-display text-2xl text-inkSoft italic display-italic leading-tight">
          de gordura corporal,
        </div>
        <div className="text-sm text-inkMuted leading-relaxed pt-1">
          partindo de <span className="text-ink font-medium tnum">{first.pgc}%</span> em janeiro,
          atravessando tirzepatida, restrição alimentar e enfim um plano que funciona.
        </div>
      </motion.div>

      {/* Stats em linha */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 grid grid-cols-3 gap-4 hairline-t pt-6"
      >
        <Stat eyebrow="Peso hoje" value={latest.peso} unit="kg" delta={deltaPeso} positive={parseFloat(deltaPeso) < 0} />
        <Stat eyebrow="Cintura" value={latestFita.cintura} unit="cm" delta="−1" positive={true} />
        <Stat eyebrow="Visceral" value={latest.visceral} unit="" delta="alvo: 7" positive={false} subtle />
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-12 flex items-center gap-3 text-eyebrow text-inkFaint uppercase"
      >
        <span>Continue rolando</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}

function Stat({ eyebrow, value, unit, delta, positive, subtle }) {
  return (
    <div>
      <div className="text-eyebrow text-inkMuted uppercase mb-2">{eyebrow}</div>
      <div className="flex items-baseline gap-0.5">
        <span className="font-display text-3xl tnum">{value}</span>
        {unit && <span className="text-xs text-inkMuted ml-0.5">{unit}</span>}
      </div>
      <div className={`text-[10px] mt-1.5 tnum ${
        subtle ? 'text-inkMuted' : positive ? 'text-sage' : 'text-amber'
      }`}>
        {delta}
      </div>
    </div>
  );
}
