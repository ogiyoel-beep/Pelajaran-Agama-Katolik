import React from 'react';
import { BookOpen, FileText, GraduationCap, Code2, PenLine, Gamepad2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'form' | 'kurikulum' | 'games' | 'guru' | 'html-code';
  setActiveTab: (tab: 'form' | 'kurikulum' | 'games' | 'guru' | 'html-code') => void;
  submissionCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  submissionCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand element */}
          <button
            onClick={() => setActiveTab('form')}
            className="flex items-center gap-3 text-left group cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 shadow-xs bg-slate-50 flex items-center justify-center">
              <img
                src="/src/assets/images/logo_katolik_smp_1793952543349.jpg"
                alt="Logo Agama Katolik SMP"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#2b5b84] tracking-tight whitespace-nowrap leading-tight">
                Agama Katolik SMP 7
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline whitespace-nowrap">
                Lembar Refleksi & Tugas Siswa
              </span>
            </div>
          </button>

          {/* Zone 2: Concise navigation links (single line) */}
          <nav className="flex items-center gap-1 sm:gap-2 text-sm font-medium">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-[#2b5b84] text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Form Refleksi</span>
            </button>

            <button
              onClick={() => setActiveTab('kurikulum')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'kurikulum'
                  ? 'bg-[#2b5b84] text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Katalog Sabda</span>
            </button>

            <button
              onClick={() => setActiveTab('games')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'games'
                  ? 'bg-[#2b5b84] text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Gamepad2 className="w-4 h-4 shrink-0 text-amber-500" />
              <span>Games Edukasi</span>
            </button>

            <button
              onClick={() => setActiveTab('guru')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'guru'
                  ? 'bg-[#2b5b84] text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span>Portal Guru</span>
              <span className="ml-1 text-xs px-1.5 py-0.2 bg-slate-200/80 text-slate-700 rounded-full font-mono tabular-nums">
                {submissionCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('html-code')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap hidden lg:flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'html-code'
                  ? 'bg-[#2b5b84] text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Code2 className="w-4 h-4 shrink-0" />
              <span>form-tugas.html</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('form')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#2b5b84] hover:bg-[#1f4260] rounded-lg transition-colors whitespace-nowrap shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <PenLine className="w-3.5 h-3.5 shrink-0" />
              <span>Isi Lembar Tugas</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
