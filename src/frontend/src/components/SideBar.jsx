import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/SideBar.css';
import presciptLogo from "../assets/logo-pequeno.svg";
import calendario from "../assets/icones/calendario.svg";
import agenda from "../assets/icones/agenda.svg";
import logoutIcon from "../assets/icones/sair.svg";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <img id="logo" src={presciptLogo} alt="Logo Prescript" />
      <ul>
        <li className={location.pathname.startsWith("/tela-medicamentos") ? "active" : ""}>
          <Link to="/tela-medicamentos">
            <img id="stripsIcon" src={agenda} alt="" />
            <span className="linkText">Fitas</span>
          </Link>
        </li>
        <li className={location.pathname === "/historico" ? "active" : ""}>
          <Link to="/historico">
            <img id="historyIcon" src={calendario} alt="" />
            <span className="linkText">Histórico</span>
          </Link>
        </li>
      </ul>
      <div id="logoutContainer">
        <button>
          <img id="logoutIcon" src={logoutIcon} alt="sair" />
          <span className="linkText">Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
