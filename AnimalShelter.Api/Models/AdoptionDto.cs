
namespace AnimalShelter.Api.Models
{
    public class AdoptionDto
    {
        public int Id { get; set; }
        public int AnimalId { get; set; }
        public string AnimalName { get; set; } = string.Empty;
        public string Species { get; set; } = string.Empty;
        public string AdopterName { get; set; } = string.Empty;
        public int AdopterId { get; set; }
        public string ShelterName { get; set; } = string.Empty;
        public DateTime AdoptionDate { get; set; }
        public decimal Fee { get; set; }
        public string? Notes { get; set; }
    }
}
