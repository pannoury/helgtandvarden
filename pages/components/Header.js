import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header(){

    useEffect(() => {
        window.addEventListener('scroll', windowScroll)

        return(() => {
            window.removeEventListener('scroll', windowScroll)
        })
    }, [])

    function windowScroll(e){
        var navbar = document.getElementsByTagName('nav')[0];
        if(window.innerWidth > 875){
            if(window.pageYOffset >= 1){
                navbar.style.backgroundColor = "#19253c"
                navbar.classList.add('filled')
            }
            else{
                navbar.style.backgroundColor = "";
                navbar.classList.remove('filled')
            }
        } else{
            navbar.style.backgroundColor = "#19253c"
        }
    }

    return(
        <header>
            <nav>
                <Link href="https://archive.codenoury.se/sqcars">
                    <a className="nav-logo">
                    <img src="./assets/helgtandvard-logo.svg" alt="helgtandvarden_logo"/>
                    <h4 className="clr-white">Helgtandvården</h4>
                    </a>
                </Link>
                <a id="nav-button" aria-label="hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/></svg>
                </a>
                <div className="nav-desktop">
                    <ul>
                        <li>
                            <Link href="mailto: info@helgtandvarden.se">
                                <a className="button button-blue button-pill">Kontakta oss</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}