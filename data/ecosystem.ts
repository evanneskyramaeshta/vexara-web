export interface LiteraryWork {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorRole: string;
  category: "Puisi" | "Esai Kritis" | "Resensi Buku" | "Prosa";
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  excerpt: string;
  content: string[];
}

export interface AcademyModule {
  id: string;
  code: string;
  title: string;
  track:
    | "Dasar Ilmu Hukum"
    | "Sejarah & Pergerakan"
    | "Filsafat Sosial"
    | "Teknik Sastra & Deklamasi";
  chaptersCount: number;
  duration: string;
  summary: string;
  chapters: {
    number: string;
    heading: string;
    keyPoint: string;
  }[];
}

export interface CommunityEvent {
  id: string;
  date: string;
  type: "Bedah Buku" | "Lomba Cipta Karya" | "Forum Diskusi";
  title: string;
  format: string;
  status: "Pendaftaran Dibuka" | "Segera Hadir";
}

export const literaryWorks: LiteraryWork[] = [
  {
    id: "wk-01",
    slug: "arsitektur-sunyi-dan-kata",
    title: "Arsitektur Sunyi di Tengah Bising Algoritma",
    author: "Evannesky Ramaeshta",
    authorRole: "Founder & Kurator Vexara",
    category: "Esai Kritis",
    publishedAt: "24 Nov 2026",
    readTime: "6 MENIT BACA",
    featured: true,
    excerpt:
      "Ketika perhatian manusia dipotong menjadi pecahan detik oleh lini masa digital, ruang baca yang pelan dan mendalam justru menjadi bentuk perlawanan intelektual paling radikal.",
    content: [
      "Kita hidup di era ketika informasi melimpah ruah, namun kedalaman permenungan semakin langka. Setiap hari jutaan kalimat melintas di layar, tetapi hanya segelintir yang benar-benar mengendap menjadi kesadaran.",
      "Membangun kembali tradisi literasi kolektif bukan berarti menolak teknologi. Sebaliknya, teknologi web modern harus ditundukkan untuk melayani kejernihan berpikir—menyediakan ruang yang tenang, terstruktur, dan bebas dari distraksi.",
      "Di ruang inilah gagasan diuji melalui argumen yang jujur, dan perasaan dirawat melalui diksi yang presisi.",
    ],
  },
  {
    id: "wk-02",
    slug: "catatan-kaki-cakrawala-2045",
    title: "Catatan Kaki untuk Cakrawala 2045",
    author: "Evannesky Ramaeshta",
    authorRole: "Penulis Puisi",
    category: "Puisi",
    publishedAt: "18 Nov 2026",
    readTime: "3 MENIT BACA",
    excerpt:
      "Bukan sekadar angka yang dipahat pada baliho kota / melainkan janji yang menagih bukti di meja kerja generasi muda...",
    content: [
      "Bukan sekadar angka yang dipahat pada baliho kota,",
      "melainkan janji yang menagih bukti di meja kerja generasi muda.",
      "Jika sejarah ditulis oleh mereka yang berani menjaga nyala pelita,",
      "maka biarlah aksara menjadi saksi bahwa kita tidak pernah tinggal diam membaca zaman.",
    ],
  },
  {
    id: "wk-03",
    slug: "membaca-ulang-nalar-konstitusi",
    title: "Membaca Ulang Nalar Konstitusi dalam Ruang Publik",
    author: "Nadia Kartika",
    authorRole: "Kontributor Kajian Hukum",
    category: "Resensi Buku",
    publishedAt: "12 Nov 2026",
    readTime: "5 MENIT BACA",
    excerpt:
      "Ulasan kritis atas buku Demokrasi Konstitusional karya Janedjri M. Gaffar dan relevansinya terhadap literasi hukum warga.",
    content: [
      "Pemahaman mengenai konstitusi sering kali dianggap sebagai wilayah eksklusif para akademisi dan praktisi peradilan. Padahal, konstitusi adalah kontrak sosial yang menentukan batas hak setiap warga negara.",
      "Melalui sistematika yang jernih, buku ini mengurai bagaimana mekanisme saling mengawasi antarlembaga negara bekerja menjaga keseimbangan demokrasi.",
    ],
  },
  {
    id: "wk-04",
    slug: "surat-dari-pelabuhan-lama",
    title: "Surat dari Pelabuhan Lama",
    author: "Raka Pradipta",
    authorRole: "Kontributor Sastra",
    category: "Prosa",
    publishedAt: "05 Nov 2026",
    readTime: "7 MENIT BACA",
    excerpt:
      "Di dermaga yang menyimpan arsip kapal-kapal tua, seorang penjaga perpustakaan kecil merawat buku catatan harian para pelaut.",
    content: [
      "Angin barat selalu datang membawa aroma garam dan kertas tua setiap menjelang senja di sudut pelabuhan itu.",
      "Bagi Arsa, setiap buku yang ditinggalkan para pelaut adalah peta perjalanan batin yang lebih jujur daripada kompas mana pun.",
    ],
  },
];

