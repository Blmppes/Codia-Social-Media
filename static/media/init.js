const postGroup = document.getElementById("post-group");
const sendBtn = document.getElementById("post-btn");
const postTitle = document.getElementById("postTitle");
const postText = document.getElementById("postText");
const postImage = document.getElementById("postImage");



// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyABHdoDXnbnxlaULhXdvVjtqQhvVkMG6IM",
    authDomain: "codia-social-media-86b25.firebaseapp.com",
    databaseURL: "https://codia-social-media-86b25.firebaseio.com",
    projectId: "codia-social-media-86b25",
    storageBucket: "gs://codia-social-media-86b25.appspot.com",
    messagingSenderId: "525228724257",
    appId: "1:525228724257:web:53154ddff19bfc76b35360"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
