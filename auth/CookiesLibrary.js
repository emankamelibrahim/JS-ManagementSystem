function setCookie(cookiename, cookieval, expdays) {
  let cookieString = encodeURIComponent(cookiename) + "=" + encodeURIComponent(cookieval);
  
  if (expdays) {
    const date = new Date();
    date.setTime(date.getTime() + expdays * 24 * 60 * 60 * 1000);
    cookieString += ";expires=" + date.toUTCString();
  }
  
  cookieString += ";path=/";
  document.cookie = cookieString;
}

function getCookie(cookiename) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, value] = c.split("=");
    if (key === cookiename) return decodeURIComponent(value);
  }
  return null;
}

function deleteCookie(cookiename) {
  document.cookie = cookiename + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}