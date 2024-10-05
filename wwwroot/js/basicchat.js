let sendMessageBtn = document.getElementById("sendMessage");
let senderEmailInput = document.getElementById("senderEmail");
let receiverEmailInput = document.getElementById("receiverEmail");
let chatMessageInput = document.getElementById("chatMessage");

const connection = new signalR.HubConnectionBuilder().withUrl("/hubs/basicchat").build();

sendMessageBtn.addEventListener("click", (e) => {
    let receiverEmailInputVal = receiverEmailInput.value;
    let senderEmailInputVal = senderEmailInput.value;
    let chatMessageInputVal = chatMessageInput.value;
    connection.send("SendMessage", chatMessageInputVal, senderEmailInputVal, receiverEmailInputVal);
    e.preventDefault();
});

connection.on("DisplayMessage", (message, sender) => {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${sender} : ${message}`;
});

connection.on("DisplayErrorMessage", (email, message) => {
    toastr.error(`${message} : ${email}`);
})

connection.start().then(basicChatConnectionFullfilled, basicChatConnectionRejected);

function basicChatConnectionFullfilled() {
    console.log("Basic Chat Connection Fullfilled");
}

function basicChatConnectionRejected() {
    console.log("Basic Chat Connection Rejected");
}
