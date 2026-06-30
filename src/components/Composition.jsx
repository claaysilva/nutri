import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { bia } from '../data';
import { SectionHeader } from './Story';

const METRICS = [
  { key: 'peso', label: 'Peso', unit: 'kg', goal: 'lower' },
  { key: 'musc', label: 'Massa muscular esquelética', unit: 'kg', goal: 'higher' },
  { key: 'gordura', label: 'Massa de gordura', unit: 'kg', goal: 'lower' },
  { key: 'pgc', label: '% Gordura corporal', unit: '%', goal: 'lower' },
  { key: 'tmb', label: 'Taxa metabólica basal', unit: 'kcal', goal: 'higher' },
  { key: 'visceral', label: 'Gordura visceral', unit: '', goal: 'lower' },
  { key: 'whr', label: 'Relação cintura-quadril', unit: '', goal: 'lower' },
  { key: 'score', label: 'Pontuação corporal', unit: '/100', goal: 'higher' },
];

export function Composition() {
  const [activeMetric, setActiveMetric] = useState('musc');
  const metric = METRICS.find(m => m.key === activeMetric);

  // Dados filtrados (alguns só existem em medições mais recentes)
  const points = bia.filter(b => b[activeMetric] !== null && b[activeMetric] !== undefined);
  const values = points.map(p => p[activeMetric]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const first = points[0];
  const last = points[points.length - 1];
  const delta = (last[activeMetric] - first[activeMetric]).toFixed(metric.key === 'whr' ? 2 : 1);
  const isPositive = metric.goal === 'lower' ? parseFloat(delta) < 0 : parseFloat(delta) > 0;

  return (
    <section className="px-5 py-12 hairline-t">
      <SectionHeader
        eyebrow="Composição"
        title="Seis bioimpedâncias"
        subtitle="Toque em uma métrica para ver a trajetória"
      />

      {/* Pills com métricas */}
      <div className="mt-6 -mx-5 px-5 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 w-max">
          {METRICS.map(m => (
            <button
              key={m.key}
              onClick={() => setActiveMetric(m.key)}
              className={`text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-all ${
                activeMetric === m.key
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-inkSoft border-rule hover:border-inkMuted'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Número grande + delta */}
      <motion.div
        key={activeMetric}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8"
      >
        <div className="text-eyebrow text-inkMuted uppercase mb-3">{metric.label}</div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-hero tnum">
            {last[activeMetric]}
          </span>
          <span className="font-display text-2xl text-inkMuted">{metric.unit}</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span
            className={`text-xs tnum px-2 py-1 rounded-full ${
              isPositive ? 'bg-sageSoft/40 text-sage' : 'bg-rustSoft/40 text-rust'
            }`}
          >
            {parseFloat(delta) > 0 ? '+' : ''}{delta} {metric.unit}
          </span>
          <span className="text-xs text-inkMuted">
            desde {first.label}
          </span>
        </div>
      </motion.div>

      {/* Gráfico custom */}
      <div className="mt-8">
        <Chart points={points} metricKey={activeMetric} min={min} max={max} range={range} />
      </div>

      {/* Tabela densa abaixo */}
      <div className="mt-10">
        <div className="text-eyebrow text-inkMuted uppercase mb-3">Histórico completo</div>
        <div className="hairline-t pt-2">
          {points.map((p, i) => {
            const prev = i > 0 ? points[i - 1][activeMetric] : null;
            const d = prev !== null ? (p[activeMetric] - prev).toFixed(metric.key === 'whr' ? 2 : 1) : null;
            return (
              <div key={p.date} className="grid grid-cols-[60px_1fr_70px] items-center py-2.5 hairline-b">
                <div className="text-xs text-inkMuted tnum">{p.label}</div>
                <div className="font-display text-lg tnum">{p[activeMetric]}<span className="text-xs text-inkMuted ml-1">{metric.unit}</span></div>
                <div className="text-xs text-right tnum">
                  {d !== null ? (
                    <span className={parseFloat(d) > 0 ? 'text-amber' : parseFloat(d) < 0 ? 'text-sage' : 'text-inkMuted'}>
                      {parseFloat(d) > 0 ? '+' : ''}{d}
                    </span>
                  ) : (
                    <span className="text-inkFaint">início</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Chart({ points, metricKey, min, max, range }) {
  const w = 320;
  const h = 160;
  const padY = 20;
  const padX = 18;

  const innerW = w - 2 * padX;
  const xStep = innerW / (points.length - 1 || 1);
  const yFor = (v) => padY + (h - 2 * padY) * (1 - (v - min) / range);
  const xFor = (i) => padX + i * xStep;

  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(p[metricKey])}`)
    .join(' ');

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h + 30}`} className="w-full">
        {/* baseline sutil */}
        <line x1={padX} y1={h - padY} x2={w - padX} y2={h - padY} stroke="#EEE9DD" strokeWidth="1" />
        {/* path */}
        <path
          d={path}
          fill="none"
          stroke="#0E0E0C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* points */}
        {points.map((p, i) => (
          <g key={p.date}>
            <circle
              cx={xFor(i)}
              cy={yFor(p[metricKey])}
              r={i === points.length - 1 ? 4 : 2.5}
              fill={i === points.length - 1 ? '#C8533A' : '#0E0E0C'}
            />
            {i === points.length - 1 && (
              <circle
                cx={xFor(i)}
                cy={yFor(p[metricKey])}
                r={9}
                fill="none"
                stroke="#C8533A"
                strokeOpacity="0.25"
                strokeWidth="1"
              />
            )}
            <text
              x={xFor(i)}
              y={h + 12}
              fontSize="8"
              textAnchor="middle"
              fill="#A8A49C"
              className="font-mono"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
