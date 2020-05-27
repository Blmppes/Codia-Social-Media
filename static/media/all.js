const postTemplate = (posttitle, postcontent, postimage, like, id) => {
    let extension = postimage.split("?")[0];
    extension = extension.substring(extension.length - 3, extension.length)
    console.log(extension)
    if (extension == "png" || extension == "jpg" || extension == "jpeg"){
        return `
            <div class="card posts">
                <div class="card-body">
                    <h5 class="card-title">${posttitle}</h5>
                    <p class="card-text">${postcontent}</p>
                </div>
                <img class="card-img-top" src="${postimage}" alt="Card image cap">
                <button class="btn btn-primary like" onclick="updateToFirestore('${id}')"><span class="badge badge-secondary" id="like-${id}">${like}</span></h1>Like</button>
            </div>
        `
    }else if(extension == "mp4" || extension == "avi"){
        return `
            <div class="card posts">
                <div class="card-body">
                    <h5 class="card-title">${posttitle}</h5>
                    <p class="card-text">${postcontent}</p>
                </div>
                <video width="100%" height="800" controls>
                    <source src="${postimage}" type="video/mp4">
                    <source src="${postimage}"" type="video/avi">
                    Your browser does not support the video tag.
                </video>
                <button class="btn btn-primary like" onclick="updateToFirestore('${id}')"><span class="badge badge-secondary" id="like-${id}">${like}</span></h1>Like</button>
            </div>
        `
    }
    
}

const updateLikeButton = (id, data) => {
    let currentLikeBtn = document.getElementById(`like-${id}`);

    currentLikeBtn.innerHTML = data;
}

const sendNewPost = () => {
    
    let file = postImage.files[0];

    let storageRef = firebase.storage().ref('pictures/' + file.name);

    let task = storageRef.put(file);

    task.on('state_changed',
        function progress(snapshot){},

        function error(err){
            console.log(err);
        },

        function complete(){
            console.log("completed")
        }
    )
    
    setTimeout(() => {
        addToFirestore(postTitle.value, postText.value, file.name);
    }, 5000)
    
};











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
    db.collection("posts").doc(docId).update({
        like: firebase.firestore.FieldValue.increment(1)
    })
}

db.collection('posts').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            var starsRef = firebase.storage().ref('pictures/'+ change.doc.data().image_url);

            starsRef.getDownloadURL().then(function(url) {
                postGroup.innerHTML += postTemplate(change.doc.data().title, change.doc.data().content, url, change.doc.data().like, change.doc.id);
            }).catch(function(error) {  
                console.log(error);
            });
        }else if(change.type == 'modified'){
            updateLikeButton(change.doc.id, change.doc.data().like);
        }
        
    })
})

