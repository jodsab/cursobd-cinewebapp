import {useState} from 'react'

import { DivUsuario } from "../usuario/DivUsuario";

import { FaUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

import './navbar.scss'

export function Navbar() {

  const [divUser, setDivUser] = useState(false);

  return (
    <div className="navbar_container"> 
      <div>
        <img src={require("../assets/logo.png")} alt="logo" />
      </div>
      <ul>
        <li onClick={()=>{setDivUser(true)} }>
          <FaUserCircle className="icon" />
          <p>Usuario</p>
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
          <DivUsuario />
        </div>
      </div>
      
    </div>
  );
}
