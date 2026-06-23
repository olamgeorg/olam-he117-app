import React from 'react';
import { Award, BookOpen, CheckCircle, RefreshCw, Star, Trophy } from 'lucide-react';
import { QuizAttempt, SectionProgress, QuizTheme } from '../types';
import { QUESTIONS } from '../data/questions';

interface StatsProgressProps {
  attempts: QuizAttempt[];
  onResetProgress: () => void;
  currentTheme?: QuizTheme;
}

export default function StatsProgress({ attempts, onResetProgress, currentTheme }: StatsProgressProps) {
  // Statistics computations
  const totalAttempts = attempts.length;
  const highScore = totalAttempts > 0 ? Math.max(...attempts.map(a => a.score)) : 0;
  
  // Aggregate overall answered questions
  let totalCorrectAllTime = 0;
  let totalAttemptedQuestionsAllTime = 0;
  attempts.forEach(attempt => {
    totalCorrectAllTime += attempt.score;
    totalAttemptedQuestionsAllTime += attempt.totalQuestions;
  });

  const overallMastery = totalAttemptedQuestionsAllTime > 0 
    ? Math.round((totalCorrectAllTime / totalAttemptedQuestionsAllTime) * 100) 
    : 0;

  // Compute breakdown by section
  const sections = [
    "Section A: Adolescent Health & Sexuality",
    "Section B: STIs & Pathogen Classification",
    "Section C: Stress & Coping Mechanisms",
    "Section D: Domestic & Urban Violence",
    "Section E: Flooding, Substances & Pollution"
  ];

  const sectionMetrics: SectionProgress[] = sections.map(secName => {
    const totalAvailable = QUESTIONS.filter(q => q.section.toLowerCase().includes(secName.substring(0, 15).toLowerCase())).length;
    
    // Calculate how many were answered correctly or attempted in history
    let correctCount = 0;
    let totalAnswered = 0;

    attempts.forEach(attempt => {
      const totalInAttempt = QUESTIONS.filter(q => q.section.toLowerCase().includes(secName.substring(0, 15).toLowerCase()));
      const incorrectInSec = attempt.incorrectAnswers.filter(inc => {
        const q = QUESTIONS.find(qy => qy.id === inc.questionId);
        return q && q.section.toLowerCase().includes(secName.substring(0, 15).toLowerCase());
      }).length;

      const attemptTotalQuestionsInSec = Math.min(totalInAttempt.length, attempt.totalQuestions); 
      const correctInSec = Math.max(0, attemptTotalQuestionsInSec - incorrectInSec);

      correctCount += correctInSec;
      totalAnswered += attemptTotalQuestionsInSec;
    });

    return {
      sectionName: secName,
      totalAnswered,
      correctCount,
      totalAvailable
    };
  });

  // Dynamic Theme Styling
  const textPrimary = currentTheme?.textPrimary || "text-white";
  const textSecondary = currentTheme ? `${currentTheme.textPrimary} opacity-80` : "text-white/70";
  const textMuted = currentTheme ? `${currentTheme.textPrimary} opacity-60` : "text-white/60";
  const borderCol = currentTheme ? "border-current/10" : "border-white/10";
  const statBoxBg = currentTheme ? "bg-black/5 dark:bg-white/5 border border-current/10" : "bg-white/10 dark:bg-slate-900/40 border border-white/10";
  const breakupBg = currentTheme ? `${currentTheme.cardBg} !p-5` : "bg-white/10 dark:bg-slate-900/30 p-5 rounded-2xl border border-white/10";

  return (
    <div className="space-y-6">
      {/* Visual Counters */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`${statBoxBg} p-4 rounded-xl text-center`}>
          <Trophy className="h-6 w-6 text-yellow-500 dark:text-yellow-400 mx-auto mb-1" />
          <span className={`block text-2xl font-black ${textPrimary}`}>{highScore}</span>
          <span className={`text-[10px] sm:text-xs ${textSecondary} uppercase font-bold tracking-wider block mt-1`}>High Score</span>
        </div>

        <div className={`${statBoxBg} p-4 rounded-xl text-center`}>
          <CheckCircle className="h-6 w-6 text-emerald-500 dark:text-emerald-400 mx-auto mb-1" />
          <span className={`block text-2xl font-black ${textPrimary}`}>{totalAttempts}</span>
          <span className={`text-[10px] sm:text-xs ${textSecondary} uppercase font-bold tracking-wider block mt-1`}>Attempts</span>
        </div>

        <div className={`${statBoxBg} p-4 rounded-xl text-center`}>
          <Star className="h-6 w-6 text-cyan-500 dark:text-cyan-400 mx-auto mb-1" />
          <span className={`block text-2xl font-black ${textPrimary}`}>{overallMastery}%</span>
          <span className={`text-[10px] sm:text-xs ${textSecondary} uppercase font-bold tracking-wider block mt-1`}>Mastery</span>
        </div>
      </div>

      {/* Sections breakdown */}
      <div className={breakupBg}>
        <div className="flex justify-between items-center mb-4">
          <h4 className={`font-bold ${textPrimary} text-sm uppercase tracking-wider flex items-center gap-2`}>
            <BookOpen className="h-4 w-4 text-yellow-500 dark:text-yellow-400" /> Syllabus Progress breakdown
          </h4>
          {totalAttempts > 0 && (
            <button
              onClick={onResetProgress}
              className="text-xs text-red-600 dark:text-red-200 hover:text-red-700 dark:hover:text-red-300 font-bold flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded transition-colors"
              title="Clear progress history"
              id="btn-reset-stats"
            >
              <RefreshCw className="h-3 w-3" /> Reset
            </button>
          )}
        </div>

        {totalAttempts === 0 ? (
          <div className={`text-center py-6 ${textSecondary} text-sm`}>
            No quiz sessions completed yet. Attempt a quiz in Exam or Practice mode to compile detailed syllabus segment maps!
          </div>
        ) : (
          <div className="space-y-4">
            {sectionMetrics.map((met, idx) => {
              const scorePercent = met.totalAnswered > 0 
                ? Math.round((met.correctCount / met.totalAnswered) * 100) 
                : 0;

              return (
                <div key={idx} className="space-y-1">
                  <div className={`flex justify-between text-xs font-semibold ${textPrimary}`}>
                    <span className="truncate max-w-[220px] sm:max-w-none">{met.sectionName}</span>
                    <span>{scorePercent}%</span>
                  </div>
                  <div className={`w-full ${currentTheme ? 'bg-black/10 dark:bg-white/10' : 'bg-white/10'} rounded-full h-2.5 overflow-hidden`}>
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        scorePercent >= 70 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                          : scorePercent >= 45 
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-500' 
                          : 'bg-gradient-to-r from-rose-500 to-red-600'
                      }`}
                      style={{ width: `${Math.max(5, scorePercent)}%` }}
                    />
                  </div>
                  <div className={`flex justify-between text-[10px] ${textMuted}`}>
                    <span>Course Content Available: {met.totalAvailable} High-Yield Exam Qs</span>
                    <span>{met.correctCount} correct / {met.totalAnswered} attempted</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
