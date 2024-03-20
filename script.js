import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, updatePassword, deleteUser, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDZJTH0Znyi13etPM6Ag5M-lQ_WeqXOIsU",
    authDomain: "scrumflow-6e479.firebaseapp.com",
    projectId: "scrumflow-6e479",
    storageBucket: "scrumflow-6e479.appspot.com",
    messagingSenderId: "828323679259",
    appId: "1:828323679259:web:6db3cfbf89942cc3d4fcbe",
    measurementId: "G-2427QNHC73"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        loadUserData();
    } else {
        console.log("No user is signed in.");
    }
});

function loadUserData() {
    const user = auth.currentUser;
    document.querySelector('.user-email').innerHTML = user.email;
}

document.querySelector('#email').innerHTML = user.email;
document.querySelector('#delete-account-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to delete your account?')) {
        const user = auth.currentUser;
        deleteUser(user)
            .then(() => {
                window.location.href = "https://thinkwisenotes.webflow.io/"
            })
            .catch((error) => {
                alert('It\'s been too long since your last login. Due to safety reasons you have to logout and login again.')
            });
    }
});

document.querySelector('#save-password-btn').addEventListener('click', () => {
    const user = auth.currentUser;
    const newPassword = document.querySelector('#new-password').value;
    updatePassword(user, newPassword)
        .then(() => {
            console.log("Password change successful")
        })
        .catch((error) => {
            console.error(error);
            alert('Failed to update password. Please try again later.');
        });
});

document.querySelector('#reset-password-link').addEventListener('click', () => {
    const user = auth.currentUser;
    sendPasswordResetEmail(auth, user.email)
        .then(() => {
            alert("An Email has been sent to: " + user.email);
        })
        .catch((error) => {
            console.error(error);
            alert('Failed to send password reset email. Please try again later.');
        });
});