import { Routes, Route, Navigate } from 'react-router-dom';
import Resumo from './pages/Resumo';
import MeusCursos from './pages/MeusCursos';
import CursoDetail from './pages/CursoDetail';
import Aula from './pages/Aula';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Resumo />} />
      <Route path="/meus-cursos" element={<MeusCursos />} />
      <Route path="/curso/:id" element={<CursoDetail />} />
      <Route path="/aula/:id" element={<Aula />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
