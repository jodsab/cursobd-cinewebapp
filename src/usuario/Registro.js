import {useRef, useState} from 'react'

import './registro.scss'

import {getCurrentUser, setCurrentUser, deleteUser} from '../helpers/localstorageuser';

const URL_REGISTRO = "http://localhost/bd-cine-webapp/usuario/registro.php";

const registerData = async (url, data) => {

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

export function Registro() {

    const [msgreg, setMsgReg] = useState('')

        //REGISTER
        const refRegNombre = useRef(null);
        const refRegApPaterno = useRef(null);
        const refRegApMaterno = useRef(null);
        const refRegEmail = useRef(null);
        const refRegPassword = useRef(null);

    const regData = async () => {
        const logdata = {
            "user_nombre": refRegNombre.current.value,
            "user_appaterno": refRegApPaterno.current.value,
            "user_apmaterno": refRegApMaterno.current.value,
            "user_email": refRegEmail.current.value,
            "user_password": refRegPassword.current.value

        }
        const resRegData = await registerData(URL_REGISTRO, logdata);
        console.log(resRegData);

        if(resRegData.conectado == true){
            setCurrentUser(logdata.user_nombre)
            window.location.reload()
        }else{
            setMsgReg('El email registrado ya existe')
        }
    }

    return (
        <div className="registro_container">
            <div>
                <p style={{color:'black', margin: '0', color: 'red', fontSize: '14px'}}>
                    {
                        msgreg
                    }
                </p>
            </div>
            <div className='dato'>
                <label for="nombre">Nombre:</label>
                <input type='text' name='nombre' ref={refRegNombre} required>
                </input>
            </div>
            <div className='dato'>
                <label for="appaterno">Apellido Paterno:</label>
                <input type='text' name='appaterno' ref={refRegApPaterno} required>
                </input>
            </div>
            <div className='dato'>
                <label for="apmaterno">Apellido Materno:</label>
                <input type='text' name='apmaterno' ref={refRegApMaterno} required>
                </input>
            </div>
            <div className='dato'>
                <label for="email">Email:</label>
                <input type='email' name='email' ref={refRegEmail} required>
                </input>
            </div>
            <div className='dato'>
                <label for="password">Contraseña:</label>
                <input type='password' name='password' ref={refRegPassword} required>
                </input>
            </div>
            <div>
                <input type='submit' value="Registrarme" className='btn_submit' onClick={()=> {regData()} }>
                </input>
            </div>
        </div>
    )
}
