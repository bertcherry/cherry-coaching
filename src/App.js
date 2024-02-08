import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Articles from './components/articles';
import Article from './components/article';
import Video from './components/Video/Video';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/articles' element={<Articles />} />
      <Route path='/articles/:id' element={<Article />} />
      <Route path='/videos/:id' element={<Video />} />
    </Routes>
  );
}

export default App;