import { registrationModalOpen, registrationModalClose } from "./authModal";
// import { regForm } from "./refs";


// import {
//   getAuth,
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from 'firebase/auth';

// const auth = getAuth();


// async function hadlerRegistration(e) {
//   e.preventDefault();

//   const email = e.currentTarget.elements.email.value;
//   const password = e.currentTarget.elements.password.value;

//   console.log(email, password);

//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
    
//     registrationModalClose();
//     console.log("Registration success")
//   } catch (error) {
//     console.log(error.code)
//   }
// }

// export { hadlerRegistration };