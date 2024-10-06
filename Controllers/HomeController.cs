using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalHub.Data;
using SignalHub.Hubs;
using SignalHub.Models;
using SignalHub.Models.ViewModels;
using System.Diagnostics;
using System.Security.Claims;

namespace SignalHub.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<DeathlyHallowsHub> _deathlyHallowsHub;
        private readonly ApplicationDbContext _dbContext;

        public HomeController(ILogger<HomeController> logger, 
            IHubContext<DeathlyHallowsHub> deathlyHallowsHub,
            ApplicationDbContext dbContext)
        {
            _logger = logger;
            _deathlyHallowsHub = deathlyHallowsHub;
            _dbContext = dbContext;
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
        
        public IActionResult HogwartsHouses()
        {
            return View();
        }

        public IActionResult Notify()
        {
            return View();
        }

        public IActionResult BasicChat()
        {
            return View();
        }

        [Authorize]
        public IActionResult AdvanceChat()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var chatVm = new AdvanceChatVM
            {
                Rooms = _dbContext.ChatRooms.ToList(),
                UserId = userId,
                MaxRoomsAllowed = 4,
            };
            return View(chatVm);
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
