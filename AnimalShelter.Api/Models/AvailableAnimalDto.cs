namespace AnimalShelter.Api.Models
{
    public class AvailableAnimalDto
    {
        public int AnimalID { get; set; }
        public string AnimalName { get; set; } = string.Empty;
        public string Species { get; set; } = string.Empty;
        public string? Breed { get; set; }
        public string Gender { get; set; } = string.Empty;
        public DateTime ArrivalDate { get; set; }
        public string? Notes { get; set; }
        public string ShelterName { get; set; } = string.Empty;
    }
}