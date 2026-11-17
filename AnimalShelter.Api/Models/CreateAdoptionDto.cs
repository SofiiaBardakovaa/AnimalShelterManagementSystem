namespace AnimalShelter.Api.Models
{
    public class CreateAdoptionDto
    {
        public int AnimalId { get; set; }
        public int AdopterId { get; set; }
        public decimal Fee { get; set; }
    }
}