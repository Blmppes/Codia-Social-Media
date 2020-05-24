//Firestore function
const setUpMessage = (state, userName) => {
    if(state){
        canSendMessage = true;

        db.collection("users").doc(userName.uid).get().then(doc => {
            hostUser.innerHTML = doc.data().username
            user = doc.data().username
        })
        setTimeout(() => {
            db.collection("chat-app").orderBy("extra_time").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    writeMessage(doc.data().message, doc.data().time, doc.data().sendUser, doc.data().message);
                });
            });
        },1500)
    } else{
        hostUser.innerHTML = "";
        user = '';
        $("#text-list").empty();
        canSendMessage = false;
    }
}
db.collection('chat-app').orderBy("extra_time").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added' || change.type == 'modified'){
            writeMessage(change.doc.data().message, change.doc.data().time, change.doc.data().sendUser, change.doc.data().message);
        }
    })
})