using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalHub.Hubs;
using SignalHub.Models;
using System.Diagnostics;

namespace SignalHub.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<DeathlyHallowsHub> _deathlyHallowsHub;

        public HomeController(ILogger<HomeController> logger, IHubContext<DeathlyHallowsHub> deathlyHallowsHub)
        {
            _logger = logger;
            _deathlyHallowsHub = deathlyHallowsHub;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult DeathlyHallows(string? type)
        {
            return View();
        }
        
        public IActionResult DeathlyHallowsRace(string? type)
        {
            if (type != null)
            {
                if (Utilities.AppConstants.TotalVotes.ContainsKey(type))
                {
                    Utilities.AppConstants.TotalVotes[type]++;
                    _deathlyHallowsHub.Clients.All.SendAsync("updateDeathlyHallowsVotes",
                        Utilities.AppConstants.TotalVotes[Utilities.AppConstants.Cloak],
                        Utilities.AppConstants.TotalVotes[Utilities.AppConstants.Wand],
                        Utilities.AppConstants.TotalVotes[Utilities.AppConstants.Stone]);
                }
            }

            return Accepted();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
