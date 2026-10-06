import React, { useEffect, useState, useRef } from 'react';
import { StageId, SelectedEntityId, InhibitorInfo } from '../types/biology';
import { BIOLOGICAL_ENTITIES } from '../data/complexes';
import { Info } from 'lucide-react';

interface MitochondriaStageProps {
  currentStage: StageId;
  isPlaying: boolean;
  playbackSpeed: number;
  showElectronFlow: boolean;
  showProtonFlow: boolean;
  showAtpGeneration: boolean;
  activeInhibitor: InhibitorInfo;
  selectedEntityId: SelectedEntityId | null;
  onSelectEntity: (id: SelectedEntityId) => void;
  protonGradientLevel: 'low' | 'medium' | 'high';
}

export const MitochondriaStage: React.FC<MitochondriaStageProps> = ({
  currentStage,
  isPlaying,
  playbackSpeed,
  showElectronFlow,
  showProtonFlow,
  showAtpGeneration,
  activeInhibitor,
  selectedEntityId,
  onSelectEntity,
  protonGradientLevel
}) => {
  // Continuous simulation time for animations
  const [time, setTime] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTimestamp = performance.now();
    const loop = (timestamp: number) => {
      const dt = Math.min(Math.max(0, (timestamp - lastTimestamp) / 1000), 0.1);
      lastTimestamp = timestamp;

      if (isPlaying) {
        const speed = Number.isFinite(playbackSpeed) && playbackSpeed > 0 ? playbackSpeed : 1.0;
        setTime((prev) => {
          const val = (Number.isFinite(prev) ? prev : 0) + dt * speed;
          return val >= 0 ? val : 0;
        });
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // Derived animation phases
  const rotorAngle = (time * 130) % 360;
  const tcaAngle = (time * 38) % 360;

  // Inhibitor blocking flags
  const isRotenone = activeInhibitor?.id === 'rotenone';
  const isAntimycin = activeInhibitor?.id === 'antimycin_a';
  const isCyanide = activeInhibitor?.id === 'cyanide';
  const isOligomycin = activeInhibitor?.id === 'oligomycin';
  const isDnp = activeInhibitor?.id === 'dnp';

  // Electron & ATP blockage checks
  const eBlockedAtI = isRotenone;
  const eBlockedAtIII = isAntimycin;
  const eBlockedAtIV = isCyanide;
  const atpBlocked = isOligomycin || (isDnp && currentStage !== 1 && currentStage !== 2);

  // Helper for highlight styling
  const isHighlighted = (id: SelectedEntityId) => selectedEntityId === id;

  // Stage 01–06 Visual Focusing: Unified opacity and focus weights
  const getFocusOpacity = (moduleName: 'substrates' | 'tca' | 'etc' | 'protons' | 'atpSynthase' | 'atpGeneration') => {
    if (currentStage === 6) return 1.0; // Stage 6 restores all modules to full clarity!
    switch (currentStage) {
      case 1:
        return moduleName === 'substrates' ? 1.0 : 0.32;
      case 2:
        return moduleName === 'tca' ? 1.0 : moduleName === 'substrates' ? 0.45 : 0.32;
      case 3:
        return moduleName === 'etc' ? 1.0 : 0.32;
      case 4:
        return (moduleName === 'etc' || moduleName === 'protons') ? 1.0 : 0.32;
      case 5:
        return (moduleName === 'atpSynthase' || moduleName === 'atpGeneration' || moduleName === 'protons') ? 1.0 : 0.32;
      default:
        return 1.0;
    }
  };

  // Dynamic shuttling position of Cytochrome c in the Intermembrane Space (IMS)
  // Cyt c shuttles between Complex III (x ~ 575) and Complex IV (x ~ 665)
  const cytCOsc = Math.sin(time * 3);
  const cytCX = 580 + (cytCOsc * 0.5 + 0.5) * 85;
  const cytCY = 205 + Math.cos(time * 3) * 5;
  const cytCCarryingE = cytCOsc > -0.2; // Carrying electron when moving towards Complex IV

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-100/70 overflow-hidden select-none">
      {/* Visual Canvas Container */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center p-2 sm:p-4">
        <svg
          viewBox="0 0 1200 780"
          className="w-full h-full max-h-[calc(100vh-140px)] object-contain filter drop-shadow-sm transition-all"
        >
          <defs>
            {/* Gradients for compartments */}
            <linearGradient id="cytosolGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>

            <linearGradient id="imsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.55" />
            </linearGradient>

            <linearGradient id="matrixGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fefce8" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#f0fdf4" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#fbfdf9" />
            </linearGradient>

            {/* Protein complex gradients */}
            <linearGradient id="complexIGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>

            <linearGradient id="complexIIGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>

            <linearGradient id="coqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <linearGradient id="complexIIIGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>

            <linearGradient id="cytCGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>

            <linearGradient id="complexIVGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            <linearGradient id="atpSynthaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            {/* Glowing filters for electrons & protons */}
            <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="amberGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="goldenGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ======================================================== */}
          {/* 1. BACKGROUND COMPARTMENTS                               */}
          {/* ======================================================== */}

          {/* Cytosol (Top) */}
          <rect x="20" y="20" width="1160" height="95" rx="12" fill="url(#cytosolGrad)" stroke="#e2e8f0" strokeWidth="1.5" />
          <text x="45" y="48" className="text-[13px] font-semibold fill-slate-500 tracking-wider">
            细胞质基质 · Cytosol (线粒体外)
          </text>

          {/* Outer Mitochondrial Membrane (OMM) */}
          <g
            className="cursor-pointer transition-opacity hover:opacity-90"
            onClick={() => onSelectEntity('outer_membrane')}
          >
            <rect
              x="20"
              y="115"
              width="1160"
              height="28"
              rx="6"
              fill="#cbd5e1"
              stroke={isHighlighted('outer_membrane') ? '#0284c7' : '#94a3b8'}
              strokeWidth={isHighlighted('outer_membrane') ? 3 : 1.5}
            />
            {/* Porin protein channels in outer membrane */}
            {[140, 310, 480, 660, 830, 1000].map((px) => (
              <g key={px}>
                <rect x={px} y="117" width="24" height="24" rx="4" fill="#64748b" />
                <rect x={px + 6} y="119" width="12" height="20" rx="2" fill="#e2e8f0" />
                <text x={px + 12} y={132} textAnchor="middle" className="text-[8px] fill-slate-700 font-mono">孔</text>
              </g>
            ))}
            <text x="45" y="133" className="text-[11px] font-bold fill-slate-700">
              线粒体外膜 Outer Membrane (含通透孔蛋白 Porin/VDAC)
            </text>
          </g>

          {/* Intermembrane Space (IMS) */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectEntity('intermembrane_space')}
          >
            <rect
              x="20"
              y="143"
              width="1160"
              height="115"
              fill="url(#imsGrad)"
              stroke={isHighlighted('intermembrane_space') ? '#0284c7' : '#bae6fd'}
              strokeWidth={isHighlighted('intermembrane_space') ? 2.5 : 1}
            />
            <text x="45" y="170" className="text-[13px] font-semibold fill-sky-800 tracking-wide">
              膜间隙 · Intermembrane Space (IMS)
            </text>
            <text x="45" y="188" className="text-[11px] font-mono fill-sky-600">
              [H⁺] 高浓度蓄积区 · pH ≈ 7.0 · 外正内负电位差 (ΔΨ)
            </text>

            {/* In Stage 4/5/6: Visual indicator of positive charge in IMS */}
            {currentStage >= 4 && (
              <g className="font-mono font-bold text-[10px] fill-amber-700/80">
                <text x="280" y="170">+ + + + +</text>
                <text x="640" y="170">+ + + + +</text>
                <text x="1000" y="170">+ + + + +</text>
              </g>
            )}
          </g>

          {/* Inner Mitochondrial Membrane (IMM) with Distinct Cristae Folds */}
          <g className="cursor-pointer" onClick={() => onSelectEntity('inner_membrane')}>
            {/* Main Inner Membrane bilayer band with 2 distinct Cristae downward invaginations into Matrix */}
            <path
              d="M 20 258 
                 L 460 258 
                 Q 490 258, 500 275
                 L 515 315 
                 Q 525 335, 545 335 
                 Q 565 335, 575 315 
                 L 590 275 
                 Q 600 258, 630 258 
                 L 810 258 
                 Q 840 258, 850 278
                 L 865 320 
                 Q 880 345, 930 345 
                 Q 980 345, 995 320 
                 L 1010 278 
                 Q 1020 258, 1050 258 
                 L 1180 258 
                 L 1180 318 
                 L 1045 318 
                 L 990 380 
                 Q 930 405, 870 380 
                 L 815 318 
                 L 625 318 
                 L 570 375 
                 Q 545 390, 520 375 
                 L 465 318 
                 L 20 318 Z"
              fill="#94a3b8"
              fillOpacity="0.22"
              stroke={isHighlighted('inner_membrane') ? '#0284c7' : '#64748b'}
              strokeWidth={isHighlighted('inner_membrane') ? 3 : 2}
            />

            {/* Phospholipid head detail lines */}
            <path
              d="M 20 258 L 460 258 Q 490 258, 500 275 L 515 315 Q 525 335, 545 335 Q 565 335, 575 315 L 590 275 Q 600 258, 630 258 L 810 258 Q 840 258, 850 278 L 865 320 Q 880 345, 930 345 Q 980 345, 995 320 L 1010 278 Q 1020 258, 1050 258 L 1180 258"
              fill="none"
              stroke="#475569"
              strokeWidth="2.5"
              strokeDasharray="5,2"
            />
            <path
              d="M 20 318 L 465 318 L 520 375 Q 545 390, 570 375 L 625 318 L 815 318 L 870 380 Q 930 405, 990 380 L 1045 318 L 1180 318"
              fill="none"
              stroke="#475569"
              strokeWidth="2.5"
              strokeDasharray="5,2"
            />

            <text x="45" y="280" className="text-[12px] font-bold fill-slate-700">
              线粒体内膜 Inner Membrane (IMM)
            </text>
            <text x="45" y="298" className="text-[10px] fill-slate-500 font-mono">
              富含心磷脂 · 对H⁺严格不透 · 绝缘介质
            </text>
          </g>

          {/* Dedicated Cristae (线粒体嵴) Fold Marker & Highlight Area */}
          <g
            className="cursor-pointer group"
            onClick={() => onSelectEntity('cristae')}
            transform="translate(545, 335)"
          >
            <circle
              cx="0"
              cy="25"
              r="22"
              fill={isHighlighted('cristae') ? '#38bdf8' : '#e2e8f0'}
              fillOpacity={isHighlighted('cristae') ? 0.35 : 0.15}
              stroke={isHighlighted('cristae') ? '#0284c7' : '#64748b'}
              strokeWidth={isHighlighted('cristae') ? 2 : 1}
              strokeDasharray="4,2"
            />
            <line x1="0" y1="48" x2="0" y2="72" stroke="#0284c7" strokeWidth="1.2" />
            <circle cx="0" cy="48" r="2.5" fill="#0284c7" />

            <g transform="translate(0, 84)">
              <rect
                x="-65"
                y="-12"
                width="130"
                height="24"
                rx="5"
                fill="#ffffff"
                stroke={isHighlighted('cristae') ? '#0284c7' : '#94a3b8'}
                strokeWidth={isHighlighted('cristae') ? 1.8 : 1}
                filter="drop-shadow(0 1px 3px rgba(0,0,0,0.06))"
              />
              <text x="0" y="3.5" textAnchor="middle" className="text-[10px] font-bold fill-slate-800">
                线粒体嵴 · Cristae
              </text>
            </g>
          </g>

          {/* Mitochondrial Matrix (Bottom Region) */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectEntity('matrix')}
          >
            <rect
              x="20"
              y="325"
              width="1160"
              height="435"
              rx="12"
              fill="url(#matrixGrad)"
              stroke={isHighlighted('matrix') ? '#0284c7' : '#e2e8f0'}
              strokeWidth={isHighlighted('matrix') ? 2.5 : 1.5}
            />
            <text x="45" y="360" className="text-[14px] font-bold fill-slate-700 tracking-wide">
              线粒体基质 · Mitochondrial Matrix
            </text>
            <text x="45" y="380" className="text-[11px] font-mono fill-slate-500">
              [H⁺] 低浓度区 · 偏碱性 pH ≈ 7.8 · 发生TCA循环与ATP脱离
            </text>

            {/* In Stage 4/5/6: Visual indicator of negative potential in Matrix */}
            {currentStage >= 4 && (
              <g className="font-mono font-bold text-[10px] fill-slate-400/80">
                <text x="280" y="342">- - - - -</text>
                <text x="640" y="342">- - - - -</text>
                <text x="1000" y="342">- - - - -</text>
              </g>
            )}
          </g>

          {/* ======================================================== */}
          {/* 2. STAGE 1: SUBSTRATES & ACETYL-CoA                      */}
          {/* ======================================================== */}
          <g
            className="transition-all duration-500 cursor-pointer"
            style={{ opacity: getFocusOpacity('substrates') }}
            onClick={() => onSelectEntity('substrates')}
          >
            {/* Substrates container box in Cytosol & Entry into Matrix */}
            <rect
              x="50"
              y="40"
              width="210"
              height="60"
              rx="8"
              fill="#ffffff"
              stroke={isHighlighted('substrates') ? '#0284c7' : '#cbd5e1'}
              strokeWidth={isHighlighted('substrates') ? 2 : 1}
              filter="drop-shadow(0 1px 2px rgba(0,0,0,0.05))"
            />
            {/* Glucose -> Pyruvate */}
            <text x="65" y="62" className="text-[11px] font-medium fill-slate-800">
              葡萄糖 Glucose
            </text>
            <text x="145" y="62" className="text-[10px] fill-slate-400">
              → 糖酵解 →
            </text>
            <text x="195" y="62" className="text-[11px] font-bold fill-amber-700">
              丙酮酸
            </text>

            {/* Fats -> Fatty acids */}
            <text x="65" y="86" className="text-[11px] font-medium fill-slate-800">
              脂肪 Fats
            </text>
            <text x="145" y="86" className="text-[10px] fill-slate-400">
              → 脂解水解 →
            </text>
            <text x="195" y="86" className="text-[11px] font-bold fill-amber-700">
              脂肪酸
            </text>

            {/* Arrow passing into Matrix */}
            <path
              d="M 155 100 L 155 425"
              fill="none"
              stroke="#d97706"
              strokeWidth="2"
              strokeDasharray="4,3"
            />
            <polygon points="155,432 150,422 160,422" fill="#d97706" />

            {/* Moving substrate particles through membrane */}
            {isPlaying && (currentStage === 1 || currentStage === 6) && (
              <>
                <circle
                  cx="155"
                  cy={100 + ((time * 60) % 320)}
                  r="5"
                  fill="#f59e0b"
                  filter="url(#amberGlow)"
                />
                <circle
                  cx="155"
                  cy={100 + (((time * 60) + 160) % 320)}
                  r="4"
                  fill="#fbbf24"
                />
              </>
            )}

            {/* Acetyl-CoA Convergence Node in Matrix */}
            <g transform="translate(100, 440)">
              <rect
                x="0"
                y="0"
                width="110"
                height="44"
                rx="6"
                fill="#fef3c7"
                stroke="#f59e0b"
                strokeWidth="1.5"
              />
              <text x="55" y="20" textAnchor="middle" className="text-[11px] font-bold fill-amber-900">
                乙酰辅酶 A
              </text>
              <text x="55" y="34" textAnchor="middle" className="text-[9px] font-mono fill-amber-700">
                Acetyl-CoA (2C)
              </text>
            </g>

            {/* Arrow from Acetyl-CoA to TCA Cycle */}
            <path
              d="M 210 462 Q 240 462, 260 495"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
            />
          </g>

          {/* ======================================================== */}
          {/* 3. STAGE 2: ENLARGED & REINFORCED TCA CYCLE IN MATRIX    */}
          {/* ======================================================== */}
          <g
            className="transition-all duration-500 cursor-pointer"
            style={{ opacity: getFocusOpacity('tca') }}
            onClick={() => onSelectEntity('tca_cycle')}
            transform="translate(350, 560)"
          >
            {/* Outer circular glow if highlighted */}
            {isHighlighted('tca_cycle') && (
              <circle cx="0" cy="0" r="102" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="6,4" />
            )}

            {/* Enlarged Main TCA Cycle Circular Track */}
            <circle
              cx="0"
              cy="0"
              r="84"
              fill="#ffffff"
              fillOpacity="0.88"
              stroke="#0ea5e9"
              strokeWidth="4"
              strokeDasharray="16,8"
              style={{
                transformOrigin: '0px 0px',
                transform: `rotate(${tcaAngle}deg)`,
                transition: 'transform 0.1s linear'
              }}
            />

            {/* Center Label Circle */}
            <circle cx="0" cy="0" r="56" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" />
            <text x="0" y="-12" textAnchor="middle" className="text-[13px] font-bold fill-sky-950">
              TCA 循环
            </text>
            <text x="0" y="4" textAnchor="middle" className="text-[10px] font-mono fill-sky-700">
              Citric Acid Cycle
            </text>
            <text x="0" y="20" textAnchor="middle" className="text-[9px] font-semibold fill-amber-700">
              生成高能载体 (每1 Acetyl-CoA):
            </text>
            <text x="0" y="33" textAnchor="middle" className="text-[9px] font-mono fill-purple-800 font-bold">
              3 NADH + 1 FADH₂
            </text>

            {/* Ring intermediate nodes */}
            <text x="-62" y="-45" textAnchor="middle" className="text-[8px] font-semibold fill-slate-500">柠檬酸(6C)</text>
            <text x="-65" y="45" textAnchor="middle" className="text-[8px] font-semibold fill-slate-500">α-酮戊二酸</text>
            <text x="55" y="45" textAnchor="middle" className="text-[8px] font-semibold fill-slate-500">琥珀酸(4C)</text>
            <text x="55" y="-45" textAnchor="middle" className="text-[8px] font-semibold fill-slate-500">草酰乙酸(4C)</text>

            {/* CO2 Release from TCA cycle */}
            <g transform="translate(-90, 35)">
              <rect x="-26" y="-12" width="52" height="24" rx="4" fill="#fee2e2" stroke="#f87171" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle" className="text-[10px] font-bold fill-red-800">
                2 CO₂ ↑
              </text>
              <path d="M 0 14 L 0 35" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
            </g>

            {/* Output 1: NADH specifically pointing to Complex I */}
            <g transform="translate(-72, -92)">
              <rect x="-44" y="-18" width="88" height="36" rx="6" fill="#fae8ff" stroke="#c084fc" strokeWidth="1.8" />
              <text x="0" y="-3" textAnchor="middle" className="text-[11px] font-bold fill-purple-950">
                3 NADH
              </text>
              <text x="0" y="9" textAnchor="middle" className="text-[7.5px] fill-purple-800 font-sans font-medium">
                每1 Acetyl-CoA
              </text>
              <text x="0" y="26" textAnchor="middle" className="text-[8px] font-mono fill-purple-700">
                → 至 Complex I
              </text>
            </g>

            {/* Output 2: FADH2 specifically pointing to Complex II */}
            <g transform="translate(72, -92)">
              <rect x="-44" y="-18" width="88" height="36" rx="6" fill="#ccfbf1" stroke="#2dd4bf" strokeWidth="1.8" />
              <text x="0" y="-3" textAnchor="middle" className="text-[11px] font-bold fill-teal-950">
                1 FADH₂
              </text>
              <text x="0" y="9" textAnchor="middle" className="text-[7.5px] fill-teal-800 font-sans font-medium">
                每1 Acetyl-CoA
              </text>
              <text x="0" y="26" textAnchor="middle" className="text-[8px] font-mono fill-teal-700">
                → 至 Complex II
              </text>
            </g>
          </g>

          {/* Delivery Conduits from TCA to ETC */}
          <path
            d="M 282 472 Q 215 440, 205 385"
            fill="none"
            stroke="#c084fc"
            strokeWidth="2.5"
            strokeDasharray="4,3"
            style={{ opacity: Math.max(getFocusOpacity('tca'), getFocusOpacity('etc')) }}
          />
          <polygon points="205,380 200,390 210,390" fill="#c084fc" style={{ opacity: Math.max(getFocusOpacity('tca'), getFocusOpacity('etc')) }} />

          <path
            d="M 418 472 Q 365 440, 345 375"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="2.5"
            strokeDasharray="4,3"
            style={{ opacity: Math.max(getFocusOpacity('tca'), getFocusOpacity('etc')) }}
          />
          <polygon points="345,370 340,380 350,380" fill="#2dd4bf" style={{ opacity: Math.max(getFocusOpacity('tca'), getFocusOpacity('etc')) }} />

          {/* ======================================================== */}
          {/* 4. INNER MEMBRANE ELECTRON TRANSPORT CHAIN (ETC)         */}
          {/* Focus on Stage 03, but present with proper weights       */}
          {/* ======================================================== */}

          {/* Group container for ETC complexes */}
          <g style={{ opacity: getFocusOpacity('etc') }} className="transition-all duration-500">
            {/* --- Complex I (NADH Dehydrogenase) --- */}
            <g
              className="cursor-pointer transition-all hover:scale-[1.01]"
              onClick={() => onSelectEntity('complex_i')}
              transform="translate(160, 230)"
            >
              <path
                d="M 10 20 L 75 20 L 75 90 L 95 90 L 95 140 L 20 140 L 20 90 L 10 90 Z"
                fill="url(#complexIGrad)"
                stroke={isHighlighted('complex_i') ? '#ffffff' : '#0369a1'}
                strokeWidth={isHighlighted('complex_i') ? 3 : 1.5}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
              />
              <text x="45" y="55" textAnchor="middle" className="text-[11px] font-bold fill-white">
                Complex I
              </text>
              <text x="45" y="70" textAnchor="middle" className="text-[9px] fill-sky-200">
                复合体 I
              </text>
              <text x="55" y="115" textAnchor="middle" className="text-[8px] fill-sky-100 font-mono">
                FMN / Fe-S
              </text>

              {/* Reaction tag: NADH oxidation */}
              <g transform="translate(-15, 148)">
                <rect x="0" y="0" width="115" height="18" rx="3" fill="#fdf4ff" stroke="#e879f9" strokeWidth="1" />
                <text x="57" y="12" textAnchor="middle" className="text-[9px] font-mono font-semibold fill-purple-900">
                  NADH → NAD⁺ + 2e⁻
                </text>
              </g>

              {isRotenone && (
                <g transform="translate(15, 60)">
                  <rect x="-10" y="-12" width="70" height="24" rx="4" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                  <text x="25" y="4" textAnchor="middle" className="text-[10px] font-bold fill-white">
                    鱼藤酮 阻断
                  </text>
                </g>
              )}
            </g>

            {/* --- Complex II (Succinate Dehydrogenase) --- */}
            <g
              className="cursor-pointer transition-all hover:scale-[1.01]"
              onClick={() => onSelectEntity('complex_ii')}
              transform="translate(305, 275)"
            >
              <rect
                x="0"
                y="0"
                width="68"
                height="85"
                rx="10"
                fill="url(#complexIIGrad)"
                stroke={isHighlighted('complex_ii') ? '#ffffff' : '#0f766e'}
                strokeWidth={isHighlighted('complex_ii') ? 3 : 1.5}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
              />
              <text x="34" y="32" textAnchor="middle" className="text-[11px] font-bold fill-white">
                Complex II
              </text>
              <text x="34" y="46" textAnchor="middle" className="text-[9px] fill-teal-100">
                复合体 II
              </text>
              <text x="34" y="60" textAnchor="middle" className="text-[8px] fill-teal-200 font-mono">
                FAD / Fe-S
              </text>

              {/* Subdued educational note: Complex II DOES NOT pump H+ */}
              <g transform="translate(-16, -26)">
                <rect x="0" y="0" width="100" height="20" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                <text x="50" y="10" textAnchor="middle" className="text-[8px] font-semibold fill-slate-700">
                  不直接泵出 H⁺
                </text>
                <text x="50" y="17" textAnchor="middle" className="text-[6.5px] font-mono fill-slate-400">
                  does not pump H⁺
                </text>
              </g>

              {/* FADH2 oxidation equation tag */}
              <g transform="translate(-15, 92)">
                <rect x="0" y="0" width="100" height="18" rx="3" fill="#f0fdfa" stroke="#5eead4" strokeWidth="1" />
                <text x="50" y="12" textAnchor="middle" className="text-[9px] font-mono font-semibold fill-teal-900">
                  FADH₂ → FAD + 2e⁻
                </text>
              </g>
            </g>

            {/* --- Coenzyme Q (Ubiquinone / CoQ) in lipid bilayer core --- */}
            <g
              className="cursor-pointer transition-all hover:scale-[1.05]"
              onClick={() => onSelectEntity('coq')}
              transform="translate(415, 275)"
            >
              <circle
                cx="25"
                cy="25"
                r="24"
                fill="url(#coqGrad)"
                stroke={isHighlighted('coq') ? '#ffffff' : '#b45309'}
                strokeWidth={isHighlighted('coq') ? 3 : 1.5}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
              />
              <text x="25" y="24" textAnchor="middle" className="text-[11px] font-bold fill-white">
                CoQ
              </text>
              <text x="25" y="36" textAnchor="middle" className="text-[8px] fill-amber-100 font-mono">
                泛醌 (Q/QH₂)
              </text>
            </g>

            {/* --- Complex III (Cytochrome bc1 Complex) --- */}
            <g
              className="cursor-pointer transition-all hover:scale-[1.01]"
              onClick={() => onSelectEntity('complex_iii')}
              transform="translate(495, 240)"
            >
              <rect
                x="0"
                y="0"
                width="78"
                height="100"
                rx="12"
                fill="url(#complexIIIGrad)"
                stroke={isHighlighted('complex_iii') ? '#ffffff' : '#5b21b6'}
                strokeWidth={isHighlighted('complex_iii') ? 3 : 1.5}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
              />
              <text x="39" y="38" textAnchor="middle" className="text-[11px] font-bold fill-white">
                Complex III
              </text>
              <text x="39" y="52" textAnchor="middle" className="text-[9px] fill-purple-200">
                复合体 III (bc₁)
              </text>
              <text x="39" y="66" textAnchor="middle" className="text-[8px] fill-purple-100 font-mono">
                Heme b / Rieske
              </text>
              <text x="39" y="82" textAnchor="middle" className="text-[8px] fill-amber-300 font-mono">
                Q 循环催化
              </text>

              {isAntimycin && (
                <g transform="translate(4, 40)">
                  <rect x="0" y="0" width="70" height="24" rx="4" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                  <text x="35" y="16" textAnchor="middle" className="text-[10px] font-bold fill-white">
                    抗霉素A 阻断
                  </text>
                </g>
              )}
            </g>

            {/* --- Cytochrome c (Cyt c): Compact, Soluble in IMS, Visibly Shuttling --- */}
            <g
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => onSelectEntity('cytochrome_c')}
              transform={`translate(${cytCX}, ${cytCY})`}
            >
              {/* Cyt c is a soluble carrier in the IMS, clearly above inner membrane! */}
              <ellipse
                cx="0"
                cy="0"
                rx="19"
                ry="14"
                fill="url(#cytCGrad)"
                stroke={isHighlighted('cytochrome_c') ? '#ffffff' : '#9d174d'}
                strokeWidth={isHighlighted('cytochrome_c') ? 2.8 : 1.4}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
              />
              <text x="0" y="3" textAnchor="middle" className="text-[10px] font-bold fill-white font-mono">
                Cyt c
              </text>

              {/* Shuttled electron dot when carrying e- */}
              {cytCCarryingE && showElectronFlow && !eBlockedAtI && (
                <circle cx="9" cy="-7" r="3.5" fill="#06b6d4" filter="url(#cyanGlow)" />
              )}
            </g>

            {/* Subtle path indicator showing Cyt c shuttling trajectory in IMS */}
            <path
              d="M 575 205 Q 622 195, 670 205"
              fill="none"
              stroke="#ec4899"
              strokeWidth="1.2"
              strokeDasharray="2,2"
              strokeOpacity="0.5"
            />
            <text x="622" y="190" textAnchor="middle" className="text-[8px] fill-pink-600 font-mono">
              Cyt c 在膜间隙穿梭
            </text>

            {/* --- Complex IV (Cytochrome c Oxidase) --- */}
            <g
              className="cursor-pointer transition-all hover:scale-[1.01]"
              onClick={() => onSelectEntity('complex_iv')}
              transform="translate(670, 240)"
            >
              <rect
                x="0"
                y="0"
                width="88"
                height="105"
                rx="12"
                fill="url(#complexIVGrad)"
                stroke={isHighlighted('complex_iv') ? '#ffffff' : '#065f46'}
                strokeWidth={isHighlighted('complex_iv') ? 3 : 1.5}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
              />
              <text x="44" y="38" textAnchor="middle" className="text-[11px] font-bold fill-white">
                Complex IV
              </text>
              <text x="44" y="52" textAnchor="middle" className="text-[9px] fill-emerald-100">
                复合体 IV (COX)
              </text>
              <text x="44" y="66" textAnchor="middle" className="text-[8px] fill-emerald-200 font-mono">
                Heme a/a₃ · CuA/CuB
              </text>

              {isCyanide && (
                <g transform="translate(8, 40)">
                  <rect x="0" y="0" width="72" height="24" rx="4" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                  <text x="36" y="16" textAnchor="middle" className="text-[10px] font-bold fill-white">
                    氰化物 阻断
                  </text>
                </g>
              )}
            </g>

            {/* --- Terminal Oxygen Reduction: O2 is the Final Electron Acceptor -> H2O --- */}
            <g
              className="cursor-pointer"
              onClick={() => onSelectEntity('oxygen_reduction')}
              transform="translate(655, 360)"
            >
              <rect
                x="-10"
                y="0"
                width="120"
                height="56"
                rx="6"
                fill="#ecfdf5"
                stroke="#10b981"
                strokeWidth="1.5"
              />
              <text x="50" y="16" textAnchor="middle" className="text-[10px] font-bold fill-emerald-950">
                O₂: 最终电子受体
              </text>
              <text x="50" y="27" textAnchor="middle" className="text-[7.5px] font-mono fill-emerald-700">
                Final Electron Acceptor
              </text>
              <text x="50" y="42" textAnchor="middle" className="text-[10px] font-mono font-bold fill-sky-800">
                ½ O₂ + 2H⁺ + 2e⁻ → H₂O
              </text>

              {/* Animated H2O formation badge */}
              {isPlaying && !eBlockedAtIV && (
                <circle
                  cx={50 + Math.sin(time * 3) * 6}
                  cy={68}
                  r="7"
                  fill="#38bdf8"
                  filter="url(#cyanGlow)"
                />
              )}
              {isPlaying && !eBlockedAtIV && (
                <text x="50" y="71" textAnchor="middle" className="text-[8px] font-bold fill-white font-mono">
                  H₂O
                </text>
              )}
            </g>
          </g>

          {/* ======================================================== */}
          {/* 5. STRENGTHENED ATP SYNTHASE (COMPLEX V)                 */}
          {/* F0 in Inner Membrane, F1 in Matrix, Driven by PMF        */}
          {/* ======================================================== */}
          <g
            className="cursor-pointer transition-all hover:scale-[1.01]"
            style={{ opacity: getFocusOpacity('atpSynthase') }}
            onClick={() => onSelectEntity('atp_synthase')}
            transform="translate(860, 220)"
          >
            {/* Highlight halo */}
            {isHighlighted('atp_synthase') && (
              <rect x="-18" y="-12" width="170" height="290" rx="16" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeDasharray="6,4" />
            )}

            {/* Overall ATP Synthase Header */}
            <text x="65" y="5" textAnchor="middle" className="text-[12px] font-bold fill-slate-800">
              ATP 合酶 (ATP Synthase)
            </text>

            {/* 1. F0 rotor embedded in the inner membrane (c-ring cylinder) */}
            <g transform="translate(30, 25)">
              <rect
                x="0"
                y="0"
                width="70"
                height="68"
                rx="8"
                fill="url(#atpSynthaseGrad)"
                stroke="#c2410c"
                strokeWidth="1.5"
              />
              {/* Rotating rotor lines */}
              <g
                style={{
                  transformOrigin: '35px 34px',
                  transform: `rotate(${atpBlocked ? 0 : rotorAngle}deg)`
                }}
              >
                <circle cx="35" cy="34" r="23" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
                <line x1="35" y1="13" x2="35" y2="55" stroke="#ea580c" strokeWidth="2" />
                <line x1="14" y1="34" x2="56" y2="34" stroke="#ea580c" strokeWidth="2" />
              </g>
              <text x="35" y="82" textAnchor="middle" className="text-[9px] font-bold fill-slate-800 font-mono">
                F₀ (位于内膜 Inner Membrane)
              </text>
            </g>

            {/* 2. Stator peripheral stalk */}
            <path
              d="M 24 35 L 14 35 L 14 175 L 30 175"
              fill="none"
              stroke="#9a3412"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <text x="5" y="115" className="text-[8px] font-mono fill-slate-600" transform="rotate(-90, 5, 115)">
              定子臂 (Stator)
            </text>

            {/* 3. Central stalk (gamma shaft) connecting F0 to F1 */}
            <rect
              x="59"
              y="93"
              width="12"
              height="38"
              rx="2"
              fill="#c2410c"
              style={{
                transformOrigin: '65px 112px',
                transform: `rotate(${atpBlocked ? 0 : rotorAngle}deg)`
              }}
            />

            {/* 4. F1 Catalytic Head (alpha3 beta3 hexamer located in the Matrix) */}
            <g
              transform="translate(20, 130)"
              style={{
                transformOrigin: '45px 45px',
                transform: atpBlocked ? undefined : `rotate(${Math.sin(time * 3) * 2.5}deg) scale(${1 + Math.sin(time * 4) * 0.015})`
              }}
            >
              {/* Spherical hexamer head */}
              <circle cx="45" cy="45" r="42" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
              {/* 3 catalytic lobes with gentle rotation pulse */}
              <circle cx="30" cy="32" r="15" fill="#ffedd5" stroke="#f97316" strokeWidth="1.2" />
              <circle cx="60" cy="32" r="15" fill="#ffedd5" stroke="#f97316" strokeWidth="1.2" />
              <circle cx="45" cy="58" r="15" fill="#ffedd5" stroke="#f97316" strokeWidth="1.2" />

              <text x="45" y="40" textAnchor="middle" className="text-[12px] font-bold fill-orange-950">
                F₁ (朝向基质 Matrix)
              </text>
              <text x="45" y="53" textAnchor="middle" className="text-[8px] font-mono fill-orange-800">
                (α₃β₃ 构象循环变化催化ATP)
              </text>
            </g>

            {/* Oligomycin blockade marker */}
            {isOligomycin && (
              <g transform="translate(15, 30)">
                <rect x="0" y="0" width="100" height="26" rx="4" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                <text x="50" y="17" textAnchor="middle" className="text-[11px] font-bold fill-white">
                  寡霉素 堵塞F₀
                </text>
              </g>
            )}
          </g>

          {/* ======================================================== */}
          {/* 6. ATP SYNTHESIS & RELEASE REACTION IN MATRIX            */}
          {/* ======================================================== */}
          <g
            className="transition-all duration-500 cursor-pointer"
            style={{ opacity: getFocusOpacity('atpGeneration') }}
            onClick={() => onSelectEntity('atp_generation')}
            transform="translate(830, 440)"
          >
            {/* Reaction equation card */}
            <rect
              x="0"
              y="0"
              width="190"
              height="65"
              rx="8"
              fill="#fffbeb"
              stroke={isHighlighted('atp_generation') ? '#0284c7' : '#f59e0b'}
              strokeWidth={isHighlighted('atp_generation') ? 2.5 : 1.5}
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"
            />
            <text x="95" y="24" textAnchor="middle" className="text-[12px] font-bold fill-amber-900">
              ADP + Pi → ATP
            </text>
            <text x="95" y="42" textAnchor="middle" className="text-[10px] fill-amber-700 font-mono">
              F₁旋转变构催化高能磷酸键
            </text>
            <text x="95" y="56" textAnchor="middle" className="text-[9px] fill-slate-500 font-semibold">
              释放至基质并输出细胞质
            </text>

            {/* Generated ATP Sparkle Particles */}
            {isPlaying && showAtpGeneration && !atpBlocked && (currentStage >= 5 || currentStage === 6) && (
              <>
                <g
                  transform={`translate(${95 + Math.sin(time * 3) * 35}, ${
                    65 + ((time * 40) % 90)
                  })`}
                  filter="url(#goldenGlow)"
                >
                  <circle cx="0" cy="0" r="7" fill="#f59e0b" />
                  <text x="0" y="3.5" textAnchor="middle" className="text-[8px] font-bold fill-white font-mono">
                    ATP
                  </text>
                </g>
                <g
                  transform={`translate(${50 + Math.cos(time * 2.5) * 25}, ${
                    65 + (((time * 40) + 45) % 90)
                  })`}
                  filter="url(#goldenGlow)"
                >
                  <circle cx="0" cy="0" r="6" fill="#fbbf24" />
                  <text x="0" y="3" textAnchor="middle" className="text-[7px] font-bold fill-amber-950 font-mono">
                    ATP
                  </text>
                </g>
              </>
            )}
          </g>

          {/* DNP Uncoupler Leak Channel if DNP is active */}
          {isDnp && (
            <g transform="translate(775, 230)">
              <rect x="0" y="0" width="30" height="95" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,2" />
              <text x="15" y="45" textAnchor="middle" className="text-[8px] font-bold fill-red-800 font-mono" transform="rotate(-90, 15, 45)">
                DNP 质子短路漏道
              </text>
              <circle
                cx="15"
                cy={15 + ((time * 70) % 75)}
                r="4.5"
                fill="#ea580c"
                filter="url(#amberGlow)"
              />
            </g>
          )}

          {/* ======================================================== */}
          {/* 7. DYNAMIC PARTICLES: ELECTRON FLOW (e-)                */}
          {/* Strictly: NADH -> I -> CoQ, and FADH2 -> II -> CoQ      */}
          {/* Then CoQ -> III -> Cyt c (IMS) -> IV -> O2              */}
          {/* ======================================================== */}
          {showElectronFlow && !eBlockedAtI && (
            <g style={{ opacity: getFocusOpacity('etc') }}>
              {/* Path 1: NADH -> Complex I -> CoQ -> Complex III -> Cyt c -> Complex IV -> O2 */}
              {(() => {
                const waypoints = [
                  { x: 200, y: 360 }, // 0: NADH at base of Complex I
                  { x: 200, y: 270 }, // 1: inside Complex I
                  { x: 440, y: 295 }, // 2: CoQ
                  { x: 535, y: 290 }, // 3: Complex III
                  { x: cytCX, y: cytCY }, // 4: Cyt c shuttling in IMS
                  { x: 715, y: 290 }, // 5: Complex IV
                  { x: 705, y: 375 }  // 6: O2 reduction center
                ];

                const numSegments = waypoints.length - 1;
                const progressSpeed = 0.35;
                const particleCount = 4;
                const safeTime = Number.isFinite(time) && time >= 0 ? time : 0;

                return Array.from({ length: particleCount }).map((_, idx) => {
                  const offset = idx / particleCount;
                  const rawPhase = (safeTime * progressSpeed + offset) % 1;
                  const phase = ((rawPhase % 1) + 1) % 1;
                  const segFloat = phase * numSegments;
                  const currentSegmentIndex = Math.max(0, Math.min(Math.floor(segFloat), numSegments - 1));
                  const segmentT = Math.max(0, Math.min(1, segFloat - currentSegmentIndex));

                  // Inhibitor stoppage
                  if (isAntimycin && currentSegmentIndex >= 3) return null;
                  if (isCyanide && currentSegmentIndex >= 5) return null;

                  const p1 = waypoints[currentSegmentIndex];
                  const p2 = waypoints[currentSegmentIndex + 1] ?? p1;
                  if (!p1 || !p2) return null;

                  const px = p1.x + (p2.x - p1.x) * segmentT;
                  const py = p1.y + (p2.y - p1.y) * segmentT;
                  if (!Number.isFinite(px) || !Number.isFinite(py)) return null;

                  return (
                    <g key={`e-${idx}`} filter="url(#cyanGlow)">
                      <circle cx={px} cy={py} r="4.5" fill="#06b6d4" />
                      <circle cx={px} cy={py} r="2" fill="#ffffff" />
                      <text x={px + 6} y={py - 4} className="text-[8px] font-mono font-bold fill-sky-800">
                        e⁻
                      </text>
                    </g>
                  );
                });
              })()}

              {/* Path 2: FADH2 -> Complex II -> CoQ (converges at CoQ) */}
              {(() => {
                const safeTime = Number.isFinite(time) && time >= 0 ? time : 0;
                const rawPTime = (safeTime * 0.4) % 1;
                const pTime = ((rawPTime % 1) + 1) % 1;
                const p1 = { x: 339, y: 360 }; // FADH2 oxidation at Complex II base
                const p2 = { x: 339, y: 310 }; // Inside Complex II
                const p3 = { x: 440, y: 295 }; // Transferred to CoQ

                let px = 0, py = 0;
                if (pTime < 0.5) {
                  const t = Math.max(0, Math.min(1, pTime / 0.5));
                  px = p1.x + (p2.x - p1.x) * t;
                  py = p1.y + (p2.y - p1.y) * t;
                } else {
                  const t = Math.max(0, Math.min(1, (pTime - 0.5) / 0.5));
                  px = p2.x + (p3.x - p2.x) * t;
                  py = p2.y + (p3.y - p2.y) * t;
                }

                if (!Number.isFinite(px) || !Number.isFinite(py)) return null;

                return (
                  <g filter="url(#cyanGlow)">
                    <circle cx={px} cy={py} r="4" fill="#0284c7" />
                    <text x={px - 8} y={py - 3} className="text-[8px] font-mono font-bold fill-sky-800">
                      e⁻
                    </text>
                  </g>
                );
              })()}
            </g>
          )}

          {/* ======================================================== */}
          {/* 8. DYNAMIC PARTICLES: PROTON FLOW (H+)                   */}
          {/* Complex I, III, IV pump H+ (Complex II DOES NOT pump)   */}
          {/* In Stage 05/06: H+ influx down PMF into Matrix via F0   */}
          {/* ======================================================== */}
          {showProtonFlow && (
            <g style={{ opacity: getFocusOpacity('protons') }}>
              {/* Complex I Proton Pumping: Matrix -> IMS (4 H+) */}
              {!eBlockedAtI && (currentStage >= 4 || currentStage === 6) && (
                <>
                  <path d="M 215 350 L 215 190" fill="none" stroke="#ea580c" strokeWidth="1.8" strokeDasharray="3,3" />
                  <polygon points="215,185 211,194 219,194" fill="#ea580c" />
                  <circle
                    cx="215"
                    cy={350 - ((time * 70) % 160)}
                    r="4.5"
                    fill="#f97316"
                    filter="url(#amberGlow)"
                  />
                  <text x="222" y={350 - ((time * 70) % 160) + 3} className="text-[8px] font-bold fill-amber-900 font-mono">
                    H⁺
                  </text>
                </>
              )}

              {/* Complex III Proton Pumping: Matrix -> IMS (4 H+) */}
              {!isAntimycin && !eBlockedAtI && (currentStage >= 4 || currentStage === 6) && (
                <>
                  <path d="M 534 350 L 534 190" fill="none" stroke="#ea580c" strokeWidth="1.8" strokeDasharray="3,3" />
                  <polygon points="534,185 530,194 538,194" fill="#ea580c" />
                  <circle
                    cx="534"
                    cy={350 - (((time * 70) + 40) % 160)}
                    r="4.5"
                    fill="#f97316"
                    filter="url(#amberGlow)"
                  />
                  <text x="541" y={350 - (((time * 70) + 40) % 160) + 3} className="text-[8px] font-bold fill-amber-900 font-mono">
                    H⁺
                  </text>
                </>
              )}

              {/* Complex IV Proton Pumping: Matrix -> IMS (2 H+) */}
              {!isCyanide && !isAntimycin && !eBlockedAtI && (currentStage >= 4 || currentStage === 6) && (
                <>
                  <path d="M 714 350 L 714 190" fill="none" stroke="#ea580c" strokeWidth="1.8" strokeDasharray="3,3" />
                  <polygon points="714,185 710,194 718,194" fill="#ea580c" />
                  <circle
                    cx="714"
                    cy={350 - (((time * 70) + 80) % 160)}
                    r="4.5"
                    fill="#f97316"
                    filter="url(#amberGlow)"
                  />
                  <text x="721" y={350 - (((time * 70) + 80) % 160) + 3} className="text-[8px] font-bold fill-amber-900 font-mono">
                    H⁺
                  </text>
                </>
              )}

              {/* Accumulating Protons in IMS (gradient density varies with stage) */}
              {[
                { x: 120, y: 180 },
                { x: 170, y: 165 },
                { x: 260, y: 185 },
                { x: 310, y: 170 },
                { x: 370, y: 180 },
                { x: 440, y: 165 },
                { x: 480, y: 185 },
                { x: 570, y: 170 },
                { x: 630, y: 180 },
                { x: 680, y: 165 },
                { x: 740, y: 185 },
                { x: 790, y: 170 },
                { x: 840, y: 180 },
                { x: 990, y: 165 },
                { x: 1040, y: 180 }
              ].map((pos, idx) => {
                if (!pos) return null;
                // Number of H+ particles mirrors the proton gradient accumulation
                if (currentStage <= 2 && idx % 3 !== 0) return null;
                if (currentStage === 3 && idx % 2 === 0) return null;
                if (protonGradientLevel === 'low' && idx % 3 !== 0) return null;

                const jitterX = Math.sin(time * 2 + idx) * 6;
                const jitterY = Math.cos(time * 2 + idx) * 4;

                return (
                  <g key={`ims-h-${idx}`} transform={`translate(${pos.x + jitterX}, ${pos.y + jitterY})`}>
                    <circle cx="0" cy="0" r="4" fill="#fb923c" fillOpacity="0.85" />
                    <text x="0" y="2.5" textAnchor="middle" className="text-[7px] font-bold fill-white font-mono">
                      H⁺
                    </text>
                  </g>
                );
              })}

              {/* Influx of H+ through ATP Synthase (IMS -> F0 in Inner Membrane -> Matrix) */}
              {(currentStage >= 5 || currentStage === 6) && !isOligomycin && !isDnp && (
                <g>
                  {/* Flow trajectory conduit from IMS pool down into Matrix */}
                  <path
                    d="M 850 175 Q 925 175, 925 210 L 925 450"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="2.5"
                    strokeDasharray="5,4"
                  />
                  <polygon points="925,458 920,446 930,446" fill="#ea580c" />

                  {/* Multiple staggered continuous H+ particles flowing: IMS -> ATP synthase -> Matrix */}
                  {(() => {
                    const safeTime = Number.isFinite(time) && time >= 0 ? time : 0;
                    const hWaypoints = [
                      { x: 850, y: 175 }, // 0: From IMS proton pool accumulated in Stage 04
                      { x: 925, y: 175 }, // 1: Intermembrane Space entrance
                      { x: 925, y: 250 }, // 2: Entering F0 in Inner Membrane
                      { x: 925, y: 310 }, // 3: Transiting F0 rotor channel
                      { x: 925, y: 380 }, // 4: Passing central stalk into F1
                      { x: 925, y: 450 }  // 5: Emergence into Matrix
                    ];
                    const numSegs = hWaypoints.length - 1;
                    const particleCount = 4;

                    return Array.from({ length: particleCount }).map((_, pIdx) => {
                      const offset = pIdx / particleCount;
                      const rawT = (safeTime * 0.45 + offset) % 1;
                      const pPhase = ((rawT % 1) + 1) % 1;
                      const segFloat = pPhase * numSegs;
                      const segIdx = Math.max(0, Math.min(Math.floor(segFloat), numSegs - 1));
                      const segT = Math.max(0, Math.min(1, segFloat - segIdx));

                      const p1 = hWaypoints[segIdx];
                      const p2 = hWaypoints[segIdx + 1] ?? p1;
                      if (!p1 || !p2) return null;

                      const px = p1.x + (p2.x - p1.x) * segT;
                      const py = p1.y + (p2.y - p1.y) * segT;
                      if (!Number.isFinite(px) || !Number.isFinite(py)) return null;

                      return (
                        <g key={`synth-h-${pIdx}`} transform={`translate(${px}, ${py})`}>
                          <circle cx="0" cy="0" r="5" fill="#f97316" filter="url(#amberGlow)" />
                          <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                          <text
                            x="7"
                            y="2.5"
                            className="text-[8px] font-bold fill-amber-950 font-mono"
                          >
                            H⁺
                          </text>
                        </g>
                      );
                    });
                  })()}

                  {/* Flow Hierarchy Badges: Intermembrane Space -> H+ -> ATP synthase -> Matrix */}
                  <g transform="translate(975, 170)" className="pointer-events-none select-none">
                    <rect x="0" y="0" width="138" height="20" rx="4" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1" />
                    <text x="69" y="13" textAnchor="middle" className="text-[8.5px] font-bold fill-sky-900 font-sans">
                      Intermembrane Space (膜间隙)
                    </text>

                    <text x="69" y="32" textAnchor="middle" className="text-[9px] font-bold fill-amber-600 font-mono">
                      ↓ H⁺ 质子流
                    </text>

                    <rect x="0" y="42" width="138" height="20" rx="4" fill="#fff7ed" stroke="#ea580c" strokeWidth="1" />
                    <text x="69" y="55" textAnchor="middle" className="text-[8.5px] font-bold fill-orange-950 font-sans">
                      ATP synthase (F₀膜内 → F₁基质)
                    </text>

                    <text x="69" y="74" textAnchor="middle" className="text-[9px] font-bold fill-amber-600 font-mono">
                      ↓ H⁺ 回流做功
                    </text>

                    <rect x="0" y="84" width="138" height="20" rx="4" fill="#fefce8" stroke="#ca8a04" strokeWidth="1" />
                    <text x="69" y="97" textAnchor="middle" className="text-[8.5px] font-bold fill-amber-950 font-sans">
                      Matrix (基质)
                    </text>
                  </g>
                </g>
              )}
            </g>
          )}

          {/* ======================================================== */}
          {/* 9. ANATOMICAL POINTERS & CALLOUTS                        */}
          {/* ======================================================== */}
          <g className="pointer-events-none text-slate-700">
            {/* Callout: Outer Membrane */}
            <line x1="280" y1="120" x2="330" y2="90" stroke="#64748b" strokeWidth="1" />
            <circle cx="280" cy="120" r="2.5" fill="#64748b" />

            {/* Callout: Intermembrane Space */}
            <line x1="420" y1="175" x2="480" y2="155" stroke="#0284c7" strokeWidth="1" />
            <circle cx="420" cy="175" r="2.5" fill="#0284c7" />

            {/* Callout: Inner Membrane */}
            <line x1="100" y1="285" x2="140" y2="285" stroke="#475569" strokeWidth="1" />
            <circle cx="100" cy="285" r="2.5" fill="#475569" />

            {/* Callout: Matrix */}
            <line x1="200" y1="620" x2="260" y2="620" stroke="#475569" strokeWidth="1" />
            <circle cx="200" cy="620" r="2.5" fill="#475569" />
          </g>

          {/* ======================================================== */}
          {/* 10. MITOCHONDRION OVERVIEW MINI-MAP (Top-Right Inset)    */}
          {/* ======================================================== */}
          <g transform="translate(1015, 25)" className="cursor-default">
            <rect
              x="0"
              y="0"
              width="165"
              height="85"
              rx="8"
              fill="#ffffff"
              fillOpacity="0.9"
              stroke="#cbd5e1"
              strokeWidth="1"
              filter="drop-shadow(0 1px 3px rgba(0,0,0,0.06))"
            />
            <text x="10" y="16" className="text-[10px] font-bold fill-slate-700">
              线粒体全景 · Whole Organelle
            </text>

            <g transform="translate(15, 24)">
              <ellipse cx="65" cy="25" rx="60" ry="22" fill="#e2ece9" stroke="#64748b" strokeWidth="1.5" />
              <ellipse cx="65" cy="25" rx="56" ry="19" fill="#e0f2fe" stroke="#94a3b8" strokeWidth="1" />
              <path
                d="M 25 25 Q 40 16, 55 25 T 85 25 T 115 25"
                fill="none"
                stroke="#475569"
                strokeWidth="1.5"
              />
              <path
                d="M 35 32 Q 50 38, 65 32 T 95 32"
                fill="none"
                stroke="#475569"
                strokeWidth="1.5"
              />
              <rect
                x="50"
                y="10"
                width="35"
                height="28"
                rx="3"
                fill="none"
                stroke="#0284c7"
                strokeWidth="1.8"
                strokeDasharray="2,2"
              />
            </g>
          </g>

          {/* ======================================================== */}
          {/* 11. STAGE 6 GRAND FINALE BANNER (INTEGRATED CELLULAR RESP)*/}
          {/* ======================================================== */}
          {currentStage === 6 && (
            <g transform="translate(600, 715)">
              <rect
                x="-280"
                y="-25"
                width="560"
                height="50"
                rx="10"
                fill="#ffffff"
                stroke="#0284c7"
                strokeWidth="2"
                filter="drop-shadow(0 4px 12px rgba(2,132,199,0.15))"
              />
              <text x="0" y="-3" textAnchor="middle" className="text-[13px] font-bold fill-sky-950">
                完整细胞呼吸过程 · Integrated Cellular Respiration
              </text>
              <text x="0" y="16" textAnchor="middle" className="text-[11px] font-mono font-semibold fill-sky-700">
                营养底物 → 乙酰CoA → TCA循环 → NADH/FADH₂ → 呼吸链(ETC) → 质子动力势(PMF) → ATP合酶 → ATP
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Floating Info Pill at Canvas Bottom Left */}
      <div className="absolute bottom-3 left-4 hidden sm:flex items-center gap-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-lg text-xs text-slate-600 shadow-2xs">
        <span className="flex items-center gap-1.5 font-medium">
          <Info className="w-3.5 h-3.5 text-sky-600" />
          <span>点击画面中任意蛋白质、膜间隙Cyt c、ATP合酶或线粒体嵴，可在右侧查阅生物学详解</span>
        </span>
      </div>
    </div>
  );
};
