import MainPage from './pages/MainPage/MainPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import { PokemonDetailPage } from './pages/PokemonDetailPage/PokemonDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="info" element={<PokemonDetailPage />} />
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default App;
