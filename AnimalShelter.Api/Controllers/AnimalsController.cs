using AnimalShelter.Api.Data;
using AnimalShelter.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace AnimalShelter.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnimalsController : ControllerBase
    {
        private readonly SqlConnectionFactory _connectionFactory;

        public AnimalsController(SqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        [HttpGet]
        public async Task<IActionResult> GetAnimals()
        {
            var animals = new List<AnimalDto>();

            const string query = @"
                SELECT
                    a.id,
                    a.shelter_id,
                    a.name,
                    a.species,
                    a.breed,
                    a.gender,
                    a.birth_date,
                    a.arrival_date,
                    a.notes,
                    a.status,
                    s.name AS shelter_name
                FROM Animals a
                INNER JOIN Shelters s ON a.shelter_id = s.id;
            ";

            using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            using var command = new SqlCommand(query, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                animals.Add(new AnimalDto
                {
                    Id = reader.GetInt32(0),
                    ShelterId = reader.GetInt32(1),
                    Name = reader.GetString(2),
                    Species = reader.GetString(3),
                    Breed = reader.IsDBNull(4) ? null : reader.GetString(4),
                    Gender = reader.GetString(5),
                    BirthDate = reader.IsDBNull(6) ? null : reader.GetDateTime(6),
                    ArrivalDate = reader.GetDateTime(7),
                    Notes = reader.IsDBNull(8) ? null : reader.GetString(8),
                    Status = reader.GetString(9),
                    ShelterName = reader.GetString(10)
                });
            }

            return Ok(animals);
        }
    }
}