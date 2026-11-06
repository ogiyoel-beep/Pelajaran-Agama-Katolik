import React from 'react';
import { StudentSubmission } from '../types/reflection';
import { Printer, X, CheckCircle, Calendar, User, BookMarked, HeartHandshake } from 'lucide-react';

interface PrintableSheetProps {
  submission: StudentSubmission;
  onClose: () => void;
}

export const PrintableSheet: React.FC<PrintableSheetProps> = ({ submission, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex justify-center p-4 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="relative bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-auto print:shadow-none print:border-none print:max-w-none print:rounded-none">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-slate-800 text-sm">
              Pratinjau Lembar Refleksi Resmi Siswa
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#2b5b84] hover:bg-[#1f4260] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Printable Document Content */}
        <div className="p-8 sm:p-12 text-slate-900 bg-white">
          {/* Header Kop Lembar Kerja */}
          <div className="border-b-2 border-slate-800 pb-5 mb-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-xl font-bold tracking-wider uppercase text-slate-900">
                Pendidikan Agama Katolik & Budi Pekerti
              </span>
            </div>
            <h1 className="text-lg font-extrabold text-[#2b5b84] tracking-wide uppercase">
              Lembar Refleksi Pribadi & Pengumpulan Tugas Siswa
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Tingkat Sekolah Menengah Pertama (SMP) — Kelas VII (Tujuh)
            </p>
          </div>

          {/* Tabel Identitas Siswa */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs mb-6">
            <div>
              <span className="block text-slate-500 font-medium">Nama Siswa:</span>
              <span className="font-bold text-slate-900 text-sm">{submission.nama}</span>
            </div>
            <div>
              <span className="block text-slate-500 font-medium">Kelas:</span>
              <span className="font-bold text-slate-900 text-sm">{submission.kelas}</span>
            </div>
            <div>
              <span className="block text-slate-500 font-medium">No. Absen:</span>
              <span className="font-bold text-slate-900 text-sm tabular-nums">{submission.absen}</span>
            </div>
            <div>
              <span className="block text-slate-500 font-medium">Waktu Kirim:</span>
              <span className="font-semibold text-slate-800 text-xs tabular-nums">{submission.submittedAt}</span>
            </div>
          </div>

          {/* Materi & Ayat Kitab Suci */}
          <div className="space-y-4 mb-6">
            <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-lg">
              <div className="text-xs font-bold text-[#2b5b84] uppercase tracking-wide mb-1">
                Topik / Bab Materi Pembelajaran
              </div>
              <div className="text-base font-semibold text-slate-900">
                {submission.materi}
              </div>
            </div>

            {submission.ayat && (
              <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-lg">
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">
                  Ayat Kitab Suci yang Direfleksikan
                </div>
                <div className="text-sm font-semibold text-amber-950 font-serif-scripture">
                  "{submission.ayat}"
                </div>
              </div>
            )}
          </div>

          {/* Isi Refleksi */}
          <div className="mb-6 space-y-2">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
              <BookMarked className="w-3.5 h-3.5 text-[#2b5b84]" />
              <span>A. Refleksi Pribadi & Aksi Nyata Siswa</span>
            </h2>
            <div className="p-4 bg-slate-50/80 rounded-lg border border-slate-200 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
              {submission.refleksi}
            </div>
          </div>

          {/* Doa Pribadi */}
          {submission.doa && (
            <div className="mb-6 space-y-2">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-[#2b5b84]" />
                <span>B. Doa Pribadi Singkat Siswa</span>
              </h2>
              <div className="p-4 bg-slate-50/80 rounded-lg border border-slate-200 text-sm italic font-serif-scripture leading-relaxed text-slate-800 whitespace-pre-wrap">
                "{submission.doa}"
              </div>
            </div>
          )}

          {/* Lampiran Gambar (Bila ada) */}
          {submission.lampiranUrl && (
            <div className="mb-6 space-y-2">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-1.5">
                C. Lampiran Berkas / Karya Siswa
              </h2>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center">
                <img
                  src={submission.lampiranUrl}
                  alt={submission.lampiranName || 'Lampiran Tugas'}
                  className="max-h-72 object-contain rounded border border-slate-300"
                />
                <span className="text-xs text-slate-500 mt-2">
                  {submission.lampiranName || 'Berkas Gambar Tugas'}
                </span>
              </div>
            </div>
          )}

          {/* Kolom Evaluasi & Tanda Tangan */}
          <div className="border border-slate-300 rounded-lg p-4 mt-8 print-break-inside-avoid">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold text-slate-700 block uppercase mb-1">
                  Catatan Guru Pembina:
                </span>
                <div className="min-h-16 text-xs text-slate-800 p-2 bg-slate-50 rounded border border-slate-200">
                  {submission.catatanGuru || 'Refleksi telah dibaca dan dievaluasi.'}
                </div>
              </div>
              <div className="text-right flex flex-col justify-between items-end">
                <div className="text-xs">
                  <span className="font-semibold text-slate-600">Nilai Refleksi: </span>
                  <span className="text-lg font-bold text-[#2b5b84] tabular-nums">
                    {submission.nilai !== undefined ? submission.nilai : '____ / 100'}
                  </span>
                </div>
                <div className="mt-8 text-center min-w-40">
                  <div className="border-b border-slate-400 pb-1 mb-1 text-xs font-bold text-slate-800">
                    ( Guru Agama Katolik )
                  </div>
                  <div className="text-[10px] text-slate-500">Tanda Tangan & Tanggal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Print Info */}
          <div className="mt-6 pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400">
            <span>Kurikulum Merdeka / Nasional SMP — Mata Pelajaran Pendidikan Agama Katolik</span>
            <span className="tabular-nums">ID Refleksi: {submission.id}</span>
          </div>

        </div>
      </div>
    </div>
  );
};
