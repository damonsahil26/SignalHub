using System.ComponentModel.DataAnnotations;

namespace SignalHub.Models
{
    public class ChatRoom
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;
    }
}
