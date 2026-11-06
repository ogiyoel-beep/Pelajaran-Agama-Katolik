export interface QuizQuestion {
  id: string;
  bab: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  scriptureReference: string;
}

export interface ScriptureMatchItem {
  id: string;
  reference: string;
  excerpt: string;
  topic: string;
}

export interface ConscienceScenario {
  id: string;
  title: string;
  context: string;
  situation: string;
  choices: {
    text: string;
    score: number; // 0, 50, 100
    conscienceFeedback: string;
    scriptureTip: string;
  }[];
}

export const CATHOLIC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    bab: 'Bab 1: Aku Citra Allah yang Unik',
    question: 'Istilah dalam teologi Katolik yang menyatakan bahwa manusia diciptakan seturut gambar dan rupa Allah adalah...',
    options: ['Imago Dei', 'Sola Fide', 'Corpus Christi', 'Agnus Dei'],
    correctIndex: 0,
    explanation: 'Imago Dei adalah ajaran fundamental Gereja Katolik bahwa setiap manusia bermartabat luhur karena memancarkan rupa dan citra Allah sendiri (Kejadian 1:26-27).',
    scriptureReference: 'Kejadian 1:26-27'
  },
  {
    id: 'q2',
    bab: 'Bab 1: Aku Citra Allah yang Unik',
    question: 'Dalam Mazmur 139:14, pemazmur Daud memuji Tuhan atas penciptaan dirinya dengan ungkapan bahwa kejadiannya adalah...',
    options: ['Biasa saja seperti debu tanah', 'Dahsyat dan ajaib', 'Sempurna tanpa cela', 'Paling berkuasa di alam semesta'],
    correctIndex: 1,
    explanation: '"Aku bersyukur kepada-Mu oleh karena kejadianku dahsyat dan ajaib; ajaib apa yang Kaubuat, dan jiwaku benar-benar menyadarinya."',
    scriptureReference: 'Mazmur 139:14'
  },
  {
    id: 'q3',
    bab: 'Bab 2: Kemampuan dan Keterbatasanku',
    question: 'Dalam Perumpamaan tentang Talenta (Matius 25:14-30), apa yang dilakukan hamba yang menerima satu talenta sehingga tuannya marah?',
    options: [
      'Ia membelanjakannya untuk bersenang-senang',
      'Ia menguburnya di dalam tanah karena takut',
      'Ia membagikannya kepada orang miskin',
      'Ia meminjamkannya dengan bunga tinggi'
    ],
    correctIndex: 1,
    explanation: 'Hamba yang menerima 1 talenta mengubur talentanya karena takut dan malas. Yesus mengajarkan bahwa talenta harus diperkembangkan demi kemuliaan Allah.',
    scriptureReference: 'Matius 25:24-28'
  },
  {
    id: 'q4',
    bab: 'Bab 2: Kemampuan dan Keterbatasanku',
    question: 'Rasul Paulus pernah mengalami keterbatasan fisik/kelemahan. Sabda Tuhan yang meneguhkannya dalam 2 Korintus 12:9 berbunyi...',
    options: [
      '"Kekuatanmu adalah hasil usahamu sendiri"',
      '"Cukuplah kasih karunia-Ku bagimu, sebab justru dalam kelemahanlah kuasa-Ku menjadi sempurna"',
      '"Jangan meminta bantuan sesama orang beriman"',
      '"Kelemahan adalah tanda bahwa engkau ditinggalkan Allah"'
    ],
    correctIndex: 1,
    explanation: 'Tuhan menegaskan bahwa keterbatasan kita membuka pintu bagi kasih karunia Tuhan untuk bekerja sempurna dalam kerendahan hati.',
    scriptureReference: '2 Korintus 12:9'
  },
  {
    id: 'q5',
    bab: 'Bab 3: Mengembangkan Karunia Allah',
    question: 'Nasihat Rasul Paulus kepada Timotius yang masih berusia muda tertulis dalam 1 Timotius 4:12, yaitu...',
    options: [
      '"Tunggulah sampai engkau dewasa baru melayani"',
      '"Jangan seorang pun menganggap engkau rendah karena engkau muda. Jadilah teladan bagi orang percaya"',
      '"Banggakanlah bakatmu di depan orang banyak"',
      '"Fokuslah hanya pada kekayaan duniawi"'
    ],
    correctIndex: 1,
    explanation: 'Sebagai remaja SMP, siswa diajak menjadi teladan dalam perkataan, tingkah laku, kasih, kesetiaan, dan kesucian tanpa menunggu dewasa.',
    scriptureReference: '1 Timotius 4:12'
  },
  {
    id: 'q6',
    bab: 'Bab 4: Suara Hati dan Moral Remaja',
    question: 'Suara hati nurani (Conscientia) dalam ajaran Gereja Katolik berfungsi sebagai...',
    options: [
      'Tempat terdalam manusia berdialog dengan Allah dan menuntun memilih yang benar',
      'Suara bisikan yang selalu membenarkan apapun keinginan kita',
      'Aturan kaku dari masyarakat tanpa pertimbangan akal budi',
      'Perasaan takut dihukum semata-mata'
    ],
    correctIndex: 0,
    explanation: 'Suara hati adalah tempat suci di mana manusia berdialog sendirian dengan Allah, menyuarakan panggilan untuk mengasihi dan melakukan yang baik serta menjauhi yang jahat.',
    scriptureReference: 'Katekismus Gereja Katolik (KGK 1776)'
  },
  {
    id: 'q7',
    bab: 'Bab 4: Suara Hati dan Moral Remaja',
    question: 'Manakah di bawah ini yang merupakan Buah-buah Roh Kudus menurut surat Galatia 5:22-23?',
    options: [
      'Keserakahan, kepintaran, dan ketenaran',
      'Kasih, sukacita, damai sejahtera, kesabaran, kemurahan, kebaikan, kesetiaan, kelemahlembutan, penguasaan diri',
      'Kekuasaan, kekayaan, dan keberanian fisik',
      'Rasa bangga diri dan persaingan ketat'
    ],
    correctIndex: 1,
    explanation: 'Buah Roh Kudus adalah sembilan kebajikan moral kristiani yang tumbuh subur dalam pribadi yang hidup dipimpin oleh Roh Allah.',
    scriptureReference: 'Galatia 5:22-23'
  },
  {
    id: 'q8',
    bab: 'Bab 5: Yesus Teladan dan Sahabatku',
    question: 'Dalam Yohanes 15:15, Yesus menyebut para murid-Nya bukan lagi sebagai hamba, melainkan sebagai...',
    options: ['Murid biasa', 'Sahabat', 'Prajurit', 'Pengikut tanpa nama'],
    correctIndex: 1,
    explanation: '"Aku tidak menyebut kamu lagi hamba... tetapi Aku menyebut kamu sahabat, karena Aku telah memberitahukan kepada kamu segala sesuatu yang telah Kudengar dari Bapa-Ku."',
    scriptureReference: 'Yohanes 15:15'
  },
  {
    id: 'q9',
    bab: 'Bab 5: Yesus Teladan dan Sahabatku',
    question: 'Dalam kisah Orang Samaria yang Murah Hati (Lukas 10:25-37), teladan Yesus mengajarkan arti "sesama" sejati yaitu...',
    options: [
      'Hanya mereka yang berasal dari suku dan agama yang sama',
      'Orang yang tergerak oleh belas kasihan dan berani menolong siapa saja yang menderita',
      'Orang yang memiliki kedudukan terhormat di masyarakat',
      'Mereka yang mau membalas kebaikan kita kelak'
    ],
    correctIndex: 1,
    explanation: 'Orang Samaria melampaui sekat permusuhan etnis untuk merawat orang yang terluka. Yesus berpesan: "Pergilah, dan perbuatlah demikian!"',
    scriptureReference: 'Lukas 10:37'
  },
  {
    id: 'q10',
    bab: 'Bab 6: Peran Keluarga dan Teman dalam Hidupku',
    question: 'Gereja Katolik menyebut persekutuan keluarga beriman sebagai "Ecclesia Domestica", yang memiliki makna...',
    options: [
      'Gereja Rumah Tangga tempat iman dan kasih pertama kali bersemi',
      'Sekolah asrama khusus biarawan-biarawati',
      'Gedung gereja pusat di keuskupan',
      'Perkumpulan doa kaum muda lingkungan'
    ],
    correctIndex: 0,
    explanation: 'Ecclesia Domestica berarti Gereja Rumah Tangga, di mana orang tua menjadi pendidik iman pertama dan utama bagi anak-anaknya.',
    scriptureReference: 'Lumen Gentium 11 & Efesus 6:1-3'
  }
];

