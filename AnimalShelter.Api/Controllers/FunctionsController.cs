using AnimalShelter.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using AnimalShelter.Api.Models;
using System.Data;

namespace AnimalShelter.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FunctionsController : ControllerBase
    {
        private readonly SqlConnectionFactory _connectionFactory;

        public FunctionsController(SqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        // Скалярна функція: кількість усиновлювачів за регіоном
        [HttpGet("adopters-count")]
        public async Task<IActionResult> GetAdoptersCount(
            [FromQuery] string region)
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                await connection.OpenAsync();

                using var command = new SqlCommand(
                    "SELECT dbo.fn_CountAdoptersByRegion(@Region)",
                    connection);

                command.Parameters.Add("@Region", SqlDbType.NVarChar, 100)
                    .Value = region;

                var result = await command.ExecuteScalarAsync();

                return Ok(new
                {
                    region = region,
                    count = result == DBNull.Value ? null : (int?)Convert.ToInt32(result)
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
        // Таблична функція: доступні для усиновлення тварини
        
        [HttpGet("available-animals/{shelterId}")]
        public async Task<IActionResult> GetAvailableAnimals(int shelterId)
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                await connection.OpenAsync();

                // Перевіряємо, чи існує притулок
                using var checkCommand = new SqlCommand(
                    "SELECT COUNT(*) FROM Shelters WHERE id = @ShelterId",
                    connection);

                checkCommand.Parameters.Add("@ShelterId", SqlDbType.Int)
                    .Value = shelterId;

                var shelterExists = Convert.ToInt32(
                    await checkCommand.ExecuteScalarAsync()
                );

                if (shelterExists == 0)
                {
                    return NotFound(new
                    {
                    message = "Shelter with this ID does not exist."
                    });
                }

                // Викликаємо табличну функцію
                using var command = new SqlCommand(
                    "SELECT * FROM dbo.fn_GetAvailableAnimalsByShelter(@ShelterId)",
                    connection);

                command.Parameters.Add("@ShelterId", SqlDbType.Int)
                    .Value = shelterId;

                using var reader = await command.ExecuteReaderAsync();

                var animals = new List<AvailableAnimalDto>();

                while (await reader.ReadAsync())
                {
                    animals.Add(new AvailableAnimalDto
                    {
                        AnimalID = reader.GetInt32(0),
                        AnimalName = reader.GetString(1),
                        Species = reader.GetString(2),
                        Breed = reader.IsDBNull(3) ? null : reader.GetString(3),
                        Gender = reader.GetString(4),
                        ArrivalDate = reader.GetDateTime(5),
                        Notes = reader.IsDBNull(6) ? null : reader.GetString(6),
                        ShelterName = reader.GetString(7)
                    });
                }

                return Ok(animals);
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

        // Підрахунок усіх притулків у базі даних
        [HttpGet("shelters-count")]
        public async Task<IActionResult> GetSheltersCount()
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                await connection.OpenAsync();

                using var command = new SqlCommand(
                    "SELECT COUNT(*) FROM Shelters",
                    connection);

                var result = await command.ExecuteScalarAsync();

                return Ok(new
                {
                    count = Convert.ToInt32(result)
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


        // Підрахунок усіх усиновлень
        [HttpGet("adoptions-count")]
        public async Task<IActionResult> GetAdoptionsCount()
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                await connection.OpenAsync();

                using var command = new SqlCommand(
                    "SELECT COUNT(*) FROM Adoptions",
                    connection);

                var result = await command.ExecuteScalarAsync();

                return Ok(new
                {
                    count = Convert.ToInt32(result)
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