// Create a connection

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/deathlyhallows")
    .build();


connection.on("updateDeathlyHallowsVotes", (cloak, wand, stone) => {
    var cloakSpan = document.getElementById("cloakCounter");
    var wandSpan = document.getElementById("wandCounter");
    var stoneSpan = document.getElementById("stoneCounter");
    cloakSpan.innerText = cloak.toString();
    wandSpan.innerText = wand.toString();
    stoneSpan.innerText = stone.toString();
});


//Start Connection

connection.start().then(userCountConnectionFullfilled, userCountConnectionRejected);

function userCountConnectionFullfilled() {
    console.log("SignalR Connection Fullfilled");
    var cloakSpan = document.getElementById("cloakCounter");
    var wandSpan = document.getElementById("wandCounter");
    var stoneSpan = document.getElementById("stoneCounter");
    connection.invoke("GetVotesStatus").then((voteStatus) => {
        cloakSpan.innerText = voteStatus.cloak.toString();
        wandSpan.innerText = voteStatus.wand.toString();
        stoneSpan.innerText = voteStatus.stone.toString();
    });
}

function userCountConnectionRejected() {
    console.log("SignalR Connection Rejected");
}