function createCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    //var sameSite = "SameSite=None; Secure"
    document.cookie = `${cname}=${cvalue}; SameSite=None; Secure; ${expires};path=/;`;
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return ""; 
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
/*********************** GLOBAL COOKIE SETTINGS **********************************/

/*
function cookieConsentLoad(){
  var user = getCookie("cookieconsent");
  if (user !== "") {
    return 1;
  } 
  else {
    //Create and display cookie-consent window
    var body = document.getElementsByTagName('body')[0]
    var footer = document.getElementsByTagName('footer')[0]
    var cookieDiv = document.createElement('div');
    cookieDiv.setAttribute('id', "cookieConsentWindow");
    var path = window.location.pathname.substring(0,3)
    if(path === "/En"){
      cookieDiv.innerHTML = `
      <div id="cookie-consent-wrapper">
            <div>
                <h3>Cookies</h3>
                <p>This website uses cookies to enhance your browsing experience. For more information
                  on how I use cookies, please click on the link <a>Cookies</a></p>
            </div>
          <button class="button button-dark-round" id="cookieConsentButton">Jag förstår</button>
      </div>
      `;
    }
    else{
      cookieDiv.innerHTML = `
      <div id="cookie-consent-wrapper">
          <div>
              <h3>Cookies</h3>
              <p>Denna hemsida använder sig av cookies för statistiska syften, samt för att förbättra upplevelsen på hemsida. För mer information, var god och tryck på länken <a>Cookies</a></p>
          </div>
          <button class="button button-dark-round" id="cookieConsentButton">Jag förstår</button>
      </div>
      `;
    }
    body.insertBefore(cookieDiv, footer);
    //
    document.getElementById('cookieConsentButton').addEventListener('click', function(){
      consentClicked();
    })
  }
};
function consentClicked(){
  createCookie("cookieconsent", "true", 365);
  document.getElementById('cookieConsentWindow').remove();
};
*/

/****************/
function loginCheck(){
  var loginCookie = getCookie('account');
  if(loginCookie !== ""){
    return true;
  }
  else{
    return false;
  }
}

export { createCookie, getCookie, eraseCookie, loginCheck };