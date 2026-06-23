import React from 'react';
import { Award, BookOpen, GraduationCap, Link2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { QuizTheme } from '../types';

interface StudyPortalCardProps {
  currentTheme?: QuizTheme;
}

export default function StudyPortalCard({ currentTheme }: StudyPortalCardProps) {
  // Custom classes for perfect legibility in light/comfort vs dark/vibrant modes
  const cardBgCls = currentTheme 
    ? `${currentTheme.cardBg} !p-6` 
    : "bg-white/10 dark:bg-slate-900/35 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl";

  const textPrimary = currentTheme?.textPrimary || "text-white";
  const textSecondary = currentTheme ? `${currentTheme.textPrimary} opacity-80` : "text-white/80";
  const textMuted = currentTheme ? `${currentTheme.textPrimary} opacity-60` : "text-white/70";
  const borderCol = currentTheme ? "border-current/10" : "border-white/10";
  const pillBg = currentTheme ? "bg-black/5 dark:bg-white/5 text-current/80 border border-current/10" : "bg-white/10 text-white/90";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cardBgCls}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="p-3 bg-gradient-to-tr from-yellow-400 via-orange-500 to-rose-600 rounded-2xl shadow-md text-white shrink-0">
          <GraduationCap className="h-8 w-8" />
        </div>
        <div>
          <h3 className={`text-xl font-bold tracking-tight ${textPrimary} flex items-center justify-center sm:justify-start gap-1.5`}>
            HEE117 Study Portal
            <span className="text-xs bg-yellow-400/90 text-slate-900 font-extrabold px-2 py-0.5 rounded-full uppercase shrink-0">
              100L
            </span>
          </h3>
          <p className={`text-sm ${textSecondary} mt-1`}>
            Developed by{' '}
            <span className="font-extrabold text-yellow-500 dark:text-yellow-300">Olamidegeorge</span>
          </p>
        </div>
      </div>

      <div className={`mt-4 pt-4 border-t ${borderCol}`}>
        <p className={`text-xs ${textMuted} leading-relaxed mb-3`}>
          This hub provides a rigorous and accurate exam simulator modeled precisely after the university examination for{' '}
          <strong className="font-bold">HEE117: Scientific Study of Human Behaviour</strong>. Every question conforms exactly to the second semester 100-Level course outlines.
        </p>
        
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1 ${pillBg}`}>
            <BookOpen className="h-3 w-3" /> HEE117 Scope
          </span>
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1 ${pillBg}`}>
            <ShieldCheck className="h-3 w-3" /> 100% Accurate
          </span>
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1 ${pillBg}`}>
            <Award className="h-3 w-3" /> Olamidegeorge
          </span>
        </div>
      </div>
    </motion.div>
  );
}
