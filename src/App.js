import {useEffect, useState} from 'react';

import './App.css';
import { Navbar } from './navbar/Navbar';
import { Pelicula } from './components/Pelicula';
import { Peliculas } from './components/Peliculas';
import { Promociones } from './components/Promociones';
import { Footer } from './footer/Footer';


import { Link, HashRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Compra } from './components/Compra';

const URL_PELICULAS = "http://localhost/bd-cine-webapp/peliculas/peliculas.php";

const fetchPelis = async (url, data) => {

    const resp = await fetch (url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await resp.json();

    return json;
}

function App() {

  const [peliculas, setPeliculas] = useState([]);

  const dataPelis = async () => {
      const logdata = {
          "user_nombre": 'Lisett'

      }
      const resPeliculas = await fetchPelis(URL_PELICULAS, logdata);
      setPeliculas(resPeliculas)
      
  }

  useEffect(async () => {

    await dataPelis();
    
}, []);

  return (
    <div className="App">
      <Navbar />
      <HashRouter> 
        <Routes>
            <Route path={'/'} element={<Peliculas />}>
            
            </Route>
            {
              peliculas.map((e,key) => (<Route path={`/${e.idpelicula}`} element={<Pelicula nombre={e.peliId}
              idpeli={e.idpelicula} 
              foto={e.pelifoto} 
              sinopsis={e.pelisinopsis}
              director= {e.pelidirector}
              actores= {e.peliactores}
              duracion= {e.peliduracion}
              fechaestreno= {e.peliestreno}
              censura= {e.pelicensura}
              estado= {e.peliestado}

              />}>
            
              </Route>))
            }
            
            {
              peliculas.map((e,key) => (<Route path={`/${e.idpelicula}/compra`} element={<Compra peliculaid={e.idpelicula}  />}>
                </Route>
              ))
            }

        </Routes>
      </ HashRouter> 
      
      <Footer />
    </div>
  );
}

export default App;
