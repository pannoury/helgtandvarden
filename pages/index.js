import React, { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Link from 'next/link'
import $ from 'jquery'

export default function Home() {
  const [reviews, setReviews] = useState(undefined)
  const [position, setPosition] = useState(1);
  const [isSent, setIsSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    var loadElements = document.querySelectorAll('.load')
    for(let i=0; i<loadElements.length; i++){
      loadElements[i].style.cssText = "opacity: 1;"
    }

    fetchGoogleReviews()
    appearOnScrollInit()

  }, [])

  function appearOnScrollInit(){
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
      threshold: 0,
      rootMargin: "0px 0px -150px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
      entries.forEach(entry => {
          if(!entry.isIntersecting){
              return;
          }
          else{
              entry.target.classList.add("appear")
              appearOnScroll.unobserve(entry.target);
          }
      });
    }, appearOptions)

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    })
  }

  function fetchGoogleReviews(){
    $.ajax({
      url: "https://helgtandvården.se/php/google_reviews.php",
      dataType: 'text',
      method: "GET",
      data: {
        request: "google_reviews"
      }
    })
    .done((data, textStatus, jqXHR) => {
        if(jqXHR.status === 200){
          const responseData = JSON.parse(data)
          setReviews(responseData)
        } else{
        
        }
    })
    .fail((error) => {
      document.querySelector('.swiper').remove();
      console.log(error)
    })
  }

  let mouseDown = false;
  let startPosition

  //Mobile Swiper
  let touchDown = false
  let startPos = 0
  let prevTranslate = 0
  let currentPos = 0

  function swiper(e){
    var swiperWrapper = document.querySelector('.swiper-wrapper')
    let swiperPosition = parseInt(swiperWrapper.getAttribute('data-slide'))
    var sliders = document.querySelectorAll('.swiper-slide')
    if (swiperWrapper.clientWidth <= swiperWrapper.parentElement.clientWidth) return

    if(e.type === "mousemove"){

    } else if(e.type === "mousedown"){
        mouseDown = true
        startPosition = e.clientX
    } else if(e.type === "mouseup"){
        mouseDown = false
        let movedBy = startPosition - e.clientX
        if (movedBy < -100 && swiperPosition !== 0) {
            swiperWrapper.setAttribute('data-slide', (swiperPosition - 1))
            let currentTranslate = ((swiperPosition - 1) * 460)
            swiperWrapper.style.transform = `translateX(-${currentTranslate}px)`
        }
        if (movedBy > 100 && swiperPosition < sliders.length - 1){
            swiperWrapper.setAttribute('data-slide', (swiperPosition + 1))
            let currentTranslate = ((swiperPosition + 1) * 460)
            swiperWrapper.style.transform = `translateX(-${currentTranslate}px)`
        }
    }

    if(e.type === "touchmove" && touchDown){
        currentPos = e.touches[0].clientX
    } else if(e.type === "touchstart"){
        touchDown = true
        startPos = e.touches[0].clientX
        console.log(e.touches[0])
    } else if(e.type === "touchend"){
        touchDown = false
        var movedBy = currentPos - startPos
        console.log(movedBy)
        prevTranslate = movedBy
        if (movedBy < -100 && swiperPosition < sliders.length - 1) {
            swiperWrapper.setAttribute('data-slide', (swiperPosition + 1))
            let currentTranslate = ((swiperPosition + 1) * (window.innerWidth * 0.95))
            swiperWrapper.style.transform = `translateX(-${currentTranslate}px)`
        }
        if (movedBy > 100 && swiperPosition !== 0){
            swiperWrapper.setAttribute('data-slide', (swiperPosition - 1))
            let currentTranslate = ((swiperPosition - 1) * (window.innerWidth * 0.95))
            swiperWrapper.style.transform = `translateX(-${currentTranslate}px)`
        }
    }
  }

  function slideLength(){
    if(window.innerWidth > 400){
      return 400
    } else {
      return ((window.innerWidth * 0.9) - 40)
    }
  }

  function alphabeticInput(e){
    var value = e.target.value;
    e.target.value = value.charAt(0).toUpperCase() + value.slice(1); //first letter uppercase
    e.target.value = e.target.value.trim() //removes spaces
    e.target.value = e.target.value.replace(/[^A-Za-z]/g, ""); //replace numeric values
  }
  function numericInput(e){
    var value = e.target.value
    e.target.value = e.target.value.trim() //removes spaces
    e.target.value = e.target.value.replace(/\D+/g, "");
  }

  function submitForm(e){
    e.preventDefault()
    var firstname = e.target[0].value
    var lastname = e.target[1].value
    var email = e.target[2].value
    var phone = e.target[3].value

    if(firstname.length > 0 && lastname.length > 0 && email.length > 5 && email.includes('@') && phone.length > 5){
      setIsLoading(true)
      var valueArray = []
      for(let i = 0; i < 5; i++){
        valueArray.push(e.target[i].value)
      }

      $.ajax({
        url: "https://helgtandvården.se/php/contact.php",
        dataType: 'text',
        method: "POST",
        data: {
          formArray: valueArray
        }
      })
      .done((data, textStatus, jqXHR) => {
        if(jqXHR.status === 200){
          console.log(data)
        } else{
        
        }
        setIsLoading(false)
      })
      .fail((error) => {
        console.log(error)
        setIsLoading(false)
      })

    } else {
      alert("Var god och fyll i alla rutor innan du skickar din förfrågan")
    }
  }

  return (
    <Layout>
      <main className='index'>
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
              <video autoPlay={true} loop={true} playsInline muted id="hero-video">
                <source src="../assets/hero-video.mp4" />
              </video>
          </div>
          <div className="content-w-80">
            <h2 className="load">Din nya tandläkare</h2>
            <div className='pitch-wrapper'>
              <div className='pitch-box'>
                <span>Rätt Vård</span>
              </div>
              <div className='pitch-box'>
                <span>I rätt tid</span>
              </div>
              <div className='pitch-box'>
                <span>Till rätt pris</span>
              </div>
            </div>
          </div>
          <div 
            className="swiper"
            style={!reviews ? {display: "none"} : null}
            onMouseDown={swiper}
            onMouseUp={swiper}
            onMouseMove={swiper}
          >
              <div 
                className="swiper-wrapper" 
                data-slide="0"
                slides={reviews ? reviews.length : null}
                style={reviews ? {width: `${(reviews.length * slideLength()) + (reviews.length * 20)}px`} : null}
                onMouseDown={swiper}
                onMouseUp={swiper}
                onMouseMove={swiper}
              >
                {
                  reviews &&
                  reviews.map((e, i) => {
                    if(e.comment.length > 250){
                      e.comment = `${e.comment.substring(0,200).split(/\.(?=[^\.]+$)/)[0]}. [...]`
                    }
                    return(
                      <div 
                        className="review-box swiper-slide" 
                        data-slider={i + 1}
                        key={i}
                      >
                          <a className="reviewer" href="https://www.google.se/maps/place/Helgtandv%C3%A5rden/@59.3360033,18.0318185,17z/data=!4m7!3m6!1s0x465f791eb5682a75:0x623f9e5fae192bdd!8m2!3d59.3359998!4d18.0340109!9m1!1b1?hl=sv">{e.name}</a>
                          <p className="review-comment">
                            {e.comment}
                          </p>
                          <div className="rating-wrapper-wrapper">
                              <div className="rating-wrapper">
                              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" style={{height: "24px", width: "24px", fill: "#ffffff"}} viewBox="0 0 24 24"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"/></g></svg>
                              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" style={{height: "24px", width: "24px", fill: "#ffffff"}} viewBox="0 0 24 24"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"/></g></svg>
                              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" style={{height: "24px", width: "24px", fill: "#ffffff"}} viewBox="0 0 24 24"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"/></g></svg>
                              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" style={{height: "24px", width: "24px", fill: "#ffffff"}} viewBox="0 0 24 24"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"/></g></svg>
                              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" style={{height: "24px", width: "24px", fill: "#ffffff"}} viewBox="0 0 24 24"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"/></g></svg>
                              </div>
                              <a href="https://www.google.se/maps/place/Helgtandv%C3%A5rden/@59.3360033,18.0318185,17z/data=!4m7!3m6!1s0x465f791eb5682a75:0x623f9e5fae192bdd!8m2!3d59.3359998!4d18.0340109!9m1!1b1?hl=sv">Källa: Google</a>
                          </div>
                      </div>
                    )
                  })
                }
              </div>
          </div>
          <div className='content-w-80'>
            <h2>Galleri</h2>
            <div className='before-after-wrapper'>
              <div className='before-after'>
                <img src='../assets/kund_1_after.jpg' alt='after_picture'/>
                <img src='../assets/kund_1_before.jpg' alt='before_picture'/>
              </div>
              <div className='before-after'>
              <img src='../assets/kund_2_after.jpg' alt='before_picture'/>
                <img src='../assets/kund_2_before.jpeg' alt='before_picture'/>
              </div>
            </div>
          </div>
          <div className='content-w-80'>
            <h2>Kontakta oss</h2>
            <form className='contact-form' onSubmit={submitForm}>
              <div className='input-wrapper'>
                <label>Förnamn</label>
                <input onInput={alphabeticInput}></input>
              </div>
              <div className='input-wrapper'>
                <label>Efternamn</label>
                <input onInput={alphabeticInput}></input>
              </div>
              <div className='input-wrapper'>
                <label>E-postadress</label>
                <input placeholder='' type={"email"}></input>
              </div>
              <div className='input-wrapper'>
                <label>Telefonnummer</label>
                <input placeholder='' onInput={numericInput}></input>
              </div>
              <div className='input-wrapper'>
                <label>Beskrivning</label>
                <textarea></textarea>
              </div>
              <button>
                {
                  isLoading ?
                  <div className='lds-dual-ring'></div>
                  :
                  "Skicka"
                }
              </button>
            </form>
          </div>
          <div className="content-w-80">
            <h2 className="fade-in">Hitta till oss</h2>
            <iframe className="google-embed fade-in" style={{border: 'none'}} loading="lazy" allowFullScreen src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJHRGAF3ydX0YR8R16WYaTSbA&key=AIzaSyCeLyjX_oPfyXFdbrM58RSZz-lX-zclCNE"></iframe> 
        </div>
      </main>
    </Layout>
  )
}
