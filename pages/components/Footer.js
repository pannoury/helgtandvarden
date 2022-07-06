import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer(){
    return(
        <footer>
            <div className="footer-row">
                <a className="nav-logo">
                    <img src="./Assets/helgtandvard-logo.svg" alt="helgtandvarden_logo"/>
                    <h4 className="clr-white">Helgtandvården</h4>
                </a>
            </div>
            <div className="footer-separator"></div>
            <div className="footer-row footer-row-col">
                <div className="footer-col">
                    <ul>
                        <li><h5>Helgtandvården</h5></li>
                        <li><Link href="tel: +46760758758"><a>+46760 758 758</a></Link></li>
                        <li><Link href="mailto: info@helgtandvarden.se"><a>info@helgtandvarden.se</a></Link></li>
                        <li><Link href="https://www.google.com/maps/place/Sankt+Eriksgatan+54,+112+34+Stockholm/data=!4m2!3m1!1s0x465f9d7c1780111d:0xb0499386597a1df1?sa=X&ved=2ahUKEwjGmerjkPn2AhUDv4sKHUgjDt8Q8gF6BAgXEAE"><a>Sankt Eriksgatan 54, 112 34 Stockholm, Sverige</a></Link></li>
                        <li>Öppettider: Mån-Sön: 07:00 - 21:00</li>
                    </ul>
                </div>
                <div className="footer-col">
                    <ul>

                    </ul>
                </div>
                <div className="footer-col">
                    <ul>

                    </ul>
                </div>
            </div>
            <div className="footer-separator"></div>
            <div className="footer-row">
            </div>
        </footer>
    )
}