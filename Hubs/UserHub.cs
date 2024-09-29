using Microsoft.AspNetCore.SignalR;

namespace SignalHub.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; }
        public static int TotalActiveUsers { get; set; }

        public override Task OnConnectedAsync()
        {
            TotalActiveUsers++;
            Clients.All.SendAsync("updateActiveUsers", TotalActiveUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalActiveUsers--;
            Clients.All.SendAsync("updateActiveUsers", TotalActiveUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }

        public async Task NewWindowLoaded()
        {
            TotalViews++;
            await Clients.All.SendAsync("updateTotalViews", TotalViews);
        }
    }
}
