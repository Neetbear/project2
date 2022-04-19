const userid = document.querySelector("#userid");
const username = document.querySelector("#username");
const pwd = document.querySelector("#pwd");
const checkPwd = document.querySelector("#checkPwd");
const email = document.querySelector("#email");
const signUpBtn = document.querySelector("#signUpBtn");
const addr = document.querySelector("#addr");
const addrDet = document.querySelector("#addrDet");
const checkId = document.querySelector(".checkId");
const idChecked = document.querySelector("#idChecked");
const signupSubmit = document.querySelector("#signupSubmit");

// var re = /^[A-Za-z0-9]{5,15}[@]{1}[A-Za-z0-9]{5,10}[.]{1}[A-Za-z]{2,3}$/;

signUpBtn.addEventListener("click", signUp);

function signUp(e){
    e.preventDefault()
    if (!userid.value) {
        userid.focus();
        alert("아이디를 입력해주세요.");
    }
    else if (!pwd.value) {
        pwd.focus();
        alert("비밀번호를 입력해주세요");
    }
    
    else if (pwd.value != checkPwd.value) {
        checkPwd.focus();
        alert("비밀번호가 일치하지 않습니다.");
    }
    else if (!username.value) {
        username.focus();
        alert("이름을 입력해주세요")
    }
    else if (!email.value) {
        email.focus();
        alert("올바른 이메일 주소를 입력하세요.");
    }
    else if (!addr.value) {
        addr.focus();
        alert("주소");
    }
    else if (!addrDet.value) {
        addrDet.focus();
        alert("상세 주소를 입력하세요.");
    }
    else {
        return signupSubmit.submit();
    };
};


document.getElementById("addr").addEventListener("click", function(){ 
    new daum.Postcode({
        oncomplete: function(data) { 
            document.getElementById("addr").value = data.address; 
        }
    }).open();
});
