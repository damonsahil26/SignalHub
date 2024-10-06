namespace SignalHub.Models.ViewModels
{
    public class AdvanceChatVM
    {
        public AdvanceChatVM()
        {
            Rooms = new List<ChatRoom>();
        }

        public int MaxRoomsAllowed { get; set; }
        public IList<ChatRoom> Rooms { get; set; }
        public string? UserId { get; set; }
        public bool AllowAddRooms => Rooms == null || Rooms.Count < MaxRoomsAllowed;
    }
}
