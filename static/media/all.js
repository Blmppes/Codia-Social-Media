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
                <img class="card-img-top" src="${postimage}" alt="Card image cap" width="100%" height="700">
                <div id="interact-btns">
                    <button class="btn btn-primary like" onclick="updateToFirestore('${id}')"><span class="badge badge-secondary" id="like-${id}">${like}</span>Like</button>
                    <button class="btn btn-grey comments" onclick="switchComments('${id}')"><span class="badge badge-secondary" id="comment-${id}">0</span>Comment</button>
                </div>
                <div id="comment-box-${id}" class="comments-box">
                    <ul class="comment-list">
                        <li><h1 id="123" class="comment"> This is cool ssssssssssssssssssssssssssssssssss!</h1></li>
                        <li><h1 id="123" class="comment"> This is cool ssssssssssssssssssssssssssssssssss!</h1></li>
                    </ul>
                    <input type="text" id="comment-text-${id}" class="form-control" placeholder="Text...."/>
                    <div class="input-group-append">
                        <button class="btn btn-warning" id="send-button-${id}" onclick="updateToFireBase()" title="Click to send your message"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        `
    }else if(extension == "mp4" || extension == "avi"){
        return `
            <div class="card posts">
                <div class="card-body">
                    <h5 class="card-title">${posttitle}</h5>
                    <p class="card-text">${postcontent}</p>
                </div>
                <video width="100%" height="700" controls>
                    <source src="${postimage}" type="video/mp4">
                    <source src="${postimage}"" type="video/avi">
                    Your browser does not support the video tag.
                </video>
                <div id="interact-btns">
                    <button class="btn btn-primary like" onclick="updateToFirestore('${id}', 'like')"><span class="badge badge-secondary" id="like-${id}">${like}</span>Like</button>
                    <button class="btn btn-grey comments" onclick="switchComments('${id}')"><span class="badge badge-secondary" id="comment-${id}">0</span>Comment</button>
                </div>
                <div id="comment-box-${id}" class="comments-box">
                    <ul class="comment-list" id="comment-list-${id}">
    
                    </ul>
                    <div class="input-group">
                        <input type="text" id="comment-text-${id}" class="form-control" placeholder="Text...."/>
                        <div class="input-group-append">
                            <button class="btn btn-warning" id="send-button-${id}" onclick="updateToFireBase('${id}', 'comment')" title="Click to send your message"><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    
}

const updateLikeButton = (id, data) => {
    let currentLikeBtn = document.getElementById(`like-${id}`);

    currentLikeBtn.innerHTML = data;
}

const updateComment = (id, data) => {
    let currentCommentList = document.getElementById(`comment-list-${id}`);

    let html = `<li><h1 id="comment-${id}" class="comment">${data}</h1></li>`

    currentCommentList.innerHTML = data;
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
    }, 4000)
    
};

const switchComments = (id) => {
    
    let commentBox = document.getElementById(`comment-box-${id}`)
    console.log(commentBox.style.display)
    if(commentBox.style.display == ""){
        commentBox.style.display = "block"
    }else if(commentBox.style.display == "block"){
        commentBox.style.display = ""
    }
}











const addToFirestore = (title, text, imageURL) => {
    db.collection("posts").add({
        title: title,
        content: text,
        image_url: imageURL,
        like: 0,
        comments: {}
    })
    .then(function(docRef) {
        console.log(this)
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

const updateToFirestore = (docId, type) => {
    if(type == "like"){
        db.collection("posts").doc(docId).update({
            like: firebase.firestore.FieldValue.increment(1)
        })
    }else if(type == "comment"){
        let val = document.getElementById(`comment-text-${docId}`).value;
        let random = Math.floor(Math.random() * 10000000);
        db.collection("posts").doc(docId).update({
            "comments.random": val
        });
    }
    
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
            updateComment(change.doc.id, change.doc.data().comments);
        }
        
    })
})

