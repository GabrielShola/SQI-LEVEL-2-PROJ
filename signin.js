 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
  import {getFirestore, collection} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
  import {getAuth, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyByN8iDhI7JHvxi2EYlHMf0cZ2mCB4lH9M",
    authDomain: "recipeapp-f7a66.firebaseapp.com",
    projectId: "recipeapp-f7a66",
    storageBucket: "recipeapp-f7a66.firebasestorage.app",
    messagingSenderId: "143052320802",
    appId: "1:143052320802:web:3aece600870ee81f7d9a7b",
    measurementId: "G-5QM2TKT196"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app)
  console.log(db)
  const colRef = collection(db, "userData")
  const auth = getAuth()

  let signInForm = document.getElementById("signInForm")
  signInForm.addEventListener("submit", async(event)=>{
    event.preventDefault()

    try {

      let emailSignIn = document.getElementById("emailSignIn")
      let passwordSignIn = document.getElementById("passwordSignIn")
      
      const userSignIn = await signInWithEmailAndPassword(auth, emailSignIn.value,passwordSignIn.value)

      if (userSignIn){
        
        alert("You are welcome!")

        window.location.href = "./welcome.html"

        }
    
    } catch (error) {
      console.log(error.message)
      let response = document.getElementById("response")
      response.style.color = "yellow"
      response.innerHTML = "These credentials do not match our records."
      
    }
  })

  // let exitForm = document.getElementById("exitForm")
  // exitForm.addEventListener("click", async()=>{

  //  try {
  //    await signOut(auth)
    
  //  } catch (error) {

  //   alert("Signout failed!")

  //   console.log(error.message)

    
  //  }
  // })


  
  












// let signInForm = document.getElementById("signInForm")
// signInForm.addEventListener("submit", async(event)=>{
//     event.preventDefault();

//    try {
//      const signInCreation = await signInWithEmailAndPassword(auth, email.value, password.value)
    
//     if (signInCreation){
//          alert("You are welcome!")

//          return true

//         }
//         // else{
//         //     alert("Invalid email or password")
//         // }
   
    
//    } catch (error) {

//     console.log(error.message)
    
//    }
   
// })