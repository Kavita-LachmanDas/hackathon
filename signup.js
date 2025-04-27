// // import { auth, createUserWithEmailAndPassword,GoogleAuthProvider,signOut,signInWithPopup,onAuthStateChanged, collection, addDoc ,db} from "./firebase.config.js";






// // onAuthStateChanged(auth, (user) => {
// //   if (user) {
  
// //     const uid = user.uid;
// //     console.log(uid)
// //   getData() 
// //     // window.location.pathname='index.html'
   
// //   } else {
// // console.log("user nhi mila hai")
// // // window.location.pathname='signup.html'
// //   }
// // });



// // let register = async (e) => {
// //     e.preventDefault();
  
// //     let email = document.getElementById("signup-email").value;
// //     let password = document.getElementById("signup-password").value;
// //     let name = document.getElementById("name").value;
  
// //     try {
// //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// //       const user = userCredential.user;
// //       alert("register hogya user wohoooo " + user.uid);
  
     
// //       const docRef = await addDoc(collection(db, "users"), {
// //         name,
// //         email,
// //         password,
// //         uid: user.uid,
// //       });
  
// //    alert("Document written with ID: ", docRef.id);
// //      window.location.pathname='index.html'
// //     } catch (error) {
// //       console.log("register nhi hua", error.message);
// //       alert(error.message); 
// //     }
// //   };
// //   document.getElementById("signup")?.addEventListener("submit", register);
  






  
// // ////////////sign in with google

// // const provider = new GoogleAuthProvider();
// // provider.setCustomParameters({ prompt: "select_account" });

// // const _sigInWithGoogle = async () => {
// //     try {
// //         await signOut(auth);  // 🛑 Pehle Logout
// //         console.log("User signed out before sign-in attempt.");

// //         const result = await signInWithPopup(auth, provider); // 🟢 Phir Sign-in
// //         console.log("User signed in:", result.user);
// //         window.location.replace('./index.html')
// //     } catch (error) {
// //         console.error("Google Sign-In Error:", error.message);
// //     }
// // };

// // document.getElementById("google")?.addEventListener("click", _sigInWithGoogle);


// import { auth, createUserWithEmailAndPassword, GoogleAuthProvider, signOut, signInWithPopup, onAuthStateChanged, collection, addDoc, getDocs, query, where, db } from "./firebase.config.js";

// // Check the user's authentication state
// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     const uid = user.uid;
//     console.log("User logged in with UID:", uid);

//     // Check if user already exists in the 'users' collection
//     const userQuery = query(collection(db, "users"), where("uid", "==", uid));
//     const querySnapshot = await getDocs(userQuery);
    
//     if (querySnapshot.empty) {
//       // If user doesn't exist in Firestore, create a new document
//       console.log("User not found in Firestore, creating document...");
//       const docRef = await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         email: user.email,
//         name: user.displayName || "Anonymous", // Add a default name if displayName is unavailable
//       });
//       console.log("User document created in Firestore with ID:", docRef.id);
//     } else {
//       console.log("User already exists in Firestore");
//     }

//     getData(); // Fetch additional data if necessary
//   } else {
//     console.log("User not logged in, redirecting to signup...");
//     // window.location.pathname = 'signup.html';
//   }
// });

// // Register new user
// let register = async (e) => {
//   e.preventDefault();

//   let email = document.getElementById("signup-email").value;
//   let password = document.getElementById("signup-password").value;
//   let name = document.getElementById("name").value;

//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
//     console.log("User created with UID:", user.uid);
//     alert("Registration successful! User UID: " + user.uid);

//     // Store user data in Firestore (without password)
//     const docRef = await addDoc(collection(db, "users"), {
//       name,
//       email,
//       uid: user.uid,
//     });

//     alert("Document written with ID: " + docRef.id);
//     window.location.pathname = 'index.html'; // Redirect to another page after registration
//   } catch (error) {
//     console.log("Registration failed:", error.message);
//     alert(error.message);
//   }
// };

