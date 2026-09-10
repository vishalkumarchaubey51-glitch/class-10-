import React, { useRef, useState } from 'react';
import { Subject } from '../../types';
import { Calculator, Atom, Globe, BookOpen, Languages, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

interface Subject3DCardProps {
  subject: Subject;
  onClick: () => void;
}

export const Subject3DCard: React.FC<Subject3DCardProps> = ({ subject, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch (subject.id) {
      case 'mathematics': return <Calculator className="w-8 h-8 text-blue-400" />;
      case 'science': return <Atom className="w-8 h-8 text-emerald-400" />;
      case 'social-science': return <Globe className="w-8 h-8 text-amber-400" />;
      case 'english': return <BookOpen className="w-8 h-8 text-purple-400" />;
      case 'hindi': return <Languages className="w-8 h-8 text-pink-400" />;
      default: return <Sparkles className="w-8 h-8 text-blue-400" />;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="perspective-1000 w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="relative group cursor-pointer rounded-2xl p-6 bg-gradient-to-b from-slate-900/90 to-[#0f1422]/90 border border-slate-800 hover:border-brand-500/50 shadow-xl hover:shadow-2xl hover:shadow-brand-500/10 backdrop-blur-xl preserve-3d overflow-hidden"
      >
        {/* Dynamic glossy reflection */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + rotateY * 3}% ${50 - rotateX * 3}%, rgba(255,255,255,0.08), transparent 70%)`
          }}
        />

        {/* Ambient Subject Glow */}
        <div
          className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
          style={{ backgroundColor: subject.color }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Top section with 3D Pop icon */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: `linear-gradient(135deg, ${subject.color}22, ${subject.color}44)`,
                  transform: 'translateZ(30px)'
                }}
              >
                {getIcon()}
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                {subject.code}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-brand-300 transition-colors tracking-tight mb-2">
              {subject.name}
            </h3>

            <p className="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
              {subject.description}
            </p>
          </div>

          {/* Bottom stats & action */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: subject.color }} />
                {subject.chaptersCount} Chapters
              </span>
              <span className="text-slate-300 font-medium">
                500 MCQs / ch
              </span>
            </div>

            {/* Subject progress bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.round((subject.completedChapters / subject.chaptersCount) * 100)}%`,
                  backgroundColor: subject.color
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                {subject.completedChapters} of {subject.chaptersCount} Done
              </span>

              <span className="inline-flex items-center text-xs font-semibold text-brand-400 group-hover:text-brand-300 group-hover:translate-x-1 transition-all">
                Explore Chapters <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
