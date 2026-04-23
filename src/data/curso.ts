export type Aula = {
  id: string;
  title: string;
  duration?: string;
  status: 'pending' | 'active' | 'done';
};

export type Modulo = {
  id: string;
  title: string;
  aulas: Aula[];
};

export const cursoUx = {
  id: 'ux',
  title: 'UX Designers',
  author: 'Designers da Eduzz',
  progress: 14,
  totalAulas: 7,
  aulasVistas: 1,
  destaque: {
    titulo: 'Resultados do Teste - Parte 2',
    moduloLabel: 'Nutror Experience',
  },
  modulos: [
    {
      id: 'm1',
      title: 'Teste de Usabilidade Nutror',
      aulas: [
        { id: 'a1', title: 'Sobre o Teste de Usabilidade', status: 'active' },
        { id: 'a2', title: 'Resultados do Teste - Parte 1', status: 'done' },
        { id: 'a3', title: 'Resultados do Teste - Parte 2', status: 'pending' },
      ],
    },
    {
      id: 'm2',
      title: 'Pesquisa Unity 2023',
      aulas: [
        { id: 'a4', title: 'Introdução à pesquisa', status: 'pending' },
        { id: 'a5', title: 'Coleta de dados', status: 'pending' },
        { id: 'a6', title: 'Análise qualitativa', status: 'pending' },
        { id: 'a7', title: 'Conclusões', status: 'pending' },
      ],
    },
  ] as Modulo[],
};
