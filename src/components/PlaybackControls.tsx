import React from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Gauge } from 'lucide-react';
import { StageId } from '../types/biology';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReplay: () => void;
  onPrevStage: () => void;
  onNextStage: () => void;
  currentStage: StageId;
  progress: number; // 0 to 100
  onSeek: (value: number) => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  canPrev: boolean;
  canNext: boolean;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onReplay,
  onPrevStage,
  onNextStage,
  currentStage,
  progress,
  onSeek,
  playbackSpeed,
  onChangeSpeed,
  canPrev,
  canNext
}) => {
  // Compute simulated timestamp based on progress
  const totalSeconds = 60;
  const currentSeconds = Math.floor((progress / 100) * totalSeconds);
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <footer className="h-16 md:h-20 bg-white border-t border-slate-200 px-4 md:px-8 flex flex-col justify-center shrink-0 z-20 shadow-xs">
      {/* Top scrubber bar with stage ticks */}
      <div className="w-full flex items-center gap-3">
        <span className="text-[11px] font-mono text-slate-500 w-10 text-right select-none tabular-nums">
          {formatTime(currentSeconds)}
        </span>

        <div className="relative flex-1 group py-1.5 flex items-center">
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />

          {/* Stage boundary tick marks */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none flex justify-between px-1">
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const tickPos = (index / 5) * 100;
              const isPassed = progress >= tickPos;
              return (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full border transition-colors ${
                    isPassed
                      ? 'bg-sky-600 border-white'
                      : 'bg-white border-slate-300'
                  }`}
                  style={{ left: `${tickPos}%` }}
                />
              );
            })}
          </div>
        </div>

        <span className="text-[11px] font-mono text-slate-400 w-10 select-none tabular-nums">
          01:00
        </span>
      </div>

      {/* Main control buttons row */}
      <div className="flex items-center justify-between mt-1">
        {/* Left: Speed selector */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-slate-400 hidden sm:inline mr-1">
            倍速:
          </span>
          {[0.5, 1.0, 1.5].map((spd) => (
            <button
              key={spd}
              onClick={() => onChangeSpeed(spd)}
              className={`px-2 py-0.5 text-xs font-mono rounded transition-colors ${
                playbackSpeed === spd
                  ? 'bg-slate-900 text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>

        {/* Center: Play, Pause, Steps, Replay */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Previous Stage */}
          <button
            onClick={onPrevStage}
            disabled={!canPrev}
            className={`p-2 rounded-full border transition-colors flex items-center justify-center ${
              canPrev
                ? 'border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                : 'border-slate-100 text-slate-300 cursor-not-allowed'
            }`}
            title="上一步 (Previous Stage)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Play / Pause Primary Button */}
          <button
            onClick={onTogglePlay}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center shadow-sm hover:shadow transition-all transform active:scale-95"
            title={isPlaying ? '暂停 (Pause)' : '播放 (Play)'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Next Stage */}
          <button
            onClick={onNextStage}
            disabled={!canNext}
            className={`p-2 rounded-full border transition-colors flex items-center justify-center ${
              canNext
                ? 'border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                : 'border-slate-100 text-slate-300 cursor-not-allowed'
            }`}
            title="下一步 (Next Stage)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Replay */}
          <button
            onClick={onReplay}
            className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="重新播放 (Replay)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Current Stage title indicator */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-mono">
              当前阶段 · Stage 0{currentStage}
            </span>
            <span className="text-xs font-semibold text-slate-700 truncate max-w-[140px] block">
              {currentStage === 1 && '原料与乙酰CoA'}
              {currentStage === 2 && 'TCA循环'}
              {currentStage === 3 && '电子传递链'}
              {currentStage === 4 && '质子泵与梯度'}
              {currentStage === 5 && 'ATP合酶与合成'}
              {currentStage === 6 && '完整细胞呼吸过程'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
