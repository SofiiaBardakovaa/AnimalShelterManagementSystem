
using AnimalShelter.Api.Data;
using AnimalShelter.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;




namespace AnimalShelter.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdoptionsController : ControllerBase
    {
        private readonly SqlConnectionFactory _connectionFactory;

        public AdoptionsController(SqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        // GET: api/Adoptions
        [HttpGet]
        public async Task<IActionResult> GetAdoptions()
        {
            var adoptions = new List<AdoptionDto>();

            using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            const string query = @"
                SELECT
                    ad.id AS Id,
                    ad.animal_id AS AnimalId,
                    a.name AS AnimalName,
                    a.species AS Species,
                    ad.adopter_id AS AdopterId,
                    CONCAT(ap.first_name, N' ', ap.last_name) AS AdopterName,
                    s.name AS ShelterName,
                    ad.adoption_date AS AdoptionDate,
                    ad.fee AS Fee,
                    ad.notes AS Notes
                FROM Adoptions ad
                INNER JOIN Animals a
                    ON ad.animal_id = a.id
                INNER JOIN Adopters ap
                    ON ad.adopter_id = ap.id
                INNER JOIN Shelters s
                    ON a.shelter_id = s.id
                ORDER BY ad.id DESC;
            ";

            using var command = new SqlCommand(query, connection);

            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                adoptions.Add(new AdoptionDto
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    AnimalId = reader.GetInt32(reader.GetOrdinal("AnimalId")),
                    AnimalName = reader.GetString(reader.GetOrdinal("AnimalName")),
                    Species = reader.GetString(reader.GetOrdinal("Species")),
                    AdopterId = reader.GetInt32(reader.GetOrdinal("AdopterId")),
                    AdopterName = reader.GetString(reader.GetOrdinal("AdopterName")),
                    ShelterName = reader.GetString(reader.GetOrdinal("ShelterName")),
                    AdoptionDate = reader.GetDateTime(reader.GetOrdinal("AdoptionDate")),
                    Fee = reader.GetDecimal(reader.GetOrdinal("Fee")),
                    Notes = reader.IsDBNull(reader.GetOrdinal("Notes"))
                        ? null
                        : reader.GetString(reader.GetOrdinal("Notes"))
                });
            }

            return Ok(adoptions);
        }

        

        // POST: api/Adoptions
        [HttpPost]
        public async Task<IActionResult> CreateAdoption(
            [FromBody] CreateAdoptionDto request)
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                await connection.OpenAsync();

                using var command = new SqlCommand(
                    "usp_insert_adoption", connection);

                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add("@AnimalId", SqlDbType.Int)
                    .Value = request.AnimalId;

                command.Parameters.Add("@AdopterId", SqlDbType.Int)
                    .Value = request.AdopterId;

                command.Parameters.Add("@Fee", SqlDbType.Decimal).Value =
                    request.Fee;

                command.Parameters["@Fee"].Precision = 10;
                command.Parameters["@Fee"].Scale = 2;

                await command.ExecuteNonQueryAsync();

                return Ok(new
                {
                    message = "Adoption procedure executed."
                });
            }
            catch (SqlException ex)
            {
                return BadRequest(new
                {
                    message = "Database error.",
                    error = ex.Message
                });
            }
        }
    }
}
