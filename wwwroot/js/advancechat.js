//#region HtmlElements
var btnCreateRoom = document.getElementById("btnCreateRoom");
var createRoomName = document.getElementById("createRoomName");
var ddlDelRoom = document.getElementById("ddlDelRoom");
var btnDeleteRoom = document.getElementById("btnDeleteRoom");
var ddlSelRoom = document.getElementById("ddlSelRoom");
//#endregion

var connection = new signalR.HubConnectionBuilder().withUrl("/hubs/advancechat").build();

connection.on("NotifyUserConnected", (userName, userId, hasUserAlreadyConnected) => {
    if (!hasUserAlreadyConnected) {
        addMessage(`${userName} has joined the chat..`);
    }
});

connection.on("NotifyUserDisconnected", (userName, hasUserAlreadyConnected) => {
    if (!hasUserAlreadyConnected) {
        addMessage(`${userName} has disconnected from the chat..`);
    }
});

function onCreateRoomClicked(e) {
    console.log(e.value);
}

function addMessage(message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = message;
}

function addnewRoom(maxRoom) {

    let createRoomName = document.getElementById('createRoomName');

    var roomName = createRoomName.value;

    if (roomName == null && roomName == '') {
        return;
    }

    /*POST*/
    $.ajax({
        url: '/ChatRooms/PostChatRoom',
        dataType: "json",
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ id: 0, name: roomName }),
        async: true,
        processData: false,
        cache: false,
        success: function (json) {

            /*ADD ROOM COMPLETED SUCCESSFULLY*/
            connection.invoke("SendAddRoomMessage", maxRoom, json.id, json.name);
            createRoomName.value = '';


        },
        error: function (xhr) {
            alert('error');
        }
    })
}

function deletenewRoom() {

    let deleteRoom = document.getElementById('ddlDelRoom');

    var roomName = deleteRoom.options[deleteRoom.selectedIndex].text;

    if (roomName == null && roomName == '') {
        return;
    }

    let text = `Do you want to delete ${roomName} room`;

    if (confirm(text) == false) {
        return;
    }

    let roomId = deleteRoom.value;

    /*POST*/
    $.ajax({
        url: `/ChatRooms/DeleteChatRoom/${roomId}`,
        dataType: "json",
        type: "DELETE",
        contentType: 'application/json;',
        async: true,
        processData: false,
        cache: false,
        success: function (json) {

            /*ADD ROOM COMPLETED SUCCESSFULLY*/
            connection.invoke("SendDeleteRoomMessage", json.deleted, json.selected, roomName);
            fillRoomDropDown();

        },
        error: function (xhr) {
            alert('error');
        }
    })
}


document.addEventListener('DOMContentLoaded', (event) => {
    fillRoomDropDown();
    fillUserDropDown();
})


function fillUserDropDown() {

    $.getJSON('/ChatRooms/GetChatUser')
        .done(function (json) {

            var ddlSelUser = document.getElementById("ddlSelUser");

            ddlSelUser.innerText = null;

            json.forEach(function (item) {
                var newOption = document.createElement("option");

                newOption.text = item.userName;//item.whateverProperty
                newOption.value = item.id;
                ddlSelUser.add(newOption);


            });

        })
        .fail(function (jqxhr, textStatus, error) {

            var err = textStatus + ", " + error;
            console.log("Request Failed: " + jqxhr.detail);
        });

}

function fillRoomDropDown() {

    $.getJSON('/ChatRooms/GetChatRoom')
        .done(function (json) {
            var ddlDelRoom = document.getElementById("ddlDelRoom");
            var ddlSelRoom = document.getElementById("ddlSelRoom");

            ddlDelRoom.innerText = null;
            ddlSelRoom.innerText = null;

            json.forEach(function (item) {
                var newOption = document.createElement("option");

                newOption.text = item.name;
                newOption.value = item.id;
                ddlDelRoom.add(newOption);


                var newOption1 = document.createElement("option");

                newOption1.text = item.name;
                newOption1.value = item.id;
                ddlSelRoom.add(newOption1);

            });

        })
        .fail(function (jqxhr, textStatus, error) {

            var err = textStatus + ", " + error;
            console.log("Request Failed: " + jqxhr.detail);
        });

}

connection.on("NotifyAddRoomMessage", (userId, username, maxRoom, roomId, roomName) => {
    addMessage(`${username} has created new room : ${roomName}`);
    fillRoomDropDown();
});

connection.on("NotifyDeleteRoomMessage", (userId, username, roomname, deleted, selected) => {
    addMessage(`${username} has deleted room : ${roomname}`);
    fillRoomDropDown();
});


function sendPublicMessage() {
    var txtPublicMessage = document.getElementById("txtPublicMessage");
    var ddlSelRoom = document.getElementById("ddlSelRoom");

    let roomId = ddlSelRoom.value;

    var roomName = ddlSelRoom.options[ddlSelRoom.selectedIndex].text;
    var message = txtPublicMessage.value;

    connection.send("SendPublicMessage", Number(roomId), roomName, message);
}

function sendPrivateMessage() {
    var txtPrivateMessage = document.getElementById("txtPrivateMessage");
    var ddlSelUser = document.getElementById("ddlSelUser");

    let userId = ddlSelUser.value;

    var userName = ddlSelUser.options[ddlSelUser.selectedIndex].text;
    var message = txtPrivateMessage.value;

    connection.send("SendPrivateMessage", userId, userName, message);
}

connection.on("SendPublicMessage", (userId, username, roomId, roomName, message) => {
    addMessage(`Public Message : ${roomName} ${username} - "${message}"`);
});


connection.on("SendPrivateMessage", (userId, username,message) => {
    addMessage(`Message By: ${username} - "${message}"`);
});


//#region ConnectionPromise

connection.start().then(advanceChatConnectionFullfilled, advanceChatConnectionRejected);

function advanceChatConnectionFullfilled() {
    console.log("Advance Chat Connection Fullfilled");
}

function advanceChatConnectionRejected() {
    console.log("Advance Chat Connection Rejected");
}
//#endregion