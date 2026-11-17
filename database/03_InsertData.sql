
USE AnimalShelterDB;
GO

-- 1. Insert shelters
INSERT INTO Shelters (name, location, phone, capacity)
VALUES
(N'Tallinn Animal Shelter', N'Tallinn, Paljassaare tee 85', '+372 600 1234', 120),
(N'Tartu Animal Shelter', N'Tartu, Roosi 91', '+372 700 2345', 80),
(N'Pärnu Animal Shelter', N'Pärnu, Raba 32', '+372 800 3456', 60),
(N'Narva Animal Shelter', N'Narva, Rakvere 22', '+372 900 4567', 50),
(N'Viljandi Animal Shelter', N'Viljandi, Vaksali 15', '+372 500 5678', 40);
GO

-- 2. Insert adopters
INSERT INTO Adopters (first_name, last_name, phone, email, address)
VALUES
(N'Anna', N'Petrova', '+372 555 1001', N'anna.pet@example.com', N'Tallinn, Estonia'),
(N'Maria', N'Kovalenko', '+372 555 1002', N'maria.kov@example.com', N'Tartu, Estonia'),
(N'John', N'Smith', '+372 555 1003', N'john.smith@example.com', N'Pärnu, Estonia'),
(N'Olga', N'Ivanova', '+372 555 1004', NULL, N'Narva, Estonia'),
(N'Emma', N'Brown', '+372 555 1005', N'emma.brown@example.com', N'Viljandi, Estonia');
GO

-- 3. Insert animals
INSERT INTO Animals
    (shelter_id, name, species, breed, gender, birth_date, arrival_date, notes)
VALUES
(1, N'Milo', N'Cat', N'European Shorthair', N'Male', '2022-03-15', '2025-01-10', N'Friendly and playful'),
(1, N'Luna', N'Dog', N'Labrador', N'Female', '2021-06-20', '2025-02-05', N'Good with children'),
(2, N'Charlie', N'Cat', N'British Shorthair', N'Male', '2023-01-12', '2025-03-15', N'Calm and affectionate'),
(3, N'Bella', N'Dog', N'Beagle', N'Female', '2020-09-08', '2025-04-20', N'Active and energetic'),
(4, N'Rocky', N'Dog', N'German Shepherd', N'Male', '2019-11-25', '2025-05-01', N'Needs regular exercise'),
(1, N'Max', N'Dog', N'Golden Retriever', N'Male', '2022-05-10', '2025-07-01', N'Friendly and active'),
(1, N'Oscar', N'Cat', N'Siamese', N'Male', '2023-04-12', '2025-07-05', N'Calm and sociable'),
(1, N'Lucky', N'Dog', N'Pug', N'Male', '2022-05-15', '2025-09-01', N'Waiting for adoption'),
(1, N'Coco', N'Cat', N'Persian', N'Female', '2023-03-20', '2025-09-05', N'Needs a loving home'),
(2, N'Simba', N'Cat', N'Maine Coon', N'Male', '2022-08-15', '2025-07-10', N'Playful and curious'),
(2, N'Leo', N'Dog', N'Beagle', N'Male', '2021-03-20', '2025-07-12', N'Friendly with other animals'),
(2, N'Oliver', N'Cat', N'European Shorthair', N'Male', '2023-06-01', '2025-07-15', N'Likes attention'),
(2, N'Buddy', N'Dog', N'Golden Retriever', N'Male', '2021-08-10', '2025-09-10', N'Friendly and playful'),
(2, N'Mimi', N'Cat', N'Siamese', N'Female', '2024-01-12', '2025-09-12', N'Waiting for adoption'),
(3, N'Bruno', N'Dog', N'Boxer', N'Male', '2021-09-10', '2025-07-20', N'Active and energetic'),
(3, N'Rex', N'Dog', N'German Shepherd', N'Male', '2020-02-14', '2025-07-22', N'Loyal and intelligent'),
(3, N'Toby', N'Cat', N'British Shorthair', N'Male', '2022-11-05', '2025-07-25', N'Quiet and affectionate'),
(4, N'Jack', N'Dog', N'Border Collie', N'Male', '2022-01-18', '2025-08-01', N'Needs regular activity'),
(4, N'Cooper', N'Cat', N'Mixed Breed', N'Male', '2023-07-20', '2025-08-03', N'Friendly and gentle'),
(4, N'Archie', N'Dog', N'Cocker Spaniel', N'Male', '2021-12-11', '2025-08-05', N'Good with children'),
(5, N'Tom', N'Cat', N'European Shorthair', N'Male', '2022-04-05', '2025-08-10', N'Independent and calm'),
(5, N'Lily', N'Cat', N'Persian', N'Female', '2023-02-17', '2025-08-12', N'Quiet and friendly'),
(5, N'Molly', N'Dog', N'Poodle', N'Female', '2021-10-22', '2025-08-15', N'Intelligent and playful'),
(5, N'Nala', N'Cat', N'Siamese', N'Female', '2024-01-08', '2025-08-18', N'Young and affectionate');
GO

