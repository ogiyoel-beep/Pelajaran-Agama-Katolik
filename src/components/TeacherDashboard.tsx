import React, { useState } from 'react';
import { StudentSubmission } from '../types/reflection';
import { CHAPTERS_DATA } from '../data/curriculumData';
import {
  Download,
  Filter,
  Search,
  CheckCircle,
  Clock,
  Printer,
  Trash2,
  Award,
  Eye,
  MessageSquare,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

interface TeacherDashboardProps {
  submissions: StudentSubmission[];
  onUpdateSubmission: (updated: StudentSubmission) => void;
  onDeleteSubmission: (id: string) => void;
  onViewPrintSheet: (sub: StudentSubmission) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  submissions,
  onUpdateSubmission,
  onDeleteSubmission,
  onViewPrintSheet,
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('Semua');
  const [selectedMateri, setSelectedMateri] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Grading Modal State
  const [gradingItem, setGradingItem] = useState<StudentSubmission | null>(null);
  const [gradeInput, setGradeInput] = useState<number | ''>('');
  const [noteInput, setNoteInput] = useState<string>('');

  // Filter Submissions
  const filtered = submissions.filter((sub) => {
    if (selectedClass !== 'Semua' && sub.kelas !== selectedClass) return false;
    if (selectedMateri !== 'Semua' && sub.materi !== selectedMateri) return false;
    if (selectedStatus !== 'Semua' && sub.status !== selectedStatus) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = sub.nama.toLowerCase().includes(q);
      const matchAbsen = sub.absen.toString().includes(q);
      const matchMateri = sub.materi.toLowerCase().includes(q);
      if (!matchName && !matchAbsen && !matchMateri) return false;
    }
    return true;
  });

  // Statistics
  const totalCount = submissions.length;
  const gradedCount = submissions.filter((s) => s.status === 'Sudah Dinilai').length;
  const pendingCount = totalCount - gradedCount;
  const gradedScores = submissions
    .filter((s) => s.nilai !== undefined)
    .map((s) => s.nilai as number);
  const avgScore =
    gradedScores.length > 0
      ? Math.round(gradedScores.reduce((a, b) => a + b, 0) / gradedScores.length)
      : 0;

  const handleOpenGrading = (sub: StudentSubmission) => {
    setGradingItem(sub);
    setGradeInput(sub.nilai ?? 90);
    setNoteInput(sub.catatanGuru || '');
  };

  const handleSaveGrading = () => {
    if (!gradingItem) return;
    const numericScore = typeof gradeInput === 'number' ? gradeInput : 85;
    const clampedScore = Math.min(100, Math.max(0, numericScore));

    const updated: StudentSubmission = {
      ...gradingItem,
      nilai: clampedScore,
      catatanGuru: noteInput.trim() || 'Refleksi telah dibaca dan dievaluasi.',
      status: 'Sudah Dinilai',
    };

    onUpdateSubmission(updated);
    setGradingItem(null);
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) return;

    const headers = [
      'ID',
      'Nama Siswa',
      'Kelas',
      'No Absen',
      'Materi Pembelajaran',
      'Ayat Kitab Suci',
      'Nilai',
      'Status',
      'Catatan Guru',
      'Waktu Pengumpulan',
      'Refleksi',
      'Doa',
    ];

    const rows = filtered.map((sub) => [
      `"${sub.id}"`,
      `"${sub.nama.replace(/"/g, '""')}"`,
      `"${sub.kelas}"`,
      `"${sub.absen}"`,
      `"${sub.materi.replace(/"/g, '""')}"`,
      `"${(sub.ayat || '').replace(/"/g, '""')}"`,
      `"${sub.nilai ?? ''}"`,
      `"${sub.status}"`,
      `"${(sub.catatanGuru || '').replace(/"/g, '""')}"`,
      `"${sub.submittedAt}"`,
      `"${sub.refleksi.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${(sub.doa || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Rekap_Refleksi_Agama_Katolik_SMP7_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2b5b84] uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Portal Evaluasi Pembina / Guru</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Rekapitulasi Tugas & Lembar Refleksi
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Pantau pengumpulan tugas siswa kelas VII-A hingga VII-D, evaluasi kedalaman refleksi rohani,
            dan berikan umpan balik edukatif.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={submissions.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Ekspor Rekap (CSV)</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">Total Tugas Masuk</div>
          <div className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">
            {totalCount} <span className="text-xs font-normal text-slate-500">berkas</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">Sudah Dinilai</div>
          <div className="text-2xl font-bold text-emerald-600 mt-2 font-mono tabular-nums">
            {gradedCount} <span className="text-xs font-normal text-slate-500">siswa</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">Menunggu Penilaian</div>
          <div className="text-2xl font-bold text-amber-600 mt-2 font-mono tabular-nums">
            {pendingCount} <span className="text-xs font-normal text-slate-500">tugas</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">Rata-Rata Nilai</div>
          <div className="text-2xl font-bold text-[#2b5b84] mt-2 font-mono tabular-nums">
            {avgScore > 0 ? avgScore : '-'}{' '}
            <span className="text-xs font-normal text-slate-500">/ 100</span>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama atau no. absen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#2b5b84]"
            />
          </div>

          {/* Filter Kelas */}
          <div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#2b5b84] bg-white"
            >
              <option value="Semua">Semua Kelas (VII A-D)</option>
              <option value="VII-A">Kelas VII-A</option>
              <option value="VII-B">Kelas VII-B</option>
              <option value="VII-C">Kelas VII-C</option>
              <option value="VII-D">Kelas VII-D</option>
            </select>
          </div>

          {/* Filter Bab */}
          <div>
            <select
              value={selectedMateri}
              onChange={(e) => setSelectedMateri(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#2b5b84] bg-white truncate"
            >
              <option value="Semua">Semua Bab Pembelajaran</option>
              {CHAPTERS_DATA.map((ch) => (
                <option key={ch.id} value={ch.title}>
                  {ch.title}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Status */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#2b5b84] bg-white"
            >
              <option value="Semua">Semua Status</option>
              <option value="Belum Dinilai">Belum Dinilai</option>
              <option value="Sudah Dinilai">Sudah Dinilai</option>
            </select>
          </div>
        </div>

        {/* Clean metadata bar (no pills, unboxed with separators) */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div>
            Menampilkan <span className="font-semibold text-slate-900 font-mono tabular-nums">{filtered.length}</span> dari{' '}
            <span className="font-semibold text-slate-900 font-mono tabular-nums">{submissions.length}</span> tugas
          </div>
          {(selectedClass !== 'Semua' || selectedMateri !== 'Semua' || selectedStatus !== 'Semua' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedClass('Semua');
                setSelectedMateri('Semua');
                setSelectedStatus('Semua');
                setSearchQuery('');
              }}
              className="text-[#2b5b84] hover:underline font-semibold cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">Tidak ada tugas yang sesuai kriteria</h3>
            <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian atau ubah filter di atas.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Siswa & Kelas</th>
                  <th className="px-4 py-3">Materi & Ayat</th>
                  <th className="px-4 py-3">Kutipan Refleksi</th>
                  <th className="px-4 py-3 text-center">Nilai</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((sub) => {
                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Siswa & Kelas */}
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900 text-sm">{sub.nama}</div>
                        <div className="text-slate-500 mt-0.5 flex items-center gap-1.5 font-mono tabular-nums">
                          <span>{sub.kelas}</span>
                          <span>·</span>
                          <span>Absen #{sub.absen}</span>
                        </div>
                      </td>

                      {/* Materi & Ayat */}
                      <td className="px-4 py-3.5 max-w-xs">
                        <div className="font-semibold text-slate-900 truncate">{sub.materi}</div>
                        <div className="text-amber-800 font-serif-scripture truncate mt-0.5">
                          {sub.ayat || '-'}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 font-mono tabular-nums">
                          {sub.submittedAt}
                        </div>
                      </td>

                      {/* Refleksi */}
                      <td className="px-4 py-3.5 max-w-sm">
                        <p className="line-clamp-2 text-slate-600">{sub.refleksi}</p>
                        {sub.catatanGuru && (
                          <div className="mt-1 text-[11px] text-[#2b5b84] bg-blue-50/60 p-1 rounded font-medium truncate">
                            Catatan Guru: {sub.catatanGuru}
                          </div>
                        )}
                      </td>

                      {/* Nilai */}
                      <td className="px-4 py-3.5 text-center">
                        {sub.nilai !== undefined ? (
                          <span className="font-bold text-sm text-[#2b5b84] font-mono tabular-nums">
                            {sub.nilai}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">-</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5 text-center">
                        {sub.status === 'Sudah Dinilai' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Dinilai</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-700 font-semibold text-[11px]">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Menunggu</span>
                          </span>
                        )}
                      </td>

                      {/* Aksi */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenGrading(sub)}
                            className="px-2.5 py-1.5 bg-[#2b5b84] hover:bg-[#1f4260] text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                            title="Beri Nilai & Catatan"
                          >
                            Beri Nilai
                          </button>
                          <button
                            onClick={() => onViewPrintSheet(sub)}
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                            title="Cetak Lembar Kerja Siswa"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus tugas dari ${sub.nama}?`)) {
                                onDeleteSubmission(sub.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            title="Hapus Tugas"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Grading Modal */}
      {gradingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Penilaian Lembar Refleksi</h3>
                <p className="text-xs text-slate-500">
                  {gradingItem.nama} ({gradingItem.kelas} / Absen #{gradingItem.absen})
                </p>
              </div>
              <button
                onClick={() => setGradingItem(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Kutipan Refleksi Siswa */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-[#2b5b84] block">{gradingItem.materi}</span>
                <span className="text-amber-800 italic font-serif-scripture block">
                  Ayat: {gradingItem.ayat || 'Tidak disebutkan'}
                </span>
                <p className="text-slate-700 pt-1 line-clamp-4">{gradingItem.refleksi}</p>
              </div>

              {/* Input Nilai Angka */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Nilai Angka (Skala 0 - 100) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={gradeInput}
                    onChange={(e) => setGradeInput(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-32 px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-[#2b5b84] focus:outline-none focus:border-[#2b5b84]"
                  />
                  <div className="flex gap-1.5">
                    {[85, 90, 95, 100].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setGradeInput(score)}
                        className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded font-semibold text-slate-700 cursor-pointer"
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Catatan Feedback Pembina */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Catatan Umpan Balik Guru / Pembina:
                </label>
                <textarea
                  rows={3}
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Berikan peneguhan rohani atau saran penerapan aksi nyata bagi siswa..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-[#2b5b84]"
                />
                {/* Quick Feedback Suggestions */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[
                    'Refleksi yang sangat menyentuh dan jujur!',
                    'Pilihan ayat sangat relevan dengan aksi nyata.',
                    'Terus kembangkan talenta untuk kemuliaan Tuhan.',
                    'Luar biasa! Pertahankan komitmen doa pribadimu.'
                  ].map((phrase, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNoteInput(phrase)}
                      className="text-[11px] bg-blue-50 text-[#2b5b84] hover:bg-blue-100 px-2 py-1 rounded transition-colors cursor-pointer"
                    >
                      + {phrase}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setGradingItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSaveGrading}
                className="px-4 py-2 text-xs font-semibold bg-[#2b5b84] hover:bg-[#1f4260] text-white rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Simpan Nilai & Catatan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
