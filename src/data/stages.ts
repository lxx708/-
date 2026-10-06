import { StageInfo } from '../types/biology';

export const STAGES_DATA: StageInfo[] = [
  {
    id: 1,
    numberStr: '01',
    title: '原料与乙酰CoA',
    titleEn: 'Substrates & Acetyl-CoA',
    shortDesc: '细胞质中的葡萄糖经糖酵解转化为丙酮酸；脂肪经水解产生脂肪酸。两者分别在线粒体外膜转运后，在线粒体基质中生成乙酰CoA。',
    detailedExplanation: '葡萄糖在细胞质中经糖酵解生成丙酮酸，脂肪水解生成脂肪酸。它们穿过线粒体外膜和内膜进入线粒体基质，分别经过丙酮酸脱氢酶复合体与脂肪酸β-氧化，最终汇聚为细胞呼吸的核心底物——乙酰辅酶A（Acetyl-CoA）。',
    biologicalSignificance: '实现了糖类与脂质代谢途径的统一汇聚，将大分子营养物的化学潜能集中到乙酰CoA中，为后续基质中的彻底氧化裂解做好准备。',
    nextStageHint: '乙酰CoA即将进入线粒体基质的TCA循环，在酶促反应中逐步脱羧并转移高能电子至电子载体。',
    chemicalEquation: 'Pyruvate + CoA + NAD⁺ → Acetyl-CoA + CO₂ + NADH + H⁺',
    keyMolecules: ['葡萄糖 / Glucose', '脂肪酸 / Fatty Acids', '丙酮酸 / Pyruvate', '乙酰CoA / Acetyl-CoA']
  },
  {
    id: 2,
    numberStr: '02',
    title: 'TCA循环产生高能电子载体',
    titleEn: 'TCA Cycle & Electron Carriers',
    shortDesc: '乙酰CoA在线粒体基质中进入TCA循环，两碳单位被彻底氧化为CO₂，同时生成大量高能电子载体NADH和FADH₂。',
    detailedExplanation: '在线粒体基质中，乙酰CoA（2C）与草酰乙酸（4C）缩合为柠檬酸（6C），经过一系列环状脱氢和脱羧反应，碳架被彻底氧化并释放CO₂。脱下的高能电子由辅酶NAD⁺和FAD接收，生成NADH与FADH₂。',
    biologicalSignificance: '有机碳骨架被完全分解释放CO₂，储存在碳氢键中的化学能量以高能电子的形式暂时捕获在还原型辅酶中。',
    nextStageHint: '高能电子载体NADH与FADH₂即将离开基质溶液，向线粒体内膜上的呼吸链复合体传递电子。',
    chemicalEquation: 'Acetyl-CoA + 3NAD⁺ + FAD + GDP + Pi + 2H₂O → 2CO₂ + 3NADH + FADH₂ + GTP + CoA',
    keyMolecules: ['乙酰CoA', 'NADH', 'FADH₂', 'CO₂ (释放)']
  },
  {
    id: 3,
    numberStr: '03',
    title: '电子传递链',
    titleEn: 'Electron Transport Chain (ETC)',
    shortDesc: '电子从NADH和FADH₂进入电子传递链，经一系列氧化还原反应逐级传递，并释放自由能。释放的自由能被用于建立跨内膜的质子动力势。',
    detailedExplanation: '电子从NADH（经复合体I）和FADH₂（经复合体II）进入电子传递链，经一系列氧化还原反应逐级传递至辅酶Q（CoQ）、复合体III、膜间隙可溶性电子载体细胞色素c（Cyt c）、复合体IV，并最终传递给终极电子受体O₂生成H₂O。在此过程中释放的自由能，被偶联用于跨内膜泵送质子以建立质子动力势。',
    biologicalSignificance: '氧化还原反应的多级梯级传递避免了能量瞬时以高热爆散，释放的化学自由能被高效转化为跨内膜势能。',
    nextStageHint: '电子传递释放的自由能，驱动复合体I、III、IV将H⁺从基质泵入膜间隙建立质子动力势。',
    chemicalEquation: 'O₂ + 4e⁻ + 4H⁺(基质) → 2H₂O',
    keyMolecules: ['Complex I', 'Complex II', 'CoQ', 'Complex III', 'Cyt c (膜间隙载体)', 'Complex IV', 'O₂ → H₂O']
  },
  {
    id: 4,
    numberStr: '04',
    title: '电子传递驱动质子泵',
    titleEn: 'Proton Pumping & Electrochemical Gradient',
    shortDesc: '呼吸链将H⁺从基质泵入膜间隙建立质子动力势：H⁺浓度差 + 膜电位差 → 质子动力势。',
    detailedExplanation: '当电子流经复合体I、III、IV时引起构象改变，驱动质子主动逆向泵送：每对来自NADH的电子促使约10个H⁺从基质跨越内膜进入膜间隙（复合体II不泵H⁺）。膜间隙中H⁺急剧聚集，在内膜两侧形成H⁺浓度差与膜电位差，两者共同构成了驱动ATP合成的巨大物理势能——质子动力势（Proton-Motive Force, PMF）。',
    biologicalSignificance: '呼吸链释放的氧化还原自由能，精确转化为储存在内膜两侧的跨膜电化学势能（化学浓度差 + 电位差 → 质子动力势）。',
    nextStageHint: '膜间隙中积累的高势能H⁺，成为下一阶段驱动ATP合酶工作的直接能量来源。',
    chemicalEquation: 'H⁺浓度差 + 膜电位差 → 质子动力势 (PMF)',
    keyMolecules: ['H⁺ 质子流', '膜间隙高[H⁺]', '基质低[H⁺]', '质子动力势 (PMF = ΔΨ + ΔpH)']
  },
  {
    id: 5,
    numberStr: '05',
    title: 'H+驱动ATP合成',
    titleEn: 'Proton-Motive ATP Synthesis',
    shortDesc: 'H⁺沿电化学梯度通过ATP synthase回流，为ATP合成提供驱动力。强调：H⁺不是ATP的原料，而是驱动ATP合成的能量来源。',
    detailedExplanation: '质子沿电化学梯度通过嵌入内膜的ATP合酶（ATP synthase）F₀通道回流基质，释放的能量驱动F₀转子旋转，带动中轴γ旋转并引起基质侧F₁催化头部（α₃β₃）构象循环变化，催化ADP + Pi → ATP。必须强调：H⁺不是ATP的原料，而是驱动ATP合成的能量来源；基质中的ADP与无机磷酸Pi才是化学合成原料。',
    biologicalSignificance: '化学渗透学说（Chemiosmotic Hypothesis）的核心：质子动力势势能回流 → F₀机械旋转能 → F₁催化ADP与Pi生成高能磷酸键。',
    nextStageHint: '现在可以观察营养物分解、TCA循环、电子链、质子动力势与ATP合酶协同运转的细胞呼吸全景。',
    chemicalEquation: 'ADP + Pi → ATP',
    keyMolecules: ['ATP合酶 (膜内F₀ / 基质侧F₁)', 'ADP + Pi', 'ATP 分子', 'H⁺驱动力 (非原料)']
  },
  {
    id: 6,
    numberStr: '06',
    title: '完整细胞呼吸过程',
    titleEn: 'Integrated Cellular Respiration',
    shortDesc: '营养物质分解、TCA循环、电子传递链、质子动力势与ATP合酶协同运转，构成了真核细胞生命活动的核心动力。',
    detailedExplanation: '完整有氧细胞呼吸全景：从胞质葡萄糖糖酵解与脂质分解开始，丙酮酸与脂肪酸进入基质汇聚为乙酰CoA；经基质TCA循环彻底脱氢脱羧释放CO₂，生成NADH与FADH₂；高能电子进入内膜电子链（I/II → CoQ → III → Cyt c → IV），最终传递给终极受体O₂生成H₂O；复合体I、III、IV偶联泵出H⁺建立跨内膜质子动力势，驱动ATP合酶大量生成ATP。每分子葡萄糖在真核细胞中通常可产生约30–32 ATP，具体数值取决于电子穿梭机制及代谢条件。',
    biologicalSignificance: '这是有氧细胞呼吸的整体能量收支概览，而非单纯氧化磷酸化本身的局部反应式。展现了化学能→高能电子→质子势能→机械旋转→ATP的多级转化。',
    nextStageHint: '可点击控制栏重播、调整播放速度、自由切换阶段，或在画面中点击各个复合体深入研读其分子机制。',
    chemicalEquation: 'Glucose + 6O₂ → 6CO₂ + 6H₂O + ~30–32 ATP',
    keyMolecules: ['整体能量收支概览', '~30–32 ATP (依代谢条件而异)', 'O₂ 最终电子受体', '化学渗透偶联']
  }
];
