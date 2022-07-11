import React, { useEffect } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Script from "next/script";

export default function Layout({ children }){

    return (
        <>
            <Header/>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Helgtandvården</title>
                <meta property="og:title" content="Helgtandvården"/>
                <meta property="og:description" content="Kliniken för helgtandvård"/>
                <meta property="og:site" content="https://helgtandvården.se"/>
                <meta property="og:site_name" content="Helgtandvården.se"/>
                <link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css"/>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <link rel="icon" type="image/png" sizes="32x32" href="./Assets/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="./Assets/favicon-16x16.png"/>
            </Head>
            <>
                {children}
            </>
            <Footer/>
            <noscript>
                <iframe 
                    src="https://www.googletagmanager.com/ns.html?id=GTM-NVZKDFQ" 
                    style={{height: 0, width: 0, display: 'none', visibility: 'hidden'}}
                >
                </iframe>
            </noscript>
        </>
    )
}