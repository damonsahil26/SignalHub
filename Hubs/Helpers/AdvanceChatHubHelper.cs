namespace SignalHub.Hubs.Helpers
{
    public static class AdvanceChatHubHelper
    {
        public static Dictionary<string, List<string>> OnlineUsers = new();

        public static bool HasUserConnection(string userId, string connectionId)
        {
            if (!string.IsNullOrEmpty(userId) && !string.IsNullOrEmpty(connectionId))
            {
                if (OnlineUsers.ContainsKey(userId))
                {
                   return OnlineUsers[userId].Any(x=>x.Contains(connectionId));
                }
            }

            return false;
        }

        public static bool HasUserAlreadyConnected(string userId)
        {
            if (!string.IsNullOrEmpty(userId))
            {
                if (OnlineUsers.ContainsKey(userId))
                {
                    return true;
                }
            }

            return false;
        }

        public static void AddUserConnection(string userId, string connectionId)
        {
            if (!string.IsNullOrEmpty(userId) && !HasUserConnection(userId, connectionId))
            {
                    if (OnlineUsers.ContainsKey(userId))
                    {
                        OnlineUsers[userId].Add(connectionId);
                    }
                    else
                    {
                        OnlineUsers.Add(userId, new List<string> { connectionId });
                    }
            }
        }

        public static List<string> GetOnlineUsers()
        {
            return OnlineUsers.Keys.ToList();
        }   
    }
}
