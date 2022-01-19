import './login.scss'

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

    const login = async () => {
        const logdata = {
            "user_email": 'lisett.ovalle@unmsm.edu.pe',
            "user_password": 'contra'

        }
        const resLogData = await loginData(URL_LOGIN, logdata);
        console.log(resLogData);
    }

    return (
        <div className="login_container">
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
                <input type='submit' value="Entrar" className='btn_submit' onClick={()=> {login()} }>
                </input>
            </div>
        </div>
    )
}
