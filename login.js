import { auth, signInWithEmailAndPassword,onAuthStateChanged } from "./firebase.config.js";







onAuthStateChanged(auth, (user) => {
    if (user) {
    
      const uid = user.uid;
      console.log(uid)
    
      window.location.pathname='index.html'
     
    } else {
  console.log("user nhi mila hai")
  // window.location.pathname='signup.html'
    }
  });
  
  

 

let login = async(e)=>{
    e.preventDefault()
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          alert('login hogya user wohoooo',user.uid)
        
      })
      .catch((error) => {
alert(error)
      });
}


document.getElementById("login")?.addEventListener('submit',login)