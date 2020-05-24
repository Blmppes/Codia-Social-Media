setInterval(() => {
    if(inputMessage.value == ""){
        if(typing){
            bottomGroup.removeChild(chattingUser);
        }    
        sendButton.disabled = true;
        typing = false;
    }else{
        if(!typing){
            chattingUser.innerHTML = `${user} is typing...`;
            chattingUser.className = 'chatting-user';

            bottomGroup.insertBefore(chattingUser, bottomGroup.children[2]);
            typing = true;
        }
        if(user != ""){
            sendButton.disabled = false;
        }
    }
},100);

//Some function
importImageBtn.addEventListener('change', function() {
    if (this.files && this.files[0]) { 
        let newImage = document.createElement("img");
        newImage.src = URL.createObjectURL(this.files[0]);
        newImage.style.maxWidth = "100px";
        newImage.style.maxHeight = "80px";
        newImage.id = "pic" + newImage.src;

        let newDeleteBtn = document.createElement("button");
        newDeleteBtn.className = "btn btn-danger btn-circle btn-sm";
        newDeleteBtn.style.zIndex = '1';
        newDeleteBtn.innerHTML = "x";
        newDeleteBtn.style.maxHeight = "40px";
        newDeleteBtn.style.padding = '5px';
        newDeleteBtn.style.marginRight = "5px";
        newDeleteBtn.id = "del" + newImage.src;

        imgWrapper.append(newImage);
        imgWrapper.append(newDeleteBtn);

        newDeleteBtn.addEventListener("click", (e) => {
            let delId = "pic" + e.target.id.substr(3);
            document.getElementById(delId).remove();
            e.target.remove();
        })
    }
});

const updateToFireBase = () => {
    let now = new Date();
    let time_now = `${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    let extra = now.getTime();
    db.collection(collection).add({
        sendUser: user,
        message: inputMessage.value,
        time: time_now,
        extra_time: extra
    })
    sendingStatus.innerHTML = "Sended";
}

const writeMessage = (message, time, sendUser, last) =>{
    if(!canSendMessage){
        return;
    }
    let messageChild = document.createElement("li");
    let messageUser = document.createElement("h1");
    let messageText = document.createElement("h1");
    let messageTime = document.createElement("h9");
    let lastUserMessage = document.getElementById("last-user-message");

    messageUser.innerHTML = sendUser;
    messageText.innerHTML = message;
    messageTime.innerHTML = time;
    lastUserMessage.innerHTML = last;
    if(sendUser != user){
        notificationSound.play();
        sendingStatus.innerHTML = "";
        messageUser.className = "lead partner-message-user";
        messageText.className = "partner-message";
        messageTime.className = "lead partner-message-time";
    }else{
        sendingStatus.innerHTML = "Partners received";
        messageUser.className = "lead message-user";
        messageText.className = "message";
        messageTime.className = "lead message-time";
    }
    
    textList.appendChild(messageChild);
    messageChild.appendChild(messageUser);
    messageChild.appendChild(messageText);
    messageChild.appendChild(messageTime);

    inputMessage.value = "";

    textList.scrollTop = textList.scrollHeight;
}
