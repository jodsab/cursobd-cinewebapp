import './App.css';
import { Navbar } from './navbar/Navbar';
import { Pelicula } from './components/Pelicula';
import { Peliculas } from './components/Peliculas';
import { Promociones } from './components/Promociones';
import { Footer } from './footer/Footer';


import { Link, HashRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HashRouter> 
        <Routes>
            <Route path={'/'} element={<Peliculas />}>
            
            </Route>
          <Route path={'/peliculas'} element={<Pelicula />}>
            
          </Route>
        </Routes>
      </ HashRouter> 
      
      <Promociones />
      <Footer />
    </div>
  );
}

export default App;
