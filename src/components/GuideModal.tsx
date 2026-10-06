import React from 'react';
import { X, BookOpen, Check, AlertCircle } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                线粒体氧化磷酸化 · 原理图解与核心生化总结
              </h2>
              <p className="text-xs text-slate-500">
                大学生物化学与细胞生物学教材核心知识点梳理
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed">
          {/* Section 1: The Core Causal Chain */}
          <div className="p-4 bg-sky-50/70 border border-sky-200/80 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-sky-950 flex items-center gap-1.5">
              <span>一、三大核心动态因果链（重点）</span>
            </h3>
            <p>
              为什么线粒体能利用NADH产生ATP？本质是<strong>化学势能 → 电化学梯度势能 → 机械旋转能 → ATP高能化学键</strong>的多级能量跨界转换：
            </p>
            <div className="font-mono text-[11px] bg-white p-3 rounded-lg border border-sky-200 text-sky-900 space-y-1">
              <div>1. 电子流 (e⁻ Flow): NADH/FADH₂ → 呼吸链复合体I~IV → O₂ (还原生成H₂O)</div>
              <div>2. 质子流 (H⁺ Flow): 复合体I、III、IV利用电子自由能，主动将H⁺从基质泵至膜间隙，建立跨内膜梯度</div>
              <div>3. ATP 生成 (ATP Synthase): 膜间隙高势能H⁺沿ATP合酶F₀通道回流驱动转子，F₁催化 ADP + Pi → ATP</div>
            </div>
          </div>

          {/* Section 2: Proton Stoichiometry Table */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              二、电子链质子泵送比与 P/O 比 (化学计量)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-semibold text-[11px]">
                    <th className="p-2 border border-slate-200">呼吸链复合体</th>
                    <th className="p-2 border border-slate-200">电子供体 / 受体</th>
                    <th className="p-2 border border-slate-200">每对电子(2e⁻)泵送质子数</th>
                    <th className="p-2 border border-slate-200">特异性抑制剂</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[11px]">
                  <tr>
                    <td className="p-2 font-medium">Complex I (NADH脱氢酶)</td>
                    <td className="p-2">NADH → CoQ</td>
                    <td className="p-2 font-mono text-amber-700 font-semibold">4 H⁺ 泵出</td>
                    <td className="p-2">鱼藤酮 (Rotenone)、安密妥</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Complex II (琥珀酸脱氢酶)</td>
                    <td className="p-2">FADH₂ → CoQ</td>
                    <td className="p-2 font-mono text-slate-400 font-semibold">0 H⁺ (不跨膜泵送)</td>
                    <td className="p-2">丙二酸 (Malonate)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Complex III (细胞色素bc₁)</td>
                    <td className="p-2">CoQH₂ → Cyt c</td>
                    <td className="p-2 font-mono text-amber-700 font-semibold">4 H⁺ 泵出 (Q循环)</td>
                    <td className="p-2">抗霉素 A (Antimycin A)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Complex IV (细胞色素c氧化酶)</td>
                    <td className="p-2">Cyt c → O₂</td>
                    <td className="p-2 font-mono text-amber-700 font-semibold">2 H⁺ 泵出</td>
                    <td className="p-2">氰化物 (CN⁻)、CO、叠氮化物</td>
                  </tr>
                  <tr className="bg-amber-50/50 font-bold">
                    <td className="p-2" colSpan={2}>1分子 NADH 贡献总质子数</td>
                    <td className="p-2 font-mono text-amber-800">10 H⁺ (P/O 比 ≈ 2.5 ATP)</td>
                    <td className="p-2">-</td>
                  </tr>
                  <tr className="bg-teal-50/50 font-bold">
                    <td className="p-2" colSpan={2}>1分子 FADH₂ 贡献总质子数</td>
                    <td className="p-2 font-mono text-teal-800">6 H⁺ (P/O 比 ≈ 1.5 ATP)</td>
                    <td className="p-2">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Crucial Biological Rules / Anti-Misconceptions */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>三、必须澄清的经典教材生物学误区</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg">
                <span className="font-bold text-red-800 block mb-1">❌ 错误认知</span>
                <p className="text-red-700">
                  误以为氧气（O₂）直接与碳底物反应，或者氧气直接生成ATP。
                </p>
                <span className="font-bold text-emerald-800 block mt-2 mb-1">✔ 正确事实</span>
                <p className="text-emerald-700">
                  CO₂全部来自基质中TCA循环的脱羧；O₂只在Complex IV作为末端受体接收电子并生成无害的H₂O，与ATP生成物理分离。
                </p>
              </div>

              <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg">
                <span className="font-bold text-red-800 block mb-1">❌ 错误认知</span>
                <p className="text-red-700">
                  误以为FADH₂的电子进入Complex I，或者Complex II是Complex I的下游。
                </p>
                <span className="font-bold text-emerald-800 block mt-2 mb-1">✔ 正确事实</span>
                <p className="text-emerald-700">
                  Complex I 和 Complex II 是并联的入口！它们独立把电子交予泛醌（CoQ）。Complex II完全不直接泵送质子。
                </p>
              </div>

              <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg">
                <span className="font-bold text-red-800 block mb-1">❌ 错误认知</span>
                <p className="text-red-700">
                  误以为 H⁺ 质子是合成 ATP 的化学反应原料。
                </p>
                <span className="font-bold text-emerald-800 block mt-2 mb-1">✔ 正确事实</span>
                <p className="text-emerald-700">
                  H⁺ 绝非 ATP 的反应原料！化学原料是基质中的 ADP 与无机磷酸 Pi。H⁺ 沿电化学梯度回流是驱动 ATP 合酶旋转做功、催化高能磷酸键合成的物理能量来源。
                </p>
              </div>

              <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg md:col-span-2">
                <span className="font-bold text-red-800 block mb-1">❌ 概念混淆：细胞呼吸 vs 氧化磷酸化</span>
                <p className="text-red-700">
                  把产生30–32 ATP的整个有氧细胞呼吸反应，误当做单纯氧化磷酸化本身的反应式。
                </p>
                <span className="font-bold text-emerald-800 block mt-2 mb-1">✔ 正确层级划分</span>
                <p className="text-emerald-700">
                  完整的有氧细胞呼吸（Cellular Respiration）包含：细胞质糖酵解、基质丙酮酸氧化脱氢、基质TCA循环，以及内膜上的氧化磷酸化（电子传递链 + 质子动力势 + ATP合酶）。氧化磷酸化是最终利用高能电子与质子动力势催化大量合成ATP的专门环节。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            关闭图解
          </button>
        </div>
      </div>
    </div>
  );
};
