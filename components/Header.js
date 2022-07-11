import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Header(){
    const [visible, setVisible] = useState(false)
    const [width, setWidth] = useState(undefined)

    useEffect(() => {
        window.addEventListener('scroll', windowScroll)
        window.addEventListener('resize', resizeWindow)

        return(() => {
            window.removeEventListener('scroll', windowScroll)
            window.removeEventListener('resize', resizeWindow)
        })
    }, [])

    function resizeWindow(e){
        setWidth(window.innerWidth)
    }

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
                <Link href="https://helgtandvården.se">
                    <a className="nav-logo">
                    <img src="./assets/helgtandvard-logo.svg" alt="helgtandvarden_logo"/>
                    <h4 className="clr-white">Helgtandvården</h4>
                    </a>
                </Link>
                <a id="nav-button" aria-label="hidden" onClick={(() => { setVisible(!visible) })}>
                    {
                        !visible ?
                        <i className="material-icons">menu</i>
                        :
                        <i className="material-icons">close</i>
                    }
                </a>
                <div className="nav-desktop" style={width && visible && width < 650 ? {width: "100vw"} : null}>
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