import { Routes, Route } from 'react-router-dom';

import Articles from './components/articles';
import Article from './components/article';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Articles />} />
      <Route path="/articles/:id" element={<Article />} />
    </Routes>
  );
}

export default App;

