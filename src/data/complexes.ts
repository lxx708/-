import { BiologicalEntity, InhibitorInfo } from '../types/biology';

export const BIOLOGICAL_ENTITIES: Record<string, BiologicalEntity> = {
  outer_membrane: {
    id: 'outer_membrane',
    name: '线粒体外膜',
    nameEn: 'Outer Mitochondrial Membrane',
    location: '线粒体最外层脂双层膜',
    function: '由磷脂双分子层与大量孔蛋白（Porin/VDAC）构成，对分子量小于5000 Da的分子（如丙酮酸、无机离子）自由通透，维持外环境与膜间隙的基本连通。',
    stoichiometry: '膜蛋白与脂质质量比约为 1:1',
    clinicalOrInhibitorNote: '外膜含有单胺氧化酶（MAO）等特征酶，是神经系统药物的重要靶标。'
  },
  intermembrane_space: {
    id: 'intermembrane_space',
    name: '膜间隙 (IMS)',
    nameEn: 'Intermembrane Space',
    location: '线粒体外膜与内膜之间的狭窄腔隙',
    function: '电子传递链将H⁺从基质泵入此空间，在此形成高质子浓度（pH约7.0）和正电位，建立驱动ATP合酶工作的跨内膜质子动力势（PMF）。',
    stoichiometry: 'pH ≈ 7.0 (较基质低约0.8~1.0个pH单位)',
    clinicalOrInhibitorNote: '膜间隙还储存细胞色素c；当细胞启动凋亡程序时，细胞色素c释放入胞质激活Caspase级联。'
  },
  inner_membrane: {
    id: 'inner_membrane',
    name: '线粒体内膜',
    nameEn: 'Inner Mitochondrial Membrane (IMM)',
    location: '线粒体深层磷脂双分子层结构',
    function: '高度不透水和质子，富含特征性心磷脂（Cardiolipin）。镶嵌着完整的电子传递链复合体I~IV和ATP合酶，是氧化磷酸化能量偶联的物理绝缘载体。',
    bulletPoints: [
      '对H⁺等离子严格不透，确保质子梯度的储存',
      '富含心磷脂（维持膜结构与蛋白质超复合体）',
      '蛋白质/脂质质量比高达 3:1'
    ],
    stoichiometry: '蛋白质/脂质比高达 3:1 (约75%为功能蛋白质)',
    clinicalOrInhibitorNote: '心磷脂缺失会导致Barth综合征，内膜结构解体并伴随心肌病变。'
  },
  cristae: {
    id: 'cristae',
    name: '线粒体嵴 (Cristae)',
    nameEn: 'Mitochondrial Cristae',
    location: '线粒体内膜向基质折叠形成的深层凹陷与嵴状褶皱',
    function: '属于线粒体内膜的特征性形态学结构，内陷极大地扩充了内膜的有效表面积；电子传递链复合体与ATP合酶密集镶嵌于嵴膜上，为有氧呼吸提供广阔的能量转换平台。',
    bulletPoints: [
      '属于线粒体内膜向基质方向的折叠内陷结构',
      '极大地增加了内膜的有效表面积（提高产能效率）',
      'ETC蛋白质复合体与ATP合酶二聚体密集排布于嵴膜表面',
      '嵴密度与细胞耗能水平呈正相关（如心肌嵴致密）'
    ],
    stoichiometry: '表面积可达外膜面积的3~5倍以上',
    clinicalOrInhibitorNote: 'ATP合酶二聚体在嵴顶端弯曲形成特征性V形夹角，直接决定了嵴的弯曲度和形态稳定。'
  },
  matrix: {
    id: 'matrix',
    name: '线粒体基质',
    nameEn: 'Mitochondrial Matrix',
    location: '内膜包裹的核心凝胶状水相空间',
    function: '包含数百种酶，进行三羧酸循环（TCA）、脂肪酸β-氧化、丙酮酸脱氢、尿素循环初期及线粒体DNA复制与转录翻译。维持相对碱性环境（pH ≈ 7.8~8.0）。',
    bulletPoints: [
      '维持偏碱性环境（pH ≈ 7.8~8.0，低H⁺浓度）',
      'TCA循环场所：彻底氧化乙酰-CoA生成CO₂',
      '生成还原型高能电子载体NADH和FADH₂',
      'ATP合酶催化头（F₁）在此催化合成并释放ATP'
    ],
    stoichiometry: '极高蛋白浓度（~500 mg/mL），呈近凝胶态',
    clinicalOrInhibitorNote: '线粒体基质拥有独立的环状双链mtDNA和70S线粒体核糖体。'
  },
  substrates: {
    id: 'substrates',
    name: '呼吸原料与乙酰CoA',
    nameEn: 'Substrates & Acetyl-CoA',
    location: '细胞质及线粒体基质',
    function: '葡萄糖在胞质经糖酵解生成丙酮酸；脂肪水解生成脂肪酸。二者进入基质分别转化为活化二碳单位乙酰辅酶A（Acetyl-CoA），作为进入有氧氧化的共同枢纽。',
    bulletPoints: [
      '葡萄糖在细胞质经糖酵解转化为丙酮酸',
      '脂肪水解生成脂肪酸并进入线粒体',
      '汇聚生成高能活化二碳底物乙酰辅酶A（Acetyl-CoA）',
      '为基质中的TCA循环提供起始底物'
    ],
    chemicalFormula: 'CH₃-CO-S-CoA',
    prostheticGroups: '硫酯键（高能水解基团）',
    clinicalOrInhibitorNote: '二甲双胍（Metformin）通过调节AMPK影响肝脏糖异生与线粒体底物利用。'
  },
  tca_cycle: {
    id: 'tca_cycle',
    name: '三羧酸循环 (TCA)',
    nameEn: 'TCA / Krebs / Citric Acid Cycle',
    location: '线粒体基质水相溶液中',
    function: '将乙酰CoA的两个碳原子氧化脱羧生成2个CO₂，同时脱下4对氢，生成3个NADH、1个FADH₂和1个GTP（可转为ATP），将化学能传递给高能电子载体。',
    bulletPoints: [
      '氧化分解乙酰辅酶A（Acetyl-CoA）',
      '生成高能电子载体：NADH 与 FADH₂',
      '完全脱羧并向外释放 CO₂',
      '为电子传递链源源不断提供高能电子'
    ],
    stoichiometry: '每轮循环：1 Acetyl-CoA → 2 CO₂ + 3 NADH + 1 FADH₂ + 1 GTP',
    prostheticGroups: 'NAD⁺, FAD, 硫辛酸, TPP, 辅酶A',
    clinicalOrInhibitorNote: '氟乙酸（Fluoroacetate）经合成氟柠檬酸竞争性抑制乌头酸酶，阻断TCA循环，为剧毒鼠药。'
  },
  complex_i: {
    id: 'complex_i',
    name: '复合体 I (NADH 脱氢酶)',
    nameEn: 'Complex I / NADH Dehydrogenase',
    location: '内膜跨膜不对称L型巨大蛋白复合体',
    function: '催化NADH氧化为NAD⁺，将2个高能电子经FMN和铁硫簇传递给膜内的辅酶Q（CoQ）。同时利用自由能将4个H⁺从基质泵入膜间隙，参与建立质子动力势。',
    bulletPoints: [
      '接收 NADH 提供的电子 (NADH → NAD⁺ + H⁺ + 2e⁻)',
      '将高能电子依次传递给辅酶 Q (CoQ)',
      '跨内膜主动泵出 4 个 H⁺ 到膜间隙',
      '建立并维持跨膜质子动力势 (PMF)'
    ],
    stoichiometry: 'NADH + CoQ + 5H⁺(基质) → NAD⁺ + CoQH₂ + 4H⁺(膜间隙)',
    prostheticGroups: 'FMN (黄素单核苷酸), [2Fe-2S] 与 [4Fe-4S] 铁硫中心',
    clinicalOrInhibitorNote: '特异性抑制剂：鱼藤酮（Rotenone）、安密妥（Amytal）。阻断后NADH无法脱氢，质子梯度停止建立。'
  },
  complex_ii: {
    id: 'complex_ii',
    name: '复合体 II (琥珀酸脱氢酶)',
    nameEn: 'Complex II / Succinate Dehydrogenase',
    location: '内膜基质侧外周及跨膜锚定蛋白',
    function: '直接作为TCA循环中琥珀酸氧化为延胡索酸的酶，将脱下的电子由FAD和铁硫簇传递给CoQ。特别注意：其氧化还原电位差不足以克服质子跨膜阻力，不直接泵出H⁺！',
    bulletPoints: [
      '接收来自 FADH₂ 的电子 (FADH₂ → FAD + 2e⁻)',
      '将电子在膜内传给辅酶 Q (CoQ)',
      '不直接泵出 H⁺ (0 H⁺ pumped across membrane)',
      '与Complex I是并联关系，共同汇集电子于CoQ'
    ],
    stoichiometry: 'Succinate + CoQ → Fumarate + CoQH₂ (0 H⁺ 泵送)',
    prostheticGroups: '共价结合的FAD, 3个铁硫簇 ([2Fe-2S], [4Fe-4S], [3Fe-4S]), 血红素b',
    clinicalOrInhibitorNote: '竞争性抑制剂：丙二酸（Malonate）。复合体II基因突变与副神经节瘤和嗜铬细胞瘤相关。'
  },
  coq: {
    id: 'coq',
    name: '辅酶 Q (泛醌 / CoQ / Q)',
    nameEn: 'Coenzyme Q / Ubiquinone',
    location: '内膜脂质双层疏水核心自由侧向扩散',
    function: '具有长聚异戊二烯疏水尾链的脂溶性小分子醌。作为可移动电子中转站，接收来自复合体I和复合体II的电子与质子（还原为CoQH₂/泛醇），在膜内穿梭移至复合体III。',
    bulletPoints: [
      '内膜脂双层疏水核心中的脂溶性移动载体',
      '汇集来自复合体 I 和复合体 II 的电子与质子',
      '还原为泛醇 (QH₂) 后侧向扩散至复合体 III',
      '连接双电子转移途径与单电子细胞色素途径'
    ],
    stoichiometry: '携带2个电子与2个质子 (Q + 2e⁻ + 2H⁺ ⇌ QH₂)',
    prostheticGroups: '苯醌环功能基团',
    clinicalOrInhibitorNote: '他汀类药物抑制HMG-CoA还原酶同时会减少内源性CoQ10合成，因此临床上常配合补充辅酶Q10。'
  },
  complex_iii: {
    id: 'complex_iii',
    name: '复合体 III (细胞色素 bc₁ 复合物)',
    nameEn: 'Complex III / Cytochrome bc₁ Complex',
    location: '内膜跨膜二聚体复合体',
    function: '通过著名的“Q循环”（Q cycle）机制，将电子从还原型CoQH₂传递给膜间隙侧的水溶性载体细胞色素c。同时每转移一对电子，向膜间隙释放4个H⁺。',
    bulletPoints: [
      '接收来自还原型辅酶 Q (CoQH₂) 的电子',
      '将单电子转交至膜间隙侧的细胞色素 c (Cyt c)',
      '通过 Q 循环机制跨内膜泵出 4 个 H⁺ 到膜间隙',
      '进一步强化内膜两侧的电化学质子势能'
    ],
    stoichiometry: 'CoQH₂ + 2Cyt c(Fe³⁺) + 2H⁺(基质) → CoQ + 2Cyt c(Fe²⁺) + 4H⁺(膜间隙)',
    prostheticGroups: '血红素bL, 血红素bH, Rieske铁硫蛋白 [2Fe-2S], 血红素c₁',
    clinicalOrInhibitorNote: '特异性抑制剂：抗霉素A（Antimycin A, 阻断Qi位点）、粘噻唑菌素（Myxothiazol, 阻断Qo位点）。'
  },
  cytochrome_c: {
    id: 'cytochrome_c',
    name: '细胞色素 c (Cyt c)',
    nameEn: 'Cytochrome c (Soluble IMS Carrier)',
    location: '线粒体膜间隙 (Intermembrane Space, IMS) 中游离/外周水溶性载体',
    function: '位于膜间隙中的水溶性单电子载体。在复合体III和复合体IV之间往返穿梭，将单电子逐一从复合体III转交至复合体IV。',
    bulletPoints: [
      '位于线粒体膜间隙 (IMS) 中的可溶性单电子载体',
      '在复合体 III 和复合体 IV 之间游弋穿梭传递电子',
      '从复合体 III 接收电子被还原 (Fe³⁺ → Fe²⁺)',
      '到达复合体 IV 释放电子被氧化 (Fe²⁺ → Fe³⁺)'
    ],
    stoichiometry: '单电子可逆氧化还原: Cyt c(Fe²⁺) ⇌ Cyt c(Fe³⁺) + e⁻',
    prostheticGroups: 'c型共价结合血红素铁中心',
    clinicalOrInhibitorNote: '进化上极度保守的小分子蛋白；在细胞凋亡信号触发时，Cyt c 从膜间隙释放入胞质激活 Caspase 级联反应。'
  },
  complex_iv: {
    id: 'complex_iv',
    name: '复合体 IV (细胞色素 c 氧化酶)',
    nameEn: 'Complex IV / Cytochrome c Oxidase',
    location: '内膜跨膜多亚基复合体',
    function: '终极电子转运复合体。收集来自4个Cyt c的电子，传递给双核铜与血红素铁催化中心，将最终电子受体O₂还原为2个无毒害的水分子（H₂O），同时将2个H⁺泵入膜间隙。',
    bulletPoints: [
      '接收来自细胞色素 c (Cyt c) 的电子',
      '分子氧 (O₂) 作为电子传递链的最终电子受体',
      '催化 4e⁻ + 4H⁺ + O₂ 生成 2 分子无害的 H₂O',
      '跨膜泵出 2 个 H⁺ 到膜间隙 (每对电子净泵2H⁺)'
    ],
    stoichiometry: '4Cyt c(Fe²⁺) + O₂ + 8H⁺(基质) → 4Cyt c(Fe³⁺) + 2H₂O + 4H⁺(膜间隙) (每对电子净泵出2H⁺)',
    prostheticGroups: 'CuA双核铜中心, 血红素a, 血红素a₃, CuB单核铜',
    clinicalOrInhibitorNote: '剧毒抑制剂：氰化物（CN⁻）、一氧化碳（CO）、叠氮化物（N₃⁻）。它们与血红素a₃紧密结合阻断氧气还原，导致细胞急性窒息死亡。'
  },
  oxygen_reduction: {
    id: 'oxygen_reduction',
    name: '氧气还原与水分子生成',
    nameEn: 'Oxygen Reduction & Water Formation',
    location: '复合体 IV 基质催化中心',
    function: '分子氧（O₂）是呼吸链的终极电子受体。它具有极高的标准还原电位（E° = +0.815 V），结合电子与基质质子生成水，是维持电子单向顺畅流动的最终动力。',
    bulletPoints: [
      'O₂ 是电子传递链的终极电子受体（而非中间载体）',
      '与 4 个电子和 4 个基质 H⁺ 结合生成 2 个 H₂O',
      '氧气绝不直接产生 ATP，必须通过质子动力势偶联',
      '保障呼吸链氧化还原电位梯级单向顺畅进行'
    ],
    chemicalFormula: '½ O₂ + 2H⁺ + 2e⁻ → H₂O',
    clinicalOrInhibitorNote: '如果氧气还原不彻底，会产生过氧化物和超氧自由基（ROS），引起氧化应激损伤。'
  },
  atp_synthase: {
    id: 'atp_synthase',
    name: 'ATP 合酶 (F₀F₁-ATPase)',
    nameEn: 'ATP Synthase / Complex V',
    location: '内膜/嵴膜：F₀镶嵌在内膜中，F₁催化头部突向基质',
    function: '精密的纳米分子马达。膜间隙高浓度H⁺顺电化学梯度沿F₀通道回流基质，释放势能驱动c环与γ轴旋转；不对称旋转迫使基质侧F₁（α₃β₃）发生构象变构，催化ADP与Pi生成ATP。',
    bulletPoints: [
      '膜内部分 F₀：质子回流通路，驱动 c 环转子高速旋转',
      '基质催化部分 F₁：由 α₃β₃ 头部构成，突向基质侧',
      'H⁺ 顺电化学梯度自膜间隙经 F₀ 回流至基质',
      '机械旋转能驱动 F₁ 催化构象改变：ADP + Pi → ATP'
    ],
    stoichiometry: '每旋转一整圈（360°）消耗约8~10个H⁺，在基质合成并释放3个ATP',
    prostheticGroups: 'F₀结构域（a亚基质子半通道、c环转子）与 F₁催化结构域（α₃β₃γδε）',
    clinicalOrInhibitorNote: '寡霉素（Oligomycin）特异性结合并堵塞F₀质子通道，直接抑制质子回流和ATP生成。'
  },
  proton_gradient: {
    id: 'proton_gradient',
    name: '跨膜质子动力势 (PMF)',
    nameEn: 'Proton-Motive Force (PMF)',
    location: '跨线粒体内膜两侧',
    function: '由复合体I、III、IV主动泵出H⁺建立。内膜两侧的化学pH浓度差（ΔpH）与跨膜电位差（ΔΨ，外正内负）的代数和，构成了驱动ATP合成的核心蓄水池。',
    bulletPoints: [
      '化学势：H⁺浓度差 (ΔpH ≈ 0.8~1.0，膜间隙酸性/基质偏碱性)',
      '电学势：跨膜电位差 (ΔΨ ≈ 160~180 mV，外正内负)',
      '质子动力势 PMF = ΔΨ - 59·ΔpH ≈ 180~220 mV',
      '作为能量转换的统一中间体，驱动质子回流合成ATP'
    ],
    clinicalOrInhibitorNote: '解偶联剂（如2,4-二硝基苯酚DNP、UCP-1解偶联蛋白）使内膜通透H⁺，质子绕过ATP合酶漏回基质，质子梯度消失，能量转为热能散失。'
  },
  atp_generation: {
    id: 'atp_generation',
    name: 'ATP (三磷酸腺苷) 合成与输出',
    nameEn: 'ATP Synthesis & Translocation',
    location: '线粒体基质侧并输出至细胞质',
    function: '细胞生命活动的“能量通用货币”。生成的ATP随后由内膜上的腺苷酸转运蛋白（ANT）与细胞质中的ADP进行1:1交换转运，源源不断为肌肉收缩、神经传导和生物合成供能。',
    bulletPoints: [
      '在基质侧由 ADP + Pi 脱水缩合生成高能磷酸键',
      '细胞的能量通用货币，直接供给生命活动做功',
      '经内膜腺苷酸转运蛋白（ANT）输出至细胞质',
      '每分子葡萄糖在有氧呼吸中整体能量收支约为 30~32 ATP'
    ],
    chemicalFormula: 'C₁₀H₁₆N₅O₁₃P₃',
    clinicalOrInhibitorNote: '苍术苷（Atractyloside）与邦克酸（Bongkrekic acid）能抑制ANT转运蛋白，阻止ATP向细胞质运送。'
  }
};

