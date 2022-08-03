import './perfil.scss'

import {getCurrentUser, setCurrentUser, deleteUser} from '../helpers/localstorageuser';

export function Perfil() {
    return (
        <div className="perfil_container">
            <div>
                <p className='title'>
                    Mi cuenta
                </p>
            </div>
            <div>
                <button className='btn_micuenta compras'>
                    Ver compras
                </button>
            </div>
            <div>
                <button className='btn_micuenta cerrar' onClick={()=>{deleteUser(); window.location.reload()} } >
                    Cerrar sesión
                </button>
            </div>
            
        </div>
    )
}
