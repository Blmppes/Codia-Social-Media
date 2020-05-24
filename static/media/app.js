const postTemplate = (posttitle, postcontent, postimage) => {
    console.log(postimage)
    return `
    <div class="card" style="width: 100%;height: 500px;margin:20px 0px 100px 0px; border-radius:10px">
        <div class="card-body">
            <h5 class="card-title">${posttitle}</h5>
            <p class="card-text">${postcontent}</p>
        </div>
        <img class="card-img-top" src="${postimage}" alt="Card image cap">
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
        updateToFirestore(postTitle.value, postText.value, file.name);
    }, 2000)
    
};

