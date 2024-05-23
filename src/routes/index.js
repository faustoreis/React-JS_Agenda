import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, DetalheContatos, ListagemContatos } from '../pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard />} />
      <Route path='/contatos' element={<ListagemContatos />} />
      <Route path='/contatos/detalhe/:id' element={<DetalheContatos />} />

      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  );
};
