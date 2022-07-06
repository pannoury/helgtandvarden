import React from 'react'
import Layout from './components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <main>
        <div className="index-hero grid grid-row-2-col">
              <div className="col">
                  <h1 className="clr-white load">Kliniken för helgtandvård</h1>
                  <p className="load"></p>
                  <div className="button-wrapper load">
                    <Link 
                      href="https://www.muntra.com/helgtandvarden/c/2604/?referral_source=helgtandv%C3%A5rden.se/" 
                      target="_blank"
                    >
                      <a className="button button-blue button-pill">Boka tid</a>
                    </Link>
                    <Link href="mailto: ndiman@outlook.com">
                      <a className="button button-hollow-blue button-pill">Kontakta oss</a>
                    </Link>
                  </div>
              </div>
              <video autoPlay="true" loop="true" playsinline muted id="hero-video">
                <source src="./Assets/hero-video.mp4"/>
              </video>
          </div>
          <div className="content-w-80">
              <div className="col">
                  <h2 className="load">Din nya tandläkare</h2>
                  <p className="large w-80-perc color-white-1 load">
                      Välkommen till din nya tandvårdsklinik Helgtandvården <br/>
                      Här arbetar välmeriterade tandläkare <br/>
                      Alla dagar i veckan <br/>
                      Med Hollywoodsmile, Implantat, och allmäntandvård <br/>
                      För samma priser som folktandvården <br/>
                      5års räntefri delbetalning för din behandling <br/>
                  </p>
              </div>
          </div>
          <div className="swiper">
              <div className="swiper-wrapper" data-slide="0"></div>
          </div>
          <div className="content-w-80">
            <h2 className="fade-in">Hitta till oss</h2>
            <iframe className="google-embed fade-in"width="600" height="450" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJHRGAF3ydX0YR8R16WYaTSbA&key=AIzaSyCeLyjX_oPfyXFdbrM58RSZz-lX-zclCNE"></iframe> 
        </div>
      </main>
    </Layout>
  )
}
