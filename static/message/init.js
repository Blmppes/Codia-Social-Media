// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCgP7DuT88MMOpnfxnc8S7qz7QRgFu2HQI",
    authDomain: "learnfirebase-ffcc2.firebaseapp.com",
    databaseURL: "https://learnfirebase-ffcc2.firebaseio.com",
    projectId: "learnfirebase-ffcc2",
    storageBucket: "learnfirebase-ffcc2.appspot.com",
    messagingSenderId: "913781558865",
    appId: "1:913781558865:web:57332ee44625056b77b270"
};
firebase.initializeApp(firebaseConfig);
db = firebase.firestore();
const auth = firebase.auth();
const g_provider = new firebase.auth.GoogleAuthProvider();
const fb_provider = new firebase.auth.FacebookAuthProvider();

let user = "";
let hostUser = document.getElementById("host-user");
//Prevent user forgeting to sign out
$(document).ready(function() {
    auth.signOut();
});

window.onload = () => {
    my_interval = setInterval(() => {
        textList.scrollTop = textList.scrollHeight;
        clearInterval(my_interval);
    },1000);
}

setTimeout(() => {
    hostUser.innerHTML = "";
    user = "";
    console.log("ok")
},2000)
//Define "some"(many) variables
let inputMessage = document.getElementById("input-message");
let sendButton = document.getElementById("send-button");
let textList = document.getElementById("text-list");
let bottomGroup = document.getElementById("text-area");
let sendingStatus = document.getElementById("sending-status");

let importImageBtn = document.getElementById("import-image-btn");
let userImportedImg = document.querySelector('#myImg'); 
let imgWrapper = document.getElementById("img-wrap");

let registerEmail = document.getElementById("registerEmail");
let registerPassword= document.getElementById("registerPassword");
let registerBtn = document.getElementById("register-btn");
let registerForm = document.getElementById("registerModal");
let registerUserName = document.getElementById("ip-username");
let registerCheck = document.getElementById("registerCheck");

let loginEmail = document.getElementById("loginEmail");
let loginPassword= document.getElementById("loginPassword");
let loginBtn = document.getElementById("login-btn");
let loginForm = document.getElementById("loginModal");
let fbLoginBtn = document.getElementById("fb-login-btn");
let gLoginBtn = document.getElementById("g-login-btn");
let lgCloseBtn = document.getElementById("login-close-btn");

let emailRE = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
let collection = 'chat-app';
let typing = false;
let chattingUser = document.createElement("h1");
let canSendMessage = true;

//Import notification sound effect
const notificationSound = new Audio("sharp.mp3");