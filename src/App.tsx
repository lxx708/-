/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { StageId, SelectedEntityId, InhibitorInfo } from './types/biology';
import { STAGES_DATA } from './data/stages';
import { BIOLOGICAL_ENTITIES, INHIBITORS_DATA } from './data/complexes';
import { Header } from './components/Header';
import { StageNav } from './components/StageNav';
import { ExplanationPanel } from './components/ExplanationPanel';
import { PlaybackControls } from './components/PlaybackControls';
import { MitochondriaStage } from './components/MitochondriaStage';
import { ExperimentModal } from './components/ExperimentModal';
import { GuideModal } from './components/GuideModal';

export default function App() {
  // Navigation & Modal tabs
  const [currentTab, setCurrentTab] = useState<'simulation' | 'experiment' | 'guide'>('simulation');

  // Stage & Playback state
  const [currentStage, setCurrentStage] = useState<StageId>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [progress, setProgress] = useState<number>(0); // 0 to 100

  // Animation Layer Toggles (all default enabled as requested)
  const [showElectronFlow, setShowElectronFlow] = useState<boolean>(true);
  const [showProtonFlow, setShowProtonFlow] = useState<boolean>(true);
  const [showAtpGeneration, setShowAtpGeneration] = useState<boolean>(true);

  // Inspector & Inhibitor
  const [selectedEntityId, setSelectedEntityId] = useState<SelectedEntityId | null>(null);
  const [activeInhibitor, setActiveInhibitor] = useState<InhibitorInfo>(INHIBITORS_DATA[0]);

  // Modals visibility
  const [isExperimentOpen, setIsExperimentOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Auto timeline scrubber progression loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(Math.max(0, (now - lastTime) / 1000), 0.1);
      lastTime = now;

      if (isPlaying) {
        setProgress((prev) => {
          const speed = Number.isFinite(playbackSpeed) && playbackSpeed > 0 ? playbackSpeed : 1.0;
          // 60 seconds total for 6 stages (10s per stage)
          const increment = (dt / 60) * 100 * speed;
          const current = Number.isFinite(prev) ? prev : 0;
          const next = current + increment;
          if (next >= 100) {
            // Loop back or stop
            return 100;
          }
          return next;
        });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, playbackSpeed]);

  // Synchronize stage with progress (6 stages, each ~16.66%)
  useEffect(() => {
    const stageIndex = Math.min(Math.floor(progress / (100 / 6)), 5);
    const calculatedStage = (stageIndex + 1) as StageId;
    if (calculatedStage !== currentStage) {
      setCurrentStage(calculatedStage);
    }
  }, [progress]);

  // Handler for manually selecting a stage
  const handleSelectStage = (stageId: StageId) => {
    setCurrentStage(stageId);
    const newProgress = ((stageId - 1) / 6) * 100;
    setProgress(newProgress);
  };

  // Previous & Next stage controls
  const handlePrevStage = () => {
    if (currentStage > 1) {
      handleSelectStage((currentStage - 1) as StageId);
    }
  };

  const handleNextStage = () => {
    if (currentStage < 6) {
      handleSelectStage((currentStage + 1) as StageId);
    }
  };

  const handleReplay = () => {
    setProgress(0);
    setCurrentStage(1);
    setIsPlaying(true);
  };

  const handleSeek = (newProgress: number) => {
    setProgress(newProgress);
  };

  const handleReset = () => {
    setProgress(0);
    setCurrentStage(1);
    setIsPlaying(true);
    setActiveInhibitor(INHIBITORS_DATA[0]);
    setSelectedEntityId(null);
  };

  // Determine dynamic Proton Gradient Level based on stage & inhibitors
  const getProtonGradientLevel = (): 'low' | 'medium' | 'high' => {
    if (activeInhibitor.id === 'dnp') return 'low'; // DNP uncoupler leaks protons!
    if (activeInhibitor.id === 'cyanide' || activeInhibitor.id === 'rotenone') {
      return currentStage <= 3 ? 'low' : 'medium';
    }
    if (currentStage <= 2) return 'low';
    if (currentStage === 3) return 'medium';
    return 'high';
  };

  const currentStageInfo = STAGES_DATA.find((s) => s.id === currentStage) || STAGES_DATA[0];
  const selectedEntity = selectedEntityId ? BIOLOGICAL_ENTITIES[selectedEntityId] : null;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-800 antialiased">
      {/* 1. Header - adhering to Top Bar Contract */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab === 'experiment') setIsExperimentOpen(true);
          if (tab === 'guide') setIsGuideOpen(true);
        }}
        onReset={handleReset}
      />

      {/* 2. Main Visual Workspace: Left (Stage Nav) + Center (Animation Stage) + Right (Explanation) */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Stages & Flow Layers: Left ~20% on desktop, below animation on mobile */}
        <div className="order-2 lg:order-1 shrink-0 flex flex-col">
          <StageNav
            currentStage={currentStage}
            onSelectStage={handleSelectStage}
            showElectronFlow={showElectronFlow}
            onToggleElectronFlow={() => setShowElectronFlow(!showElectronFlow)}
            showProtonFlow={showProtonFlow}
            onToggleProtonFlow={() => setShowProtonFlow(!showProtonFlow)}
            showAtpGeneration={showAtpGeneration}
            onToggleAtpGeneration={() => setShowAtpGeneration(!showAtpGeneration)}
            activeInhibitor={activeInhibitor.id}
            protonGradientLevel={getProtonGradientLevel()}
          />
        </div>

        {/* Center: Large Mitochondria Canvas (~55% on desktop, top on mobile) */}
        <div className="order-1 lg:order-2 flex-1 relative min-h-[320px] lg:h-full overflow-hidden flex flex-col">
          <MitochondriaStage
            currentStage={currentStage}
            isPlaying={isPlaying}
            playbackSpeed={playbackSpeed}
            showElectronFlow={showElectronFlow}
            showProtonFlow={showProtonFlow}
            showAtpGeneration={showAtpGeneration}
            activeInhibitor={activeInhibitor}
            selectedEntityId={selectedEntityId}
            onSelectEntity={(id) => setSelectedEntityId(id)}
            protonGradientLevel={getProtonGradientLevel()}
          />
        </div>

        {/* Right Side: Scientific Explanations & Structural Inspector (~25% on desktop, bottom on mobile) */}
        <div className="order-3 lg:order-3 max-h-48 lg:max-h-none overflow-y-auto flex shrink-0">
          <ExplanationPanel
            currentStage={currentStageInfo}
            selectedEntity={selectedEntity}
            onClearSelectedEntity={() => setSelectedEntityId(null)}
            activeInhibitor={activeInhibitor}
            onSelectInhibitor={(inh) => setActiveInhibitor(inh)}
          />
        </div>
      </main>

      {/* 3. Bottom Playback & Timeline Scrubber Bar */}
      <PlaybackControls
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReplay={handleReplay}
        onPrevStage={handlePrevStage}
        onNextStage={handleNextStage}
        currentStage={currentStage}
        progress={progress}
        onSeek={handleSeek}
        playbackSpeed={playbackSpeed}
        onChangeSpeed={setPlaybackSpeed}
        canPrev={currentStage > 1}
        canNext={currentStage < 6}
      />

      {/* 4. Optional Deep Dive Modals */}
      <ExperimentModal
        isOpen={isExperimentOpen}
        onClose={() => setIsExperimentOpen(false)}
        activeInhibitor={activeInhibitor}
        onSelectInhibitor={(inh) => {
          setActiveInhibitor(inh);
        }}
      />

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
