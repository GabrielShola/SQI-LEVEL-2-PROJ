
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
  import {getFirestore, collection, getDoc, doc} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"
   import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js"
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
  const auth = getAuth()
  const colRef = collection(db, "userData")

let exitForm = document.getElementById("exitForm")
exitForm.addEventListener("click", async()=>{
   try {
     await signOut(auth)
    alert("Signout successfully")
    window.location.href= './signin.html'

    return true
   } catch (error) {
    alert("Log out failed")

    return false
    
   }

})
let userName = document.getElementById("userName")
let image = document.getElementById("image")

onAuthStateChanged(auth, async(user)=>{
if (user){
    userdoc = doc(colRef, user.uid)
    userGetDoc = await getDoc(userdoc)
    if (userGetDoc.exists){
        let name = usersetDoc.data().fullName
  let userImage = usersetDoc.data().image 
  //  const {fullName, image} = userGetDoc.data()
  userName.style.color = 'red'
  image.style.width = "50px"
  image.style.height = "50px"
  userName.innerHTML = `${name}, Welcome back`
  image.innerHTML = `${image}`
        

    }
    else{
  userName.innerHTML = 'Welcome!'
   userName.style.color = 'red'
  }
 return
}

})


let mealDisplay = document.getElementById("mealDisplay")
let spinner = document.getElementById("spinner")




document.addEventListener("DOMContentLoaded", async () => {

    try {

        spinner.style.display = "none"
        let displayCard = document.getElementById("displayCard")

        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        const data = await response.json()
        // console.log(data)
        const mainCategory = data.categories
        console.log(mainCategory)
        mainCategory.forEach((category) => {
            const { strCategory, strCategoryThumb, strCategoryDescription } = category

            let categoryCard = document.createElement("div")
           
            categoryCard.style.border = "4px solid black"
            categoryCard.style.width = "400px"
            categoryCard.style.color = "black"
            categoryCard.style.margin = "15px"
            categoryCard.style.padding = "15px"
           categoryCard.style.borderRadius = "20px"
            categoryCard.style.backgroundColor = "white"

            let shortText = strCategoryDescription.slice(0, 100)
            let lastSpace = shortText.lastIndexOf(shortText)
            let remainingText = strCategoryDescription.slice(lastSpace)




            categoryCard.innerHTML += `
        <p>Category: ${strCategory}</p>
        <img src="${strCategoryThumb}" alt="" style="width: 300px; height: 300px;">
        <p>Category: ${shortText}
        <span class="dot">...</span>
         <span class="remainText" style="display: none;">${remainingText}</span>
        </p>
         <button class="readMore">Readmore</button>
            

        `

            mealDisplay.appendChild(categoryCard)

            let dot = categoryCard.querySelector(".dot")
            let remainText = categoryCard.querySelector(".remainText")
            let readMore = categoryCard.querySelector(".readMore")

            readMore.addEventListener("click", () => {
                if (remainText.style.display === "none") {
                    remainText.style.display = "inline"
                    dot.style.display = "none"
                    readMore.innerHTML = "Readless"
                }
                else {
                    remainText.style.display = "none"
                    dot.style.display = "inline"
                    readMore.innerHTML = "Readmore"

                }
            })

        })


    } catch (error) {

        console.log(error.message)
        spinner.style.display = "block"

    }
})