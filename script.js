import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDoc, getDocs, addDoc, deleteDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
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
const auth = getAuth(app);

// Authentifizierungsstatus beibehalten
onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in with UID:", user.uid);
    } else {
      console.log("No user is signed in.");
    }
}); 
    
document.getElementById('save-password-btn').addEventListener('click', () => {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;

    // Authenticate user
    const user = auth.currentUser;
    const credentials = EmailAuthProvider.credential(user.email, currentPassword);

    reauthenticateWithCredential(user, credentials)
        .then(() => {
            // Passwords match, update password
            user.updatePassword(newPassword)
                .then(() => {
                    alert('Password updated successfully!');
                })
                .catch(error => {
                    console.error(error);
                    alert('Failed to update password. Please try again later.');
                });
        })
        .catch(error => {
            console.error(error);
            alert('Current password is incorrect. Please try again.');
        });
});

document.getElementById('reset-password-link').addEventListener('click', () => {
    // Implement password reset functionality here
    // This could redirect the user to a password reset page
    // Or trigger the Firebase password reset email
    // Example: window.location.href = 'reset_password.html';
    alert('Implement password reset functionality here');
});

document.getElementById('delete-account-btn').addEventListener('click', () => {
    // Delete account from Realtime Database
    const user = auth.currentUser;
    database.ref('users/' + user.uid).remove()
        .then(() => {
            // Sign out and redirect user
            auth.signOut().then(() => {
                // Sign-out successful.
                window.location.href = 'goodbye.html';
            }).catch((error) => {
                // An error happened.
                console.error(error);
            });
        })
        .catch(error => {
            console.error(error);
            alert('Failed to delete account. Please try again later.');
        });
});