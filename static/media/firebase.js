const addToFirestore = (title, text, imageURL) => {
    db.collection("posts").add({
        title: title,
        content: text,
        image_url: imageURL,
        like: 0
    })
    .then(function(docRef) {
        console.log(this)
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

const updateToFirestore = (docId) => {
    // db.collection("posts").doc(docId).set({
    //     like: firebase.firestore.FieldValue.increment(1)
    // })
}

db.collection('posts').onSnapshot(snapshot => {
    console.log("changed")
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added' || change.type == 'modified'){
            console.log(change.doc.data().image_url)
            var starsRef = firebase.storage().ref('pictures/'+ change.doc.data().image_url);

            starsRef.getDownloadURL().then(function(url) {
                postGroup.innerHTML += postTemplate(change.doc.data().title, change.doc.data().content, url, change.doc.data().like, change.doc.id);
            }).catch(function(error) {  
                console.log(error);
            });

        }
        
    })
})