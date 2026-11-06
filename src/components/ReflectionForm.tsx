import React, { useState, useEffect, useRef } from 'react';
import { StudentSubmission } from '../types/reflection';
import { CHAPTERS_DATA } from '../data/curriculumData';
import {
  BookOpen,
  Send,
  Upload,
  CheckCircle,
  Sparkles,
  Printer,
  FileCheck2,
  X,
  ChevronDown,
  Info,
  HelpCircle,
  Image as ImageIcon
} from 'lucide-react';

interface ReflectionFormProps {
  onSubmitSuccess: (submission: StudentSubmission) => void;
  onOpenPrintSheet: (submission: StudentSubmission) => void;
  preselectedChapter?: string;
  preselectedVerse?: string;
  onClearPreselection?: () => void;
}

export const ReflectionForm: React.FC<ReflectionFormProps> = ({
  onSubmitSuccess,
  onOpenPrintSheet,
  preselectedChapter,
  preselectedVerse,
  onClearPreselection,
}) => {
  // Form State
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState<'VII-A' | 'VII-B' | 'VII-C' | 'VII-D' | ''>('');
  const [absen, setAbsen] = useState<string>('');
  const [materi, setMateri] = useState('');
  const [ayat, setAyat] = useState('');
  const [refleksi, setRefleksi] = useState('');
  const [doa, setDoa] = useState('');

  // Attachment State
  const [fileData, setFileData] = useState<{
    url?: string;
    name?: string;
    type?: string;
  } | null>(null);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedItem, setSubmittedItem] = useState<StudentSubmission | null>(null);
  const [showScripturePreview, setShowScripturePreview] = useState(true);
  const [showReflectionHelp, setShowReflectionHelp] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preselected data from Curriculum view
  useEffect(() => {
    if (preselectedChapter) {
      setMateri(preselectedChapter);
    }
    if (preselectedVerse) {
      setAyat(preselectedVerse);
    }
  }, [preselectedChapter, preselectedVerse]);

  // Find active chapter data for helper hints
  const activeChapterData = CHAPTERS_DATA.find((ch) => ch.title === materi);

  // Find active scripture passage text if available
  const activeScripture = activeChapterData?.suggestedVerses.find(
    (v) => v.ref.toLowerCase() === ayat.toLowerCase().trim()
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('Ukuran berkas melebihi batas 8 MB. Silakan pilih foto dengan resolusi lebih kecil.');
      return;
    }

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileData({
          url: event.target?.result as string,
          name: file.name,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFileData({
        name: file.name,
        type: file.type,
      });
    }
  };

  const handleRemoveFile = () => {
    setFileData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim() || !kelas || !absen || !materi || !refleksi.trim()) {
      alert('Mohon lengkapi semua kolom yang bertanda bintang (*).');
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newSubmission: StudentSubmission = {
      id: `SUB-${Date.now().toString().slice(-6)}`,
      nama: nama.trim(),
      kelas: kelas as 'VII-A' | 'VII-B' | 'VII-C' | 'VII-D',
      absen: parseInt(absen, 10),
      materi,
      ayat: ayat.trim(),
      refleksi: refleksi.trim(),
      doa: doa.trim(),
      lampiranUrl: fileData?.url,
      lampiranName: fileData?.name,
      lampiranType: fileData?.type,
      submittedAt: formattedDate,
      status: 'Belum Dinilai',
    };

    setTimeout(() => {
      onSubmitSuccess(newSubmission);
      setSubmittedItem(newSubmission);
      setIsSubmitting(false);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 400);
  };

  const handleResetForm = () => {
    setNama('');
    setKelas('');
    setAbsen('');
    setMateri('');
    setAyat('');
    setRefleksi('');
    setDoa('');
    setFileData(null);
    setSubmittedItem(null);
    if (onClearPreselection) onClearPreselection();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // If submitted, show peaceful celebration & confirmation screen
  if (submittedItem) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md border-t-6 border-[#2b5b84] p-6 sm:p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase block mb-1">
              Puji Tuhan! Pengumpulan Berhasil
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              Tugas & Lembar Refleksi Diterima
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-mono tabular-nums">
              ID Pengumpulan: {submittedItem.id} · {submittedItem.submittedAt}
            </p>
          </div>

          {/* Ringkasan Isian */}
          <div className="text-left bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-3 text-xs text-slate-700">
            <div className="grid grid-cols-2 gap-2 border-b border-slate-200 pb-2">
              <div>
                <span className="text-slate-400 block">Nama Siswa:</span>
                <span className="font-bold text-slate-900 text-sm">{submittedItem.nama}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Kelas & Absen:</span>
                <span className="font-bold text-slate-900 text-sm font-mono tabular-nums">
                  {submittedItem.kelas} (No. {submittedItem.absen})
                </span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block">Topik Pembelajaran:</span>
              <span className="font-semibold text-[#2b5b84]">{submittedItem.materi}</span>
            </div>

            {submittedItem.ayat && (
              <div>
                <span className="text-slate-400 block">Ayat Kitab Suci:</span>
                <span className="font-serif-scripture text-amber-900 italic font-semibold">
                  "{submittedItem.ayat}"
                </span>
              </div>
            )}

            <div>
              <span className="text-slate-400 block">Refleksi Pribadi & Aksi Nyata:</span>
              <p className="text-slate-800 italic mt-0.5 whitespace-pre-wrap">
                "{submittedItem.refleksi}"
              </p>
            </div>

            {submittedItem.doa && (
              <div>
                <span className="text-slate-400 block">Doa Pribadi:</span>
                <p className="text-slate-800 italic font-serif-scripture mt-0.5">
                  "{submittedItem.doa}"
                </p>
              </div>
            )}

            {submittedItem.lampiranName && (
              <div>
                <span className="text-slate-400 block">Berkas Terlampir:</span>
                <span className="text-slate-700 font-semibold">{submittedItem.lampiranName}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onOpenPrintSheet(submittedItem)}
              className="flex-1 py-3 px-4 bg-[#2b5b84] hover:bg-[#1f4260] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Lembar Refleksi (PDF)</span>
            </button>

            <button
              onClick={handleResetForm}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Kirim Lembar Tugas Lain</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Spiritual Banner Card */}
      <div className="relative rounded-2xl overflow-hidden mb-8 border border-slate-200 shadow-sm bg-slate-900 text-white min-h-[160px] flex items-center">
        <img
          src="/src/assets/images/hero_kitab_suci_refleksi_1793952544333.jpg"
          alt="Kitab Suci dan Salib"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-transparent" />

        <div className="relative z-10 p-6 sm:p-8 max-w-2xl">
          <span className="text-amber-300 text-xs font-semibold tracking-wider uppercase block mb-1">
            Pendidikan Agama Katolik & Budi Pekerti SMP Kelas VII
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku."
          </h1>
          <p className="text-xs text-slate-300 font-serif-scripture italic">
            — Mazmur 119:105
          </p>
        </div>
      </div>

      {/* Center Form Container — faithfully respecting the user's styling with #2b5b84 and clean responsive layout */}
      <div className="flex justify-center">
        <div className="bg-white max-w-2xl w-full p-6 sm:p-8 rounded-xl shadow-md border-t-6 border-[#2b5b84] border-x border-b border-slate-200">
          
          {/* Header Form */}
          <div className="text-center mb-6">
            <h2 className="text-[#2b5b84] text-2xl font-bold mb-1">
              Lembar Refleksi & Tugas
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Pendidikan Agama Katolik & Budi Pekerti — SMP Kelas VII
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Identitas Siswa: Nama Lengkap */}
            <div>
              <label htmlFor="nama" className="block font-semibold text-xs text-slate-800 mb-1.5">
                Nama Lengkap Siswa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Maria Fransiska"
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] transition-all"
              />
            </div>

            {/* Kelas & No Absen Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="kelas" className="block font-semibold text-xs text-slate-800 mb-1.5">
                  Kelas <span className="text-red-500">*</span>
                </label>
                <select
                  id="kelas"
                  name="kelas"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value as any)}
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] bg-white transition-all"
                >
                  <option value="">-- Pilih Kelas --</option>
                  <option value="VII-A">VII-A</option>
                  <option value="VII-B">VII-B</option>
                  <option value="VII-C">VII-C</option>
                  <option value="VII-D">VII-D</option>
                </select>
              </div>

              <div>
                <label htmlFor="absen" className="block font-semibold text-xs text-slate-800 mb-1.5">
                  No. Absen <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="absen"
                  name="absen"
                  min="1"
                  max="50"
                  value={absen}
                  onChange={(e) => setAbsen(e.target.value)}
                  placeholder="Contoh: 14"
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] transition-all"
                />
              </div>
            </div>

            {/* Materi Pembelajaran Kelas 7 */}
            <div>
              <label htmlFor="materi" className="block font-semibold text-xs text-slate-800 mb-1.5">
                Topik / Bab Materi <span className="text-red-500">*</span>
              </label>
              <select
                id="materi"
                name="materi"
                value={materi}
                onChange={(e) => {
                  setMateri(e.target.value);
                  // Auto suggest first verse if empty
                  const matched = CHAPTERS_DATA.find((c) => c.title === e.target.value);
                  if (matched && matched.suggestedVerses[0] && !ayat) {
                    setAyat(matched.suggestedVerses[0].ref);
                  }
                }}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] bg-white transition-all"
              >
                <option value="">-- Pilih Topik Pembelajaran --</option>
                <option value="Bab 1: Aku Citra Allah yang Unik">Bab 1: Aku Citra Allah yang Unik</option>
                <option value="Bab 2: Kemampuan dan Keterbatasanku">Bab 2: Kemampuan dan Keterbatasanku</option>
                <option value="Bab 3: Mengembangkan Karunia Allah">Bab 3: Mengembangkan Karunia Allah</option>
                <option value="Bab 4: Suara Hati dan Moral Remaja">Bab 4: Suara Hati dan Moral Remaja</option>
                <option value="Bab 5: Yesus Teladan dan Sahabatku">Bab 5: Yesus Teladan dan Sahabatku</option>
                <option value="Bab 6: Peran Keluarga dan Teman dalam Hidupku">Bab 6: Peran Keluarga dan Teman dalam Hidupku</option>
              </select>
            </div>

            {/* Rekomendasi Ayat Quick Picker (Interactive Educational Feature) */}
            {activeChapterData && (
              <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-lg">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Rekomendasi Ayat Kitab Suci untuk Bab Ini:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowScripturePreview(!showScripturePreview)}
                    className="text-[11px] text-[#2b5b84] hover:underline cursor-pointer"
                  >
                    {showScripturePreview ? 'Sembunyikan' : 'Buka Bacaan'}
                  </button>
                </div>

                {/* Clickable verse suggestions */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {activeChapterData.suggestedVerses.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAyat(item.ref)}
                      className={`text-xs px-2.5 py-1 rounded transition-colors cursor-pointer border ${
                        ayat === item.ref
                          ? 'bg-[#2b5b84] text-white border-[#2b5b84] font-semibold'
                          : 'bg-white text-slate-700 border-amber-300 hover:bg-amber-100/60'
                      }`}
                    >
                      {item.ref}
                    </button>
                  ))}
                </div>

                {/* Inline Scripture Reader preview */}
                {showScripturePreview && (
                  <div className="text-[11px] text-slate-700 bg-white/90 p-2.5 rounded border border-amber-200/70 font-serif-scripture italic leading-relaxed">
                    {activeScripture ? (
                      <div>
                        <strong className="text-amber-950 not-italic block mb-0.5">
                          {activeScripture.ref} ({activeScripture.tema}):
                        </strong>
                        "{activeScripture.text}"
                      </div>
                    ) : (
                      <div>
                        <strong className="text-amber-950 not-italic block mb-0.5">
                          {activeChapterData.suggestedVerses[0].ref}:
                        </strong>
                        "{activeChapterData.suggestedVerses[0].text}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Ayat Kitab Suci & Pemahaman */}
            <div>
              <label htmlFor="ayat" className="block font-semibold text-xs text-slate-800 mb-1.5">
                Ayat Kitab Suci yang Direfleksikan
              </label>
              <input
                type="text"
                id="ayat"
                name="ayat"
                value={ayat}
                onChange={(e) => setAyat(e.target.value)}
                placeholder="Contoh: Kejadian 1:26-28 atau Matius 25:14-30"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] transition-all"
              />
            </div>

            {/* Refleksi Pribadi Siswa */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="refleksi" className="font-semibold text-xs text-slate-800">
                  Refleksi Pribadi & Aksi Nyata <span className="text-red-500">*</span>
                </label>
                {activeChapterData && (
                  <button
                    type="button"
                    onClick={() => setShowReflectionHelp(!showReflectionHelp)}
                    className="text-[11px] text-[#2b5b84] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showReflectionHelp ? 'Tutup Panduan' : 'Ide Refleksi'}</span>
                  </button>
                )}
              </div>

              {/* Collapsible Reflection Guiding Questions */}
              {showReflectionHelp && activeChapterData && (
                <div className="mb-2 p-3 bg-blue-50/70 border border-blue-200 rounded-md text-xs text-slate-700 space-y-1.5">
                  <span className="font-bold text-[#2b5b84] block">Pertanyaan Pemantik:</span>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
                    {activeChapterData.panduanRefleksi.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}

              <textarea
                id="refleksi"
                name="refleksi"
                rows={4}
                value={refleksi}
                onChange={(e) => setRefleksi(e.target.value)}
                placeholder="Tuliskan apa yang kamu pelajari dari firman Tuhan dan bagaimana kamu menerapkannya di rumah/sekolah..."
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] transition-all"
              />
              <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                <span>Refleksikan secara jujur dan aplikatif</span>
                <span className="font-mono tabular-nums">{refleksi.length} karakter</span>
              </div>
            </div>

            {/* Doa Singkat Siswa */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="doa" className="font-semibold text-xs text-slate-800">
                  Doa Pribadi Singkat
                </label>
                {activeChapterData && (
                  <button
                    type="button"
                    onClick={() => setDoa(activeChapterData.doaInspirasi)}
                    className="text-[11px] text-[#2b5b84] hover:underline cursor-pointer"
                  >
                    Gunakan Inspirasi Doa Bab Ini
                  </button>
                )}
              </div>
              <textarea
                id="doa"
                name="doa"
                rows={3}
                value={doa}
                onChange={(e) => setDoa(e.target.value)}
                placeholder="Tuliskan doa syukur atau permohonanmu kepada Tuhan terkait materi ini..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-[#2b5b84] focus:ring-1 focus:ring-[#2b5b84] transition-all"
              />
            </div>

            {/* Unggah Tugas/Gambar (Opsional) */}
            <div>
              <label htmlFor="lampiran" className="block font-semibold text-xs text-slate-800 mb-1.5">
                Unggah Foto/Berkas Tugas (Jika ada tugas menggambar/rangkuman)
              </label>

              {fileData ? (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    {fileData.url ? (
                      <img
                        src={fileData.url}
                        alt="Pratinjau tugas"
                        className="w-10 h-10 object-cover rounded border border-slate-300"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-400" />
                    )}
                    <span className="text-xs text-slate-800 font-medium truncate">
                      {fileData.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                    title="Hapus berkas"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border border-dashed border-slate-300 rounded-md p-4 text-center hover:bg-slate-50 transition-colors">
                  <input
                    type="file"
                    id="lampiran"
                    name="lampiran"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <label
                    htmlFor="lampiran"
                    className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
                  >
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span className="text-xs text-[#2b5b84] font-semibold hover:underline">
                      Pilih berkas dari perangkat Anda
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Format: .jpg, .png, .pdf (Maksimal 8 MB)
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Tombol Kirim */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2b5b84] hover:bg-[#1f4260] text-white py-3 px-4 rounded-md text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {isSubmitting ? (
                <span>Menyimpan Lembar Refleksi...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Tugas & Refleksi</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
