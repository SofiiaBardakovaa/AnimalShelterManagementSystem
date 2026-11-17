USE master;
GO

-- Check whether the database already exists
IF DB_ID(N'AnimalShelterDB') IS NULL
BEGIN
    CREATE DATABASE AnimalShelterDB;
    PRINT N'Database AnimalShelterDB was created successfully.';
END
ELSE
BEGIN
    PRINT N'Database AnimalShelterDB already exists.';
END;
GO
