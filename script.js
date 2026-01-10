// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import { getFirestore, collection,doc, setDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js"
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
//console.log(db)
const auth = getAuth(app)
const colRef = collection(db, "userData")


// signup validation
export let fullName = document.getElementById("fullName");
let phoneNumber = document.getElementById("phoneNumber");
let email = document.getElementById("email");
let image = document.getElementById("image")
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let response = document.getElementById("response");
let signUpForm = document.getElementById("signUpForm")



// regex
let phoneNumberReg = /^\+234[0-9]{10}$/;
let emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
let passwordReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let validation = validationSignUp()
    if (!validation){

        return false

    }


    let sucess = await signUpSubmision()
    if (sucess) {
        alert("Your account creation was successful!")

        window.location.href = './signin.html'

        return true


    }
    else {
        alert("Account creation  failed!")

        return false
    }




})

async function signUpSubmision() {

   
    try {

        const createEmailPass = await createUserWithEmailAndPassword(auth, email.value, password.value)
       
        let userDetails = {
        uid: createEmailPass.user.uid,
        fullName: fullName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        image: image.value,
        password: password.value
    }
     
    const docRef = doc(colRef, createEmailPass.user.uid)
    const setDocRef = await setDoc(docRef, userDetails)


        return true

    } catch (error) {
        console.log(error.message)

        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
            alert("Email already taken. Try with another one")
        }
        return false



    }
}


function validationSignUp() {

    if (fullName.value.trim() == '' || phoneNumber.value.trim() == '' || email.value.trim() == '' || image.value == '' || password.value.trim() == '' || confirmPassword.value.trim() == '') {
        response.innerHTML = `Fill all the details in the form`
        response.style.color = "red"

        return

    }
    if (!phoneNumberReg.test(phoneNumber.value)) {
        alert(`Invalid phone number. Start with +234`)

        return false
    }
    if (!emailReg.test(email.value)) {
        alert(`Email not valid`)

        return false
    }
    if (!passwordReg.test(password.value)) {
        alert("Invalid password format. It must contain an uppercase, lowecase, number and a symbol")

        return false
    }

    if (password.value !== confirmPassword.value) {
        alert(`Password does not match`)

        return false

    }
    else {
        return true
    }


}

