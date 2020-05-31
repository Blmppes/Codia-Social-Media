const postTemplate = (data, postimage, id) => {
    let extension = postimage.split("?")[0];
    extension = extension.substring(extension.length - 3, extension.length)
    if (extension == "png" || extension == "jpg" || extension == "jpeg"){
        return `
            <div class="card posts">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.content}</p>
                </div>
                <img class="card-img-top" src="${postimage}" alt="Card image cap" width="100%" height="700">
                <div id="interact-btns">
                    <button class="btn btn-primary like" onclick="updateToFirestore('${id}', 'like')"><span class="badge badge-secondary" id="like-${id}">${data.like}</span>Like</button>
                    <button class="btn btn-grey comments" onclick="switchComments('${id}')"><span class="badge badge-secondary" id="comment-${id}">0</span>Comment</button>
                </div>
                <div id="comment-box-${id}" class="comments-box">
                    <ul class="comment-list" id="comment-list-${id}">
    
                    </ul>
                    <div class="input-group">
                        <input type="text" id="comment-text-${id}" class="form-control" placeholder="Text...."/>
                        <div class="input-group-append">
                            <button class="btn btn-warning" id="send-button-${id}" onclick="updateToFirestore('${id}', 'comment')" title="Click to send your message"><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }else if(extension == "mp4" || extension == "avi"){
        return `
            <div class="card posts">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.content}</p>
                </div>
                <video width="100%" height="700" controls>
                    <source src="${postimage}" type="video/mp4">
                    <source src="${postimage}"" type="video/avi">
                    Your browser does not support the video tag.
                </video>
                <div id="interact-btns">
                    <button class="btn btn-primary like" onclick="updateToFirestore('${id}', 'like')"><span class="badge badge-secondary" id="like-${id}">${data.like}</span>Like</button>
                    <button class="btn btn-grey comments" onclick="switchComments('${id}')"><span class="badge badge-secondary" id="comment-${id}">0</span>Comment</button>
                </div>
                <div id="comment-box-${id}" class="comments-box">
                    <ul class="comment-list" id="comment-list-${id}">
    
                    </ul>
                    <div class="input-group">
                        <input type="text" id="comment-text-${id}" class="form-control" placeholder="Text...."/>
                        <div class="input-group-append">
                            <button class="btn btn-warning" id="send-button-${id}" onclick="updateToFirestore('${id}', 'comment')" title="Click to send your message"><i class="fas fa-paper-plane"></i></button>
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
    let currentComments = document.getElementById(`comment-${id}`);
    console.log(currentCommentList)
    let html = ``;
    let commentsnb = 0;

    const keys = Object.keys(data)
        for (const key of keys) {
            if(key.substring(0, 8) == "comments"){
                html += `<li><h1 id="comment-${id}" class="comment">${data[key]}</h1></li>`;
                commentsnb += 1;
            }
        }
 
    //<li><h1 id="comment-${id}" class="comment">${data}</h1></li>
    currentCommentList.innerHTML = html;
    currentComments.innerHTML = commentsnb;
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
        like: 0
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
        let string = `comments-${random}`;
        db.collection("posts").doc(docId).update({
            [string] : val
        });
    }
    
}

db.collection('posts').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            var starsRef = firebase.storage().ref('pictures/'+ change.doc.data().image_url);

            starsRef.getDownloadURL().then(function(url) {
                postGroup.innerHTML += postTemplate(change.doc.data(), url, change.doc.id);
                updateComment(change.doc.id, change.doc.data());
            }).catch(function(error) {  
                console.log(error);
            });
            
        }else if(change.type == 'modified'){
            updateLikeButton(change.doc.id, change.doc.data().like);
            updateComment(change.doc.id, change.doc.data());
        }
        
    })
})

