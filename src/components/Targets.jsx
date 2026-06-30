import { motion } from 'framer-motion';
import { metas } from '../data';
import { SectionHeader } from './Story';

export function Targets() {
  const items = [
    { key: 'visceral', label: 'Gordura visceral', data: metas.visceral, viability: 'realista' },
    { key: 'cintura', label: 'Cintura', data: metas.cintura, viability: 'realista' },
    { key: 'pgc', label: '% Gordura total', data: metas.pgc, viability: 'agressivo' },
    { key: 'subcutanea', label: 'Gordura subcutânea', data: metas.subcutanea, viability: 'agressivo' },
  ];

  return (
    <section className="px-5 py-12 hairline-t">
      <SectionHeader
        eyebrow="Próxima consulta"
        title="Metas da Juliana"
        subtitle="Em 7 dias. O que é realista, o que é otimista."
      />

      <div className="mt-8 space-y-3">
        {items.map((item, i) => (
          <Target key={item.key} item={item} index={i} />
        ))}
      </div>

      <div className="mt-8 px-4 py-4 bg-paperDark rounded-sm">
        <div className="text-eyebrow text-amber uppercase mb-2">Recomendação</div>
        <p className="text-xs text-inkSoft leading-relaxed">
          Atingir as 4 metas em 7 dias exigiria déficit calórico agressivo demais —
          repetir o ciclo que reduziu testosterona para 405. <span className="text-ink font-medium">Foco
          em <span className="italic">visceral</span> e <span className="italic">cintura</span> esta semana</span>; o restante chega em 30 dias com saúde preservada.
        </p>
      </div>
    </section>
  );
}

function Target({ item, index }) {
  const { atual, meta, unit } = item.data;
  const diff = (atual - meta).toFixed(1);
  const viable = item.viability === 'realista';

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="grid grid-cols-[1fr_auto] gap-4 items-center py-3 hairline-b"
    >
      <div>
        <div className="text-sm font-medium">{item.label}</div>
        <div className="text-xs text-inkMuted mt-0.5">
          {viable ? 'Provável em 7 dias' : 'Realista em 30 dias'}
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-baseline gap-1.5 justify-end">
          <span className="text-xs text-inkMuted tnum">{atual}{unit}</span>
          <span className="text-inkFaint text-xs">→</span>
          <span className="font-display text-lg tnum">{meta}{unit}</span>
        </div>
        <div className={`text-[10px] mt-0.5 tnum ${viable ? 'text-sage' : 'text-amber'}`}>
          ↓ {diff}{unit}
        </div>
      </div>
    </motion.div>
  );
}