// document.getElementById("signup")?.addEventListener("submit", register);

// // Google Sign-In
// const provider = new GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });

// const _sigInWithGoogle = async () => {
//   try {
//     await signOut(auth);  // Sign out before sign-in attempt
//     console.log("User signed out before sign-in attempt.");

//     const result = await signInWithPopup(auth, provider); // Sign-in with Google
//     console.log("User signed in:", result.user);

//     // Check if user exists in Firestore (similar to above)
//     const user = result.user;
//     const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
//     const querySnapshot = await getDocs(userQuery);
    
//     if (querySnapshot.empty) {
//       // If user doesn't exist in Firestore, create a new document
//       console.log("User not found in Firestore, creating document...");
//       const docRef = await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         email: user.email,
//         name: user.displayName || "Anonymous", // Use displayName or default to "Anonymous"
//       });
//       console.log("User document created in Firestore with ID:", docRef.id);
//     } else {
//       console.log("User already exists in Firestore");
//     }

//     window.location.replace('./index.html'); // Redirect after successful login
//   } catch (error) {
//     console.error("Google Sign-In Error:", error.message);
//   }
// };

// document.getElementById("google")?.addEventListener("click", _sigInWithGoogle);




import { auth, createUserWithEmailAndPassword, GoogleAuthProvider, signOut, signInWithPopup, onAuthStateChanged, collection, addDoc, getDocs, query, where, db } from "./firebase.config.js";

// Check the user's authentication state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log("User logged in with UID:", uid);

    // Check if user already exists in the 'users' collection
    const userQuery = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(userQuery);
    
    if (querySnapshot.empty) {
      // If user doesn't exist in Firestore, create a new document
      console.log("User not found in Firestore, creating document...");
      const docRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "Anonymous", // Add a default name if displayName is unavailable
      });
      console.log("User document created in Firestore with ID:", docRef.id);
    } else {
      console.log("User already exists in Firestore");
    }

    getData(); // Fetch additional data if necessary
  } else {
    console.log("User not logged in, redirecting to signup...");
    // If user is not logged in, block access to index.html and redirect to signup
    if (window.location.pathname === '/index.html') {
      window.location.pathname = '/signup.html'; // Redirect to signup page if on index.html
    }
  }
});

// Register new user
let register = async (e) => {
  e.preventDefault();

  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;
  let name = document.getElementById("name").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User created with UID:", user.uid);
    alert("Registration successful! User UID: " + user.uid);

    // Store user data in Firestore (without password)
    const docRef = await addDoc(collection(db, "users"), {
      name,
      email,
      uid: user.uid,
    });

    alert("Document written with ID: " + docRef.id);
    window.location.pathname = 'index.html'; // Redirect to index.html after successful registration
  } catch (error) {
    console.log("Registration failed:", error.message);
    alert(error.message);
  }
};

document.getElementById("signup")?.addEventListener("submit", register);

// Google Sign-In
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const _sigInWithGoogle = async () => {
  try {
    await signOut(auth);  // Sign out before sign-in attempt
    console.log("User signed out before sign-in attempt.");

    const result = await signInWithPopup(auth, provider); // Sign-in with Google
    console.log("User signed in:", result.user);

    // Check if user exists in Firestore (similar to above)
    const user = result.user;
    const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(userQuery);
    
    if (querySnapshot.empty) {
      // If user doesn't exist in Firestore, create a new document
      console.log("User not found in Firestore, creating document...");
      const docRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "Anonymous", // Use displayName or default to "Anonymous"
      });
      console.log("User document created in Firestore with ID:", docRef.id);
    } else {
      console.log("User already exists in Firestore");
    }

    window.location.replace('./index.html'); // Redirect after successful login
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
  }
};

document.getElementById("google")?.addEventListener("click", _sigInWithGoogle);
