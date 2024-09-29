// Create a connection

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/totalviews")
    .build();

// Connect to method that Hub invokes, aka. receive notification from hub

connection.on("updateTotalViews", (value) => {
    var totalViewsSpan = document.getElementById("totalViews");
    totalViewsSpan.innerText = "Total Views : " + value.toString();
});

connection.on("updateActiveUsers", (value) => {
    var totalActiveUsersSpan = document.getElementById("totalActiveUsers");
    totalActiveUsersSpan.innerText = "Total Active Users : " + value.toString();
});

//invoke hub method, aka. send notificationsToHub

function newWindowLoadedOnClient() {
    connection.send("NewWindowLoaded");
}

//Start Connection

connection.start().then(userCountConnectionFullfilled, userCountConnectionRejected);

function userCountConnectionFullfilled() {
    console.log("SignalR Connection Fullfilled");
    newWindowLoadedOnClient();
}

function userCountConnectionRejected() {
    console.log("SignalR Connection Rejected");
}