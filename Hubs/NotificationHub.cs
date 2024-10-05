using Microsoft.AspNetCore.SignalR;

namespace SignalHub.Hubs
{
    public class NotificationHub : Hub
    {
        public static List<string> NotificationsList = new List<string>();

        public int GetNotificationCount()
        {
            return NotificationsList.Count;
        }

        public List<string> GetNotificationList()
        {
            return NotificationsList;
        }

        public async Task AddNotification(string notificationText)
        {
            if (!string.IsNullOrEmpty(notificationText))
            {
                NotificationsList.Add(notificationText);
            }

            await Clients.All.SendAsync("setNotificationData", NotificationsList, NotificationsList.Count);
        }
    }
}
