import React, { useState, useEffect, useRef } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  HelpCircle,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronRight,
  Sparkles,
  Info,
  XCircle,
  BookMarked,
  ArrowRight,
  Flame,
  Home,
  MessageSquareCode,
  Megaphone,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import Types, Questions & Themes
import { Question, QuizAttempt, QuizMode, QuizTheme } from './types';
import { QUESTIONS } from './data/questions';
import { THEMES } from './data/themes';
import { audioFeedback } from './utils/AudioFeedback';

// Import Sub-components
import StudyPortalCard from './components/StudyPortalCard';
import StatsProgress from './components/StatsProgress';

export default function App() {
  // --- Persistent States ---
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [currentTheme, setCurrentTheme] = useState<QuizTheme>(THEMES[0]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(false);

  // --- Active Quiz Session States ---
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [quizMode, setQuizMode] = useState<QuizMode>('practice');
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [questionCountLimit, setQuestionCountLimit] = useState<number>(15);
  
  // Quiz running variables
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  
  // Answers recorded during this current session
  const [answers, setAnswers] = useState<(number | null)[]>([]); // null means skipped
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  
  // Timer for exam mode
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Summary results state
  const [showResults, setShowResults] = useState<boolean>(false);
  const [lastAttemptId, setLastAttemptId] = useState<string | null>(null);

  // --- Initialization & LocalStorage Synch ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hee117_quiz_progress_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.attempts) setAttempts(parsed.attempts);
        if (parsed.themeId) {
          const matchingTheme = THEMES.find(t => t.id === parsed.themeId);
          if (matchingTheme) setCurrentTheme(matchingTheme);
        }
        if (parsed.soundEnabled !== undefined) {
          setSoundEnabled(parsed.soundEnabled);
          audioFeedback.setSoundEnabled(parsed.soundEnabled);
        }
        if (parsed.ttsEnabled !== undefined) {
          setTtsEnabled(parsed.ttsEnabled);
        }
      }
    } catch (e) {
      console.warn("Could not read progress from localStorage", e);
    }
    
    // Select all sections by default
    const sections = Array.from(new Set(QUESTIONS.map(q => q.section)));
    setSelectedSections(sections);
  }, []);

  const saveProgress = (newAttempts: QuizAttempt[], themeId: string, sound: boolean, tts: boolean) => {
    try {
      localStorage.setItem('hee117_quiz_progress_v2', JSON.stringify({
        attempts: newAttempts,
        themeId,
        soundEnabled: sound,
        ttsEnabled: tts
      }));
    } catch (e) {
      console.warn("Could not save progress to localStorage", e);
    }
  };

  // --- Theme Change Handler ---
  const handleThemeChange = (theme: QuizTheme) => {
    setCurrentTheme(theme);
    saveProgress(attempts, theme.id, soundEnabled, ttsEnabled);
  };

  // --- Sound Toggle Handler ---
  const toggleSound = () => {
    const nextSound = !soundEnabled;
    setSoundEnabled(nextSound);
    audioFeedback.setSoundEnabled(nextSound);
    saveProgress(attempts, currentTheme.id, nextSound, ttsEnabled);
  };

  // --- TTS Toggle Handler ---
  const toggleTts = () => {
    const nextTts = !ttsEnabled;
    setTtsEnabled(nextTts);
    saveProgress(attempts, currentTheme.id, soundEnabled, nextTts);
    // cancel any speech currently running
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // --- Speak text assistant helper ---
  const speakText = (text: string) => {
    if (!ttsEnabled || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel(); // Stop anything playing
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95; // clean, clear speed for lecturing
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("TTS narration error:", e);
    }
  };

  // --- Progress Reset Handler ---
  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to clear your entire HEE117 quiz scoring history? This cannot be undone.")) {
      setAttempts([]);
      saveProgress([], currentTheme.id, soundEnabled, ttsEnabled);
    }
  };

  // --- Start Quiz Session ---
  const handleStartQuiz = () => {
    if (selectedSections.length === 0) {
      alert("Please select at least one syllabus section to build your quiz!");
      return;
    }

    // Filter questions matching current section selections
    let pool = QUESTIONS.filter(q => 
      selectedSections.some(sec => q.section.toLowerCase().includes(sec.substring(0, 15).toLowerCase()))
    );

    if (pool.length === 0) {
      alert("No questions matched your current selection criteria.");
      return;
    }

    // Shuffle pool completely for dynamic variety
    pool = [...pool].sort(() => Math.random() - 0.5);

    // Limit count
    const finalCount = Math.min(questionCountLimit, pool.length);
    const sessionQuestions = pool.slice(0, finalCount);

    setActiveQuestions(sessionQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setAnswers(new Array(finalCount).fill(null));
    setSessionStartTime(Date.now());
    setShowResults(false);
    setQuizActive(true);

    // TTS introduction narration
    speakText(`Starting ${quizMode === 'exam' ? 'Exam' : 'Practice'} mode quiz. Good luck! Question 1.`);

    // Set countdown timer for Exam Mode (45 seconds per question average)
    if (quizMode === 'exam') {
      const examDuration = finalCount * 45; // 45s per question
      setTimeLeft(examDuration);
      
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            // Auto submit when countdown reaches zero
            handleFinishQuiz(true); // force finish
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  // --- Option Selection Logic ---
  const handleSelectOption = (index: number) => {
    if (quizMode === 'practice' && isAnswered) return; // Ignore clicks if already locked in practice
    
    setSelectedOption(index);

    if (quizMode === 'practice') {
      // Locked immediately in practice mode
      setIsAnswered(true);
      const updated = [...answers];
      updated[currentIndex] = index;
      setAnswers(updated);

      const q = activeQuestions[currentIndex];
      const correct = index === q.correctIndex;
      
      // Play Synthesized Auditory Feedback immediately "add to tone..."
      if (correct) {
        audioFeedback.playCorrect();
        speakText("Correct answer. " + q.explanation);
      } else {
        audioFeedback.playIncorrect();
        speakText("Incorrect choice. The correct answer is option " + (q.correctIndex + 1) + ". " + q.explanation);
      }
    } else {
      // In Exam Mode, just record selection, but allow user to change answer before clicking "Next"
      const updated = [...answers];
      updated[currentIndex] = index;
      setAnswers(updated);
      
      // Play a neutral slide click so user knows they clicked it
      // but without revealing correctness
      if (soundEnabled) {
        try {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            const ctx = new AudioContextClass();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.setValueAtTime(450, ctx.currentTime);
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
          }
        } catch {}
      }
    }
  };

  // --- Next / Skip / Navigation controls ---
  const handleNextQuestion = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    if (currentIndex + 1 < activeQuestions.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      
      // Pre-populate if already answered (e.g. in Exam mode navigating back/forth)
      const existingAns = answers[nextIdx];
      setSelectedOption(existingAns);
      setIsAnswered(quizMode === 'practice' ? existingAns !== null : false);

      // speak next question text
      speakText(`Question ${nextIdx + 1}. ${activeQuestions[nextIdx].questionText}`);
    } else {
      // All questions completed! Compile results
      handleFinishQuiz();
    }
  };

  const handleSkipQuestion = () => {
    const updated = [...answers];
    updated[currentIndex] = null; // Marked as skipped
    setAnswers(updated);

    if (currentIndex + 1 < activeQuestions.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedOption(answers[nextIdx]);
      setIsAnswered(quizMode === 'practice' ? answers[nextIdx] !== null : false);
      speakText(`Question ${nextIdx + 1}. ${activeQuestions[nextIdx].questionText}`);
    } else {
      handleFinishQuiz();
    }
  };

  // --- Finish Session and Compile Statistics ---
  const handleFinishQuiz = (timerExpired = false) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // Compute final correctness details
    let correctCount = 0;
    const incorrectList: { questionId: string; selectedOptionIndex: number }[] = [];

    activeQuestions.forEach((q, idx) => {
      const userAns = answers[idx];
      if (userAns === q.correctIndex) {
        correctCount++;
      } else {
        incorrectList.push({
          questionId: q.id,
          selectedOptionIndex: userAns === null ? -1 : userAns
        });
      }
    });

    const duration = Math.round((Date.now() - sessionStartTime) / 1000);
    const newAttemptId = "attempt_" + Date.now();

    const newAttempt: QuizAttempt = {
      id: newAttemptId,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      mode: quizMode,
      score: correctCount,
      totalQuestions: activeQuestions.length,
      incorrectAnswers: incorrectList,
      durationSeconds: duration,
      completed: true
    };

    const updatedAttempts = [newAttempt, ...attempts];
    setAttempts(updatedAttempts);
    setLastAttemptId(newAttemptId);
    setQuizActive(false);
    setShowResults(true);

    saveProgress(updatedAttempts, currentTheme.id, soundEnabled, ttsEnabled);

    // Speak scoring overview narration
    const percent = Math.round((correctCount / activeQuestions.length) * 100);
    speakText(`Quiz complete. You scored ${correctCount} out of ${activeQuestions.length}. That is ${percent} percent.`);
  };

  // --- Section Checklist Toggle ---
  const handleToggleSection = (secName: string) => {
    if (selectedSections.includes(secName)) {
      setSelectedSections(selectedSections.filter(s => s !== secName));
    } else {
      setSelectedSections([...selectedSections, secName]);
    }
  };

  // --- Quit Active Quiz Session and clean up ---
  const handleQuitQuiz = () => {
    if (window.confirm("Are you sure you want to exit your active quiz? Your progress for this session will not be saved.")) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setQuizActive(false);
    }
  };

  // Retrieve current active stats
  const activeAttempt = lastAttemptId ? attempts.find(a => a.id === lastAttemptId) : null;
  const sectionsAvailable = Array.from(new Set(QUESTIONS.map(q => q.section)));

  // Theme support helpers
  const textPrimary = currentTheme?.textPrimary || "text-white";
  const textSecondary = currentTheme ? `${currentTheme.textPrimary} opacity-80` : "text-white/80";
  const textMuted = currentTheme ? `${currentTheme.textPrimary} opacity-60` : "text-white/60";
  const borderCol = currentTheme ? "border-current/10" : "border-white/10";
  const elementBg = currentTheme ? "bg-black/5 dark:bg-white/5 border border-current/10" : "bg-white/10 dark:bg-slate-900/40 border border-white/10";

  return (
    <div className={`${currentTheme.bodyBg} transition-colors duration-500 font-sans p-3 sm:p-6 md:p-8 flex flex-col justify-between relative overflow-x-hidden`}>
      
      {/* Decorative ambient background design layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-40">
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl transition-colors duration-1000 ${
          currentTheme.id === 'warm-amber' ? 'bg-[#ffdda1]/30' :
          currentTheme.id === 'soft-sage' ? 'bg-[#c3decb]/45' :
          currentTheme.id === 'paperbook-sepia' ? 'bg-[#ecd8c2]/50' :
          currentTheme.id === 'vibrant-indigo' ? 'bg-indigo-300/30' :
          currentTheme.id === 'midnight-dim' ? 'bg-indigo-950/40' : 'bg-yellow-300/10'
        }`} />
        <div className={`absolute bottom-10 right-1/4 w-96 h-96 rounded-full blur-3xl transition-colors duration-1000 ${
          currentTheme.id === 'warm-amber' ? 'bg-[#ffcca1]/20' :
          currentTheme.id === 'soft-sage' ? 'bg-[#bcccbf]/30' :
          currentTheme.id === 'paperbook-sepia' ? 'bg-[#e5cca1]/40' :
          currentTheme.id === 'vibrant-indigo' ? 'bg-purple-300/30' :
          currentTheme.id === 'midnight-dim' ? 'bg-blue-950/30' : 'bg-pink-300/10'
        }`} />
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* --- HEADER --- */}
      <header className={`max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b pb-4 z-10 ${borderCol}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 w-12 h-12 rounded-xl flex items-center justify-center border ${currentTheme ? 'bg-black/5 dark:bg-white/10 border-current/10' : 'bg-white/10 border-white/20'}`}>
            <Flame className={`h-7 w-7 animate-pulse ${currentTheme.id.includes('vibrant') || currentTheme.id === 'midnight-dim' ? 'text-yellow-400' : 'text-amber-600'}`} />
          </div>
          <div>
            <h1 className={`text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5 ${textPrimary}`}>
              <span>HEE117 Quiz Hub</span>
              <span className={`text-xs px-2 py-0.5 rounded font-extrabold tracking-widest uppercase ${currentTheme.id.includes('vibrant') || currentTheme.id === 'midnight-dim' ? 'bg-yellow-400 text-slate-900' : 'bg-amber-600 text-white'}`}>
                {currentTheme.name.split(' ')[0]}
              </span>
            </h1>
            <p className={`text-xs ${textSecondary}`}>
              Exam practice for Scientific Study of Human Behaviour developed by <strong className="text-yellow-500 dark:text-yellow-300">Olamidegeorge</strong>
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          {/* Audio effect toggle */}
          <button
            onClick={toggleSound}
            className={`p-2.5 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/40 text-emerald-600 dark:text-emerald-300'
                : currentTheme ? 'bg-black/5 dark:bg-white/5 border-current/10 text-current/40 hover:bg-black/10' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/40 font-bold'
            }`}
            title={soundEnabled ? "Mute audio indicator tones" : "Enable audio indicator tones"}
            id="btn-toggle-sound"
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>

          {/* TTS narration lector toggle */}
          <button
            onClick={toggleTts}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 ${
              ttsEnabled
                ? 'bg-yellow-500/25 hover:bg-yellow-500/35 border-yellow-500/40 text-yellow-600 dark:text-yellow-300'
                : currentTheme ? 'bg-black/5 dark:bg-white/5 border-current/10 text-current/50 hover:bg-black/10' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/50'
            }`}
            title={ttsEnabled ? "Disable lecture speech readout" : "Enable lecture speech readout"}
            id="btn-toggle-tts"
          >
            <Megaphone className="h-5 w-5" />
            <span className="text-[10px] uppercase font-black tracking-wider hidden sm:inline">Dictate Voice</span>
          </button>

          {/* Return home if active */}
          {quizActive && (
            <button
              onClick={handleQuitQuiz}
              className="px-3 py-1.5 bg-red-600/20 text-red-200 border border-red-500/30 hover:bg-red-600/30 rounded-xl text-xs font-bold transition-all"
              id="btn-quit-header"
            >
              Exit Quit
            </button>
          )}
        </div>
      </header>

      {/* --- MAIN STAGE --- */}
      <main className="max-w-4xl mx-auto w-full flex-grow flex flex-col justify-center">
        
        {/* VIEW 1: ACTIVE QUIZ VIEW */}
        {quizActive ? (
          <div className="space-y-6">
            
            {/* Upper Status Line */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-black/5 dark:bg-black/20 p-4 rounded-2xl border border-black/10 dark:border-white/5">
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-black/5 dark:bg-white/15 text-[10px] uppercase font-black tracking-widest text-amber-750 dark:text-yellow-300 rounded mb-1">
                  {activeQuestions[currentIndex].section}
                </span>
                <h4 className={`text-xs ${textSecondary} font-medium`}>
                  Syllabus Area: <span className={`${textPrimary} font-bold`}>{activeQuestions[currentIndex].category}</span>
                </h4>
              </div>

              {/* Mode & timer details */}
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-1 bg-yellow-400 text-slate-900 rounded">
                  {quizMode.toUpperCase()} MODE
                </span>

                {quizMode === 'exam' ? (
                  <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-300 font-mono text-sm font-bold bg-rose-500/15 border border-rose-500/35 px-3 py-1 rounded-lg">
                    <Clock className="h-4 w-4 animate-spin" />
                    <span>
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                ) : (
                  <div className={`text-xs ${textMuted} uppercase font-black tracking-wider`}>
                    Untimed Learning
                  </div>
                )}
              </div>
            </div>

            {/* Questions Progress Indicator */}
            <div className="space-y-2">
              <div className={`flex justify-between text-xs ${textSecondary} font-bold`}>
                <span>Progress Tracker: Card {currentIndex + 1} of {activeQuestions.length}</span>
                <span>{Math.round(((currentIndex + 1) / activeQuestions.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-rose-450 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Main Stage Question Container */}
            <div className={`${currentTheme.cardBg} rounded-3xl p-6 sm:p-8 space-y-6 md:space-y-8 z-10 relative`}>
              
              {/* Question Text with larger sizing for phones */}
              <div className="space-y-2">
                <div className="text-xs uppercase font-black tracking-wider text-amber-600 dark:text-yellow-300/80 flex items-center gap-1">
                  <HelpCircle className="h-4 w-4" /> University Exam Multiple Choice Question
                </div>
                {/* Responsive text: bigger for phones */}
                <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${textPrimary} leading-relaxed`}>
                  {activeQuestions[currentIndex].questionText}
                </h2>
              </div>

              {/* Options Grid (stacks vertically on small screens, buttons are full width) */}
              <div className="flex flex-col gap-3">
                {activeQuestions[currentIndex].options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = optIdx === activeQuestions[currentIndex].correctIndex;
                  
                  // Style configurations
                  let btnStyle = "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 text-current";
                  
                  if (quizMode === 'practice' && isAnswered) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-500/20 dark:bg-emerald-500/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold ring-2 ring-emerald-400";
                    } else if (isSelected) {
                      btnStyle = "bg-red-500/20 dark:bg-red-500/40 border-red-500 text-red-800 dark:text-red-200 ring-2 ring-red-500";
                    } else {
                      btnStyle = "opacity-50 text-current/60 border-current/10";
                    }
                  } else if (isSelected) {
                    btnStyle = "bg-yellow-400 text-slate-900 border-yellow-300 ring-4 ring-yellow-400/30 font-bold";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`text-left w-full p-4 sm:p-5 rounded-2xl border text-base sm:text-lg transition-all duration-200 cursor-pointer min-h-[54px] flex items-center justify-between gap-3 ${btnStyle}`}
                      id={`opt-btn-${optIdx}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl text-xs sm:text-sm font-black ${
                          isSelected 
                            ? 'bg-slate-900 text-yellow-400' 
                            : 'bg-black/10 dark:bg-white/15 text-current'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>

                      {/* Display correct/incorrect icons in practice mode */}
                      {quizMode === 'practice' && isAnswered && (
                        <div>
                          {isCorrect && <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />}
                          {!isCorrect && isSelected && <XCircle className="h-5 w-5 text-red-600 dark:text-red-300" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanations (Practice mode only - visual assistance after answering) */}
              <AnimatePresence>
                {quizMode === 'practice' && isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 bg-yellow-400/10 dark:bg-yellow-400/5 border border-yellow-300/20 rounded-2xl text-xs sm:text-sm leading-relaxed text-amber-950 dark:text-yellow-100"
                  >
                    <div className="flex items-center gap-1.5 font-black text-amber-700 dark:text-yellow-300 tracking-wider text-xs uppercase mb-1">
                      <BookMarked className="h-4 w-4" /> Curriculum Syllabus Lesson Reference
                    </div>
                    <p>{activeQuestions[currentIndex].explanation}</p>
                    {ttsEnabled && (
                      <button
                        onClick={() => speakText(activeQuestions[currentIndex].explanation)}
                        className="mt-3 text-[10px] uppercase font-black tracking-widest px-3 py-1 bg-yellow-400 text-slate-950 rounded hover:bg-yellow-300 transition-colors"
                        id="btn-speak-explanation"
                      >
                        Listen Explanation
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
                <button
                  onClick={handleQuitQuiz}
                  className={`w-full sm:w-auto px-5 py-3 ${currentTheme ? `${currentTheme.textPrimary} opacity-75 hover:opacity-100` : 'text-white/70 hover:text-white'} rounded-xl text-xs uppercase font-extrabold tracking-wider cursor-pointer text-center`}
                  id="btn-quit-session"
                >
                  Quit Active
                </button>

                <div className="flex gap-2 w-full sm:w-auto">
                  {/* Skip is allowed in untimed Practice, or always in Exam mode */}
                  {(!isAnswered && quizMode === 'practice') || quizMode === 'exam' ? (
                    <button
                      onClick={handleSkipQuestion}
                      className={`flex-1 sm:flex-initial px-5 py-3 border rounded-xl text-xs uppercase font-extrabold tracking-wider whitespace-nowrap text-center cursor-pointer ${
                        currentTheme 
                          ? 'border-current/20 bg-black/5 dark:bg-white/5 text-current hover:bg-black/10 dark:hover:bg-white/10' 
                          : 'border-white/20 bg-white/5 hover:bg-white/10 text-white'
                      }`}
                      id="btn-skip-question"
                    >
                      Skip Card
                    </button>
                  ) : null}

                  {/* Next / Submit */}
                  <button
                    onClick={handleNextQuestion}
                    disabled={quizMode === 'practice' && !isAnswered}
                    className={`flex-1 sm:flex-initial px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                      quizMode === 'practice' && !isAnswered
                        ? (currentTheme ? 'bg-black/10 text-current/30 border border-current/5 cursor-not-allowed' : 'bg-white/10 text-white/30 border border-white/5 cursor-not-allowed')
                        : currentTheme.buttonActive
                    }`}
                    id="btn-next-question"
                  >
                    <span>
                      {currentIndex + 1 === activeQuestions.length
                        ? 'Submit Finished'
                        : 'Next Question'}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        ) : showResults && activeAttempt ? (
          
          // VIEW 2: DETAILED RESULTS AND INCORRECT ANSWER REVIEW HUB
          <div className="space-y-6">
            
            {/* Upper scoring overview */}
            <div className="text-center space-y-3 bg-black/5 dark:bg-black/20 p-6 sm:p-8 rounded-3xl border border-black/10 dark:border-white/10">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 font-extrabold uppercase rounded-full text-xs tracking-wider">
                Exams Session Finished
              </span>
              <h2 className={`text-3xl sm:text-4xl font-extrabold ${textPrimary}`}>Your HEE117 Result Overview</h2>
              
              {/* Dynamic responsive Score circle */}
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center mt-4">
                <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-full border-4 border-dashed border-black/10 dark:border-white/15 animate-spin-slow" />
                <div className="text-center">
                  <span className={`text-5xl font-black ${textPrimary}`}>{activeAttempt.score}</span>
                  <span className={`${textSecondary} block text-xs border-t ${borderCol} mt-1 pt-1`}>
                    out of {activeAttempt.totalQuestions}
                  </span>
                </div>
              </div>

              {/* Course Assessment feedback Grade */}
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-amber-600 dark:text-yellow-300">
                  Grade assessment:{' '}
                  {Math.round((activeAttempt.score / activeAttempt.totalQuestions) * 100) >= 80 ? 'Excellent - A (Distinction)' :
                   Math.round((activeAttempt.score / activeAttempt.totalQuestions) * 100) >= 65 ? 'Very Good - B (Refined)' :
                   Math.round((activeAttempt.score / activeAttempt.totalQuestions) * 100) >= 50 ? 'Credit Pass - C' :
                   Math.round((activeAttempt.score / activeAttempt.totalQuestions) * 100) >= 40 ? 'Pass - D' :
                   'Referral Required - F (Incomplete STUDY REQUIRED)'}
                </h3>
                <p className={`text-xs sm:text-sm ${textSecondary}`}>
                  Completed in <strong className={textPrimary}>{Math.floor(activeAttempt.durationSeconds / 60)}m {activeAttempt.durationSeconds % 60}s</strong> in {activeAttempt.mode} mode.
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-3">
                <button
                  onClick={() => setShowResults(false)}
                  className="px-5 py-2.5 bg-yellow-400 text-slate-900 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-yellow-300 transition-all flex items-center gap-1.5 cursor-pointer"
                  id="btn-return-dashboard"
                >
                  <Home className="h-4 w-4" /> Portal Hub
                </button>
                <button
                  onClick={handleStartQuiz}
                  className={`px-5 py-2.5 bg-black/10 dark:bg-white/10 text-current border ${borderCol} font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-black/20 dark:hover:bg-white/20 transition-all flex items-center gap-1.5 cursor-pointer`}
                  id="btn-retake-quiz"
                >
                  <RotateCcw className="h-4 w-4" /> Retake Same Quiz
                </button>
              </div>
            </div>

            {/* Detailed spreadsheet incorrect answers review board */}
            <div className="space-y-4">
              <div className={`flex items-center justify-between border-b pb-2 ${borderCol}`}>
                <h3 className={`font-extrabold ${textPrimary} text-base sm:text-lg flex items-center gap-2`}>
                  <BookOpen className="h-5 w-5 text-amber-600 dark:text-yellow-400" /> Complete Correction & Review Board
                </h3>
                <span className="text-xs bg-red-500/15 dark:bg-red-500/20 text-red-700 dark:text-red-200 px-3 py-1 rounded-full border border-red-500/30">
                  {activeAttempt.incorrectAnswers.length} mistakes corrected
                </span>
              </div>

              {activeAttempt.incorrectAnswers.length === 0 ? (
                <div className="bg-emerald-550/10 border border-emerald-500/20 rounded-2xl p-6 text-center text-emerald-600 dark:text-emerald-300 space-y-2">
                  <Award className="h-10 w-10 mx-auto" />
                  <h4 className="font-bold text-lg">Pristine Score! 100% Accuracy!</h4>
                  <p className={`text-xs max-w-md mx-auto ${textSecondary}`}>
                    You answered every single question correctly. You are fully prepared to secure an outstanding score in the HEE117 university examination!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeAttempt.incorrectAnswers.map((inc, index) => {
                    const q = QUESTIONS.find(qy => qy.id === inc.questionId);
                    if (!q) return null;

                    return (
                      <div
                        key={index}
                        className={`bg-black/5 dark:bg-slate-900/40 backdrop-blur-sm rounded-2xl p-5 border ${borderCol} space-y-3`}
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-amber-600 dark:text-yellow-400 font-bold uppercase tracking-wider">
                            {q.section}
                          </span>
                          <span className={textMuted}>{q.category}</span>
                        </div>

                        {/* Question title */}
                        <h4 className={`text-base sm:text-lg font-extrabold ${textPrimary} leading-snug`}>
                          {q.questionText}
                        </h4>

                        {/* Comparison of answers */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-1">
                          <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <span className="text-red-600 dark:text-red-400 uppercase font-black text-[10px] tracking-wider block mb-1">
                              Your answer selection
                            </span>
                            <div className="text-red-900 dark:text-red-200 font-medium">
                              {inc.selectedOptionIndex === -1 
                                ? "Skipped (No Option Locked)" 
                                : q.options[inc.selectedOptionIndex]
                              }
                            </div>
                          </div>

                          <div className="p-3.5 bg-emerald-550/10 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <span className="text-emerald-600 dark:text-emerald-400 uppercase font-black text-[10px] tracking-wider block mb-1">
                              Correct verified answer
                            </span>
                            <div className="text-emerald-800 dark:text-emerald-250 font-medium">
                              {q.options[q.correctIndex]}
                            </div>
                          </div>
                        </div>

                        {/* Correction lesson explanation text block */}
                        <div className="p-4 bg-yellow-400/5 rounded-xl border border-yellow-400/10 text-xs sm:text-sm text-amber-950 dark:text-yellow-100/90 leading-relaxed">
                          <span className="text-amber-700 dark:text-yellow-400 font-extrabold uppercase text-[10px] block tracking-wide mb-1">
                            HEE117 Lesson Corrective Explanation:
                          </span>
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Return Hub footer button */}
            <div className="pt-4 text-center">
              <button
                onClick={() => setShowResults(false)}
                className="w-full sm:w-auto px-8 py-3.5 bg-yellow-400 text-slate-900 font-extrabold rounded-2xl text-xs uppercase tracking-widest hover:bg-yellow-300 transition-all cursor-pointer"
                id="btn-footer-return"
              >
                Go Back to portal dashboard
              </button>
            </div>

          </div>
        ) : (
          
          // VIEW 3: DYNAMIC PORTAL HOME DASHBOARD & SETUP PANEL
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Setup Options Widget - takes 7 columns */}
            <div className={`${currentTheme.cardBg} rounded-3xl p-6 sm:p-8 md:col-span-7 space-y-6 z-10 relative`}>
              
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-700 dark:text-yellow-300 px-2 py-0.5 bg-black/5 dark:bg-white/10 rounded">
                  Syllabus Exam Configurator
                </span>
                <h2 className={`text-2xl font-black ${textPrimary}`}>Configure Exam Session</h2>
                <p className={`text-xs ${textSecondary}`}>
                  Model questions sectionally to test your HEE117 curriculum retention.
                </p>
              </div>

              {/* Theme Settings Selection Bar */}
              <div className={`space-y-2 border-t pt-4 ${borderCol}`}>
                <label className={`text-xs uppercase font-extrabold tracking-wider ${textPrimary} opacity-90`}>
                  Personalize Background Color (Eye Comfort Themes)
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {THEMES.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                        currentTheme.id === theme.id
                          ? 'border-yellow-500 bg-yellow-400 text-slate-950 ring-2 ring-yellow-400/40 font-extrabold shadow-sm'
                          : 'border-current/10 bg-black/5 dark:bg-black/20 text-current opacity-80 hover:bg-black/10 dark:hover:bg-black/30'
                      }`}
                      id={`theme-btn-${theme.id}`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full border border-black/10 ${theme.previewColor}`} />
                      <span>{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Mode Selector */}
              <div className={`space-y-2 border-t pt-4 ${borderCol}`}>
                <label className={`text-xs uppercase font-extrabold tracking-wider ${textPrimary} opacity-95 block`}>
                  Select Training Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  
                  {/* Practice Mode */}
                  <button
                    onClick={() => setQuizMode('practice')}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      quizMode === 'practice'
                        ? 'bg-yellow-400 text-slate-950 border-yellow-300 ring-4 ring-yellow-400/20 font-bold'
                        : 'bg-black/5 dark:bg-black/25 text-current/80 border-current/10 hover:bg-black/10 dark:hover:bg-black/35'
                    }`}
                    id="btn-mode-practice"
                  >
                    <span className="block font-black text-sm uppercase tracking-wide">Practice Mode</span>
                    <span className="text-[10px] leading-tight block mt-1 opacity-80">
                      Immediate sound feedbacks, visible curriculum references on each click.
                    </span>
                  </button>

                  {/* Exam Mode */}
                  <button
                    onClick={() => setQuizMode('exam')}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      quizMode === 'exam'
                        ? 'bg-yellow-400 text-slate-950 border-yellow-300 ring-4 ring-yellow-400/20 font-bold'
                        : 'bg-black/5 dark:bg-black/25 text-current/80 border-current/10 hover:bg-black/10 dark:hover:bg-black/35'
                    }`}
                    id="btn-mode-exam"
                  >
                    <span className="block font-black text-sm uppercase tracking-wide">Exam Mode</span>
                    <span className="text-[10px] leading-tight block mt-1 opacity-80">
                      Hides instant answer stats, timed environment with complete final scoreboard review.
                    </span>
                  </button>

                </div>
              </div>

              {/* Section Selectors - separate questions sectionally classily! */}
              <div className={`space-y-2 border-t pt-4 ${borderCol}`}>
                <label className={`text-xs uppercase font-extrabold tracking-wider ${textPrimary} block`}>
                  Select Syllabus Chapters (Separate Sectionally)
                </label>
                <div className="space-y-2 pt-1 text-sm">
                  {sectionsAvailable.map((sec, idx) => {
                    const isChecked = selectedSections.includes(sec);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleToggleSection(sec)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                          isChecked 
                            ? 'bg-black/5 dark:bg-white/10 border-yellow-500/50 dark:border-yellow-400/50 text-current font-bold font-semibold' 
                            : 'bg-black/10 dark:bg-black/15 border-current/5 text-current/60 hover:bg-black/15'
                        }`}
                        id={`sec-sel-${idx}`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            className="h-4.5 w-4.5 rounded text-yellow-400 accent-yellow-400 cursor-pointer"
                          />
                          <span className="font-semibold text-xs sm:text-sm">{sec}</span>
                        </div>
                        <span className="text-[10px] font-black uppercase bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded text-current/80">
                          {QUESTIONS.filter(q => q.section === sec).length} Qs
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Count Limit Selector */}
              <div className={`space-y-2 border-t pt-4 ${borderCol}`}>
                <label className={`text-xs uppercase font-extrabold tracking-wider ${textPrimary} block`}>
                  Limit Question Cards Count
                </label>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {[5, 10, 15, 20, 35].map(limit => (
                    <button
                      key={limit}
                      onClick={() => setQuestionCountLimit(limit)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        questionCountLimit === limit
                          ? 'bg-yellow-400 text-slate-900 border border-yellow-300 font-bold'
                          : 'bg-black/5 dark:bg-black/20 hover:bg-black/10 dark:hover:bg-black/35 text-current border border-current/10'
                      }`}
                      id={`limit-btn-${limit}`}
                    >
                      {limit === 35 ? 'ALL (35 Qs)' : `${limit} Questions`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start CTA Button - large target, full width */}
              <div className="pt-2">
                <button
                  onClick={handleStartQuiz}
                  className={`w-full py-4.5 rounded-2xl font-black text-sm uppercase tracking-widest text-center cursor-pointer transition-all flex items-center justify-center gap-2 ${currentTheme.buttonActive}`}
                  id="btn-launch-quiz"
                >
                  <Play className="h-5 w-5 fill-current" />
                  <span>Launch Course Simulator</span>
                </button>
              </div>

            </div>

            {/* Sidebar with Stats and Olamidegeorge information - takes 5 columns */}
            <div className="md:col-span-5 space-y-6">
              
              {/* Stats component */}
              <StatsProgress 
                attempts={attempts} 
                onResetProgress={handleResetProgress} 
                currentTheme={currentTheme}
              />

              {/* Customizing Olamidegeorge link */}
              <StudyPortalCard currentTheme={currentTheme} />

            </div>

          </div>
        )}

      </main>

      {/* --- FOOTER --- */}
      <footer className={`max-w-4xl mx-auto w-full text-center text-[10px] ${textMuted} mt-10 pt-4 border-t ${borderCol} z-10 relative`}>
        <p>© 2026 HEE117 Exam Simulator Hub. All student content verified to 2nd Semester course syllabus.</p>
        <p className="mt-1">
          Developed by Olamidegeorge. High contrast, mobile stacked layout ready.
        </p>
      </footer>

    </div>
  );
}
