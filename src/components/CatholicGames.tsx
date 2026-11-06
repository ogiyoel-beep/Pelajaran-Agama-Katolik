import React, { useState, useEffect } from 'react';
import {
  CATHOLIC_QUIZ_QUESTIONS,
  SCRIPTURE_MATCH_PAIRS,
  CONSCIENCE_SCENARIOS,
  QuizQuestion,
  ScriptureMatchItem,
  ConscienceScenario,
} from '../data/gamesData';
import { sound } from '../utils/audio';
import {
  Gamepad2,
  Trophy,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Heart,
  Compass,
  Award,
  PenTool,
} from 'lucide-react';

interface CatholicGamesProps {
  onNavigateToFormWithChapter: (chapterTitle: string, verseRef?: string) => void;
}

type ActiveGameMode = 'hub' | 'quiz' | 'matcher' | 'conscience';

export const CatholicGames: React.FC<CatholicGamesProps> = ({
  onNavigateToFormWithChapter,
}) => {
  const [activeGame, setActiveGame] = useState<ActiveGameMode>('hub');
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  // High Scores from localStorage
  const [highScores, setHighScores] = useState<{
    quiz: number;
    matcher: number;
    conscience: number;
  }>(() => {
    try {
      const saved = localStorage.getItem('katolik_smp7_game_scores');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { quiz: 0, matcher: 0, conscience: 0 };
  });

  const saveHighScore = (mode: 'quiz' | 'matcher' | 'conscience', score: number) => {
    setHighScores((prev) => {
      const updated = { ...prev, [mode]: Math.max(prev[mode], score) };
      try {
        localStorage.setItem('katolik_smp7_game_scores', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleToggleMute = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner & Control Zone */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2b5b84] uppercase tracking-wider mb-1">
            <Gamepad2 className="w-4 h-4" />
            <span>Ruang Belajar Interaktif</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Games Edukasi Agama Katolik SMP Kelas 7
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Asah pemahamanmu tentang 6 bab materi, ayat-ayat emas Kitab Suci, dan latih kepekaan suara hatimu
            melalui permainan edukatif yang menyenangkan.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleToggleMute}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            title={isMuted ? 'Nyalakan Efek Suara' : 'Matikan Suara'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#2b5b84]" />}
            <span>{isMuted ? 'Suara Senyap' : 'Efek Suara Aktif'}</span>
          </button>

          {activeGame !== 'hub' && (
            <button
              onClick={() => setActiveGame('hub')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kembali ke Menu Game</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Game Hub Selector */}
      {activeGame === 'hub' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Game 1: Cerdas Cermat Sabda */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-[#2b5b84] transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2b5b84] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-[#2b5b84] uppercase tracking-wider mb-1">
                  Kuis Pengetahuan
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  1. Cerdas Cermat Sabda
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  10 pertanyaan pilihan ganda mencakup Bab 1 sampai Bab 6: Imago Dei, Perumpamaan Talenta, Buah-buah Roh,
                  hingga teladan persahabatan Yesus.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-mono tabular-nums">
                  <span>Skor Tertinggi:</span>
                  <span className="font-bold text-emerald-600">{highScores.quiz} / 100</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveGame('quiz');
                }}
                className="w-full py-2.5 px-4 bg-[#2b5b84] hover:bg-[#1f4260] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Mulai Kuis Cerdas Cermat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Game 2: Tebak & Pasangkan Ayat Emas */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-[#2b5b84] transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                  Mencocokkan Sabda
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  2. Pasangkan Ayat Emas
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Cocokkan kutipan ayat Kitab Suci dengan referensi perikopnya (Kejadian 1:27, Matius 25:21, Galatia 5:22,
                  Mazmur 139:14, dll.).
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-mono tabular-nums">
                  <span>Pasangan Terbanyak:</span>
                  <span className="font-bold text-amber-600">{highScores.matcher} / 8</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveGame('matcher');
                }}
                className="w-full py-2.5 px-4 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Mainkan Pasangkan Ayat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Game 3: Simulasi Dilema Suara Hati */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-[#2b5b84] transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-1">
                  Simulasi Moral Remaja
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  3. Dilema Suara Hati
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Hadapi 4 situasi nyata remaja di sekolah dan rumah. Dengarkan suara hatimu untuk memilih tindakan yang
                  paling memancarkan kasih Kristus.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-mono tabular-nums">
                  <span>Kematangan Moral:</span>
                  <span className="font-bold text-purple-700">{highScores.conscience} / 400</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveGame('conscience');
                }}
                className="w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Mulai Perjalanan Suara Hati</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game 1: Cerdas Cermat Sabda */}
      {activeGame === 'quiz' && (
        <QuizGameView
          onFinish={(score) => saveHighScore('quiz', score)}
          onNavigateToForm={onNavigateToFormWithChapter}
          onBackToMenu={() => setActiveGame('hub')}
        />
      )}

      {/* Game 2: Scripture Matcher */}
      {activeGame === 'matcher' && (
        <ScriptureMatcherGame
          onFinish={(matches) => saveHighScore('matcher', matches)}
          onNavigateToForm={onNavigateToFormWithChapter}
          onBackToMenu={() => setActiveGame('hub')}
        />
      )}

      {/* Game 3: Conscience Dilemma Simulator */}
      {activeGame === 'conscience' && (
        <ConscienceSimulator
          onFinish={(score) => saveHighScore('conscience', score)}
          onNavigateToForm={onNavigateToFormWithChapter}
          onBackToMenu={() => setActiveGame('hub')}
        />
      )}
    </div>
  );
};

/* =========================================================================
   SUB-COMPONENT 1: CERDAS CERMAT SABDA (QUIZ GAME)
   ========================================================================= */

interface QuizGameViewProps {
  onFinish: (score: number) => void;
  onNavigateToForm: (chapter: string, verse?: string) => void;
  onBackToMenu: () => void;
}

const QuizGameView: React.FC<QuizGameViewProps> = ({
  onFinish,
  onNavigateToForm,
  onBackToMenu,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ: QuizQuestion = CATHOLIC_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      sound.playCorrect();
      setScore((s) => s + 10);
      setStreak((st) => st + 1);
    } else {
      sound.playWrong();
      setStreak(0);
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx + 1 < CATHOLIC_QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      sound.playVictory();
      setIsFinished(true);
      onFinish(score + (selectedOption === currentQ.correctIndex ? 10 : 0));
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const finalScore = score;
    let badgeTitle = 'Penjelajah Sabda';
    if (finalScore >= 90) badgeTitle = 'Saksi Kristus Teladan';
    else if (finalScore >= 70) badgeTitle = 'Pewarta Sabda Hebat';
    else if (finalScore >= 50) badgeTitle = 'Murid Yesus yang Tekun';

    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Trophy className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">
            Hasil Akhir Kuis
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Selamat! Kuis Telah Selesai</h2>
          <div className="inline-block mt-3 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-[#2b5b84]">
            Gelar: {badgeTitle}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 max-w-sm mx-auto">
          <span className="text-xs text-slate-500 block uppercase font-medium">Skor Total:</span>
          <span className="text-4xl font-extrabold text-[#2b5b84] font-mono tabular-nums">
            {finalScore} <span className="text-sm font-normal text-slate-500">/ 100</span>
          </span>
        </div>

        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Pemahamanmu akan materi iman Katolik dan Kitab Suci Kelas 7 sangat baik. Teruslah membaca dan merefleksikan
          firman Tuhan dalam kehidupan sehari-hari!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => onNavigateToForm(currentQ.bab, currentQ.scriptureReference)}
            className="px-4 py-2.5 bg-[#2b5b84] hover:bg-[#1f4260] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Tulis Refleksi di Lembar Tugas</span>
          </button>

          <button
            onClick={handleRestart}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mainkan Lagi</span>
          </button>

          <button
            onClick={onBackToMenu}
            className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Menu Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
      {/* Quiz Progress & HUD */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 text-xs">
        <div>
          <span className="text-slate-400 font-medium">Pertanyaan: </span>
          <span className="font-bold text-slate-900 font-mono tabular-nums">
            {currentIdx + 1} / {CATHOLIC_QUIZ_QUESTIONS.length}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {streak > 1 && (
            <div className="flex items-center gap-1 text-amber-600 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{streak}x Beruntun!</span>
            </div>
          )}
          <div className="text-slate-600">
            Skor: <span className="font-bold text-[#2b5b84] font-mono tabular-nums">{score}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-[#2b5b84] h-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / CATHOLIC_QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Chapter Tag & Question */}
      <div>
        <span className="text-xs font-semibold text-[#2b5b84] block mb-1">
          {currentQ.bab}
        </span>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {currentQ.question}
        </h2>
      </div>

      {/* Options List */}
      <div className="space-y-2.5 pt-2">
        {currentQ.options.map((opt, idx) => {
          let btnStyle = 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';

          if (hasAnswered) {
            if (idx === currentQ.correctIndex) {
              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
            } else if (idx === selectedOption) {
              btnStyle = 'bg-red-50 border-red-400 text-red-950';
            } else {
              btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={hasAnswered}
              className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-xs shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>
              {hasAnswered && idx === currentQ.correctIndex && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              {hasAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback & Scripture Explanation */}
      {hasAnswered && (
        <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-lg text-xs space-y-1.5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#2b5b84] uppercase tracking-wide">
              {selectedOption === currentQ.correctIndex ? '✓ Tepat Sekali!' : '✗ Jawaban Belum Tepat'}
            </span>
            <span className="text-[11px] text-amber-800 font-serif-scripture font-semibold">
              Rujukan: {currentQ.scriptureReference}
            </span>
          </div>
          <p className="text-slate-700 leading-relaxed">{currentQ.explanation}</p>
        </div>
      )}

      {/* Footer Next Button */}
      {hasAnswered && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="px-5 py-2.5 bg-[#2b5b84] hover:bg-[#1f4260] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>
              {currentIdx + 1 === CATHOLIC_QUIZ_QUESTIONS.length ? 'Lihat Hasil Akhir' : 'Lanjut ke Soal Berikutnya'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SUB-COMPONENT 2: TEBAK & PASANGKAN AYAT EMAS (SCRIPTURE MATCHER)
   ========================================================================= */

interface ScriptureMatcherGameProps {
  onFinish: (matches: number) => void;
  onNavigateToForm: (chapter: string, verse?: string) => void;
  onBackToMenu: () => void;
}

const ScriptureMatcherGame: React.FC<ScriptureMatcherGameProps> = ({
  onFinish,
  onNavigateToForm,
  onBackToMenu,
}) => {
  const [selectedRef, setSelectedRef] = useState<string | null>(null);
  const [selectedExcerptId, setSelectedExcerptId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [shuffledExcerpts, setShuffledExcerpts] = useState<ScriptureMatchItem[]>([]);
  const [attempts, setAttempts] = useState(0);

  // Shuffle excerpts once on mount
  useEffect(() => {
    const shuffled = [...SCRIPTURE_MATCH_PAIRS].sort(() => Math.random() - 0.5);
    setShuffledExcerpts(shuffled);
  }, []);

  const handleSelectRef = (refId: string) => {
    if (matchedIds.includes(refId)) return;
    sound.playClick();
    setSelectedRef(refId);

    if (selectedExcerptId) {
      checkMatch(refId, selectedExcerptId);
    }
  };

  const handleSelectExcerpt = (excerptId: string) => {
    if (matchedIds.includes(excerptId)) return;
    sound.playClick();
    setSelectedExcerptId(excerptId);

    if (selectedRef) {
      checkMatch(selectedRef, excerptId);
    }
  };

  const checkMatch = (refId: string, excId: string) => {
    setAttempts((a) => a + 1);
    if (refId === excId) {
      sound.playCorrect();
      setMatchedIds((prev) => {
        const next = [...prev, refId];
        if (next.length === SCRIPTURE_MATCH_PAIRS.length) {
          sound.playVictory();
          onFinish(next.length);
        }
        return next;
      });
      setSelectedRef(null);
      setSelectedExcerptId(null);
    } else {
      sound.playWrong();
      setTimeout(() => {
        setSelectedRef(null);
        setSelectedExcerptId(null);
      }, 700);
    }
  };

  const isAllMatched = matchedIds.length === SCRIPTURE_MATCH_PAIRS.length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 text-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Pasangkan Ayat Kitab Suci</h2>
          <p className="text-slate-500 mt-0.5">
            Klik nama perikop di kolom kiri, lalu pasangkan dengan bunyi ayat yang sesuai di kolom kanan.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-slate-600 font-mono tabular-nums">
            Cocok: <span className="font-bold text-emerald-600">{matchedIds.length}</span> / {SCRIPTURE_MATCH_PAIRS.length}
          </div>
          <div className="text-slate-600 font-mono tabular-nums">
            Percobaan: <span className="font-bold text-slate-800">{attempts}</span>
          </div>
        </div>
      </div>

      {isAllMatched ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Hebat! Semua Ayat Terpasang dengan Tepat</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Kamu telah berhasil mencocokkan seluruh 8 perikop emas materi SMP Kelas 7.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigateToForm('Bab 1: Aku Citra Allah yang Unik', 'Kejadian 1:26-28')}
              className="px-4 py-2.5 bg-[#2b5b84] hover:bg-[#1f4260] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
            >
              Tulis Lembar Refleksi
            </button>
            <button
              onClick={() => {
                setMatchedIds([]);
                setAttempts(0);
                setSelectedRef(null);
                setSelectedExcerptId(null);
                setShuffledExcerpts([...SCRIPTURE_MATCH_PAIRS].sort(() => Math.random() - 0.5));
              }}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg cursor-pointer"
            >
              Ulangi Permainan
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Reference Cards */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              1. Kolom Perikop Kitab Suci:
            </span>
            {SCRIPTURE_MATCH_PAIRS.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedRef === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectRef(item.id)}
                  disabled={isMatched}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 cursor-default'
                      : isSelected
                      ? 'bg-[#2b5b84] text-white border-[#2b5b84] shadow-xs'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">{item.reference}</span>
                    <span className={`text-[11px] ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                      {item.topic}
                    </span>
                  </div>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: Excerpt Cards */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              2. Kolom Bunyi Ayat Firman:
            </span>
            {shuffledExcerpts.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedExcerptId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectExcerpt(item.id)}
                  disabled={isMatched}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 cursor-default'
                      : isSelected
                      ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-serif-scripture italic leading-relaxed">
                    "{item.excerpt}"
                  </p>
                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SUB-COMPONENT 3: SIMULASI DILEMA SUARA HATI (CONSCIENCE SIMULATOR)
   ========================================================================= */

interface ConscienceSimulatorProps {
  onFinish: (score: number) => void;
  onNavigateToForm: (chapter: string, verse?: string) => void;
  onBackToMenu: () => void;
}

const ConscienceSimulator: React.FC<ConscienceSimulatorProps> = ({
  onFinish,
  onNavigateToForm,
  onBackToMenu,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const scenario: ConscienceScenario = CONSCIENCE_SCENARIOS[currentIdx];

  const handleSelectChoice = (idx: number) => {
    if (selectedChoiceIdx !== null) return;
    setSelectedChoiceIdx(idx);

    const chosen = scenario.choices[idx];
    if (chosen.score >= 80) {
      sound.playCorrect();
    } else {
      sound.playClick();
    }

    setTotalScore((prev) => prev + chosen.score);
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx + 1 < CONSCIENCE_SCENARIOS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedChoiceIdx(null);
    } else {
      sound.playVictory();
      setIsFinished(true);
      onFinish(totalScore);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedChoiceIdx(null);
    setTotalScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    let maturityLevel = 'Pejuang Suara Hati';
    if (totalScore >= 360) maturityLevel = 'Pribadi Berintegritas Luhur';
    else if (totalScore >= 250) maturityLevel = 'Remaja Peka Nilai Kristiani';

    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">
            Hasil Simulasi Moral
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Perjalanan Suara Hati Selesai</h2>
          <div className="inline-block mt-3 px-4 py-1.5 bg-purple-50 border border-purple-200 rounded-full text-xs font-bold text-purple-800">
            Tingkat Kematangan: {maturityLevel}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 max-w-sm mx-auto">
          <span className="text-xs text-slate-500 block uppercase font-medium">Skor Kejernihan Moral:</span>
          <span className="text-4xl font-extrabold text-purple-800 font-mono tabular-nums">
            {totalScore} <span className="text-sm font-normal text-slate-500">/ 400</span>
          </span>
        </div>

        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
          Suara hati adalah tempat paling suci di mana kamu berdialog dengan Allah. Jagalah kemurnian hatimu
          dan jadilah saksi kasih Kristus yang berani memilih yang benar di tengah godaan pergaulan remaja!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => onNavigateToForm('Bab 4: Suara Hati dan Moral Remaja', 'Galatia 5:16-22')}
            className="px-4 py-2.5 bg-[#2b5b84] hover:bg-[#1f4260] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Tulis Refleksi Bab 4 (Suara Hati)</span>
          </button>

          <button
            onClick={handleRestart}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi Simulasi</span>
          </button>

          <button
            onClick={onBackToMenu}
            className="px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Menu Game
          </button>
        </div>
      </div>
    );
  }

  const selectedChoice = selectedChoiceIdx !== null ? scenario.choices[selectedChoiceIdx] : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-6">
      {/* Header & Steps */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 text-xs">
        <div>
          <span className="text-slate-400 font-medium">Skenario: </span>
          <span className="font-bold text-slate-900 font-mono tabular-nums">
            {currentIdx + 1} / {CONSCIENCE_SCENARIOS.length}
          </span>
        </div>
        <div className="text-slate-600">
          Total Skor Moral: <span className="font-bold text-purple-700 font-mono tabular-nums">{totalScore}</span>
        </div>
      </div>

      {/* Scenario Title & Context */}
      <div>
        <span className="text-xs font-bold text-purple-700 uppercase tracking-wide block mb-1">
          {scenario.title}
        </span>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 italic mb-3">
          {scenario.context}
        </div>
        <p className="text-sm font-semibold text-slate-900 leading-relaxed">
          {scenario.situation}
        </p>
      </div>

      {/* Choices */}
      <div className="space-y-2.5 pt-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Pilihan Tindakanmu:
        </span>
        {scenario.choices.map((c, idx) => {
          const isSelected = selectedChoiceIdx === idx;
          let btnStyle = 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';

          if (selectedChoiceIdx !== null) {
            if (isSelected) {
              btnStyle = c.score >= 80 ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold' : 'bg-amber-50 border-amber-500 text-amber-950';
            } else {
              btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectChoice(idx)}
              disabled={selectedChoiceIdx !== null}
              className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-xs shrink-0">
                  {idx + 1}
                </span>
                <span>{c.text}</span>
              </div>
              {isSelected && (
                <span className="text-xs font-mono font-bold shrink-0 tabular-nums">
                  +{c.score} Poin
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Conscience Feedback & Scripture Guidance */}
      {selectedChoice && (
        <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-lg text-xs space-y-2 animate-fadeIn">
          <div className="font-bold text-purple-900 uppercase tracking-wide flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-purple-600" />
            <span>Ulasan Suara Hati Nurani:</span>
          </div>
          <p className="text-slate-800 leading-relaxed">
            {selectedChoice.conscienceFeedback}
          </p>
          <div className="pt-1 text-[11px] text-amber-900 font-serif-scripture italic border-t border-purple-200/60">
            {selectedChoice.scriptureTip}
          </div>
        </div>
      )}

      {/* Next Button */}
      {selectedChoice && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>
              {currentIdx + 1 === CONSCIENCE_SCENARIOS.length ? 'Lihat Hasil Kematangan Moral' : 'Lanjut ke Kasus Berikutnya'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
