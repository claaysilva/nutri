import { motion } from 'framer-motion';
import { bia } from '../data';

export function Signature() {
  const first = bia[0];
  const last = bia[bia.length - 1];

  const stats = [
    { label: 'kg de peso', from: first.peso, to: last.peso, unit: 'kg' },
    { label: 'kg de gordura', from: first.gordura, to: last.gordura, unit: 'kg' },
    { label: 'pontos no IMC', from: first.imc, to: last.imc, unit: '' },
    { label: 'na razão cintura-quadril', from: first.whr, to: last.whr, unit: '', decimal: 2 },
  ];

  return (
    <section className="px-5 py-16 bg-ink text-paper relative overflow-hidden">
      {/* Padrão decorativo sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#FAF8F4" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative">
        <div className="text-eyebrow text-paperDark/60 uppercase mb-3 flex items-center gap-3">
          <span className="w-6 h-px bg-paperDark/40" />
          <span>De janeiro a junho</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-display mb-12 leading-tight"
        >
          Cinco coisas <span className="italic display-italic">desceram</span>,<br />
          uma <span className="italic display-italic">subiu</span>.
        </motion.h2>

        <div className="space-y-5">
          {stats.map((s, i) => {
            const delta = (s.to - s.from).toFixed(s.decimal || 1);
            const positive = parseFloat(delta) < 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="grid grid-cols-[auto_1fr] gap-4 items-baseline hairline-b pb-4"
                style={{ boxShadow: '0 1px 0 rgba(250,248,244,0.1)' }}
              >
                <span className="font-display text-4xl tnum text-terraSoft">
                  {positive ? '−' : '+'}{Math.abs(parseFloat(delta)).toFixed(s.decimal || 1)}
                </span>
                <span className="text-sm text-paperDark/80 leading-tight">{s.label}</span>
              </motion.div>
            );
          })}

          {/* Subiu */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-[auto_1fr] gap-4 items-baseline pt-2"
          >
            <span className="font-display text-4xl tnum text-sageSoft">+3</span>
            <span className="text-sm text-paperDark/80 leading-tight">
              cm no peitoral <span className="italic text-paperDark/50">(maio → junho)</span>
            </span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-sm text-paperDark/60 italic leading-relaxed"
        >
          Os números acima são o resumo. As próximas seções mostram como cada
          um deles se moveu, mês a mês.
        </motion.p>
      </div>
    </section>
  );
}
