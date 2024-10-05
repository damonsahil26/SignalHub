let notificationDropDown = document.getElementById("messageList");
let notificationCounter = document.getElementById("notificationCounter");
let submitNotificationBtn = document.getElementById("sendButton");
let notificationInput = document.getElementById("notificationInput");

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/notifications")
    .build();

submitNotificationBtn.addEventListener("click", (e) => {
    var addedNotificationText = notificationInput.value;
    if (addedNotificationText !== "") {
        connection.send("AddNotification", addedNotificationText);
        $("#notificationInput").val("");
    }
    e.preventDefault();
});

connection.on("setNotificationData", (notificationList, notificationCount) => {
    notificationCounter.innerText = "(" + notificationCount + ")";
    $("#messageList").empty();
    for (var i = 0; i < notificationList.length; i++) {

        // Create DOM element
        let childNode = document.createElement('li');

        // Set content to current element
        childNode.innerHTML = notificationList[i];

        // Add DOM Node to list
        notificationDropDown.appendChild(childNode);
    }
});
    
function connectionFullfilled() {
    console.log("Notification connection fullfilled");
    connection.invoke("GetNotificationCount").then((counter) => {
        notificationCounter.innerText = "(" + counter +")";
    });

    connection.invoke("GetNotificationList").then((notificationList) => {
        for (var i = 0; i < notificationList.length; i++) {

            // Create DOM element
            let childNode = document.createElement('li');

            // Set content to current element
            childNode.innerHTML = notificationList[i];

            // Add DOM Node to list
            notificationDropDown.appendChild(childNode);
        }
    });
}

function connectionRejected() {
    console.log("Notification connection rejected");
}

connection.start().then(connectionFullfilled, connectionRejected);