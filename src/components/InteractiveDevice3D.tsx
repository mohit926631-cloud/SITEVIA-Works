import React, { useState, useRef } from 'react';
import { DEMO_PROJECTS } from '../constants';
import { Laptop, Tablet, Smartphone, ExternalLink, RotateCcw, Sparkles, Send } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface InteractiveDevice3DProps {
  onOpenProjectBrief?: (projectName: string, projectType: string) => void;
}

export const InteractiveDevice3D: React.FC<InteractiveDevice3DProps> = ({ onOpenProjectBrief }) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [rotX, setRotX] = useState(10);
  const [rotY, setRotY] = useState(-12);
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0, initRotX: 10, initRotY: -12 });

  const activeProject = DEMO_PROJECTS[activeProjectIndex];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      initRotX: rotX,
      initRotY: rotY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    setRotY(startPos.current.initRotY + deltaX * 0.25);
    setRotX(Math.max(-25, Math.min(25, startPos.current.initRotX - deltaY * 0.25)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetRotation = () => {
    playClickSound();
    setRotX(0);
    setRotY(0);
  };

  return (
    <section id="spatial-lab" className="py-20 sm:py-28 relative overflow-hidden bg-slate-950/70 border-y border-slate-800/80">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Spatial Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Inspect Any Live Website in 3D.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3">
            Drag the 3D viewport to inspect responsive geometry. Switch between desktop, tablet, and mobile frame projections in real time.
          </p>
        </div>

        {/* Control Bar: Project Selector & Device Mode Switcher with Glass Design */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/60 border border-white/10 p-3.5 rounded-2xl backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          {/* Project Carousel Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
            {DEMO_PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveProjectIndex(idx);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 min-h-[40px] backdrop-blur-md ${
                  activeProjectIndex === idx
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 ring-1 ring-cyan-400 border border-cyan-400/40'
                    : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 border border-white/10'
                }`}
              >
                <span>{proj.name}</span>
                <span className="text-[10px] opacity-75 font-mono">[{idx + 1}]</span>
              </button>
            ))}
          </div>

          {/* Device Controls & Reset */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setDeviceMode('desktop');
                }}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  deviceMode === 'desktop' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Desktop View"
              >
                <Laptop className="w-4 h-4" />
                <span className="hidden sm:inline">Desktop</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setDeviceMode('tablet');
                }}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  deviceMode === 'tablet' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
                <span className="hidden sm:inline">Tablet</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setDeviceMode('mobile');
                }}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  deviceMode === 'mobile' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            <button
              type="button"
              onClick={resetRotation}
              className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors backdrop-blur-md"
              title="Reset 3D Angle"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D Interactive Spatial Stage */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ perspective: '1600px' }}
          className="relative min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] rounded-3xl bg-gradient-to-b from-slate-900/40 to-slate-950/80 border border-white/10 p-6 sm:p-12 flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden backdrop-blur-xl shadow-2xl"
        >
          {/* Subtle 3D Floor Grid */}
          <div
            style={{
              transform: `rotateX(75deg) translateZ(-120px) rotateZ(${rotY * 0.4}deg)`,
              backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            className="absolute inset-x-0 bottom-0 h-[400px] pointer-events-none opacity-60"
          />

          {/* Interactive Drag Hint */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-[11px] font-mono text-cyan-400/90 bg-slate-900/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>DRAG TO ROTATE 3D VIEWPORT [X: {Math.round(rotX)}°, Y: {Math.round(rotY)}°]</span>
          </div>

          {/* 3D Rotatable Chassis */}
          <div
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transformStyle: 'preserve-3d',
              transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="relative transition-all duration-300"
          >
            {/* Device Rendering based on mode */}
            {deviceMode === 'desktop' && (
              <div className="w-[320px] sm:w-[540px] md:w-[680px] lg:w-[780px] rounded-2xl bg-slate-900 border-4 border-slate-700/80 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
                {/* Laptop Top Chrome */}
                <div className="bg-slate-950/90 backdrop-blur-md px-4 py-2.5 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-1 rounded-lg border border-white/10 text-[11px] font-mono text-slate-300">
                    <span className="text-emerald-400 font-bold">https://</span>
                    <span className="truncate max-w-[200px] sm:max-w-[320px]">
                      {activeProject.url.replace('https://', '')}
                    </span>
                  </div>
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-cyan-300 font-bold"
                  >
                    Open ↗
                  </a>
                </div>

                {/* Screen Preview */}
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden group">
                  <img
                    src={activeProject.previewImage}
                    alt={activeProject.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />

                  {/* Overlay Meta */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-600/90 backdrop-blur-md text-white border border-white/20">
                        {activeProject.categoryLabel}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1">{activeProject.name}</h4>
                    </div>
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-900/50"
                    >
                      <span>Visit Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {deviceMode === 'tablet' && (
              <div className="w-[300px] sm:w-[460px] md:w-[540px] rounded-3xl bg-slate-900 border-4 border-slate-700/80 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
                <div className="bg-slate-950/90 backdrop-blur-md px-4 py-2 flex items-center justify-center border-b border-white/10 text-[11px] font-mono text-slate-400">
                  <span>iPad Pro Simulation — {activeProject.name}</span>
                </div>
                <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                  <img
                    src={activeProject.previewImage}
                    alt={activeProject.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{activeProject.name}</h4>
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold"
                    >
                      Open Live ↗
                    </a>
                  </div>
                </div>
              </div>
            )}

            {deviceMode === 'mobile' && (
              <div className="w-[260px] sm:w-[320px] rounded-[42px] bg-slate-900 border-[6px] border-slate-700/80 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
                {/* iPhone Dynamic Island */}
                <div className="bg-slate-950 pt-3 pb-2 flex items-center justify-center">
                  <div className="w-24 h-5 bg-black rounded-full border border-slate-800 flex items-center justify-between px-2">
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                    <div className="w-2 h-2 rounded-full bg-blue-500/60" />
                  </div>
                </div>
                <div className="relative aspect-[9/17] bg-slate-950 overflow-hidden">
                  <img
                    src={activeProject.previewImage}
                    alt={activeProject.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-cyan-300">iPhone 16 Pro Display</span>
                    <h4 className="text-sm font-bold text-white">{activeProject.name}</h4>
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 text-center rounded-xl bg-blue-600 text-white text-xs font-bold"
                    >
                      Launch Mobile Demo ↗
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Meta Bar under stage with Glass Design */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">Selected Demo</span>
            <h4 className="text-base font-bold text-white mt-0.5">{activeProject.name}</h4>
            <p className="text-xs text-slate-300 mt-1">{activeProject.description}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">Core Capabilities</span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {activeProject.highlights.map((h) => (
                <span key={h} className="text-[10px] bg-slate-950/80 text-cyan-300 border border-white/10 px-2 py-0.5 rounded-md font-mono">
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">Direct Action</span>
            <button
              type="button"
              onClick={() => onOpenProjectBrief?.(activeProject.name, activeProject.categoryLabel)}
              className="mt-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-950 min-h-[40px]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Build A Website Like This →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
