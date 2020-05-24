const postGroup = document.getElementById("post-group");
const sendBtn = document.getElementById("post-btn");
const postTitle = document.getElementById("postTitle");
const postText = document.getElementById("postText");
const postImage = document.getElementById("postImage");

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
    // updateToFirestore();
    
    postGroup.innerHTML += postTemplate(postTitle.value, postText.value, URL.createObjectURL(postImage.files[0]));
};

