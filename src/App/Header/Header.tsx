import "./Header.scss"
import logo from "../../assets/hh.png"
import account from "../../assets/Vector.png"
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
    <div className="header">
        <div className="header-title">
            <a className="header-title-logo"><img src={logo} alt="logo" /></a>
            <span className="header-title-topic_name">.FrontEnd</span>
        </div>

        <div className="header-pages">
          <NavLink
            to="/vacancy"
            className={({ isActive }) =>
              isActive ? "header-pages-vacancy active" : "header-pages-vacancy"
            }
          >
            <span className="icon-placeholder"></span>
            <span className="header-pages-vacancy-name">Вакансии FE</span>
            <div className="active-point"></div>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "header-pages-about active" : "header-pages-about"
            }
          >
            <img src={account} alt="account" />
            <span className="header-pages-about-name">Обо мне</span>
            <div className="active-point"></div>
          </NavLink>
        </div>
    </div>
)};

export default Header;
