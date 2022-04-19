window.onload = function () {
    document.getElementById("login").addEventListener("click", function(){
        var signUpWindow;
        var popupX= (document.body.offsetWidth / 2) - (570 / 2);
        var popupY= (window.screen.height / 2) - (350 / 2); 
        signUpWindow = window.open("/login", "logInForm", "width=570, height=350, left = "+ popupX + ", top= "+ popupY + "resizable = no, scrollbars = no");
    });
    document.getElementById("signup").addEventListener("click", function(){
        var logInWindow;
        var popupX= (document.body.offsetWidth / 2) - (570 / 2);
        var popupY= (window.screen.height / 2) - (350 / 2); 
        logInWindow = window.open("/signup", "signupForm", "width=570, height=350, left = "+ popupX + ", top= "+ popupY + "resizable = no, scrollbars = no");
    });
};