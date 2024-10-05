using Microsoft.AspNetCore.SignalR;

namespace SignalHub.Hubs
{
    public class HogwartsHousesHub : Hub
    {
        public static List<string> HousesJoined = new List<string>();

        public async Task JoinHouse(string houseName)
        {
            if (!HousesJoined.Contains(Context.ConnectionId + ":" + houseName))
            {
                HousesJoined.Add(Context.ConnectionId + ":" + houseName);

                string houseList = string.Empty;

                foreach (string house in HousesJoined)
                {
                    if (house.Contains(Context.ConnectionId))
                    {
                        houseList += house.Split(":")[1] + " ";
                    }
                }

                await Clients.Caller.SendAsync("subscriptionStatus" , houseList, nameof(JoinHouse) , houseName);

                await Clients.Others.SendAsync("notifyOthers", houseName);

                await Groups.AddToGroupAsync(Context.ConnectionId, houseName);
            }
        }

        public async Task LeaveHouse(string houseName)
        {
            if (HousesJoined.Contains(Context.ConnectionId + ":" + houseName))
            {
                HousesJoined.Remove(Context.ConnectionId + ":" + houseName);

                string houseList = string.Empty;

                foreach (string house in HousesJoined)
                {
                    if (house.Contains(Context.ConnectionId)){
                        houseList += house.Split(":")[1] + " ";
                    }
                }

                await Clients.Caller.SendAsync("subscriptionStatus", houseList, nameof(LeaveHouse), houseName);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, houseName);
            }
        }

        public async Task TriggerNotification(string houseName)
        {
            await Clients.Group(houseName).SendAsync("notifyHouses", houseName);
        }
    }
}
