import { useEffect, useState } from "react";

import { useLocation } from 'react-router-dom'

import {MdEventSeat} from 'react-icons/md'

import './compra.scss';

import {getCurrentUser, setCurrentUser, deleteUser} from '../helpers/localstorageuser';

const URL_BUTACAS = "http://localhost/bd-cine-webapp/peliculas/salaybutacasaux.php";

const fetchButacas = async (url, data) => {

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

const URL_PAGAR = "http://localhost/bd-cine-webapp/compras/regcompraespectador.php";
const URL_COMPRAR = "http://localhost/bd-cine-webapp/compras/regpagoespectador.php";
const URL_REGBUTACAS = "http://localhost/bd-cine-webapp/compras/regbutacacomprada.php";

const fetchCompra = async (url, data) => {

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

const URL_DATOSESPECTADOR = "http://localhost/bd-cine-webapp/auxiliares/datosEspectador.php";

const fetchDatosEspectador = async (url, data) => {

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


export function Compra(props) {

    const [totalaPagar, setTotalaPagar] = useState(0); 

    const [butacas, setButacas] = useState([]);
    const [locales, setLocales] = useState([]);

    const location = useLocation();
    const {funcion} = location.state;

    const [butacascompradas, setButacasCompradas] = useState([]);
    const [compras, setCompras] = useState([{"hola":"dsa"}]);

    const [usuario, setUsuario] = useState('');
    const [idUser, setIdUser]= useState(0);

    const dataButacas = async () => {
        const logdata = {
            "nsala": `${funcion}`

        }
        const resButacas = await fetchButacas(URL_BUTACAS, logdata);
        resButacas.sort((a,b) => a.numero - b.numero )

        setButacas(resButacas)
    }

    const dataLocales = async () => {
        const logdata = {
            "pelicula": `${props.peliculaid}`

        }
        const resLocales = await fetchLocales(URL_LOCALES, logdata);
        console.log(resLocales);
        setLocales(resLocales);
        
    }

    const verificarButaca = (butaca) => {

        if(butaca.ocupado === 0){

            const auxbutacas = butacas;

            const numerito = auxbutacas.findIndex((e => e.numero == butaca.numero && e.fila == butaca.fila));
            auxbutacas[numerito].ocupado = 2;
            butaca.ocupado = 2;

            const auxcompras = compras;

            auxcompras.push(butaca);
            setButacas(auxbutacas);
            console.log(auxcompras);
            setCompras(auxcompras)
            setTotalaPagar(totalaPagar+10)
            console.log(compras);
        }
        else if(butaca.ocupado === 2){

            const numerito = butacas.findIndex((e => (e.numero == butaca.numero && e.fila == butaca.fila)));
            butacas[numerito].ocupado = 0;
            butaca.ocupado = 0;
            const numerito2 = compras.findIndex((e => (e.numero == butaca.numero && e.fila == butaca.fila)))
            const auxCompras2 = compras;
            auxCompras2.splice(numerito2, numerito2);
            
            setButacas(butacas);
            console.log(compras);
            setCompras(auxCompras2)
            setTotalaPagar(totalaPagar-10)

        }
        else{
            console.log('ocupado');
        }
    }

    const regButacasx = async(sala,local, funcion, fila, numero) => {
        const datoPago = {
            "sala": `${sala}`,
            "local": `${local}`,
            "funcion": `${funcion}`,
            "fila": `${fila}`,
            "numero": `${numero}`
        }

        const resRegistroButaca = await fetchCompra(URL_REGBUTACAS, datoPago);
        console.log(resRegistroButaca);
    }

    const pagarBoletos = async () => {
        const datoPago = {
            "idespectador": `${idUser}`
        }
        const datoCobrar = {
            "pagototal": `${totalaPagar}`
        }

        const resPagar = await fetchCompra(URL_PAGAR, datoPago);
        const resCobrar = await fetchCompra(URL_COMPRAR, datoCobrar)
        
        if(resPagar.conectado === true && resCobrar.conectado === true){
            console.log('Compra registrada');
            compras.map(e => regButacasx(1,1,e.funcion,e.fila,e.numero) )
            window.location.reload();
        }
    }

    const datosEspecta = async (nombresaso) => {
        const nombreesx = {
            "user_nombre": `${nombresaso}`

        }
        const resDatosEspx = await fetchDatosEspectador(URL_DATOSESPECTADOR, nombreesx);
        return resDatosEspx;
    }

    useEffect(async() => {
        const usuarioaux = getCurrentUser();
        console.log(usuarioaux);
        if(usuarioaux !== undefined){
            setUsuario(usuarioaux);
            const datosUser = await datosEspecta(usuarioaux);
            setIdUser(datosUser.idEspectador)
        }

        console.log(compras);
        await dataButacas();
        await dataLocales();
    }, []);

    return (
        <div className="compra_caontainer">
            <div className="pantalla">
                <div className="letra_pantalla">
                    <p>
                        Pantalla
                    </p>
                </div>
            </div>
            <ul className="lista_butacas">
                {
                    butacas.map((e,key) => 
                         e.funcion == funcion ? 
                         <li className={e.ocupado === 1 ?  "butaca butaca_ocupada": e.ocupado === 2 ? "butaca butaca_amarillo": "butaca butaca_libre"} onClick={()=>{ verificarButaca(e) }}>
                            <MdEventSeat className="asiento" /> 
                            <p> 
                            {e.numero}{e.fila} 
                            </p> 

                         </li> 
                         :
                         false
                     )
                }

            </ul>
            <div>
                <div>
                    <p>
                        Compras
                    </p>
                </div>
                <div>
                    <ul style={{display: 'flex', listStyleType:'none'}}>
                        {
                            compras.map(e => <li><p>{e.numero}{e.fila}-</p></li>)
                        }
                    </ul>
                    <p>
                        Total a pagar: S/{totalaPagar}.00
                    </p>
                </div>
                <div>
                    <button className="btn_comprar" onClick={()=> {pagarBoletos()}}>
                        Comprar
                    </button>
                </div>
            </div>
            
        </div>
    )
}
