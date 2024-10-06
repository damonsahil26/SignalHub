using Microsoft.AspNetCore.SignalR;
using SignalHub.Data;
using SignalHub.Hubs.Helpers;
using System.Security.Claims;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SignalHub.Hubs
{
    public class AdvanceChatHub : Hub
    {
        private readonly ApplicationDbContext _dbContext;

        public AdvanceChatHub(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override Task OnConnectedAsync()
        {
            var userId = Context?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!string.IsNullOrEmpty(userId))
            {
                var username = _dbContext.Users.FirstOrDefault(x => x.Id == userId)?.UserName;
                Clients.Users(AdvanceChatHubHelper.GetOnlineUsers()).SendAsync("NotifyUserConnected", username, userId, AdvanceChatHubHelper.HasUserAlreadyConnected(userId));
                AdvanceChatHubHelper.AddUserConnection(userId, Context.ConnectionId);
            }
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var userId = Context?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!string.IsNullOrEmpty(userId))
            {
                if (AdvanceChatHubHelper.HasUserConnection(userId, Context.ConnectionId))
                {
                    var userConnectionIds = AdvanceChatHubHelper.OnlineUsers[userId];
                    userConnectionIds.Remove(Context.ConnectionId);

                    AdvanceChatHubHelper.OnlineUsers.Remove(userId);

                    if (userConnectionIds.Any())
                    {
                        AdvanceChatHubHelper.OnlineUsers.Add(userId, userConnectionIds);
                    }

                    if (userId != null)
                    {
                        var username = _dbContext.Users.FirstOrDefault(x=>x.Id == userId)?.UserName;
                        Clients.Users(AdvanceChatHubHelper.GetOnlineUsers()).SendAsync("NotifyUserDisconnected", username, AdvanceChatHubHelper.HasUserAlreadyConnected(userId));
                    }
                }
            }
            return base.OnDisconnectedAsync(exception);
        }

        public void SendAddRoomMessage(int maxRoom, int roomId, string roomName)
        {
            var userId = Context?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            var username = _dbContext.Users.FirstOrDefault(x => x.Id == userId)?.UserName;
            Clients.All.SendAsync("NotifyAddRoomMessage", userId, username, maxRoom, roomId, roomName);
        } 
        
        public void SendDeleteRoomMessage(int deleted, int selected, string roomname)
        {
            var userId = Context?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            var username = _dbContext.Users.FirstOrDefault(x => x.Id == userId)?.UserName;
            Clients.All.SendAsync("NotifyDeleteRoomMessage", userId, username,roomname, deleted, selected);
        }

        public void SendPublicMessage(int roomId, string roomName, string message)
        {
            var userId = Context?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            var username = _dbContext.Users.FirstOrDefault(x => x.Id == userId)?.UserName;
            Clients.All.SendAsync("SendPublicMessage" , userId, username, roomId, roomName, message);
        }  
        
        public void SendPrivateMessage(string userId, string userName, string message)
        {
            var username = _dbContext.Users.FirstOrDefault(x => x.Id == userId)?.UserName;
            Clients.User(userId).SendAsync("SendPrivateMessage" , userId, username, message);
        }
    }
}
