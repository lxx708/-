import React from 'react';
import { RotateCcw, FlaskConical, BookOpen, Layers } from 'lucide-react';

interface HeaderProps {
  currentTab: 'simulation' | 'experiment' | 'guide';
  onTabChange: (tab: 'simulation' | 'experiment' | 'guide') => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onReset
}) => {
  return (
    <header className="h-14 border-b border-slate-200 bg-white/95 backdrop-blur-sm px-4 md:px-6 flex items-center justify-between z-30 shrink-0">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <h1 className="text-base md:text-lg font-semibold tracking-tight text-slate-900">
          线粒体呼吸作用与氧化磷酸化
        </h1>
        <span className="hidden lg:inline text-xs text-slate-400 font-normal">
          Mitochondrial Respiration & Oxidative Phosphorylation
        </span>
      </div>

      {/* Zone 2: 3-4 clean nav links / modes */}
      <nav className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-lg border border-slate-200/60">
        <button
          onClick={() => onTabChange('simulation')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            currentTab === 'simulation'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200/50'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-sky-600" />
          <span>动态演示</span>
        </button>
        <button
          onClick={() => onTabChange('experiment')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            currentTab === 'experiment'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200/50'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5 text-amber-600" />
          <span>抑制剂实验</span>
        </button>
        <button
          onClick={() => onTabChange('guide')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            currentTab === 'guide'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200/50'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>原理图解</span>
        </button>
      </nav>

      {/* Zone 3: Primary action */}
      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          title="重置到第一阶段"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">重置模拟</span>
        </button>
      </div>
    </header>
  );
};
