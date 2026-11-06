export interface StudentSubmission {
  id: string;
  nama: string;
  kelas: 'VII-A' | 'VII-B' | 'VII-C' | 'VII-D';
  absen: number;
  materi: string;
  ayat: string;
  refleksi: string;
  doa: string;
  lampiranUrl?: string;
  lampiranName?: string;
  lampiranType?: string;
  submittedAt: string;
  nilai?: number;
  catatanGuru?: string;
  status: 'Belum Dinilai' | 'Sudah Dinilai';
}

export interface ScriptureVerse {
  ref: string;
  tema: string;
  text: string;
}

export interface ChapterGuide {
  id: string;
  babNumber: number;
  title: string;
  ringkasan: string;
  suggestedVerses: ScriptureVerse[];
  panduanRefleksi: string[];
  komitmenAksi: string[];
  doaInspirasi: string;
}
