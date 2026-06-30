import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { planoAtual } from '../data';
import { SectionHeader } from './Story';

const meals = [
  { id: 'shot', label: 'Shot', time: '07h', items: planoAtual.shot, kind: 'list' },
  { id: 'cafe', label: 'Café da manhã', time: '10h', items: planoAtual.cafe.opcoes, kind: 'options' },
  { id: 'almoco', label: 'Almoço', time: '14h', text: planoAtual.almoco.composicao, kind: 'text' },
  { id: 'jantar', label: 'Jantar', time: '19h', items: planoAtual.jantar.opcoes, kind: 'options' },
  { id: 'noite', label: 'Antes de dormir', time: '22h', text: planoAtual.noite, kind: 'text' },
];

export function Plan() {
  return (
    <section className="px-5 py-12 hairline-t">
      <SectionHeader
        eyebrow="Cardápio"
        title="Um dia padrão"
        subtitle="Conforme prescrito pela Juliana"
      />

      <div className="mt-8 space-y-4">
        {meals.map((meal, i) => (
          <Meal key={meal.id} meal={meal} index={i} />
        ))}
      </div>
    </section>
  );
}

function Meal({ meal, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="grid grid-cols-[44px_1fr] gap-3"
    >
      {/* Timeline */}
      <div className="text-right">
        <div className="text-eyebrow text-inkMuted uppercase tnum">{meal.time}</div>
      </div>

      {/* Conteúdo */}
      <div className="pb-4 hairline-b">
        <button
          onClick={() => setOpen(!open)}
          className="text-left w-full flex items-center justify-between group"
        >
          <span className="font-display text-lg">{meal.label}</span>
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-inkFaint text-xs"
          >
            ›
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3">
                {meal.kind === 'list' && (
                  <ul className="space-y-1.5">
                    {meal.items.map((item, i) => (
                      <li key={i} className="text-xs text-inkSoft flex gap-2">
                        <span className="text-inkFaint mt-1.5 w-1 h-1 rounded-full bg-inkFaint flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {meal.kind === 'options' && (
                  <ul className="space-y-2">
                    {meal.items.map((opt, i) => (
                      <li key={i} className="text-xs text-inkSoft leading-relaxed pl-2 border-l border-rule">
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
                {meal.kind === 'text' && (
                  <p className="text-xs text-inkSoft leading-relaxed">{meal.text}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
