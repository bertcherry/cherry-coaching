import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import About from '../About/About';
import Articles from '../articles';
import Article from '../article';
import Video from '../Video/Video';
import Videos from '../Video/Videos';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/articles/:id' element={<Article />} />
            <Route path='/videos/:id' element={<Video />} />
            <Route path='/videos' element={<Videos />} />
        </Routes>
    );
};

export default Router;