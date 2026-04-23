/**
 * Placeholders 1:1 das imagens do "produto" (o produtor fornece o URL real via dashboard).
 * Usamos Unsplash com crop quadrado p/ garantir proporção. Trocar por asset real em produção.
 */
const u = (id: string, size = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${size}&h=${size}&q=60`;

export const offerImg = {
  mentoria: u('1573164713714-d95e436ab8d6'),
  cursoUxAvancado: u('1552664730-d307ca884978'),
  designSystems: u('1558655146-9f40138edfeb'),
  workshopPesquisa: u('1553877522-43269d4ea984'),
  figmaBonus: u('1611224923853-80b023f02d71'),
  proximoCurso: u('1507003211169-0a1dd7228f2d'),
  heroMentoria: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=70',
  trailerPoster: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=70',
  ugc1: u('1494790108377-be9c29b29330'),
  ugc2: u('1507003211169-0a1dd7228f2d'),
  lessonFigma: u('1611162617213-7d7a39e9b1d7', 800),
  lessonEntrevista: u('1573497019940-1c28c88b4f3e', 800),
  lessonAnalise: u('1454165804606-c3d57bc86b40', 800),
  lessonPortfolio: u('1498050108023-c5249f4df085', 800),
};

// Vídeos curtos open-source (Google Cloud sample clips)
// Trocar por URL do produtor via dashboard em produção.
export const offerVideo = {
  trailerCurso:
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  ugcDepoimento1:
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
};
