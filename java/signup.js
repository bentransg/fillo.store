   import {
   getAuth,
   createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
   //thẻ
   let emailelement = document.getElementById("email");
   let passelement = document.getElementById("password");
    let repasselement = document.getElementById("repassword");
    let registerbtn = document.getElementById("signup-btn")
//error
    let emailErrorelement = document.getElementById("email-error");
  let passErrorelement = document.getElementById("pass-error");
  let repassErrorelement = document.getElementById("repass-error")

  
registerbtn.addEventListener("click", handlesignup);


   function handlesignup(event) {      
      event.preventDefault();

      let email = emailelement.value;
      let password = passelement.value;
      let repassword = repasselement.value;
      

if (validate(email, password, repassword) === true) {
   const auth = getAuth();
   createUserWithEmailAndPassword(auth, email, password) 
         .then((userCredential) => {
            // báo đn thành công
            const user = userCredential.user;
            console.log("create account successful:", user);
            window.location.href = "../html/shop.html";
         })
         .catch((error) => { //báo lỗi 
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("error during create account:", errorCode, errorMessage);
            passErrorelement.textContent = "(*) " + errorMessage;
         });
} 
}


 function validate(email, password, repassword) {
   let isValid = true;
   let email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   // Reset error messages
    emailErrorelement.textContent = "";
    passErrorelement.textContent = "";
    repassErrorelement.textContent = "";

   // Validation
   if (!email_regex.test(email)) {
      emailErrorelement.textContent = "(*) Invalid email format.";
      isValid = false;
   }
   if (password.length < 6) {
      passErrorelement.textContent =
         "(*) Password must have al least 6 characters";
      isValid = false;
   }

if(password !== repassword || !repassword){
  repassErrorelement.textContent = "mk sai"
  isValid = false
}

   return isValid;

   
}




   

  
 