export const academyModules: AcademyModule[] = [
  {
    id: "mod-01",
    code: "MODUL 01",
    title: "Pengantar Penalaran & Argumentasi Hukum",
    track: "Dasar Ilmu Hukum",
    chaptersCount: 5,
    duration: "45 Menit",
    summary:
      "Memahami struktur logika hukum, cara membedah pasal secara sistematis, serta menyusun opini hukum yang objektif dan terukur.",
    chapters: [
      {
        number: "01",
        heading: "Dasar Logika Deduktif & Induktif",
        keyPoint: "Membedakan premis mayor, premis minor, dan penarikan kesimpulan yang sah.",
      },
      {
        number: "02",
        heading: "Hierarki Peraturan Perundang-undangan",
        keyPoint: "Memahami asas lex superior derogat legi inferiori dalam praktik ketatanegaraan.",
      },
      {
        number: "03",
        heading: "Menyusun Esai Analisis Kebijakan Publik",
        keyPoint: "Teknik mengutip sumber hukum primer dan menyusun rekomendasi berbasis data.",
      },
    ],
  },
  {
    id: "mod-02",
    code: "MODUL 02",
    title: "Sejarah Pers & Perkumpulan Literasi Nusantara",
    track: "Sejarah & Pergerakan",
    chaptersCount: 4,
    duration: "40 Menit",
    summary:
      "Menelusuri peran vital surat kabar pergerakan, taman bacaan, dan jurnal pemikiran dalam membentuk kesadaran kolektif bangsa.",
    chapters: [
      {
        number: "01",
        heading: "Lahirnya Surat Kabar Pribumi Awal Abad ke-20",
        keyPoint: "Bagaimana media cetak menjadi ruang artikulasi gagasan kemerdekaan.",
      },
      {
        number: "02",
        heading: "Organisasi Kepemudaan & Tradisi Debat",
        keyPoint: "Pelajaran organisasi dari perkumpulan pelajar lintas daerah.",
      },
    ],
  },
  {
    id: "mod-03",
    code: "MODUL 03",
    title: "Ruang Publik, Etika Wacana & Pemikiran Kritis",
    track: "Filsafat Sosial",
    chaptersCount: 4,
    duration: "50 Menit",
    summary:
      "Kajian mengenai syarat terciptanya diskusi publik yang sehat, bebas sesat pikir (logical fallacy), dan berorientasi pada solusi bersama.",
    chapters: [
      {
        number: "01",
        heading: "Mengenali Sesat Pikir dalam Diskusi Digital",
        keyPoint: "Cara menghindari argumen ad hominem dan generalisasi terburu-buru.",
      },
      {
        number: "02",
        heading: "Etika Dialog dalam Komunitas Kolektif",
        keyPoint: "Membangun budaya kritik karya yang membangun tanpa menjatuhkan.",
      },
    ],
  },
  {
    id: "mod-04",
    code: "MODUL 04",
    title: "Anatomi Puisi Modern & Teknik Deklamasi Panggung",
    track: "Teknik Sastra & Deklamasi",
    chaptersCount: 6,
    duration: "55 Menit",
    summary:
      "Panduan meramu diksi, metafora, ritme bait, serta pengolahan vokal dan jeda saat membacakan puisi di depan publik.",
    chapters: [
      {
        number: "01",
        heading: "Membangun Citraan & Metafora Segar",
        keyPoint: "Menghindari klise dan menggali diksi konkret dari pengamatan sehari-hari.",
      },
      {
        number: "02",
        heading: "Dinamika Napas, Intonasi & Jeda",
        keyPoint: "Teknik penghayatan naskah untuk panggung deklamasi maupun audio-visual.",
      },
    ],
  },
];

export const communityEvents: CommunityEvent[] = [
  {
    id: "ev-01",
    date: "12 DES 2026",
    type: "Bedah Buku",
    title: "Diskusi Terbuka: Konstitusi, Warga & Masa Depan Ruang Publik",
    format: "Daring (Live Stream Vexara Media)",
    status: "Pendaftaran Dibuka",
  },
  {
    id: "ev-02",
    date: "20 DES 2026",
    type: "Lomba Cipta Karya",
    title: "Panggilan Naskah Antologi Perdana Vexara Press 2027",
    format: "Submisi Naskah Digital",
    status: "Pendaftaran Dibuka",
  },
  {
    id: "ev-03",
    date: "10 JAN 2027",
    type: "Forum Diskusi",
    title: "Temu Kontributor & Redaksi Kolektif Vexara",
    format: "Hybrid — Jakarta & Daring",
    status: "Segera Hadir",
  },
];