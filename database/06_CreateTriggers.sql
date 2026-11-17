USE AnimalShelterDB;
GO

CREATE TABLE dbo.AdoptionsLogs
(
	id INT IDENTITY(1,1) NOT NULL,
	adoption_id INT NOT NULL,
	modify_date DATETIME NOT NULL,

	CONSTRAINT PK_AdoptionsLogs PRIMARY KEY (id)
);
GO

CREATE OR ALTER TRIGGER tr_Adoptions_Loging
ON dbo.Adoptions
AFTER UPDATE
AS
BEGIN
    INSERT dbo.AdoptionsLogs(adoption_id, modify_date)
    SELECT i.id, GETDATE()
    FROM inserted AS i
    INNER JOIN deleted AS d
        ON i.id = d.id
    WHERE EXISTS (
        SELECT i.animal_id, i.adopter_id, i.adoption_date, i.fee
        EXCEPT
        SELECT d.animal_id, d.adopter_id, d.adoption_date, d.fee
    );
END;
GO



CREATE TABLE dbo.AdoptionInsertAttempts
(
    id INT IDENTITY(1,1) NOT NULL,
    animal_id INT NOT NULL,
    adopter_id INT NOT NULL,
    fee DECIMAL(10,2) NOT NULL,
    attempt_date DATETIME NOT NULL,

    CONSTRAINT PK_AnimalInsertAttempts
        PRIMARY KEY (id)
);
GO

CREATE TRIGGER trg_CheckAdoptionInsertTime
ON dbo.Adoptions
INSTEAD OF INSERT
AS 
BEGIN
    DECLARE @CurrentDay NVARCHAR(20);
    DECLARE @CurrentTime TIME;

    SET @CurrentDay = DATENAME(WEEKDAY, GETDATE());
    SET @CurrentTime = CAST(GETDATE() AS TIME);

    IF @CurrentDay IN ('Saturday', 'Sunday')
        OR @CurrentTime < '10:00:00'
        OR @CurrentTime >= '18:00:00'
    BEGIN
        INSERT INTO dbo.AdoptionInsertAttempts 
        (
            animal_id,
            adopter_id,
            fee,
            attempt_date
        )
        SELECT
            animal_id,
            adopter_id,
            fee,
            GETDATE()
        FROM inserted;

        RAISERROR('Adoptions are not allowed outside working hours', 16, 1);

        RETURN;
    END;
    INSERT INTO dbo.Adoptions
    (
        animal_id,
        adopter_id,
        adoption_date,
        fee
    )
    SELECT 
        animal_id,
        adopter_id,
        adoption_date,
        fee
    FROM inserted;
END;
GO


CREATE TRIGGER trg_AddAdoptionIdToAnimalNotes
ON dbo.Adoptions
AFTER INSERT
AS
BEGIN
	BEGIN TRY
		UPDATE a
		SET notes =
			CASE
				WHEN NULLIF(LTRIM(RTRIM(a.notes)), N'') IS NULL
					THEN CONCAT (N'Adoption #', i.id)
				ELSE CONCAT(a.notes, N'; Adoption #', i.id)
			END
		FROM dbo.Animals AS a
		INNER JOIN inserted AS i
			ON i.animal_id = a.id;
	END TRY
	BEGIN CATCH
		THROW 50001, 'Error while updating animal notes. ', 1;
	END CATCH;
END;
GO