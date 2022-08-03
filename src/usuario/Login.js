import { useRef, useState } from 'react';

import './login.scss'

import {getCurrentUser, setCurrentUser, deleteUser} from '../helpers/localstorageuser';

const URL_LOGIN = "http://localhost/bd-cine-webapp/usuario/login.php";

const loginData = async (url, data) => {

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

export function Login() {

    const [msj, setMsj] = useState('');

    //Login
    const refLogEmail = useRef(null);
    const refLogPassword = useRef(null);

    const login = async () => {
        const logdata = {
            "user_email": refLogEmail.current.value,
            "user_password": refLogPassword.current.value

        }
        const resLogData = await loginData(URL_LOGIN, logdata);
        console.log(resLogData);

        const nombreUser = resLogData.usuario;

        if(resLogData.conectado === true){
            setCurrentUser(nombreUser)
            window.location.reload()
        }
        else{
            setMsj('Usuario no existe')
        }
    }

    return (
        <div className="login_container">
            <p style={{color:'black', margin: '0', color: 'red', fontSize: '14px'}}>
                {msj}
            </p>
            <div className='dato'>
                <label for="email">Email:</label>
                <input type='email' name='email' ref={refLogEmail}>
                </input>
            </div>
            <div className='dato'>
                <label for="password">Contraseña:</label>
                <input type='password' name='password' ref={refLogPassword}>
                </input>
            </div>
            <div> 
                <input type='submit' value="Entrar" className='btn_submit' onClick={()=> {login()} }>
                </input>
            </div>
        </div>
    )
}
