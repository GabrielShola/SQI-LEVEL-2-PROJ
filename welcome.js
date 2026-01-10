// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
  import {getFirestore, collection, doc, getDoc} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
  import {getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js"
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
 // const analytics = getAnalytics(app);
 const db = getFirestore(app)
 // console.log(db)
 const colRef = collection(db, "userData")
  const auth = getAuth()

 
let exitForm = document.getElementById("exitForm")

  exitForm.addEventListener("click", async()=>{
try {
  
     await signOut(auth);
     alert("Sign out succesful")

     window.location.href = './signin.html'
     return true
    
    
   }
  
catch (error) {

    alert("Sign out fail!")

  console.log(error.message)
  return false

  
}

})

let userName = document.getElementById("userName")
let image = document.getElementById("image")
onAuthStateChanged(auth, async(user)=>{

 if (user){
   const userDoc = doc(colRef, user.uid)
  const usersetDoc = await getDoc(userDoc)

  if (usersetDoc.exists()){
  let name = usersetDoc.data().fullName
  let userImage = usersetDoc.data().image 
  //  const {fullName, image} = userGetDoc.data()
  userName.style.color = 'red'
  image.style.width = "50px"
  image.style.height = "50px"
  userName.style.color = "white"
  userName.innerHTML = `${name}, Welcome back!`
  image.innerHTML = `${image}`
  
 }
 else{
  userName.innerHTML = 'Welcome!'
   userName.style.color = 'red'
  }
 return
 } 
})

/

// API CONSUME
document.addEventListener("DOMContentLoaded", ()=>{
 
// let searchButton = document.getElementById("searchButton")
// searchButton.addEventListener("click", ()=>{
//    let searchInput = document.getElementById("searchInput")
 
//   const query = searchInput.value.trim() 
//   if (!query ){

//   alert("Enter your recipe")

//   return
// }
// })

allMealByFirstLetters()
  

})

 async function allMealByFirstLetters(){
  try {


    
    let mealDisplay = document.getElementById("mealDisplay")
    let spinner = document.getElementById("spinner")
   

    spinner.style.display = "none"
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
    const data =  await response.json()
   // console.log(data)
    const realMeal = data.meals
  //  console.log(realMeal)

  // if(!realMeal){
  //   alert("Meal not found")

  //   return
  // }
   
   realMeal.forEach((meal)=>{
    const {dateModified, idMeal, strMeal, strArea, strCategory, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5,strInstructions, strMealThumb,strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strSource, strYoutube  } = meal;
   
    const mealCard = document.createElement("div")
    mealCard.style.border = "4px solid black"
     mealCard.style.width = "400px"
    mealCard.style.color = "black"
    mealCard.style.margin = "15px"
     mealCard.style.padding = "15px"
     mealCard.style.borderRadius = "20px"
     mealCard.style.backgroundColor = "white"

   let shortText = strInstructions.slice(0, 100)
  
   let lastSpace = shortText.lastIndexOf(" ")
   let remainingText = strInstructions.slice(lastSpace)
  
     mealCard.innerHTML += `
         <img src="${strMealThumb}" style="width: 350px; height: 350px">
   
        <h3>Meal: ${strMeal}</h3>
        <p>Area: ${strArea}</p>
        <a href="${strSource}">View Recipe</a>
      
        <p>Category: ${strCategory}</p>
        <p>Ingredients: ${strIngredient1}, ${strIngredient2}, ${strIngredient3}, ${strIngredient4}, ${strIngredient5}</p>
        <p>Guide : ${strMeasure1}, ${strMeasure2}, ${strMeasure3}, ${strMeasure4}, ${strMeasure5}</p>
        <a href="${strYoutube}">Watch it on Youtube</a>
         <p>Instructions: ${shortText} <span  class="dot">...</span>
        <span class="remainText" style="display: none;">${remainingText}</span> 
         <button class="readmore">Read more</button> 
         
     ` 
 
   mealDisplay.appendChild(mealCard)
      
        let remainText = mealCard.querySelector(".remainText")
        let dot = mealCard.querySelector(".dot")
        let readMore = mealCard.querySelector(".readmore")
       
       
        readMore.addEventListener("click", ()=>{
          if(remainText.style.display ==="none"){
            remainText.style.display = "inline";
            dot.style.display = "none";
            readMore.innerHTML = "Readless"

          }
          else{
             remainText.style.display = "none";
            dot.style.display = "inline";
            readMore.innerHTML = "Readmore"
          }
         

        })
       

       
})
    
  } 
  catch (error) {

    console.log(error.message)
     let errorMessage = document.getElementById("error")
     errorMessage.innerHTML = "Error loading contents..."
    errorMessage.style.color = "white"
    errorMessage.style.fontWeight = "700"
     spinner.style.display = "block"
    
 
  }
} 


