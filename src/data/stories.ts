import type { SiteContent, TimelineStory } from '../types';

export const siteContent: SiteContent = {
  nav: {
    brandLabel: 'Heritage',
    menuLabel: 'MENU',
  },
  hero: {
    eyebrow: 'Journey Of',
    tagline: 'WHERE HISTORY MEETS THE HIGHLANDS',
  },
  intro: {
    scriptTitle: 'Bukittinggi',
    heading: 'THE HEART OF MINANGKABAU',
    paragraphs: [
      'Jantung Ranah Minang yang berdiri anggun di pelukan perbukitan.',
      'Tempat kabut pagi menyapa lembah hijau, dan waktu seolah berjalan lebih lambat di antara warisan yang terjaga. Dari megahnya Jam Gadang hingga sunyinya Ngarai Sianok, setiap langkah adalah undangan untuk merasakan kisah yang telah hidup selama generasi.',
    ],
  },
  timeline: {
    heading: 'MENELUSURI JEJAK WAKTU',
    description:
      'Perjalanan melintasi sejarah Bukittinggi, dari tanah adat di dataran tinggi hingga menjadi jantung budaya dan pariwisata Minangkabau.',
  },
};

export const culturalStories: TimelineStory[] = [
  {
    id: 'chapter-1',
    title: 'Dataran Tinggi yang Subur',
    era: 'Awal Masa',
    imagePath: '/assets/history-1.png',
    alt: 'Sawah terasering hijau dengan rumah gadang di lembah Bukittinggi',
  },
  {
    id: 'chapter-2',
    title: 'Menara Penjaga',
    era: 'Abad ke-19',
    imagePath: '/assets/history-2.png',
    alt: 'Menara kayu bersejarah di atas perbukitan Minangkabau',
  },
  {
    id: 'chapter-3',
    title: 'Jalan Kolonial',
    era: 'Era Kolonial',
    imagePath: '/assets/history-3.png',
    alt: 'Jalan kolonial dengan arsitektur putih dan delman di Bukittinggi',
  },
  {
    id: 'chapter-4',
    title: 'Lahirnya Jam Gadang',
    era: '1826',
    imagePath: '/assets/history-4.png',
    alt: 'Lapangan Jam Gadang dengan kerumunan warga pada masa lampau',
  },
  {
    id: 'chapter-5',
    title: 'Perjuangan Kemerdekaan',
    era: '1945',
    imagePath: '/assets/history-5.png',
    alt: 'Pertemuan para pemimpin di ruang rapat bersejarah',
  },
  {
    id: 'chapter-6',
    title: 'Tarian Adat',
    era: 'Warisan Budaya',
    imagePath: '/assets/history-6.png',
    alt: 'Penari tradisional Minangkabau di halaman rumah gadang',
  },
  {
    id: 'chapter-7',
    title: 'Bukittinggi Masa Kini',
    era: 'Kontemporer',
    imagePath: '/assets/history-7.png',
    alt: 'Panorama modern Bukittinggi saat senja dengan Jam Gadang',
  },
];
