import {useState, useEffect} from 'react'

import { DivUsuario } from "../usuario/DivUsuario";
import { Perfil } from '../usuario/Perfil';

import { FaUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

import {getCurrentUser, setCurrentUser, deleteUser} from '../helpers/localstorageuser';

import './navbar.scss'

export function Navbar() {

  const [conectado, setConectado] = useState(false);
  const [divUser, setDivUser] = useState(false);

  useEffect(() => {

    console.log(getCurrentUser());
    
    if(getCurrentUser() !== null){
      setConectado(true)
    }
    else{
      setConectado(false)
    }
    console.log(conectado);

  }, []);

  return (
    <div className="navbar_container"> 
      <div>
        <img src={require("../assets/logo.png")} alt="logo" />
      </div>
      <ul>
        <li onClick={()=>{setDivUser(true)} }>
          <FaUserCircle className="icon" />
          {
            conectado ? <p>{getCurrentUser()}</p> : <p>Usuario</p>
          }
        </li>
        <li>
          <BiSearch className="icon" />
          <p>Buscar</p>
        </li>
      </ul>
      <div className={divUser ? "divusuario_fixed show": "divusuario_fixed"}>
        <div className="divusuario_relative" >
          <button className="close" onClick={()=>{setDivUser(false)}}>
            X
          </button>
          {
            conectado ? <Perfil /> : <DivUsuario />
          }
        </div>
      </div>
      
    </div>
  );
}
