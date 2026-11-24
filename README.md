# Animal Shelter Management System

A full-stack web application for managing an animal shelter. The system allows users to browse animal records, view adopters, register adoptions, manage related information, and execute database functions through a web interface.

The application follows the REST architectural style and uses Microsoft SQL Server as its database.

## Features

- **Dashboard** - displays key statistics about animals, shelters, and adoptions.
- **Animals** - displays animal information using cards and supports searching and filtering by species and adoption status.
- **Adopters** - displays registered adopters and their contact information.
- **Adoptions** - allows users to register new adoptions and view adoption records.
- **Medical Records** - displays medical information associated with animals.
- **Additional Features** - provides an interface for executing database functions:
    - Count adopters by region using a scalar-valued function.
    - Retrieve available animals by shelter using a table-valued function.
- **REST API** - connects the frontend to the SQL Server database through HTTP requests.
- **Error Handling** - handles SQL Server exceptions and displays error messages in the application.

## Technologies

| Area              | Technologies                      |
| ----------------- | --------------------------------- |
| Backend           | C#, ASP.NET Core Web API, .NET 9  |
| Database Access   | ADO.NET, Microsoft.Data.SqlClient |
| Database          | Microsoft SQL Server              |
| Frontend          | React, TypeScript                 |
| Build Tool        | Vite                              |
| API Documentation | Swagger / OpenAPI                 |
| Version Control   | Git, GitHub                       |

## Project Structure

```text
AnimalShelterManagementSystem/
│
├── AnimalShelter.Api/
│   ├── Controllers/
│   │   ├── AdoptersController.cs
│   │   ├── AdoptionsController.cs
│   │   ├── AnimalsController.cs
│   │   ├── DiagnosticsController.cs
│   │   ├── FunctionsController.cs
│   │   └── MedicalRecordsController.cs
│   │
│   ├── Data/
│   │   └── SqlConnectionFactory.cs
│   │
│   ├── Models/
│   │   ├── AdoptionDto.cs
│   │   ├── AnimalDto.cs
│   │   ├── AvailableAnimalDto.cs
│   │   └── CreateAdoptionDto.cs
│   │
│   ├── Properties/
│   ├── Program.cs
│   ├── appsettings.json
│   ├── appsettings.Development.json
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
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AnimalTable.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AdditionalFeatures.tsx
│   │   │   ├── Adopters.tsx
│   │   │   ├── Adoptions.tsx
│   │   │   ├── Animals.tsx
│   │   │   └── Dashboard.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── types/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
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
4. Execute the SQL scripts in the following order:

| Script                    | Description                                      |
| ------------------------- | ------------------------------------------------ |
| `01_CreateDatabase.sql`   | Creates the database                             |
| `02_CreateTables.sql`     | Creates tables and relationships                 |
| `03_InsertData.sql`       | Inserts sample data                              |
| `04_CreateProcedures.sql` | Creates stored procedures                        |
| `05_CreateFunctions.sql`  | Creates scalar-valued and table-valued functions |
| `06_CreateTriggers.sql`   | Creates database triggers                        |

After executing all scripts, the database should be ready to use.

### 3. Configure the backend

Navigate to the backend directory:

```bash
cd AnimalShelter.Api
```

Create a file named `appsettings.Development.json` in the `AnimalShelter.Api` directory.

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

Replace `YOUR_SERVER_NAME` with your SQL Server instance name.

For example:

```text
Server=localhost\SQLEXPRESS
```

**Important:** The `appsettings.Development.json` file is excluded from version control because it contains local database connection settings. Each user must create their own configuration file.

### 4. Run the backend

Make sure you are in the `AnimalShelter.Api` directory.

Restore the dependencies:

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

Make sure SQL Server and the backend are running before using the application.

## API Endpoints

| HTTP Method | Endpoint                                        | Description                               |
| ----------- | ----------------------------------------------- | ----------------------------------------- |
| GET         | `/api/Animals`                                  | Retrieves all animals                     |
| GET         | `/api/Adopters`                                 | Retrieves all adopters                    |
| GET         | `/api/Adoptions`                                | Retrieves adoption records                |
| POST        | `/api/Adoptions`                                | Registers a new adoption                  |
| GET         | `/api/MedicalRecords/{animalId}`                | Retrieves medical records for an animal   |
| GET         | `/api/Functions/adopters-count?region={region}` | Counts adopters by region                 |
| GET         | `/api/Functions/available-animals/{shelterId}`  | Retrieves available animals for a shelter |
| GET         | `/api/Functions/shelters-count`                 | Retrieves the total number of shelters    |
| GET         | `/api/Functions/adoptions-count`                | Retrieves the total number of adoptions   |
| GET         | `/api/Diagnostics/database`                     | Checks database connectivity              |

## Database Components

The database contains the following tables:

- `Shelters`
- `Adopters`
- `Animals`
- `Medical_Records`
- `Adoptions`

The application also uses the following database programming elements:

- **Stored Procedures**
    - `usp_insert_adoption` — registers a new animal adoption.
- **Scalar-Valued Functions**
    - `fn_CountAdoptersByRegion` — counts adopters based on the specified region.
- **Table-Valued Functions**
    - `fn_GetAvailableAnimalsByShelter` — returns available animals belonging to a specified shelter.
- **Triggers** — enforce database rules and maintain data consistency.

## Error Handling

The application handles SQL Server exceptions generated during database operations.

For example, the `usp_insert_adoption` stored procedure uses custom SQL Server exceptions with `THROW` to validate adoption requests.

The procedure checks that:

- The specified animal exists.
- The specified adopter exists.
- The animal has not already been adopted.
- The adoption fee is not negative.

When a database exception occurs, the backend catches the `SqlException` and returns an error response. The frontend displays the error message to the user.

## Author

**Sofiia Bardakova**

GitHub: [SofiiaBardakovaa](https://github.com/SofiiaBardakovaa)

## License

This project was developed for educational purposes.
