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