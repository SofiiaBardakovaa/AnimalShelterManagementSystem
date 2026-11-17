namespace AnimalShelter.Api.Models
{
    public class AnimalDto
    {
        public int Id { get; set; }
        public int ShelterId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Species { get; set; } = string.Empty;
        public string? Breed { get; set; }
        public string Gender { get; set; } = string.Empty;
        public DateTime? BirthDate { get; set; }
        public DateTime ArrivalDate { get; set; }
        public string? Notes { get; set; }
        public string Status { get; set; } = string.Empty;
        public string ShelterName { get; set; } = string.Empty;
    }
}