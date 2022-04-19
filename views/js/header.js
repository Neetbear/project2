const toggleBtn = document.querySelector('.nav_toggleBtn');
const menu = document.querySelector('.nav_menu');
const signUp = document.querySelector('.nav_signUp');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    signUp.classList.toggle('active');
});

document.getElementById("login").addEventListener("click", function(){
    var signUpWindow;
    var popupX= (document.body.offsetWidth / 2) - (520 / 2);
    var popupY= (window.screen.height / 2) - (350 / 2); 
    signUpWindow = window.open("/login", "logInForm", "width=520, height=350, left = "+ popupX + ", top= "+ popupY + "resizable = no, scrollbars = no");
});
document.getElementById("signup").addEventListener("click", function(){
    var logInWindow;
    var popupX= (document.body.offsetWidth / 2) - (520 / 2);
    var popupY= (window.screen.height / 2) - (440 / 2); 
    logInWindow = window.open("/signup", "signupForm", "width=520, height=440, left = "+ popupX + ", top= "+ popupY + "resizable = no, scrollbars = no");
});