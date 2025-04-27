import { auth, signOut } from "./firebase.config.js";


let logout = async(e)=>{
    e.preventDefault()


    signOut(auth).then(() => {
        console.log('Sign-out successful');
        alert(' user logout')
        window.location.pathname='login.html'
        
      }).catch((error) => {
        console.log(error,'ooh oo error aagya logout nhi hua..........');
        
      });
}

document.getElementById("logout").addEventListener('click',logout)