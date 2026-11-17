# Animal Shelter Management System

A full-stack web application for managing an animal shelter. The system provides an interface for browsing animals, searching and filtering records, registering adoptions, and retrieving information from a Microsoft SQL Server database.

## Features

- **Dashboard** — displays key statistics about animals, shelters, and adoptions.
- **Animals** — displays animal information using cards, with search and filtering by species and adoption status.
- **Adoptions** — allows users to register an adoption by providing adopter information and selecting an animal.
- **Database Functions** — provides an interface for executing database functions and displaying their results.
- **REST API** — connects the frontend with the SQL Server database.
- **Error Handling** — handles database exceptions and displays error messages to users.

## Technologies

| Area | Technologies |
|---|---|
| Backend | C#, ASP.NET Core Web API, .NET 9 |
| Database access | ADO.NET, Microsoft.Data.SqlClient |
| Database | Microsoft SQL Server |
| Frontend | React, TypeScript |
| Build tool | Vite |
| API documentation | Swagger / OpenAPI |

## Project Structure

```text
AnimalShelterManagementSystem/
│
├── AnimalShelter.Api/
│   ├── Controllers/
│   ├── Data/
│   ├── Models/
│   ├── Properties/
│   ├── Program.cs
│   ├── appsettings.json
│   └── AnimalShelter.Api.csproj
│
├── database/
│   ├── 01_CreateDatabase.sql
│   ├── 02_CreateTables.sql
│   ├── 03_InsertData.sql
│   ├── 04_CreateProcedures.sql
│   ├── 05_CreateFunctions.sql
│   └── 06_CreateTriggers.sql
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── package.json
│   ├── index.html
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

## Requirements

Before running the application, install:

- [Git](https://git-scm.com/)
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js and npm](https://nodejs.org/)
- [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/ssms/install/install)

## Getting Started

### 1. Clone the repository

```bash
git clone <REPOSITORY_URL>
cd AnimalShelterManagementSystem
```

### 2. Set up the database

The application uses a SQL Server database named `AnimalShelterDB`.

To create and configure the database:

1. Open SQL Server Management Studio (SSMS).
2. Connect to your SQL Server instance.
3. Navigate to the `database` directory.
4. Execute the following SQL scripts in order:

| Script | Description |
|---|---|
| `01_CreateDatabase.sql` | Creates the database |
| `02_CreateTables.sql` | Creates database tables and relationships |
| `03_InsertData.sql` | Inserts sample data |
| `04_CreateProcedures.sql` | Creates stored procedures |
| `05_CreateFunctions.sql` | Creates scalar and table-valued functions |
| `06_CreateTriggers.sql` | Creates database triggers |

After executing all scripts, the database should be ready to use.

### 3. Configure the backend

Navigate to the API project directory:

```bash
cd AnimalShelter.Api
```

Create a file named `appsettings.Development.json` in this directory.

Add the following configuration:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "AnimalShelterDb": "Server=YOUR_SERVER_NAME;Database=AnimalShelterDB;Integrated Security=True;TrustServerCertificate=True;"
  }
}
```

Replace `YOUR_SERVER_NAME` with the name of your SQL Server instance.

For example:

```text
Server=localhost\SQLEXPRESS
```

**Important:** The `appsettings.Development.json` file is excluded from version control because it contains local database connection settings. Each user must create their own configuration file.

### 4. Run the backend

Make sure you are in the `AnimalShelter.Api` directory.

Restore dependencies:

```bash
dotnet restore
```

Run the application:

```bash
dotnet run
```

The backend API will be available at:

```text
http://localhost:5258
```

Swagger API documentation:

```text
http://localhost:5258/swagger
```

### 5. Run the frontend

Open a new terminal and navigate to the frontend directory from the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

Make sure the backend and SQL Server are running before using the application.

## API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/Animals` | Retrieves all animals |
| POST | `/api/Adoptions` | Registers a new adoption |
| GET | `/api/Diagnostics/database` | Checks database connectivity |
| GET | `/api/Functions/adopters-count` | Retrieves the number of adopters by region |
| GET | `/api/Functions/available-animals/{shelterId}` | Retrieves available animals for a shelter |
| GET | `/api/Functions/shelters-count` | Retrieves the number of shelters |
| GET | `/api/Functions/adoptions-count` | Retrieves the number of adoptions |

## Database Components

The database contains the following main tables:

- `Shelters`
- `Adopters`
- `Animals`
- `Medical_Records`
- `Adoptions`

The project also uses:

- Stored procedures for inserting and validating adoption records.
- Scalar-valued functions for retrieving statistics.
- Table-valued functions for retrieving available animals.
- Triggers for enforcing business rules and maintaining database consistency.

## Error Handling

The application handles SQL Server exceptions generated by database operations.

For example, adoption registration includes validation to prevent:
- Registering an adoption for a non-existing animal.
- Registering an adoption for a non-existing adopter.
- Adopting an animal that has already been adopted.
- Providing an invalid adoption fee.

Errors are returned by the backend API and displayed to the user.

## Author

**Sofiia Bardakova**

GitHub: [GitHub Profile](https://github.com/SofiiaBardakovaa)

## License

This project was developed for educational purposes.
