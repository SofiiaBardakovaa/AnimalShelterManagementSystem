using AnimalShelter.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace AnimalShelter.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DiagnosticsController : ControllerBase
    {
        private readonly SqlConnectionFactory _connectionFactory;

        public DiagnosticsController(SqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        [HttpGet("database")]
        public async Task<IActionResult> CheckDatabaseConnection()
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();

                await connection.OpenAsync();

                return Ok(new
                {
                    message = "Successfully connected to AnimalShelterDB!"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Database connection failed.",
                    error = ex.Message
                });
            }
        }
    }
}