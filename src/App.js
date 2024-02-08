import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import About from './components/About/About';
import Articles from './components/articles';
import Article from './components/article';
import Video from './components/Video/Video';


function App() {
  return (
    <div className='app'>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:id' element={<Article />} />
        <Route path='/videos/:id' element={<Video />} />
      </Routes>
    </div> 
  );
}

export default App;