export const INHIBITORS_DATA: InhibitorInfo[] = [
  {
    id: 'none',
    name: '正常生理状态',
    nameEn: 'Normal Physiological State',
    target: '无抑制剂',
    effect: '电子链顺畅流动，质子梯度维持稳定，ATP持续高效合成。',
    description: '标准状态下，各环节偶联紧密。电子顺电位差流动释放能量，质子泵持续建立质子势能，ATP合酶平稳旋转。'
  },
  {
    id: 'rotenone',
    name: '鱼藤酮 (Rotenone)',
    nameEn: 'Rotenone',
    target: '复合体 I (铁硫中心与CoQ结合位点)',
    effect: '阻断NADH的电子传递，阻止复合体I泵送质子。',
    description: '鱼藤酮是经典植物提取杀虫剂。加入后NADH无法被氧化（NADH堆积），来自NADH的电子流中断。但若补充琥珀酸（经复合体II），仍可部分维持呼吸。'
  },
  {
    id: 'antimycin_a',
    name: '抗霉素 A (Antimycin A)',
    nameEn: 'Antimycin A',
    target: '复合体 III (Qi 结合位点)',
    effect: '完全切断电子向细胞色素c的传递，呼吸链彻底堵塞。',
    description: '抑制Q循环中电子回流至泛醌。使复合体I、II以及CoQ全部处于过度还原状态，复合体IV处于完全氧化状态，氧气消耗骤降。'
  },
  {
    id: 'cyanide',
    name: '氰化物 (Cyanide, CN⁻)',
    nameEn: 'Cyanide (CN⁻)',
    target: '复合体 IV (血红素 a₃-CuB 催化位点)',
    effect: '阻断电子传递给终极受体O₂，呼吸作用迅速停止。',
    description: 'CN⁻与Fe³⁺-heme a₃高亲和力结合，使电子无法传递给氧气。电子传递链全面淤积停滞，质子梯度耗尽，ATP合成归零，引发急性细胞窒息死亡。'
  },
  {
    id: 'oligomycin',
    name: '寡霉素 (Oligomycin)',
    nameEn: 'Oligomycin',
    target: 'ATP合酶 F₀ 质子通道',
    effect: '直接堵塞质子回流通道，ATP合酶停转；由于质子无法释放，膜间隙质子超常积累，反向抑制电子链。',
    description: '寡霉素与F₀的c亚基结合阻断质子导流。不仅直接阻死ATP合成，由于质子梯度的反向背压剧增，最终导致电子传递速率也大幅减慢。'
  },
  {
    id: 'dnp',
    name: '解偶联剂 (DNP, 2,4-二硝基苯酚)',
    nameEn: '2,4-Dinitrophenol (DNP Uncoupler)',
    target: '线粒体内膜脂双层',
    effect: '作为脂溶性质子载体，将H⁺直接运回基质，短路消除质子梯度！',
    description: 'DNP在酸性膜间隙结合H⁺，扩散穿过内膜在较碱性的基质释放H⁺。质子短路泄漏使得质子梯度崩溃，ATP合成归零；但电子链为维持梯度而疯狂耗氧运转，能量全部转化为大量高热。'
  }
];
