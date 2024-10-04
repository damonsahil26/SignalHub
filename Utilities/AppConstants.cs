namespace SignalHub.Utilities
{
    public static class AppConstants
    {
        public static Dictionary<String, int> TotalVotes;
        public const string Wand = "wand";
        public const string Stone = "stone";
        public const string Cloak = "cloak";
        static AppConstants()
        {
            TotalVotes = new Dictionary<string, int>();
            TotalVotes[Wand] = 0;
            TotalVotes[Stone] = 0;
            TotalVotes[Cloak] = 0;
        }
    }
}
