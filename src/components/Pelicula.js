import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './pelicula.scss';

const URL_LOCALES = "http://localhost/bd-cine-webapp/peliculas/locales.php";

const fetchLocales = async (url, data) => {

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

export function Pelicula(props) {

    const [losLocales, setLosLocales] = useState([]);
    const [losLocales2, setLosLocales2] = useState([]);

    const [showHorarios, setShowHorarios] = useState(false);

    const dataLocales = async () => {
        const logdata = {
            "pelicula": `${props.idpeli}`

        }
        const resLocales = await fetchLocales(URL_LOCALES, logdata);

        setLosLocales2(resLocales);
        const local = [];

        resLocales.map(e => 
            local.indexOf(e.localnombre) !== -1 ? true : local.push(e.localnombre)
         )

        setLosLocales(local)
    }

    useEffect(async() => {
        await dataLocales();
    }, []);

    return (
        <div className="pelicula_container">
            <div className="cartelera_container">
                <div className="div_foto">
                    <img src={`data:image/jpg;base64,${props.foto}`} />
                    <p>
                        {props.fechaestreno}
                    </p>
                </div>
                <div className="div_info">
                    <p className='title'>
                        {props.nombre}
                    </p>
                    <p className='sinopsis'>
                        {props.sinopsis}
                    </p>
                    <p className='top_space'>
                        Duración: {props.duracion}
                    </p>
                    <p className='top_space'>
                        Apto: {props.censura}
                    </p>
                    <p className='top_space'>
                        Idiomas: {props.estado}
                    </p>
                    <p className='top_space'>
                        Dirigido por: {props.director}
                    </p>
                    <p className='top_space'>
                        Actuan: {props.actores}
                    </p>
                </div>
            </div>
            <div className="locales_container">
                {
                    losLocales.map((e,key) => <div className='local_container'>
                            <div key={key} className='local' onClick={()=>{setShowHorarios(!showHorarios)} }>
                                {e}
                            </div>
                            <div className={showHorarios ? 'horario show':'horario'} >
                                {
                                    losLocales2.map(f => <div className='div_linea'>
                                        {
                                            e === f.localnombre ? <Link to={`/${props.idpeli}/compra`} state={{funcion:`${f.funcion}` }} className='cada_hora'>{f.tiposala} - {f.horario} - Sala: {f.idsala} - Funcion: {f.funcion} </Link> : false
                                        }
                                        </div>)
                                }
                            </div>
                        </div> )
                }
            </div>
        </div>
    )
}