-- 4. Insert medical records
INSERT INTO Medical_Records
    (animal_id, visit_date, diagnosis, treatment, notes)
VALUES
(1, '2025-01-12', N'Healthy', N'Vaccination', N'Routine vaccination completed'),
(2, '2025-02-08', N'Ear infection', N'Ear drops for 7 days', N'Follow-up recommended'),
(3, '2025-03-18', N'Healthy', N'Parasite prevention', N'No complications'),
(4, '2025-04-22', N'Skin irritation', N'Topical treatment', N'Condition improved'),
(5, '2025-05-05', N'Healthy', N'Vaccination and check-up', N'All tests normal'),
(6, '2025-06-15', N'Eye infection', N'Eye drops for 5 days', N'Recovery confirmed'),
(7, '2025-07-03', N'Healthy', N'Vaccination', N'Routine check-up completed'),
(8, '2025-07-06', N'Healthy', N'Parasite prevention', N'No complications'),
(9, '2025-07-11', N'Ear infection', N'Ear drops', N'Follow-up recommended'),
(10, '2025-07-13', N'Healthy', N'Vaccination', N'All tests normal'),
(11, '2025-07-16', N'Healthy', N'General examination', N'Good condition'),
(12, '2025-07-21', N'Skin irritation', N'Topical treatment', N'Condition improved'),
(13, '2025-07-23', N'Healthy', N'Vaccination', N'Routine vaccination'),
(14, '2025-07-26', N'Healthy', N'Parasite prevention', N'No complications'),
(15, '2025-08-02', N'Healthy', N'General examination', N'Good condition'),
(16, '2025-08-04', N'Eye irritation', N'Eye drops', N'Recovery monitored'),
(17, '2025-08-06', N'Healthy', N'Vaccination', N'All tests normal'),
(18, '2025-08-11', N'Healthy', N'General examination', N'Good condition'),
(19, '2025-08-13', N'Healthy', N'Parasite prevention', N'No complications'),
(20, '2025-08-16', N'Healthy', N'Vaccination', N'Routine vaccination'),
(21, '2025-08-19', N'Healthy', N'General examination', N'Good condition');
GO

-- 5. Insert adoptions
INSERT INTO Adoptions
    (animal_id, adopter_id, adoption_date, fee, notes)
VALUES
(1, 1, '2025-02-01', 55.00, NULL),
(2, 2, '2025-03-10', 95.00, NULL),
(3, 3, '2025-04-05', 55.00, NULL),
(4, 4, '2025-05-15', 90.00, NULL),
(5, 5, '2025-06-20', 100.00, NULL),
(7, 1, '2025-09-01', 40.00, NULL),
(8, 2, '2025-09-02', 70.00, NULL),
(9, 3, '2025-09-03', 35.00, NULL),
(10, 4, '2025-09-04', 60.00, NULL),
(11, 5, '2025-09-05', 85.00, NULL),
(12, 1, '2025-09-06', 40.00, NULL),
(13, 2, '2025-09-07', 65.00, NULL),
(14, 3, '2025-09-08', 100.00, NULL),
(15, 4, '2025-09-09', 45.00, NULL),
(16, 5, '2025-09-10', 70.00, NULL),
(17, 1, '2025-09-11', 90.00, NULL),
(18, 2, '2025-09-12', 30.00, NULL),
(19, 3, '2025-09-13', 50.00, NULL),
(20, 4, '2025-09-14', 75.00, NULL),
(21, 5, '2025-09-15', 110.00, NULL);
GO

-- 6. Update animal statuses
UPDATE Animals
SET status = N'Adopted'
WHERE id IN (
    SELECT animal_id
    FROM Adoptions
);

UPDATE Animals
SET status = N'Long-term stay'
WHERE id IN (6, 22, 23, 24);
GO

PRINT N'Sample data inserted successfully.';
GO
