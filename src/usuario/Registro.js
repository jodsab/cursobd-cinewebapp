import './registro.scss'

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

    const regData = async () => {
        const logdata = {
            "user_nombre": 'Lisett',
            "user_email": 'lisett.ovalle@unmsm.edu.pe',
            "user_password": 'contra'

        }
        const resRegData = await registerData(URL_REGISTRO, logdata);
        console.log(resRegData);
    }

    return (
        <div className="registro_container">
            <div className='dato'>
                <label for="nombre">Nombre:</label>
                <input type='text' name='nombre'>
                </input>
            </div>
            <div className='dato'>
                <label for="email">Email:</label>
                <input type='email' name='email'>
                </input>
            </div>
            <div className='dato'>
                <label for="password">Contraseña:</label>
                <input type='password' name='password'>
                </input>
            </div>
            <div>
                <input type='submit' value="Registrarme" className='btn_submit' onClick={()=> {regData()} }>
                </input>
            </div>
        </div>
    )
}