export const SCRIPTURE_MATCH_PAIRS: ScriptureMatchItem[] = [
  {
    id: 'p1',
    reference: 'Kejadian 1:27',
    excerpt: 'Allah menciptakan manusia menurut gambar-Nya, diciptakan-Nya dia laki-laki dan perempuan.',
    topic: 'Imago Dei (Bab 1)'
  },
  {
    id: 'p2',
    reference: 'Mazmur 139:14',
    excerpt: 'Aku bersyukur kepada-Mu oleh karena kejadianku dahsyat dan ajaib.',
    topic: 'Keunikan Diri (Bab 1)'
  },
  {
    id: 'p3',
    reference: 'Matius 25:21',
    excerpt: 'Baik sekali perbuatanmu itu, hamba yang baik dan setia; masuklah ke dalam kebahagiaan tuanmu.',
    topic: 'Talenta (Bab 2)'
  },
  {
    id: 'p4',
    reference: '1 Timotius 4:12',
    excerpt: 'Jangan seorang pun menganggap engkau rendah karena engkau muda. Jadilah teladan bagi orang percaya.',
    topic: 'Teladan Remaja (Bab 3)'
  },
  {
    id: 'p5',
    reference: 'Galatia 5:22',
    excerpt: 'Buah Roh ialah: kasih, sukacita, damai sejahtera, kesabaran, kemurahan, kebaikan...',
    topic: 'Moral & Suara Hati (Bab 4)'
  },
  {
    id: 'p6',
    reference: 'Yohanes 15:13',
    excerpt: 'Tidak ada kasih yang lebih besar dari pada kasih seorang yang memberikan nyawanya untuk sahabatnya.',
    topic: 'Yesus Sahabat (Bab 5)'
  },
  {
    id: 'p7',
    reference: 'Efesus 6:2',
    excerpt: 'Hormatilah ayahmu dan ibumu—ini adalah suatu perintah yang penting dengan suatu janji.',
    topic: 'Keluarga Beriman (Bab 6)'
  },
  {
    id: 'p8',
    reference: 'Amsal 17:17',
    excerpt: 'Seorang sahabat menaruh kasih setiap waktu, dan menjadi seorang saudara dalam kesukaran.',
    topic: 'Persahabatan Sejati (Bab 6)'
  }
];

