using Microsoft.Data.SqlClient;

namespace AnimalShelter.Api.Data
{
    public class SqlConnectionFactory
    {
        private readonly IConfiguration _configuration;

        public SqlConnectionFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public SqlConnection CreateConnection()
        {
            string connectionString = _configuration
            .GetConnectionString("AnimalShelterDb")
            ?? throw new InvalidOperationException(
                "Connection string 'AnimalShelterDb' was not found.");

            return new SqlConnection(connectionString);
        }
    }
}