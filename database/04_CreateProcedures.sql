USE AnimalShelterDB;
GO

CREATE OR ALTER PROCEDURE usp_insert_adoption
	@AnimalId INT,
	@AdopterId INT,
	@Fee Decimal(10, 2)
AS
BEGIN
	SET NOCOUNT ON;

	IF NOT EXISTS (
		SELECT 1 FROM Animals WHERE id = @AnimalId
	)
	BEGIN
		;THROW 50001, N'Animal with this ID does not exist.', 1;
	END;

	IF NOT EXISTS (
        SELECT 1 FROM Adopters WHERE id = @AdopterId
    )
	BEGIN
		;THROW 50002, N'Adopter with this ID does not exist.', 1;
	END;

	IF EXISTS (
        SELECT 1 FROM Adoptions WHERE animal_id = @AnimalId
    )
    BEGIN
        ;THROW 50003, N'This animal has already been adopted.', 1;
    END;

	IF @Fee < 0
	BEGIN
		;THROW 50004, N'Fee cannot be less than 0', 1;
	END;

	INSERT INTO Adoptions (animal_id, adopter_id, adoption_date, fee)
    VALUES (@AnimalId, @AdopterId, GETDATE(), @Fee);

	PRINT 'Adoption successfully registered.';
END;
GO