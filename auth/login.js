const form = document.getElementById("authForm");
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  
  const storedUsername = getCookie("username");
  const storedPassword = getCookie("password");

  if (username === storedUsername && password === storedPassword) {
    window.location.href = "Pages/display.html";
  } else {
    alert("Invalid credentials");
  }
});