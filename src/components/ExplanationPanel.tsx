import React from 'react';
import { StageInfo, BiologicalEntity, InhibitorInfo } from '../types/biology';
import { BIOLOGICAL_ENTITIES, INHIBITORS_DATA } from '../data/complexes';
import { Info, Sparkles, ChevronRight, X, FlaskConical, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ExplanationPanelProps {
  currentStage: StageInfo;
  selectedEntity: BiologicalEntity | null;
  onClearSelectedEntity: () => void;
  activeInhibitor: InhibitorInfo;
  onSelectInhibitor: (inhibitor: InhibitorInfo) => void;
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
  currentStage,
  selectedEntity,
  onClearSelectedEntity,
  activeInhibitor,
  onSelectInhibitor
}) => {
  return (
    <aside className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col shrink-0 overflow-y-auto">
      {/* Top Header */}
      <div className="p-3.5 border-b border-slate-200/70 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <Info className="w-3.5 h-3.5 text-sky-600" />
          <span>教学要点与生化原理</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Stage {currentStage.numberStr}
        </span>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* If user clicked a specific component to inspect */}
        {selectedEntity ? (
          <div className="bg-sky-50/60 border border-sky-200/80 rounded-xl p-3.5 relative animate-in fade-in duration-200">
            <button
              onClick={onClearSelectedEntity}
              className="absolute top-2.5 right-2.5 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-sky-100 transition-colors"
              title="关闭详情"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="pr-6">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-700 block mb-0.5">
                分子结构详解 · Structural Inspector
              </span>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {selectedEntity.name}
              </h3>
              <p className="text-[11px] text-slate-500 mb-2">
                {selectedEntity.nameEn}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-sky-200/60">
              <div>
                <span className="text-[10px] font-medium text-slate-400 block uppercase">
                  解剖定位
                </span>
                <p className="text-xs text-slate-800">{selectedEntity.location}</p>
              </div>

              <div>
                <span className="text-[10px] font-medium text-slate-400 block uppercase">
                  催化功能
                </span>
                <p className="text-xs text-slate-800 leading-relaxed">
                  {selectedEntity.function}
                </p>
              </div>

              {selectedEntity.bulletPoints && selectedEntity.bulletPoints.length > 0 && (
                <div className="p-2 bg-sky-100/40 rounded-lg border border-sky-200/50">
                  <span className="text-[10px] font-semibold text-sky-900 block uppercase mb-1">
                    核心生化功能与机制：
                  </span>
                  <ul className="space-y-1 text-xs text-slate-800">
                    {selectedEntity.bulletPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-sky-600 font-bold shrink-0">•</span>
                        <span className="leading-tight">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedEntity.stoichiometry && (
                <div>
                  <span className="text-[10px] font-medium text-slate-400 block uppercase">
                    化学计量与泵送比
                  </span>
                  <p className="text-xs font-mono text-sky-900 bg-sky-100/70 px-2 py-1 rounded">
                    {selectedEntity.stoichiometry}
                  </p>
                </div>
              )}

              {selectedEntity.prostheticGroups && (
                <div>
                  <span className="text-[10px] font-medium text-slate-400 block uppercase">
                    辅基与活性中心
                  </span>
                  <p className="text-xs text-slate-700">
                    {selectedEntity.prostheticGroups}
                  </p>
                </div>
              )}

              {selectedEntity.clinicalOrInhibitorNote && (
                <div className="p-2 bg-amber-50/80 border border-amber-200/70 rounded text-amber-900 text-[11px] flex items-start gap-1.5 mt-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{selectedEntity.clinicalOrInhibitorNote}</span>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Current Stage Core Explanation */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-sky-600">
                {currentStage.numberStr}
              </span>
              <h2 className="text-sm font-bold text-slate-900">
                {currentStage.title}
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-normal">
              {currentStage.titleEn}
            </p>
          </div>

          {/* Concise explanation (2-3 sentences as requested) */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-700 leading-relaxed shadow-2xs">
            {currentStage.shortDesc}
          </div>

          {/* Biological Significance */}
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              生物学意义 · Biological Significance
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentStage.biologicalSignificance}
            </p>
          </div>

          {/* Key Chemical Equation */}
          {currentStage.chemicalEquation && (
            <div className="p-2.5 bg-slate-900 text-slate-100 rounded-lg space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                  {currentStage.id === 6 ? '整体能量收支概览' : currentStage.id === 5 ? 'ATP 合成反应式' : '核心反应与动力势'}
                </span>
                {currentStage.id === 6 && (
                  <span className="text-[9px] text-sky-400 font-sans">完整有氧呼吸</span>
                )}
              </div>
              <p className="text-[11px] font-mono text-cyan-300 break-words leading-normal font-semibold">
                {currentStage.chemicalEquation}
              </p>
              {currentStage.id === 5 && (
                <div className="pt-1 text-[10px] space-y-0.5 border-t border-slate-800 text-slate-300">
                  <p className="text-amber-300">
                    H⁺沿电化学梯度通过ATP synthase回流，为ATP合成提供驱动力。
                  </p>
                  <p className="text-amber-400 font-medium">
                    强调：H⁺不是ATP的原料，而是驱动ATP合成的能量来源。
                  </p>
                </div>
              )}
              {currentStage.id === 6 && (
                <p className="text-[10px] text-slate-300 pt-1 leading-normal border-t border-slate-800">
                  说明：每分子葡萄糖在真核细胞中通常产生约30–32 ATP，ATP产量取决于电子穿梭机制及细胞代谢条件。这是“有氧细胞呼吸的整体能量收支概览”，而非“氧化磷酸化本身的反应式”。
                </p>
              )}
            </div>
          )}

          {/* Stage 03 dedicated Redox Free Energy Card */}
          {currentStage.id === 3 && (
            <div className="p-3 bg-sky-50/80 border border-sky-200/90 rounded-xl space-y-1.5 text-xs text-sky-950">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block">
                氧化还原多级传递与自由能释放
              </span>
              <p className="text-[11px] text-sky-900 leading-relaxed">
                电子从NADH和FADH₂进入电子传递链，经一系列氧化还原反应逐级传递，并释放自由能。释放的自由能被用于建立跨内膜的质子动力势。
              </p>
              <p className="text-[10px] text-sky-700 italic font-mono pt-0.5">
                "Electrons pass through a series of redox reactions, releasing free energy used to establish PMF."
              </p>
            </div>
          )}

          {/* Stage 04 dedicated Proton-Motive Force Teaching Card */}
          {currentStage.id === 4 && (
            <div className="p-3 bg-amber-50/80 border border-amber-200/90 rounded-xl space-y-1.5 text-xs text-amber-950">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                质子动力势（Proton-Motive Force）
              </span>
              <div className="flex items-center justify-between font-mono text-[10px] bg-white p-2 rounded border border-amber-200/80 text-amber-900 shadow-2xs font-semibold">
                <span>H⁺浓度差</span>
                <span>+</span>
                <span>膜电位差</span>
                <span>→</span>
                <span className="font-bold text-amber-700">质子动力势</span>
              </div>
              <p className="text-[11px] text-amber-900 leading-relaxed pt-0.5">
                呼吸链将H⁺从基质逆向泵入膜间隙，在内膜两侧形成H⁺浓度差和膜电位差，共同形成质子动力势。释放的势能专门驱动ATP合酶工作。
              </p>
              <p className="text-[9px] text-slate-500 italic pt-0.5 border-t border-amber-200/60 font-sans">
                注：数学公式中具体正负符号定义取决于ΔpH和电位差的方向约定。
              </p>
            </div>
          )}

          {/* Stage 05 dedicated ATP Synthesis Energy Coupling Card */}
          {currentStage.id === 5 && (
            <div className="p-3 bg-orange-50/80 border border-orange-200/90 rounded-xl space-y-1.5 text-xs text-orange-950">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-800 block">
                ATP 合成驱动机制核心辨析
              </span>
              <p className="text-[11px] text-orange-900 leading-relaxed">
                H⁺沿电化学梯度通过ATP synthase回流，为ATP合成提供驱动力。
              </p>
              <div className="p-2 bg-white/90 rounded border border-orange-200 text-[11px] font-semibold text-orange-800">
                ⚠ 强调：H⁺不是ATP的原料，而是驱动ATP合成的能量来源！基质中的 ADP + Pi 才是化学原料。
              </div>
            </div>
          )}

          {/* Next Stage Teaser */}
          <div className="p-2.5 bg-sky-50/50 border border-sky-100 rounded-lg space-y-1">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-sky-800">
              <ChevronRight className="w-3.5 h-3.5" />
              <span>下一阶段预告</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {currentStage.nextStageHint}
            </p>
          </div>
        </div>

        {/* Inhibitor Simulation Quick Selector */}
        <div className="pt-3 border-t border-slate-200/70 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-amber-600" />
              <span>呼吸链抑制剂模拟</span>
            </span>
            {activeInhibitor.id !== 'none' && (
              <button
                onClick={() => onSelectInhibitor(INHIBITORS_DATA[0])}
                className="text-[11px] text-sky-600 hover:text-sky-800 font-medium"
              >
                恢复正常
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-500">
            选择经典生化抑制剂，直观观察电子链淤积或质子梯度解偶联现象：
          </p>

          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {INHIBITORS_DATA.map((inh) => {
              const isSelected = activeInhibitor.id === inh.id;
              return (
                <button
                  key={inh.id}
                  onClick={() => onSelectInhibitor(inh)}
                  className={`p-1.5 text-left rounded-md border text-[11px] transition-all truncate ${
                    isSelected
                      ? inh.id === 'none'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                        : 'bg-red-50 border-red-300 text-red-900 font-medium shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  title={`${inh.name}: ${inh.target}`}
                >
                  <span className="truncate block">{inh.name.split(' (')[0]}</span>
                </button>
              );
            })}
          </div>

          {activeInhibitor.id !== 'none' && (
            <div className="p-2.5 bg-red-50/90 border border-red-200 rounded-lg text-red-900 text-xs space-y-1 mt-2 animate-in fade-in duration-200">
              <div className="font-semibold flex items-center gap-1 text-red-800">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>靶点：{activeInhibitor.target}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-red-700">
                {activeInhibitor.effect}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
