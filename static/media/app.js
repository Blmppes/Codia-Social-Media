const postTemplate = (posttitle, postcontent, postimage, like, id) => {
    let ide = String(id);
    return `
    <div class="card posts">
        <div class="card-body">
            <h5 class="card-title">${posttitle}</h5>
            <p class="card-text">${postcontent}</p>
        </div>
        <img class="card-img-top" src="${postimage}" alt="Card image cap">
        <button class="btn btn-primary like" onclick="updateToFirestore(${ide})"><span class="badge badge-secondary">${like}</span></h1>Like</button>
    </div>
    `
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
    }, 2000)
    
};

