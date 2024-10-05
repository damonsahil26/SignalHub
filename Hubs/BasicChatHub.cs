using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SignalHub.Data;

namespace SignalHub.Hubs
{
    public class BasicChatHub : Hub
    {
        private readonly ApplicationDbContext _dbContext;

        public BasicChatHub(Data.ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [Authorize]
        public async Task SendMessage(string chatMessage, string sender, string receiver)
        {
            if (string.IsNullOrEmpty(receiver))
            {
                await Clients.All.SendAsync("DisplayMessage", chatMessage, sender);
            }

            else
            {
                await SendPrivateMessage(chatMessage, sender, receiver);
            }
        }

        private async Task SendPrivateMessage(string chatMessage, string sender, string receiver)
        {
            try
            {
                var receiverId = _dbContext.Users.FirstOrDefault(u => u.Email == receiver)?.Id;

                if (receiverId != null)
                {
                    await Clients.User(receiverId).SendAsync("DisplayMessage", chatMessage, sender);
                }
                else
                {
                    //Show toaster no user found
                    var message = "No such user found";
                    var senderId = _dbContext.Users.FirstOrDefault(u => u.Email == sender)?.Id;
                    await Clients.User(senderId).SendAsync("DisplayErrorMessage", receiver, message);
                }
            }
            catch (Exception)
            {
                var message = "User not logged in.";
                var senderId = _dbContext.Users.FirstOrDefault(u => u.Email == sender)?.Id;
                await Clients.User(senderId!).SendAsync("DisplayErrorMessage", sender, message);
            }
        }
    }
}
