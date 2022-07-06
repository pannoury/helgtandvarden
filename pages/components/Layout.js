import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Script from "next/script";

export default function Layout({ children }){

    return (
        <>
            <Script id="google-analyics" strategy="afterInteractive">
                {
                    `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.sta
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],   
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=   
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);  
                    })(window,document,'script','dataLayer','GTM-NVZKDFQ');
                    `
                }
            </Script>
            <Header/>
            <Head>
                <meta charset="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="./Sass/style.css" rel="stylesheet" />
                <link href="https://archive.codenoury.se/General Assets/Sass/style.css" rel="stylesheet" />
                <title>Helgtandvården</title>
                <meta property="og:title" content="Helgtandvården"/>
                <meta property="og:description" content="Kliniken för helgtandvård"/>
                <meta property="og:site" content="https://helgtandvården.se"/>
                <meta property="og:site_name" content="Helgtandvården.se"/>
                <link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css"/>
                <link rel="icon" type="image/png" sizes="32x32" href="./Assets/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="./Assets/favicon-16x16.png"/>
            </Head>
            <noscript>
                <iframe 
                    src="https://www.googletagmanager.com/ns.html?id=GTM-NVZKDFQ" 
                    height="0" 
                    width="0" 
                    style="display:none;visibility:hidden"
                >
                </iframe>
            </noscript>
            <Footer/>
        </>
    )
}