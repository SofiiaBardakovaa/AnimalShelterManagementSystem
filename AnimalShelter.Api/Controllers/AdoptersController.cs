
using AnimalShelter.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace AnimalShelter.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdoptersController : ControllerBase
    {
        private readonly SqlConnectionFactory _connectionFactory;

        public AdoptersController(SqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        [HttpGet]
        public async Task<IActionResult> GetAdopters()
        {
            var adopters = new List<object>();

            try
            {
                using var connection = _connectionFactory.CreateConnection();
                await connection.OpenAsync();

                string query = @"
                    SELECT
                        id,
                        first_name,
                        last_name,
                        phone,
                        email,
                        address
                    FROM Adopters
                    ORDER BY first_name, last_name;";

                using var command = new SqlCommand(query, connection);
                using var reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    adopters.Add(new
                    {
                        id = reader.GetInt32(0),
                        firstName = reader.GetString(1),
                        lastName = reader.GetString(2),
                        phone = reader.GetString(3),
                        email = reader.IsDBNull(4)
                            ? null
                            : reader.GetString(4),
                        address = reader.GetString(5)
                    });
                }

                return Ok(adopters);
            }
            catch (SqlException ex)
            {
                return StatusCode(500, new
                {
                    message = "Database error while retrieving adopters.",
                    error = ex.Message
                });
            }
        }
    }
}
