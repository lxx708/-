import React from 'react';
import { StageId, InhibitorType } from '../types/biology';
import { STAGES_DATA } from '../data/stages';
import { Zap, Activity, Flame, ShieldAlert, Check } from 'lucide-react';

interface StageNavProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
  showElectronFlow: boolean;
  onToggleElectronFlow: () => void;
  showProtonFlow: boolean;
  onToggleProtonFlow: () => void;
  showAtpGeneration: boolean;
  onToggleAtpGeneration: () => void;
  activeInhibitor: InhibitorType;
  protonGradientLevel: 'low' | 'medium' | 'high';
}

export const StageNav: React.FC<StageNavProps> = ({
  currentStage,
  onSelectStage,
  showElectronFlow,
  onToggleElectronFlow,
  showProtonFlow,
  onToggleProtonFlow,
  showAtpGeneration,
  onToggleAtpGeneration,
  activeInhibitor,
  protonGradientLevel
}) => {
  return (
    <>
      {/* ======================================================== */}
      {/* 1. DESKTOP VIEWPORT SIDEBAR (lg:flex, hidden on mobile)  */}
      {/* ======================================================== */}
      <aside className="hidden lg:flex w-72 bg-slate-50/80 border-r border-slate-200 flex-col shrink-0 overflow-y-auto">
        {/* Stages list header */}
        <div className="p-3.5 border-b border-slate-200/70">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              演示阶段 · Stages
            </span>
            <span className="text-xs font-mono text-slate-400">
              {currentStage} / 06
            </span>
          </div>
        </div>

        {/* Stage item buttons */}
        <div className="p-2 space-y-1.5 flex-1">
          {STAGES_DATA.map((stage) => {
            const isActive = currentStage === stage.id;
            const isPassed = currentStage > stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => onSelectStage(stage.id)}
                className={`w-full text-left p-2.5 rounded-lg transition-all flex items-start gap-3 relative group ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs border border-sky-200/80 ring-1 ring-sky-500/20'
                    : 'text-slate-600 hover:bg-white/60 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono font-semibold shrink-0 transition-colors ${
                    isActive
                      ? 'bg-sky-600 text-white'
                      : isPassed
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200/70'
                  }`}
                >
                  {stage.numberStr}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h2
                      className={`text-xs font-medium truncate ${
                        isActive ? 'text-slate-900 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      {stage.title}
                    </h2>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {stage.titleEn}
                  </p>
                </div>

                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 self-center" />
                )}
              </button>
            );
          })}
        </div>

        {/* Layer switches section */}
        <div className="p-3.5 border-t border-slate-200/70 bg-white/50 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
            动画流显隐开关
          </span>

          <div className="space-y-2">
            <label className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-xs" />
                <span>电子流 (e⁻)</span>
              </div>
              <input
                type="checkbox"
                checked={showElectronFlow}
                onChange={onToggleElectronFlow}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs" />
                <span>H⁺ 质子流</span>
              </div>
              <input
                type="checkbox"
                checked={showProtonFlow}
                onChange={onToggleProtonFlow}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" />
                <span>ATP 合成</span>
              </div>
              <input
                type="checkbox"
                checked={showAtpGeneration}
                onChange={onToggleAtpGeneration}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
              />
            </label>
          </div>

          {/* Real-time Proton Gradient Meter */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span>膜间隙 H⁺ 梯度</span>
              <span
                className={`font-semibold uppercase ${
                  protonGradientLevel === 'high'
                    ? 'text-amber-600'
                    : protonGradientLevel === 'medium'
                    ? 'text-sky-600'
                    : 'text-slate-400'
                }`}
              >
                {protonGradientLevel === 'high'
                  ? '显著 (High)'
                  : protonGradientLevel === 'medium'
                  ? '中等 (Medium)'
                  : '微弱 (Low)'}
              </span>
            </div>

            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden flex">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  protonGradientLevel === 'high'
                    ? 'w-full bg-amber-500'
                    : protonGradientLevel === 'medium'
                    ? 'w-2/3 bg-sky-500'
                    : 'w-1/3 bg-slate-400'
                }`}
              />
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>基质 pH ~7.8</span>
              <span>膜间隙 pH ~7.0</span>
            </div>
          </div>

          {/* Active Inhibitor Alert if any */}
          {activeInhibitor !== 'none' && (
            <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-800 text-[11px] flex items-start gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">抑制剂介入状态</span>
                <span>反应环节受阻，请在右侧或实验区查看详情。</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MOBILE VIEWPORT HORIZONTAL SCROLL BAR (< lg)           */}
      {/* ======================================================== */}
      <div className="lg:hidden w-full bg-white border-b border-slate-200 py-2 px-3 shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {STAGES_DATA.map((stage) => {
            const isActive = currentStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => onSelectStage(stage.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs shrink-0 transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white font-medium shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="font-mono text-[10px] opacity-80">{stage.numberStr}</span>
                <span>{stage.title}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile quick toggles */}
        <div className="flex items-center justify-between pt-1.5 px-1 text-[11px] text-slate-600 border-t border-slate-100 mt-1">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={showElectronFlow}
              onChange={onToggleElectronFlow}
              className="w-3 h-3 rounded text-sky-600"
            />
            <span>e⁻ 电子</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={showProtonFlow}
              onChange={onToggleProtonFlow}
              className="w-3 h-3 rounded text-amber-600"
            />
            <span>H⁺ 质子</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={showAtpGeneration}
              onChange={onToggleAtpGeneration}
              className="w-3 h-3 rounded text-emerald-600"
            />
            <span>ATP 合成</span>
          </label>
          <span className="text-[10px] font-mono text-slate-400">
            梯度: {protonGradientLevel === 'high' ? '高' : protonGradientLevel === 'medium' ? '中' : '低'}
          </span>
        </div>
      </div>
    </>
  );
};
