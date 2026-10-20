using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class Guest
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Range(1, 99)]
        public int Weight { get; set; } = 1;

        // Legacy fields retained for compatibility with existing databases.
        [JsonIgnore]
        [Required]
        public string DiaperSize { get; set; } = "P";

        [JsonIgnore]
        public bool ShowPixSuggestion { get; set; }

        [Required]
        public string Token { get; set; } = Guid.NewGuid().ToString("N")[..10]; // Short 10-char token

        public GuestStatus Status { get; set; } = GuestStatus.Pending;

        public string? Message { get; set; }
    }

    public enum GuestStatus
    {
        Pending,
        Confirmed,
        Declined
    }
}
