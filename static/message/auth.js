//Authentication function
auth.onAuthStateChanged(user => {
    if(user) {
        setUpMessage(true, user);
    }else{
        setUpMessage(false, user);
    }
})

gLoginBtn.addEventListener("click", (e) => {
    firebase.auth().signInWithRedirect(g_provider).then(function(result) {
        return db.collection("users").doc(result.user.uid).set({
            username: result.user.displayName
        })
    }).then(() => {
        lgCloseBtn.click();
        alert("You have successfully signed up!");
    }).catch(function(error) {
        alert(error.message);
        console.log(error.message);
    });
})

fbLoginBtn.addEventListener("click", (e) => {
    firebase.auth().signInWithRedirect(fb_provider).then(function(result) {

    });
})

const signUp = () => {
    auth.createUserWithEmailAndPassword(registerEmail.value, registerPassword.value).then(cred => {
        return db.collection("users").doc(cred.user.uid).set({
            username: registerUserName.value
        })
    }).then(() => {
        alert("You have successfully signed up!")
        registerEmail.value = "";
        registerPassword = "";
    }).catch(function(error) {
        alert(error.message);
    });
}

const signIn = () => {
    auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value).then(cred => {
        alert("You have successfully logined");
        loginEmail.value = "";
        loginPassword.value = "";
    }).catch(function(error) {
        alert(error.message);
    });
}

registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(registerCheck.checked == false){
        alert("Please agree with terms and licenses");
        return;
    }else if(registerEmail.value.toLowerCase() != registerEmail.value){
        alert("All letters must be in lowercase");
        return;
    }
    signUp();
})

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signIn();
})

window.addEventListener("keypress", (e)=>{
    if(e.keyCode == 13 && inputMessage.value != "" && user != ""){
        updateToFireBase()
    }else if(e.keyCode == 13 && (registerEmail.value != "" && registerPassword.value != "")){
        if(registerCheck.checked == false){
            alert("Please agree with terms and licenses");
            return;
        }else if(registerEmail.value.toLowerCase() != registerEmail.value){
            alert("All letters must be in lowercase");
            return;
        }
        registerBtn.click();
    }else if(e.keyCode == 13 && (loginEmail.value != "" && loginPassword.value != "")){
        loginBtn.click();
    };
})

document.getElementById("logout-btn").addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        alert("You have successfully signed out!")
    })
    .catch(function(error) {
        alert(error.message);
    });
})

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    auth.signOut();
});