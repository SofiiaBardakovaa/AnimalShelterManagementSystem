USE AnimalShelterDB;
GO

CREATE OR ALTER FUNCTION dbo.fn_GetAvailableAnimalsByShelter(@ShelterId INT)
RETURNS TABLE
AS
RETURN
(
    SELECT
        a.id AS AnimalID,
        a.name AS AnimalName,
        a.species AS Species,
        a.breed AS Breed,
        a.gender AS Gender,
        a.arrival_date AS ArrivalDate,
        a.notes AS Notes,
        s.name AS ShelterName
    FROM Animals a
    INNER JOIN Shelters s ON s.id = a.shelter_id
    WHERE
        @ShelterId IS NOT NULL
        AND @ShelterId > 0
        AND a.shelter_id = @ShelterId
        AND a.status IN (N'Available', N'Long-term stay')
);
GO

CREATE OR ALTER FUNCTION dbo.fn_CountAdoptersByRegion
(
    @Region NVARCHAR(100)
)
RETURNS INT
AS
BEGIN
    DECLARE @AdopterCount INT;
    DECLARE @CleanRegion NVARCHAR(100);

    SET @CleanRegion = LTRIM(RTRIM(@Region));

    IF @CleanRegion IS NULL OR @CleanRegion = N''
        RETURN NULL;

    IF NOT EXISTS (
        SELECT 1
        FROM Adopters
        WHERE address LIKE N'%' + @CleanRegion + N'%'
    )
        RETURN -1;

    SELECT @AdopterCount = COUNT(*)
    FROM Adopters
    WHERE address LIKE N'%' + @CleanRegion + N'%';

    RETURN @AdopterCount;
END;
GO