export const CONSCIENCE_SCENARIOS: ConscienceScenario[] = [
  {
    id: 's1',
    title: 'Dilema 1: Ajakan Curang Saat Ulangan',
    context: 'Suasana kelas sedang hening saat Ulangan Harian Agama Katolik.',
    situation: 'Teman sebangkumu yang belum belajar mencolek lenganmu dan meminta lembar jawabanmu. Ia berbisik: "Tolonglah, kita kan sahabat! Kalau nilaiku jelek aku bakal dimarahi orang tua."',
    choices: [
      {
        text: 'Menolak memberikan contekan dengan sopan, lalu berjanji akan mengajarinya belajar bersama setelah ulangan selesai.',
        score: 100,
        conscienceFeedback: 'Sangat bijak! Sahabat sejati tidak menolong dengan cara merusak kejujuran. Menepati suara hati nurani dan menawarkan bantuan belajar adalah buah kasih yang benar.',
        scriptureTip: 'Amsal 12:22 — "Bibir yang mengatakan kebenaran adalah kekal, tetapi lidah dusta hanya untuk sekejap mata."'
      },
      {
        text: 'Memberikan jawaban separuh saja agar teman tidak marah dan tetap dianggap solider.',
        score: 50,
        conscienceFeedback: 'Kompromi semu ini tetap melanggar kejujuran suara hati. Solidaritas yang salah justru merugikan temanmu karena membuatnya malas belajar.',
        scriptureTip: 'Lukas 16:10 — "Barangsiapa setia dalam perkara-perkara kecil, ia setia juga dalam perkara-perkara besar."'
      },
      {
        text: 'Menertawakannya dan mengadukannya dengan suara keras agar dia dihukum guru di depan semua teman.',
        score: 20,
        conscienceFeedback: 'Mempermalukan teman tanpa kasih bukanlah teladan Kristus. Teguran harus disampaikan dengan kerendahan hati dan kepedulian.',
        scriptureTip: 'Efesus 4:29 — "Janganlah ada perkataan kotor keluar dari mulutmu, tetapi pakailah perkataan yang baik untuk membangun."'
      }
    ]
  },
  {
    id: 's2',
    title: 'Dilema 2: Dompet Tertinggal di Kantin Sekolah',
    context: 'Jam istirahat kedua di lorong kantin yang mulai sepi.',
    situation: 'Kamu menemukan sebuah dompet kecil tergeletak di bawah bangku kantin berisi uang saku Rp 150.000 dan kartu OSIS milik adik kelas VII. Tidak ada seorang pun yang melihatmu menemukannya.',
    choices: [
      {
        text: 'Segera membawa dompet ke Ruang Piket Guru / Wali Kelas agar diumumkan kepada pemiliknya tanpa mengurangi isinya.',
        score: 100,
        conscienceFeedback: 'Inilah integritas murni! Memilih yang benar bahkan ketika tidak ada orang yang melihat adalah bukti bahwa kamu menghormati Allah yang melihat lubuk hati.',
        scriptureTip: 'Amsal 10:9 — "Siapa bersih kelakuannya, aman jalannya, tetapi siapa berliku-liku jalannya, akan diketahui."'
      },
      {
        text: 'Mengambil uangnya untuk jajan bersama teman dan hanya mengembalikan dompet serta kartu OSIS-nya.',
        score: 0,
        conscienceFeedback: 'Ini melanggar Perintah Allah ke-7 (Jangan Mencuri) dan membungkam suara hatimu. Tindakan ini merugikan sesama yang mungkin sangat membutuhkan uang tersebut.',
        scriptureTip: 'Keluaran 20:15 — "Jangan mencuri."'
      },
      {
        text: 'Membiarkan dompet tetap di tempatnya karena takut repot atau dituduh yang bukan-bukan.',
        score: 40,
        conscienceFeedback: 'Sikap masa bodoh (apatis) mengabaikan kesempatan berbuat kasih. Seperti imam dan orang Lewi dalam perumpamaan Orang Samaria yang berlalu begitu saja.',
        scriptureTip: 'Yakobus 4:17 — "Jika seorang tahu bagaimana ia harus berbuat baik, tetapi ia tidak melakukannya, ia berdosa."'
      }
    ]
  },
  {
    id: 's3',
    title: 'Dilema 3: Teman Baru yang Menyendiri & Diejek',
    context: 'Di lapangan sekolah saat jam istirahat siang.',
    situation: 'Seorang siswa baru dari luar daerah tampak canggung dan duduk sendirian. Sekelompok teman populer mulai meniru logat bicaranya dan menjadikannya bahan tertawaan.',
    choices: [
      {
        text: 'Menghampiri siswa baru itu, menyapanya ramah, dan mengajaknya bergabung makan bekal bersamamu.',
        score: 100,
        conscienceFeedback: 'Luar biasa! Kamu menghadirkan wajah Kristus yang merangkul kaum yang terasing. Sikap ini memancarkan pemahaman sejati bahwa setiap anak adalah Citra Allah (Imago Dei).',
        scriptureTip: 'Matius 25:40 — "Sesungguhnya segala sesuatu yang kamu lakukan untuk salah seorang dari saudara-Ku yang paling hina ini, kamu telah melakukannya untuk Aku."'
      },
      {
        text: 'Ikut tersenyum bersama gerombolan teman populer agar tidak dianggap aneh atau dijauhi.',
        score: 10,
        conscienceFeedback: 'Tekanan teman sebaya (peer pressure) sering menggoda kita untuk mengorbankan empati demi diterima kelompok. Suara hatimu tahu bahwa itu melukai hati sesama.',
        scriptureTip: 'Roma 12:2 — "Janganlah kamu menjadi serupa dengan dunia ini, tetapi berubahlah oleh pembaruan budimu."'
      },
      {
        text: 'Hanya merasa kasihan dalam hati tetapi tidak berbuat apa-apa lalu berjalan pergi.',
        score: 50,
        conscienceFeedback: 'Belas kasihan itu baik, namun kasih Kristiani memanggil kita untuk bertindak nyata (Aksi Nyata), bukan berhenti pada simpati pasif.',
        scriptureTip: '1 Yohanes 3:18 — "Marilah kita mengasihi bukan dengan perkataan atau dengan lidah, tetapi dengan perbuatan dan dalam kebenaran."'
      }
    ]
  },
  {
    id: 's4',
    title: 'Dilema 4: Permintaan Bantuan Ibu di Rumah',
    context: 'Hari Sabtu sore di rumah saat sedang asyik bermain game di ponsel.',
    situation: 'Ibumu yang baru pulang kerja tampak lelah dan meminta bantuanmu: "Nak, tolong bantu ibu jemur pakaian sebentar ya." Game yang sedang kamu mainkan bersama tim sedang berlangsung sengit.',
    choices: [
      {
        text: 'Menghentikan permainan sejenak / jeda game, lalu segera membantu ibu dengan sukacita dan senyuman.',
        score: 100,
        conscienceFeedback: 'Pilihan bakti anak yang mulia! Menghormati orang tua (Efesus 6:1-3) adalah pilar moral Katolik yang membawa berkat besar dalam hidup.',
        scriptureTip: 'Kolose 3:20 — "Hai anak-anak, taatilah orang tuamu dalam segala hal, karena itulah yang indah di dalam Tuhan."'
      },
      {
        text: 'Menjawab dengan nada kesal: "Nanti dulu Bu, lagi tanggung nih!" lalu baru membantu setengah jam kemudian dengan cemberut.',
        score: 40,
        conscienceFeedback: 'Membantu dengan bersungut-sungut melukai hati orang tua. Kebaikan yang tulus memerlukan kelemahlembutan hati dan pengorbanan ego.',
        scriptureTip: '1 Korintus 13:4 — "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak membesarkan diri dan tidak sombong."'
      },
      {
        text: 'Pura-pura tidak mendengar dengan memakai earphone sampai ibu terpaksa melakukannya sendiri.',
        score: 10,
        conscienceFeedback: 'Sikap egois ini menumpulkan kepekaan batinmu terhadap pengorbanan orang tua yang telah merawatmu sejak kecil.',
        scriptureTip: 'Amsal 23:22 — "Dengarkanlah ayahmu yang memperanakkan engkau, dan janganlah menghina ibumu kalau ia sudah tua."'
      }
    ]
  }
];
