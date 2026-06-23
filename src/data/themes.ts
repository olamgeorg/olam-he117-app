import { QuizTheme } from '../types';

export const THEMES: QuizTheme[] = [
  {
    id: "vibrant-indigo",
    name: "Vibrant Indigo",
    previewColor: "bg-indigo-600",
    bodyBg: "bg-indigo-50/90 text-indigo-950 min-h-screen",
    cardBg: "bg-white rounded-[28px] shadow-xl border-t-4 border-yellow-400 border-b-8 border-indigo-100 p-6 sm:p-8",
    textPrimary: "text-indigo-950",
    textSecondary: "text-indigo-600",
    accentColor: "border-indigo-400 ring-indigo-300",
    buttonActive: "bg-indigo-600 hover:bg-indigo-700 text-white font-black border-b-4 border-indigo-800 shadow-md transition-all uppercase"
  },
  {
    id: "sunset-vibrant",
    name: "Vibrant Orange",
    previewColor: "bg-orange-500",
    bodyBg: "bg-orange-50/90 text-orange-950 min-h-screen",
    cardBg: "bg-white rounded-[28px] shadow-xl border-t-4 border-amber-400 border-b-8 border-orange-100 p-6 sm:p-8",
    textPrimary: "text-orange-950",
    textSecondary: "text-orange-700",
    accentColor: "border-orange-400 ring-orange-300",
    buttonActive: "bg-orange-600 hover:bg-orange-700 text-white font-black border-b-4 border-orange-800 shadow-md transition-all uppercase"
  },
  {
    id: "emerald-vibrant",
    name: "Vibrant Teal",
    previewColor: "bg-teal-600",
    bodyBg: "bg-emerald-50/90 text-teal-950 min-h-screen",
    cardBg: "bg-white rounded-[28px] shadow-xl border-t-4 border-yellow-300 border-b-8 border-teal-100 p-6 sm:p-8",
    textPrimary: "text-teal-950",
    textSecondary: "text-teal-700",
    accentColor: "border-teal-400 ring-teal-350",
    buttonActive: "bg-teal-600 hover:bg-teal-700 text-white font-black border-b-4 border-teal-800 shadow-md transition-all uppercase"
  },
  {
    id: "pink-vibrant",
    name: "Vibrant Rose",
    previewColor: "bg-pink-500",
    bodyBg: "bg-pink-50/90 text-rose-950 min-h-screen",
    cardBg: "bg-white rounded-[28px] shadow-xl border-t-4 border-yellow-400 border-b-8 border-pink-100 p-6 sm:p-8",
    textPrimary: "text-rose-950",
    textSecondary: "text-rose-700",
    accentColor: "border-pink-400 ring-pink-300",
    buttonActive: "bg-pink-600 hover:bg-pink-700 text-white font-black border-b-4 border-pink-800 shadow-md transition-all uppercase"
  },
  {
    id: "warm-amber",
    name: "Warm Amber (Eye Comfort)",
    previewColor: "bg-[#e5a93c]",
    bodyBg: "bg-[#fdf8ee] text-[#4d320a] min-h-screen",
    cardBg: "bg-[#f9f1e1] rounded-[28px] shadow-lg border-t-4 border-[#ffb63b] border-b-8 border-[#eddcb5] p-6 sm:p-8",
    textPrimary: "text-[#4d320a]",
    textSecondary: "text-[#875508]",
    accentColor: "border-[#c4923e] ring-[#f5cca8]",
    buttonActive: "bg-[#9c6a1e] hover:bg-[#855815] text-[#fdf8ee] font-black border-b-4 border-[#59390c] shadow-md transition-all uppercase"
  },
  {
    id: "midnight-dim",
    name: "Midnight Dim (Dark Mode)",
    previewColor: "bg-[#111827]",
    bodyBg: "bg-[#121319] text-slate-200 min-h-screen",
    cardBg: "bg-[#1a1c24] rounded-[28px] shadow-xl border-t-4 border-indigo-500 border-b-8 border-[#0c0d12] p-6 sm:p-8",
    textPrimary: "text-slate-100",
    textSecondary: "text-indigo-400",
    accentColor: "border-indigo-400 ring-indigo-900",
    buttonActive: "bg-indigo-600 hover:bg-indigo-700 text-white font-black border-b-4 border-indigo-850 shadow-md transition-all uppercase"
  },
  {
    id: "soft-sage",
    name: "Sage Muted Forest",
    previewColor: "bg-[#6b7f73]",
    bodyBg: "bg-[#f1f4f2] text-[#2c3d32] min-h-screen",
    cardBg: "bg-white rounded-[28px] shadow-lg border-t-4 border-[#769382] border-b-8 border-[#dae2dd] p-6 sm:p-8",
    textPrimary: "text-[#2c3d32]",
    textSecondary: "text-[#496150]",
    accentColor: "border-[#769382] ring-[#ccd8d2]",
    buttonActive: "bg-[#455c4e] hover:bg-[#34463b] text-white font-black border-b-4 border-[#243129] shadow-md transition-all uppercase"
  },
  {
    id: "paperbook-sepia",
    name: "Paperback Sepia (E-Ink)",
    previewColor: "bg-[#dcb993]",
    bodyBg: "bg-[#f4ebe1] text-[#3e2c1e] min-h-screen",
    cardBg: "bg-[#fdfaf6] rounded-[28px] shadow-lg border-t-4 border-[#bca085] border-b-8 border-[#e7dac8]/85 p-6 sm:p-8",
    textPrimary: "text-[#3e2c1e]",
    textSecondary: "text-[#704f32]",
    accentColor: "border-[#b89c7d] ring-[#eae1d6]",
    buttonActive: "bg-[#7c5d41] hover:bg-[#644931] text-white font-black border-b-4 border-[#412e1e] shadow-md transition-all uppercase"
  }
];
