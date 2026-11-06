/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ReflectionForm } from './components/ReflectionForm';
import { CurriculumGuideView } from './components/CurriculumGuideView';
import { TeacherDashboard } from './components/TeacherDashboard';
import { CatholicGames } from './components/CatholicGames';
import { HtmlCodeViewer } from './components/HtmlCodeViewer';
import { PrintableSheet } from './components/PrintableSheet';
import { StudentSubmission } from './types/reflection';
import { INITIAL_SUBMISSIONS, STORAGE_KEY_SUBMISSIONS } from './data/curriculumData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'kurikulum' | 'games' | 'guru' | 'html-code'>('form');
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn('Failed to read submissions from localStorage:', err);
    }
    return INITIAL_SUBMISSIONS;
  });

  const [activePrintSubmission, setActivePrintSubmission] = useState<StudentSubmission | null>(null);
  const [preselectedChapter, setPreselectedChapter] = useState<string | undefined>(undefined);
  const [preselectedVerse, setPreselectedVerse] = useState<string | undefined>(undefined);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(submissions));
    } catch (err) {
      console.warn('Failed to save submissions to localStorage:', err);
    }
  }, [submissions]);

  const handleAddSubmission = (newSub: StudentSubmission) => {
    setSubmissions((prev) => [newSub, ...prev]);
  };

  const handleUpdateSubmission = (updated: StudentSubmission) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === updated.id ? updated : sub))
    );
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
  };

  const handleSelectChapterForForm = (chapterTitle: string, verseRef?: string) => {
    setPreselectedChapter(chapterTitle);
    setPreselectedVerse(verseRef);
    setActiveTab('form');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleClearPreselection = () => {
    setPreselectedChapter(undefined);
    setPreselectedVerse(undefined);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col text-slate-800">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        submissionCount={submissions.length}
      />

      {/* Main Content Areas */}
      <main className="flex-1 pb-16">
        {activeTab === 'form' && (
          <ReflectionForm
            onSubmitSuccess={handleAddSubmission}
            onOpenPrintSheet={(sub) => setActivePrintSubmission(sub)}
            preselectedChapter={preselectedChapter}
            preselectedVerse={preselectedVerse}
            onClearPreselection={handleClearPreselection}
          />
        )}

        {activeTab === 'kurikulum' && (
          <CurriculumGuideView
            onSelectChapterForForm={handleSelectChapterForForm}
          />
        )}

        {activeTab === 'games' && (
          <CatholicGames
            onNavigateToFormWithChapter={handleSelectChapterForForm}
          />
        )}

        {activeTab === 'guru' && (
          <TeacherDashboard
            submissions={submissions}
            onUpdateSubmission={handleUpdateSubmission}
            onDeleteSubmission={handleDeleteSubmission}
            onViewPrintSheet={(sub) => setActivePrintSubmission(sub)}
          />
        )}

        {activeTab === 'html-code' && <HtmlCodeViewer />}
      </main>

      {/* Printable Sheet Modal (Available from any view) */}
      {activePrintSubmission && (
        <PrintableSheet
          submission={activePrintSubmission}
          onClose={() => setActivePrintSubmission(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Pendidikan Agama Katolik & Budi Pekerti</span>
            <span>·</span>
            <span>SMP Kelas VII</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setActiveTab('form')}
              className="hover:text-[#2b5b84] transition-colors cursor-pointer"
            >
              Lembar Tugas
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('kurikulum')}
              className="hover:text-[#2b5b84] transition-colors cursor-pointer"
            >
              Katalog Sabda
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('games')}
              className="hover:text-[#2b5b84] font-semibold transition-colors cursor-pointer text-amber-700"
            >
              Games Edukasi
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('guru')}
              className="hover:text-[#2b5b84] transition-colors cursor-pointer"
            >
              Portal Guru
            </button>
            <span>·</span>
            <a
              href="/form-tugas.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2b5b84] font-mono text-[11px] transition-colors"
            >
              form-tugas.html
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
