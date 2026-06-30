import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { exames } from '../data';
import { SectionHeader } from './Story';

const statusConfig = {
  ok: { color: 'text-sage', bg: 'bg-sage', label: 'normal' },
  attention: { color: 'text-amber', bg: 'bg-amber', label: 'atenção' },
  low: { color: 'text-rust', bg: 'bg-rust', label: 'abaixo' },
  high: { color: 'text-rust', bg: 'bg-rust', label: 'acima' },
};

export function Labs() {
  // Conta global de status
  const allItems = Object.values(exames).flatMap(g => g.items);
  const ok = allItems.filter(i => i.status === 'ok').length;
  const att = allItems.filter(i => i.status === 'attention').length;
  const out = allItems.filter(i => i.status === 'low' || i.status === 'high').length;

  return (
    <section className="px-5 py-12 hairline-t">
      <SectionHeader
        eyebrow="Laboratório"
        title="Trinta e nove marcadores"
        subtitle="Coletados em 13 de maio. Visão geral por sistema."
      />

      {/* Resumo */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        <SummaryStat n={ok} label="dentro da faixa" color="sage" />
        <SummaryStat n={att} label="atenção" color="amber" />
        <SummaryStat n={out} label="fora da faixa" color="rust" />
      </div>

      {/* Grupos */}
      <div className="mt-10 space-y-2">
        {Object.entries(exames).map(([key, group]) => (
          <LabGroup key={key} group={group} />
        ))}
      </div>
    </section>
  );
}

function SummaryStat({ n, label, color }) {
  return (
    <div className="text-center py-4 bg-paperDark rounded-sm">
      <div className={`font-display text-3xl tnum text-${color}`}>{n}</div>
      <div className="text-[10px] text-inkMuted uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}

function LabGroup({ group }) {
  const [open, setOpen] = useState(false);
  const statusCounts = group.items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  const hasIssue = (statusCounts.low || 0) + (statusCounts.high || 0) > 0;
  const hasAttention = (statusCounts.attention || 0) > 0;

  return (
    <div className="border border-rule rounded-sm overflow-hidden bg-paper">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3.5 flex items-center justify-between text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-ink">{group.title}</div>
          <div className="text-[11px] text-inkMuted mt-0.5 truncate">{group.note}</div>
        </div>
        <div className="flex items-center gap-2 ml-3">
          {/* Indicadores de status */}
          <div className="flex gap-1">
            {hasIssue && <div className="w-1.5 h-1.5 rounded-full bg-rust" />}
            {hasAttention && <div className="w-1.5 h-1.5 rounded-full bg-amber" />}
            {!hasIssue && !hasAttention && <div className="w-1.5 h-1.5 rounded-full bg-sage" />}
          </div>
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-inkFaint text-xs"
          >
            ›
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 hairline-t pt-2">
              {group.items.map((item, i) => (
                <LabRow key={i} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LabRow({ item }) {
  const cfg = statusConfig[item.status];
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3 py-2.5 hairline-b last:shadow-none">
      <div className="min-w-0">
        <div className="text-xs font-medium text-ink truncate">{item.name}</div>
        <div className="text-[10px] text-inkMuted tnum mt-0.5">ref: {item.ref}</div>
        {item.note && (
          <div className={`text-[10px] mt-1 italic ${cfg.color}`}>{item.note}</div>
        )}
      </div>
      <div className="text-right">
        <div className="flex items-baseline gap-1 justify-end">
          <span className="font-display text-base tnum">{item.value}</span>
          <span className="text-[10px] text-inkMuted">{item.unit}</span>
        </div>
        <div className={`text-[9px] uppercase tracking-wider mt-0.5 ${cfg.color}`}>
          {cfg.label}
        </div>
      </div>
    </div>
  );
}
