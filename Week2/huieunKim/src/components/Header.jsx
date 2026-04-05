import React from 'react';
import './Header.scss';
import logo from '../assets/portfolio.svg';

const Header = () => {
    return (
        <header className="page-header">
            <nav className="navbar">
                <img src={logo} alt="PORTFOLIO 로고" />
                <ul className="nav-menu">
                    <li><a href="#about">ABOUT</a></li>
                    <li><a href="#hobby">HOBBY</a></li>
                    <li><a href="#contact">CONTACT</a></li>
                </ul>
            </nav>

            <div className="hero-section">
                <h1>안녕하세요.<br />
                    제 이름은 김희은 입니다.<br />
                    성장하는 개발자가 되고 싶습니다.
                </h1>
            </div>
        </header>
    );
};

export default Header;