let mealName = document.getElementById("mealDisplay")
let errorMessage = document.getElementById("error")

document.addEventListener("DOMContentLoaded", async ()=>{

try {

    let spinner = document.getElementById("spinner")
    spinner.style.display = "none"

    const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
   // console.log(response)
    const data = await response.json()
   // console.log(data)
   let realData = data.meals
 console.log(realData)

  realData.forEach((meal)=>{
//     let area = meal.strArea
//    let Category = meal.strCategory
//    let Ingredients1 = meal.strIngredients1
//    let ingredient2 = meal.
        const {strArea, strCategory, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strInstructions, strMeal, strMealThumb, strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8, strTags, strYoutube } = meal

        let mealCard = document.createElement("div")
        mealCard.style.width = "400px"
        mealCard.style.border = "2px solid, green"
         mealCard.style.padding = "10px"

         let shortText = strInstructions.slice(0,100)
         let lastSpace = shortText.lastIndexOf(" ")
         let remainingText = strInstructions.slice(lastSpace)
         

        mealCard.innerHTML  += `
         <img src="${strMealThumb}" style="width: 200px;">
           <h2>${strMeal}</h2>
            <p>${strTags}</p>
            <p>${strArea}</p>
            <p>${strCategory}</p>
            <p>${strIngredient1}, ${strIngredient2}, ${strIngredient3}, ${strIngredient4}, ${strIngredient5}, ${strIngredient6}, ${strIngredient7}, ${strIngredient8}, </p>
            <p> ${strMeasure1}, ${strMeasure2}, ${strMeasure3}, ${strMeasure4}, ${strMeasure5}, ${strMeasure6}, ${strMeasure7}, ${strMeasure8}</p>
            
            <a href="${strYoutube}">YouTube</a>
            <p>${shortText}
             <span class="dot">...</span>
             <span style="display: none;" class="remainText">${remainingText}</span>
              <button class="readMore">Readmore </button>
            
            </p>
           
          
        `
        let dot = mealCard.querySelector(".dot")
        let readMore = mealCard.querySelector(".readMore")
        let remainText = mealCard.querySelector(".remainText")
        readMore.addEventListener("click", ()=>{
            if(remainText.style.display === "none"){
                remainText.style.display = "inline"
                dot.style.display = "none"
                readMore.style.display = "Readless"
            }
            else{
                remainText.style.display = "none"
                dot.style.display = "inline"
                readMore.style.display = "Readmore"

            }
        })


        
        mealName.appendChild(mealCard)

    
  })



    
} catch (error) {
    console.log(error.message)
    spinner.style.display = "block"
    errorMessage.textContent = "Error loading content"

}


} )
