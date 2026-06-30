import { motion } from 'framer-motion';
import { suplementos, hormonal } from '../data';
import { SectionHeader } from './Story';

export function Protocol() {
  return (
    <section className="px-5 py-12 hairline-t">
      <SectionHeader
        eyebrow="Protocolo"
        title="Suplementação"
        subtitle="O que entra a cada dia"
      />

      <div className="mt-8 space-y-px bg-rule">
        {suplementos.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="bg-paper grid grid-cols-[1fr_auto] gap-3 px-4 py-3 items-center"
          >
            <div>
              <div className="text-sm font-medium text-ink">{s.name}</div>
              <div className="text-[11px] text-inkMuted mt-0.5">{s.notes}</div>
            </div>
            <div className="text-right">
              <div className="text-eyebrow text-inkMuted uppercase">{s.when}</div>
              <div className="text-xs text-ink font-medium tnum mt-0.5">{s.dose}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Protocolo hormonal */}
      <div className="mt-12">
        <div className="text-eyebrow text-terra uppercase mb-3">Hormonal — Dr. Leo</div>
        <div className="space-y-3">
          {hormonal.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="px-4 py-3 border border-terraSoft/40 bg-terraSoft/10 rounded-sm"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-sm font-medium text-ink">{h.name}</span>
                <span className="text-[10px] text-terra uppercase tracking-wider">{h.status}</span>
              </div>
              <div className="text-xs text-inkMuted mb-1">{h.dose}</div>
              <div className="text-[11px] text-inkSoft italic">{h.goal}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
