import { profile } from '../data';

export function Footer() {
  return (
    <footer className="px-5 pt-12 pb-8 hairline-t">
      <div className="font-display text-base italic text-inkMuted mb-6">
        Atlas
      </div>
      
      <div className="text-eyebrow text-inkMuted uppercase mb-3">Equipe clínica</div>
      <div className="space-y-3 mb-8">
        <div>
          <div className="text-sm font-medium text-ink">{profile.team.endo.name}</div>
          <div className="text-xs text-inkMuted">Endocrinologista · {profile.team.endo.crm}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-ink">{profile.team.nutri.name}</div>
          <div className="text-xs text-inkMuted">Nutricionista · {profile.team.nutri.crn}</div>
        </div>
      </div>

      <div className="text-[10px] text-inkMuted leading-relaxed">
        Documento pessoal de acompanhamento. Não substitui orientação clínica.
        Toda decisão terapêutica deve ser tomada pelos profissionais responsáveis.
      </div>

      <div className="mt-6 text-eyebrow text-inkFaint uppercase tnum">
        atualizado em 29 jun 2026
      </div>
    </footer>
  );
}
