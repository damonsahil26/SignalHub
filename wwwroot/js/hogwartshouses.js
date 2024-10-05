let lbl_houseJoined = document.getElementById("lbl_houseJoined");


let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");

let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");


var connection = new signalR
    .HubConnectionBuilder()
    .withUrl("/hubs/hogwartshouses")
    .build();

// #region JoinHouseButtonEvents
btn_gryffindor.addEventListener("click", (e) => {
    connection.send("JoinHouse", "Gryffindor");
    e.preventDefault();
});

btn_slytherin.addEventListener("click", (e) => {
    connection.send("JoinHouse", "Slytherin");
    e.preventDefault();
});

btn_hufflepuff.addEventListener("click", (e) => {
    connection.send("JoinHouse", "Hufflepuff");
    e.preventDefault();
});

btn_ravenclaw.addEventListener("click", (e) => {
    connection.send("JoinHouse", "Ravenclaw");
    e.preventDefault();
});

//#endregion

// #region LeaveHouseButtonEvents
btn_un_gryffindor.addEventListener("click", (e) => {
    connection.send("LeaveHouse", "Gryffindor");
    e.preventDefault();
});

btn_un_slytherin.addEventListener("click", (e) => {
    connection.send("LeaveHouse", "Slytherin");
    e.preventDefault();
});

btn_un_hufflepuff.addEventListener("click", (e) => {
    connection.send("LeaveHouse", "Hufflepuff");
    e.preventDefault();
});

btn_un_ravenclaw.addEventListener("click", (e) => {
    connection.send("LeaveHouse", "Ravenclaw");
    e.preventDefault();
});

//#endregion

//#region SubscriptionStatus
connection.on("subscriptionStatus", (subscribedHouses, subscription, houseName) => {
    lbl_houseJoined.innerText = subscribedHouses;

    if (subscription == "JoinHouse") {
        switch (houseName) {
            case "Gryffindor":
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                break;

            case "Slytherin":
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                break;

            case "Hufflepuff":
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;

            case "Ravenclaw":
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;

            default:
                break;
        }

        toastr.success(`You have subscribed successfully : ${houseName}`);
    }
    else {
        switch (houseName) {
            case "Gryffindor":
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                break;

            case "Slytherin":
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                break;

            case "Hufflepuff":
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;

            case "Ravenclaw":
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;

            default:
                break;
        }

        toastr.success(`You have unsubscribed successfully : ${houseName}`);
    }
});
//#endregion

//#region Notify
connection.on("notifyOthers", (houseName) => {
    toastr.info(`Member has joined : ${houseName}`);
});
//#endregion

//#region TriggerNotification
connection.on("notifyHouses", (houseName) => {
    toastr.info(`Notification is triggered for : ${houseName}`);
});
//#endregion

//#region TriggerNotification
trigger_gryffindor.addEventListener("click", (e) => {
    connection.send("TriggerNotification", "Gryffindor");
    e.preventDefault();
});

trigger_slytherin.addEventListener("click", (e) => {
    connection.send("TriggerNotification", "Slytherin");
    e.preventDefault();
});

trigger_hufflepuff.addEventListener("click", (e) => {
    connection.send("TriggerNotification", "Hufflepuff");
    e.preventDefault();
});

trigger_ravenclaw.addEventListener("click", (e) => {
    connection.send("TriggerNotification", "Ravenclaw");
    e.preventDefault();
});
//#endregion

//#region ConnectionStart
connection.start().then(connectionFullfilled, connectionRejected);

function connectionFullfilled() {
    console.log("Hogwarts Houses connection fullfilled");
}

function connectionRejected() {
    console.log("Hogwarts Houses connection rejected");
}

//#endregion