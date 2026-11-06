import React, { useState } from 'react';
import { CHAPTERS_DATA } from '../data/curriculumData';
import { ChapterGuide } from '../types/reflection';
import { BookOpen, Sparkles, Heart, Compass, CheckCircle2, ChevronRight, PenTool } from 'lucide-react';

interface CurriculumGuideViewProps {
  onSelectChapterForForm: (chapterTitle: string, verseRef?: string) => void;
}

export const CurriculumGuideView: React.FC<CurriculumGuideViewProps> = ({
  onSelectChapterForForm,
}) => {
  const [selectedBab, setSelectedBab] = useState<ChapterGuide>(CHAPTERS_DATA[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2b5b84] uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Panduan Materi & Sabda Allah</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Kurikulum Agama Katolik & Budi Pekerti Kelas VII
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Gunakan panduan 6 topik pembelajaran di bawah ini untuk memahami perikop Kitab Suci,
              merenungkan sabda Tuhan, dan mempraktikkan aksi nyata dalam hidup sehari-hari.
            </p>
          </div>

          {/* Quick Lectio Divina Infobox */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-700 max-w-sm">
            <span className="font-bold text-[#2b5b84] block mb-1">
              4 Langkah Refleksi Katolik Remaja:
            </span>
            <ul className="space-y-1">
              <li><strong className="text-slate-900">1. Lectio:</strong> Baca sabda perlahan & hening.</li>
              <li><strong className="text-slate-900">2. Meditatio:</strong> Renungkan pesan Tuhan bagiku.</li>
              <li><strong className="text-slate-900">3. Oratio:</strong> Doakan isi hatimu kepada Yesus.</li>
              <li><strong className="text-slate-900">4. Actio:</strong> Lakukan aksi nyata hari ini.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Navigation of 6 Chapters, Right Detailed Study & Scripture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Chapters List (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1 block mb-2">
            Pilih Topik Pembelajaran
          </span>
          {CHAPTERS_DATA.map((ch) => {
            const isSelected = selectedBab.id === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedBab(ch)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#2b5b84] text-white border-[#2b5b84] shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className={`text-xs font-semibold ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    Bab {ch.babNumber}
                  </div>
                  <div className="font-bold text-sm mt-0.5 leading-snug">
                    {ch.title.replace(/^Bab \d+: /, '')}
                  </div>
                  <div className={`text-xs mt-1 line-clamp-1 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {ch.ringkasan}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Chapter Guide & Verses (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {/* Chapter Title & Action Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
            <div>
              <span className="text-xs font-bold text-[#2b5b84] uppercase tracking-wide">
                Bab {selectedBab.babNumber} — SMP Kelas VII
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {selectedBab.title}
              </h2>
            </div>
            <button
              onClick={() => onSelectChapterForForm(selectedBab.title)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2b5b84] hover:bg-[#1f4260] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Gunakan Topik Ini di Form</span>
            </button>
          </div>

          {/* Ringkasan Makna Teologis */}
          <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-xs font-bold text-slate-700 block uppercase mb-1">
              Inti Ajaran Iman:
            </span>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedBab.ringkasan}
            </p>
          </div>

          {/* Rekomendasi Perikop & Ayat Kitab Suci */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Perikop & Ayat Kitab Suci Acuan</span>
            </h3>
            <div className="space-y-3">
              {selectedBab.suggestedVerses.map((verse, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-amber-50/40 border border-amber-200/80 rounded-lg hover:border-amber-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-bold text-[#2b5b84] flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      {verse.ref}
                      <span className="text-slate-400 font-normal">·</span>
                      <span className="text-xs font-semibold text-slate-700">{verse.tema}</span>
                    </span>
                    <button
                      onClick={() => onSelectChapterForForm(selectedBab.title, verse.ref)}
                      className="text-xs text-[#2b5b84] hover:text-[#1f4260] font-semibold underline underline-offset-2 cursor-pointer self-start sm:self-auto"
                    >
                      Pilih Ayat Ini &rarr;
                    </button>
                  </div>
                  <blockquote className="text-xs text-slate-800 leading-relaxed font-serif-scripture italic pl-3 border-l-2 border-amber-400">
                    "{verse.text}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* Pertanyaan Pemantik Refleksi & Komitmen Aksi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-lg">
              <h4 className="text-xs font-bold text-[#2b5b84] uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
                <Compass className="w-4 h-4 text-[#2b5b84]" />
                <span>Pertanyaan Pemantik Refleksi:</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedBab.panduanRefleksi.map((q, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#2b5b84] font-bold">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Contoh Aksi Nyata Siswa:</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedBab.komitmenAksi.map((a, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Doa Inspirasi Singkat */}
          <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-lg">
            <span className="text-xs font-bold text-purple-900 block uppercase mb-1 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-purple-600" />
              <span>Inspirasi Doa Singkat:</span>
            </span>
            <p className="text-xs italic text-slate-700 font-serif-scripture leading-relaxed">
              "{selectedBab.doaInspirasi}"
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
