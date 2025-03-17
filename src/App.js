import Nav from './components/Nav/Nav';
import Router from './components/Router/Router';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <div className='app'>
        <Nav />
        <Router />
      </div> 
    </HelmetProvider>
  );
}

export default App;