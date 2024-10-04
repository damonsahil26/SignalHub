using Microsoft.AspNetCore.SignalR;

namespace SignalHub.Hubs
{
    public class DeathlyHallowsHub : Hub
    {
        public Dictionary<string, int> GetVotesStatus()
        {
            return Utilities.AppConstants.TotalVotes;
        }

    }
}
