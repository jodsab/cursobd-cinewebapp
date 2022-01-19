import {useState} from 'react'
import { Login } from './Login';
import { Registro } from './Registro';

import './divusuario.scss';

export function DivUsuario() {

    const [conectado, setConetado] = useState(false);

    const [logger, setLogger] = useState(true);
    
    return (
        <div className='divusuario_container'>
            <div className='btns_alt'>
                <button className={logger ? 'btn btn_active':'btn'} onClick={()=> {setLogger(true)} }>
                    Login
                </button>
                <button className={logger ? 'btn':'btn btn_false'} onClick={()=> {setLogger(false)} }>
                    Registro
                </button>
            </div>
            <div className='logger_container'>

                {
                    logger ? <Login /> : <Registro />
                }
                
            </div>
            
        </div>
    )
}
