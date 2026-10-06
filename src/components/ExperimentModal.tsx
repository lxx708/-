import React from 'react';
import { INHIBITORS_DATA } from '../data/complexes';
import { InhibitorInfo } from '../types/biology';
import { X, FlaskConical, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface ExperimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeInhibitor: InhibitorInfo;
  onSelectInhibitor: (inh: InhibitorInfo) => void;
}

export const ExperimentModal: React.FC<ExperimentModalProps> = ({
  isOpen,
  onClose,
  activeInhibitor,
  onSelectInhibitor
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                生化抑制剂与解偶联实验模拟室
              </h2>
              <p className="text-xs text-slate-500">
                验证“电子流 → 质子泵送 → 质子动力势 → ATP合成”因果链的经典生物化学实验
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="text-xs text-slate-600 leading-relaxed bg-amber-50/60 border border-amber-200/70 rounded-xl p-3.5">
            <strong>实验指导原则：</strong>
            化学渗透学说（Chemiosmotic Hypothesis）的核心在于三大偶联步骤。使用不同的特异性药物或毒素阻断特定位点，可清晰地推断出各个复合体在线粒体产能中的不可替代性。
          </div>

          <div className="space-y-2.5">
            {INHIBITORS_DATA.map((inh) => {
              const isSelected = activeInhibitor.id === inh.id;

              return (
                <div
                  key={inh.id}
                  onClick={() => onSelectInhibitor(inh)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? inh.id === 'none'
                        ? 'border-emerald-400 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-red-400 bg-red-50/60 ring-2 ring-red-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {inh.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {inh.nameEn}
                      </span>
                    </div>

                    {isSelected ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>已作用</span>
                      </span>
                    ) : (
                      <button className="text-xs text-sky-600 hover:text-sky-800 font-medium">
                        施加此处理 →
                      </button>
                    )}
                  </div>

                  <div className="mt-2 text-xs text-slate-700 space-y-1">
                    <div>
                      <span className="text-slate-400 font-mono">作用靶点: </span>
                      <span className="font-medium text-slate-800">{inh.target}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-mono">生化效应: </span>
                      <span className="text-red-700 font-medium">{inh.effect}</span>
                    </div>
                    <p className="text-slate-500 text-[11px] pt-1">
                      {inh.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            返回动态画布观察
          </button>
        </div>
      </div>
    </div>
  );
};
