import { auth,sendPasswordResetEmail } from "./firebase.config.js";

let forgetPassword = async(e)=>{
    e.preventDefault()
    let email = document.getElementById("login-email").value
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent!")
      alert("Password reset email sent!")
    
    })
    .catch((error) => {
    
  alert("password reset ki email nhi aayi.....",error)
    });
  
}


  document.getElementById('forgetPasswordd')?.addEventListener('click',forgetPassword)