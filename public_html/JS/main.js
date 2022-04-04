import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js';

window.onload = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
    navbarComponents.navbarScrollEffect()
    navbarComponents.addEventListeners()
    sectionScrollAnimations();
    appearEffect()
    fetchGoogleReviews()

    setTimeout(() => {
        document.getElementById('popupWindow').setAttribute('aria-label', 'display')
        document.body.style.overflowY = "hidden";
        document.getElementById('popupClose').addEventListener('click', (e) => {
            e.target.parentElement.parentElement.parentElement.setAttribute('aria-label', 'hidden')
            document.body.style.overflowY = "";
        })
    }, 3000)
}

const navbarComponents = {
    addEventListeners: () => {
        window.addEventListener('scroll', function(){
            navbarComponents.navbarScrollEffect();
        })
        
        document.getElementById('nav-button').addEventListener('click', function(){
            navbarComponents.navbarMobileHamburger(document.getElementById('nav-button').getAttribute('aria-label'));
        })
    },
    navbarScrollEffect: () => {
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
    },
    navbarMobileHamburger: (attribute) => {
        var navbar = document.querySelector('.nav-desktop');
        if(attribute === "hidden"){
            document.getElementById('nav-button').setAttribute('aria-label', 'toggled')
            navbar.style.cssText = `width: 100vw;`
            document.getElementById('nav-button').innerHTML = 
            `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path></svg>
            `
        } else{
            document.getElementById('nav-button').setAttribute('aria-label', 'hidden')
            navbar.style.cssText = `width: 0vw`
            document.getElementById('nav-button').innerHTML = 
            `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"></path></svg>
            `
        }
    }
}

function popUpWindow(cookie){
    console.log(cookie)
}

function appearEffect(){
    var loadElements = document.querySelectorAll('.load')
    for(let i=0; i<loadElements.length; i++){
        loadElements[i].style.cssText = "opacity: 1;"
    }
}

function sectionScrollAnimations(){
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -250px 0px"
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

    /*
    sliders.forEach(slider =>{
        appearOnScroll.observe(slider);
    })
    popup.forEach(popups => {
        appearOnScroll.observe(popups);
    })
    featuredProjects.forEach(popups => {
        appearOnScroll.observe(popups)
    })
    headers.forEach(popups => {
        appearOnScroll.observe(popups)
    })
    */
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
            var swiperWrapper = document.querySelector('.swiper-wrapper')

            for(let i=0; i < responseData.length; i++){
                swiperWrapper.innerHTML += 
                `
                <div class="review-box swiper-slide">
                    <p class="reviewer">${responseData[i].name}</p>
                    <p class="review-comment">${responseData[i].comment}</p>
                    <div class="rating-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"/></g></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"/></g></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"/></g></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"/></g></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z"/></g></svg>
                    </div>
                </div>
                `
            }

            const reviewSwiper = new Swiper('.swiper', {
                direction: "horizontal",
                loop: true,
            
                breakPoints: {
                    500: {
                        slidesPerView: 1
                    },
                    1000: {
                        slidesPerView: 2
                    },
                    1400: {
                        slidesPerView: 3
                    }
                }
            })
        } else{

        }
    })
    .fail((error) => {
        console.log(error)
    })
}