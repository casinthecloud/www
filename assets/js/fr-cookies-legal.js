var disableStr = 'ga-disable-' + gaProperty;

if (document.cookie.indexOf('hasConsent=false') > -1) {
    window[disableStr] = true;
}

function getCookieExpireDate() {
    var cookieTimeout = 34214400000;
    var date = new Date();
    date.setTime(date.getTime()+cookieTimeout);
    var expires = "; expires="+date.toGMTString();
    return expires;
}

function askConsent(){
    var bodytag = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('id','cookie-banner');
    div.setAttribute('width','70%');
    div.innerHTML =  '<div style="background-color:#ffffff">Ce site utilise Google Analytics.\
  En continuant à naviguer, vous nous autorisez à déposer des cookies à des fins de \
  mesure d\'audience.  Pour s\'opposer à ce dépôt vous pouvez cliquer  \
  <a href="javascript:gaOptout()">ici</a>.</div>';
    bodytag.insertBefore(div,bodytag.firstChild);
    document.getElementsByTagName('body')[0].className+=' cookiebanner';
}

function getCookie(NomDuCookie)  {
    if (document.cookie.length > 0) {
        begin = document.cookie.indexOf(NomDuCookie+"=");
        if (begin != -1)  {
            begin += NomDuCookie.length+1;
            end = document.cookie.indexOf(";", begin);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(begin, end));
        }
    }
    return null;
}

function delCookie(name )   {
    path = ";path=" + "/";
    domain = ";domain=" + "."+document.location.hostname;
    var expiration = "Thu, 01-Jan-1970 00:00:01 GMT";
    document.cookie = name + "=" + path + domain + ";expires=" + expiration;
}

function deleteAnalyticsCookies() {
    var cookieNames = ["__utma","__utmb","__utmc","__utmz","_ga"];
    for (var i=0; i<cookieNames.length; i++) delCookie(cookieNames[i])
}

function gaOptout() {
    document.cookie = disableStr + '=true;'+ getCookieExpireDate() +' ; path=/';
    document.cookie = 'hasConsent=false;'+ getCookieExpireDate() +' ; path=/';
    var div = document.getElementById('cookie-banner');
    if ( div!= null ) div.innerHTML = '<div style="background-color:#ffffff"> Vous vous êtes opposé \
  au dépôt de cookies de mesures d\'audience dans votre navigateur </div>';
    window[disableStr] = true;
    deleteAnalyticsCookies();
}

var consentCookie =  getCookie('hasConsent');
if (!consentCookie) {
    var referrer_host = document.referrer.split('/')[2];
    if ( referrer_host != document.location.hostname ) {
        window[disableStr] = true;
        window[disableStr] = true;
        window.onload = askConsent;
    } else {
        document.cookie = 'hasConsent=true; '+ getCookieExpireDate() +' ; path=/';
    }
}
