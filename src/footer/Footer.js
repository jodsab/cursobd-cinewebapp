import './footer.scss'
import {BsFacebook} from 'react-icons/bs'
import {FaTiktok} from 'react-icons/fa'
import {AiFillInstagram, AiFillTwitterCircle} from 'react-icons/ai'

export function Footer() {
    return (
        <div className='footer_container'>
            <div className='redes'>
                <BsFacebook className='icon'/>
                <FaTiktok className='icon'/>
                <AiFillInstagram className='icon'/>
                <AiFillTwitterCircle className='icon'/>
            </div>
            <div>
                <p className='derechos'>
                    Todos los derechos reservados.
                </p>

            </div>
        </div>
    )
}
