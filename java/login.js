import {
   getAuth,
   signInWithEmailAndPassword,
   GoogleAuthProvider,
   signInWithPopup,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Khai báo biến toàn cục
let emailElement, passElement, googleLoginButton, emailErrorElement, passErrorElement, loginButton;

window.addEventListener("DOMContentLoaded", () => {
  // Gán giá trị từ HTML
  emailElement = document.getElementById("email");
  passElement = document.getElementById("password");
  googleLoginButton = document.getElementById("google-login-btn");
  emailErrorElement = document.getElementById("email-error");
  passErrorElement = document.getElementById("pass-error");
  loginButton = document.getElementById("login-btn");

  // Gắn sự kiện click cho nút Login Email
  if (loginButton) {
    loginButton.addEventListener("click", handleLoginClick);
  }

  // Gắn sự kiện click cho nút Google (PHẢI ĐỂ TRONG NÀY)
  if (googleLoginButton) {
    googleLoginButton.addEventListener("click", handleGoogleLogin);
  }
});

function handleLoginClick(event) { 
   event.preventDefault(); 

   let email = emailElement.value.trim();
   let password = passElement.value;

   if (validate(email, password)) {
      const auth = getAuth(); 
      signInWithEmailAndPassword(auth, email, password) 
      .then((userCredential) => {
          console.log("Login successful:", userCredential.user);
          // Chuyển hướng khi thành công
          window.location.href = "../html/shop.html";
      })
      .catch((error) => {
          console.error("Login error:", error.code);
          // Xử lý các lỗi phổ biến để hiện thông báo tiếng Việt
          if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
              passErrorElement.textContent = "(*) Sai email hoặc mật khẩu.";
          } else if (error.code === 'auth/too-many-requests') {
              passErrorElement.textContent = "(*) Thử lại quá nhiều lần. Vui lòng chờ!";
          } else {
              passErrorElement.textContent = "(*) Lỗi: " + error.message;
          }
      });
   }
}

function validate(email, password) {
   let isValid = true;
   let email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   emailErrorElement.textContent = "";
   passErrorElement.textContent = "";

   if (!email_regex.test(email)) {
      emailErrorElement.textContent = "(*) Email không đúng định dạng.";
      isValid = false;
   }
   if (password.length < 6) {
      passErrorElement.textContent = "(*) Mật khẩu phải có ít nhất 6 ký tự.";
      isValid = false;
   }
   return isValid;
}

function handleGoogleLogin() {
   const auth = getAuth();
   const provider = new GoogleAuthProvider();

   signInWithPopup(auth, provider)
   .then((result) => {
      window.location.href = "../html/shop.html";
   })
   .catch((error) => {
      console.error("Google login error:", error);
      passErrorElement.textContent = "(*) Đăng nhập Google thất bại.";
   });
}