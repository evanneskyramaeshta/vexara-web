export interface BookItem {
  id: string;
  slug: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  pages: number;
  isbn: string;
  category:
    | "Hukum & Politik"
    | "Sejarah & Peradaban"
    | "Sastra & Puisi"
    | "Biografi Tokoh"
    | "Filsafat Sosial";
  status: "Ringkasan Digital" | "Arsip Fisik";
  featured?: boolean;
  synopsis: string;
  curatorNote: string;
  quote: string;
}

export const vexaraBooks: BookItem[] = [
  {
    id: "bk-01",
    slug: "demokrasi-konstitusional",
    title: "Demokrasi Konstitusional",
    author: "Janedjri M. Gaffar",
    publisher: "Konstitusi Press",
    year: 2012,
    pages: 284,
    isbn: "978-602-9328-14-1",
    category: "Hukum & Politik",
    status: "Ringkasan Digital",
    featured: true,
    synopsis:
      "Mengulas hubungan mendasar antara kedaulatan rakyat dan pembatasan kekuasaan melalui konstitusi dalam negara hukum modern.",
    curatorNote:
      "Rujukan wajib bagi penggerak forum untuk memahami bagaimana aturan dasar menjaga ruang publik tetap demokratis dan akuntabel.",
    quote:
      "Konstitusi tidak hanya membatasi kekuasaan penguasa, tetapi juga menjamin ruang bagi warga untuk bersuara secara bermartabat.",
  },
  {
    id: "bk-02",
    slug: "argumentasi-hukum",
    title: "Argumentasi Hukum",
    author: "Philipus M. Hadjon & Tatiek Sri Djatmiati",
    publisher: "Gadjah Mada University Press",
    year: 2011,
    pages: 132,
    isbn: "978-979-420-585-3",
    category: "Hukum & Politik",
    status: "Arsip Fisik",
    synopsis:
      "Panduan sistematis menyusun penalaran logis, struktur premis, dan analisis normatif dalam membedah persoalan hukum.",
    curatorNote:
      "Sangat relevan untuk melatih ketajaman esai kritis anggota VEXARA agar setiap opini ditopang kerangka logika yang kokoh.",
    quote:
      "Ketajaman sebuah kesimpulan hukum bergantung sepenuhnya pada kejernihan premis dan konsistensi alur penalarannya.",
  },
  {
    id: "bk-03",
    slug: "sejarah-pergerakan-nasional",
    title: "Dari Lembah Pemikiran ke Gelanggang Pergerakan",
    author: "Arsip Kuratorial Vexara",
    publisher: "Vexara Press",
    year: 2026,
    pages: 210,
    isbn: "978-623-0012-01-8",
    category: "Sejarah & Peradaban",
    status: "Ringkasan Digital",
    featured: true,
    synopsis:
      "Menelusuri bagaimana perkumpulan baca, surat kabar kecil, dan diskusi pemuda melahirkan kesadaran kolektif bangsa.",
    curatorNote:
      "Cermin historis langsung bagi VEXARA: perubahan gagasan berskala luas selalu berawal dari ruang literasi kecil yang konsisten.",
    quote:
      "Sebelum sebuah zaman berubah di jalanan, ia terlebih dahulu diperdebatkan di meja-meja baca.",
  },
  {
    id: "bk-04",
    slug: "antologi-cakrawala-kata",
    title: "Cakrawala Kata & Suara Generasi",
    author: "Kolektif Penulis VEXARA",
    publisher: "Vexara Press",
    year: 2026,
    pages: 164,
    isbn: "978-623-0012-04-9",
    category: "Sastra & Puisi",
    status: "Ringkasan Digital",
    synopsis:
      "Himpunan puisi reflektif dan prosa liris yang memotret kegelisahan zaman, arah peradaban, dan harapan generasi muda.",
    curatorNote:
      "Membuktikan bahwa sastra bukan sekadar permainan rima, melainkan medium mencatat denyut nadi sosial pada masanya.",
    quote:
      "Puisi adalah cara paling jujur untuk menyimpan ingatan zaman agar tidak lapuk ditelan kebisingan.",
  },
  {
    id: "bk-05",
    slug: "jejak-pemikir-bangsa",
    title: "Biografi Intelektual: Keteladanan di Tengah Arus",
    author: "R. Suryadi",
    publisher: "Pustaka Sejarah",
    year: 2021,
    pages: 340,
    isbn: "978-602-481-512-7",
    category: "Biografi Tokoh",
    status: "Arsip Fisik",
    synopsis:
      "Potret perjalanan hidup, kebiasaan membaca, dan keteguhan prinsip para tokoh pembaharu pendidikan serta kebudayaan.",
    curatorNote:
      "Membaca biografi memberi peta jalan praktis tentang bagaimana tokoh besar mengelola krisis dan membangun jejaring.",
    quote:
      "Karakter seorang pemimpin tidak ditempa saat keadaan tenang, melainkan saat ia harus memilih di persimpangan prinsip.",
  },
  {
    id: "bk-06",
    slug: "ruang-publik-dan-solidaritas",
    title: "Ruang Publik & Solidaritas Kolektif",
    author: "H. Pratama",
    publisher: "Loka Wacana",
    year: 2023,
    pages: 248,
    isbn: "978-623-7890-33-4",
    category: "Filsafat Sosial",
    status: "Ringkasan Digital",
    synopsis:
      "Kajian mengenai pentingnya wadah partisipasi warga di era digital untuk melawan fragmentasi informasi dan individualisme.",
    curatorNote:
      "Landasan konseptual dalam merancang arsitektur komunitas terbuka di website VEXARA.",
    quote:
      "Pengetahuan baru menemukan daya ubahnya ketika ia dibagikan dalam ruang dialog yang setara.",
  },
];