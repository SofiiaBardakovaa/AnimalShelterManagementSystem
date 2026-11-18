
using AnimalShelter.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace AnimalShelter.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalRecordsController : ControllerBase
    {
        private readonly SqlConnectionFactory _connectionFactory;

        public MedicalRecordsController(SqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        [HttpGet("{animalId}")]
        public async Task<IActionResult> GetMedicalRecords(int animalId)
        {
            if (animalId <= 0)
            {
                return BadRequest("Invalid animal ID.");
            }

            var records = new List<object>();

            try
            {
                using var connection = _connectionFactory.CreateConnection();
                await connection.OpenAsync();

                string query = @"
                    SELECT
                        id,
                        animal_id,
                        visit_date,
                        diagnosis,
                        treatment,
                        notes
                    FROM Medical_Records
                    WHERE animal_id = @AnimalId
                    ORDER BY visit_date DESC;";

                using var command = new SqlCommand(query, connection);

                command.Parameters.AddWithValue("@AnimalId", animalId);

                using var reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    records.Add(new
                    {
                        id = reader.GetInt32(0),
                        animalId = reader.GetInt32(1),
                        visitDate = reader.GetDateTime(2),
                        diagnosis = reader.GetString(3),
                        treatment = reader.IsDBNull(4)
                            ? null
                            : reader.GetString(4),
                        notes = reader.IsDBNull(5)
                            ? null
                            : reader.GetString(5)
                    });
                }

                return Ok(records);
            }
            catch (SqlException ex)
            {
                return StatusCode(500, new
                {
                    message = "Database error while retrieving medical records.",
                    error = ex.Message
                });
            }
        }
    }
}
