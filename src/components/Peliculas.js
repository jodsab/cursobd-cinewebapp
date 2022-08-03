import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

import './peliculas.scss'

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

export function Peliculas() {

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
        <div className="peliculas_container">
            <div>
                <p className='titulo'>
                    Cartelera
                </p>
            </div>            
            <ul>            
                {
                    peliculas.map((e,key) => 
                    <li key={key} className='pelicula_item'>
                        <Link to={`/${e.idpelicula}`}>
                            <p>{e.peliId}</p>
                            <img className='foto_pelicula' src={`data:image/jpg;base64,${e.pelifoto}`} alt={e.pelifoto} />
                        </Link>
                    </li>
                        )
                }          
            </ul>            
            <div>
            </div>
            
        </div>
    )
}
