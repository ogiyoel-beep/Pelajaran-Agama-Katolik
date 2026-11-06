import React, { useState } from 'react';
import { Copy, Check, Download, ExternalLink, Code, Laptop } from 'lucide-react';

export const HtmlCodeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const rawHtmlCode = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lembar Refleksi & Tugas - Agama Katolik Kelas 7</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f4f6f9;
            color: #333;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .form-container {
            background: #ffffff;
            max-width: 650px;
            width: 100%;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            border-top: 6px solid #2b5b84; /* Warna khas teduh/edukasi */
        }

        .header-form {
            text-align: center;
            margin-bottom: 25px;
        }

        .header-form h2 {
            color: #2b5b84;
            font-size: 22px;
            margin-bottom: 6px;
        }

        .header-form p {
            color: #666;
            font-size: 14px;
        }

        .form-group {
            margin-bottom: 18px;
        }

        .form-row {
            display: flex;
            gap: 15px;
        }

        .form-row .form-group {
            flex: 1;
        }

        label {
            display: block;
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 6px;
            color: #444;
        }

        label span {
            color: #e74c3c;
        }

        input[type="text"],
        input[type="number"],
        select,
        textarea {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 14px;
            transition: border-color 0.3s;
        }

        input:focus,
        select:focus,
        textarea:focus {
            outline: none;
            border-color: #2b5b84;
            box-shadow: 0 0 5px rgba(43, 91, 132, 0.2);
        }

        textarea {
            resize: vertical;
            min-height: 90px;
        }

        .file-input {
            padding: 8px 0;
            font-size: 13px;
        }

        .btn-submit {
            background-color: #2b5b84;
            color: #fff;
            border: none;
            width: 100%;
            padding: 12px;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s ease;
            margin-top: 10px;
        }

        .btn-submit:hover {
            background-color: #1f4260;
        }

        @media (max-width: 500px) {
            .form-row {
                flex-direction: column;
                gap: 0;
            }
        }
    </style>
</head>
<body>

    <div class="form-container">
        <div class="header-form">
            <h2>Lembar Refleksi & Tugas</h2>
            <p>Pendidikan Agama Katolik & Budi Pekerti — SMP Kelas VII</p>
        </div>

        <!-- Ganti action dengan backend URL atau layanan seperti Formspree jika ingin menerima hasil langsung ke email -->
        <form action="#" method="POST" enctype="multipart/form-data">
            
            <!-- Identitas Siswa -->
            <div class="form-group">
                <label for="nama">Nama Lengkap Siswa <span>*</span></label>
                <input type="text" id="nama" name="nama" placeholder="Contoh: Maria Fransiska" required>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="kelas">Kelas <span>*</span></label>
                    <select id="kelas" name="kelas" required>
                        <option value="">-- Pilih Kelas --</option>
                        <option value="VII-A">VII-A</option>
                        <option value="VII-B">VII-B</option>
                        <option value="VII-C">VII-C</option>
                        <option value="VII-D">VII-D</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="absen">No. Absen <span>*</span></label>
                    <input type="number" id="absen" name="absen" min="1" max="50" placeholder="Contoh: 14" required>
                </div>
            </div>

            <!-- Materi Pembelajaran Kelas 7 -->
            <div class="form-group">
                <label for="materi">Topik / Bab Materi <span>*</span></label>
                <select id="materi" name="materi" required>
                    <option value="">-- Pilih Topik Pembelajaran --</option>
                    <option value="Bab 1: Aku Citra Allah yang Unik">Bab 1: Aku Citra Allah yang Unik</option>
                    <option value="Bab 2: Kemampuan dan Keterbatasanku">Bab 2: Kemampuan dan Keterbatasanku</option>
                    <option value="Bab 3: Mengembangkan Karunia Allah">Bab 3: Mengembangkan Karunia Allah</option>
                    <option value="Bab 4: Suara Hati dan Moral Remaja">Bab 4: Suara Hati dan Moral Remaja</option>
                    <option value="Bab 5: Yesus Teladan dan Sahabatku">Bab 5: Yesus Teladan dan Sahabatku</option>
                    <option value="Bab 6: Peran Keluarga dan Teman dalam Hidupku">Bab 6: Peran Keluarga dan Teman dalam Hidupku</option>
                </select>
            </div>

            <!-- Ayat Kitab Suci & Pemahaman -->
            <div class="form-group">
                <label for="ayat">Ayat Kitab Suci yang Direfleksikan</label>
                <input type="text" id="ayat" name="ayat" placeholder="Contoh: Kejadian 1:26-28 atau Matius 25:14-30">
            </div>

            <!-- Refleksi Pribadi Siswa -->
            <div class="form-group">
                <label for="refleksi">Refleksi Pribadi & Aksi Nyata <span>*</span></label>
                <textarea id="refleksi" name="refleksi" placeholder="Tuliskan apa yang kamu pelajari dari firman Tuhan dan bagaimana kamu menerapkannya di rumah/sekolah..." required></textarea>
            </div>

            <!-- Doa Singkat Siswa -->
            <div class="form-group">
                <label for="doa">Doa Pribadi Singkat</label>
                <textarea id="doa" name="doa" placeholder="Tuliskan doa syukur atau permohonanmu kepada Tuhan terkait materi ini..."></textarea>
            </div>

            <!-- Unggah Tugas/Gambar (Opsional) -->
            <div class="form-group">
                <label for="lampiran">Unggah Foto/Berkas Tugas (Jika ada tugas menggambar/rangkuman)</label>
                <input type="file" id="lampiran" name="lampiran" class="file-input" accept=".pdf,.jpg,.jpeg,.png">
            </div>

            <!-- Tombol Kirim -->
            <button type="submit" class="btn-submit">Kirim Tugas & Refleksi</button>
        </form>
    </div>

</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([rawHtmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-tugas.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2b5b84] uppercase tracking-wider mb-1">
            <Code className="w-4 h-4" />
            <span>File Mandiri: form-tugas.html</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Kode HTML & CSS Standalone Siap Pakai
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Sesuai permintaan Anda, berkas <code className="bg-slate-100 text-[#2b5b84] px-1.5 py-0.5 rounded font-mono text-xs">form-tugas.html</code> telah
            dibuat dan disimpan di direktori proyek. Anda dapat menyalin kode, mengunduh filenya, atau melihat pratinjaunya langsung.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Kode HTML'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#2b5b84] hover:bg-[#1f4260] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh form-tugas.html</span>
          </button>
        </div>
      </div>

      {/* Segmented Mode Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'preview'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Pratinjau Langsung (Preview)</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Kode Sumber Lengkap</span>
          </button>
        </div>

        <a
          href="/form-tugas.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#2b5b84] hover:underline flex items-center gap-1"
        >
          <span>Buka di tab baru</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {activeTab === 'preview' ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <iframe
            src="/form-tugas.html"
            title="Pratinjau form-tugas.html"
            className="w-full h-[750px] border-none"
          />
        </div>
      ) : (
        <div className="relative bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-md">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 text-slate-400 text-xs border-b border-slate-800">
            <span className="font-mono">form-tugas.html</span>
            <span className="font-mono text-[11px] text-slate-500">HTML5 + Embedded CSS</span>
          </div>
          <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto max-h-[600px] leading-relaxed selection:bg-emerald-900">
            <code>{rawHtmlCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
