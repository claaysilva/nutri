import { motion } from 'framer-motion';
import { acoes } from '../data';
import { SectionHeader } from './Story';

const sections = [
  { id: 'semana', title: 'Esta semana', subtitle: 'O que está nas suas mãos', items: acoes.semana, accent: 'sage' },
  { id: 'juliana', title: 'Para a Juliana', subtitle: 'Próxima consulta', items: acoes.juliana, accent: 'terra' },
  { id: 'drLeo', title: 'Para o Dr. Leo', subtitle: 'Conversas pendentes', items: acoes.drLeo, accent: 'amber' },
];

const accentClasses = {
  sage: 'border-sage',
  terra: 'border-terra',
  amber: 'border-amber',
};

const accentTextClasses = {
  sage: 'text-sage',
  terra: 'text-terra',
  amber: 'text-amber',
};

export function Actions() {
  return (
    <section className="px-5 py-12 hairline-t">
      <SectionHeader
        eyebrow="Próximos passos"
        title="O que fazer agora"
        subtitle="Dividido por quem é responsável pela ação"
      />

      <div className="mt-8 space-y-8">
        {sections.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <div className={`border-l-2 ${accentClasses[s.accent]} pl-4`}>
              <div className={`text-eyebrow ${accentTextClasses[s.accent]} uppercase`}>
                {s.subtitle}
              </div>
              <h3 className="font-display text-xl mt-1">{s.title}</h3>
              <ul className="mt-3 space-y-2">
                {s.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-inkSoft leading-relaxed flex gap-3">
                    <span className="text-inkFaint tnum text-xs mt-0.5 w-4 flex-shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
