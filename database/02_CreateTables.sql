USE AnimalShelterDB;
GO

CREATE TABLE Shelters
(
    id INT IDENTITY(1,1) NOT NULL,
    name NVARCHAR(100) NOT NULL,
    location NVARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    capacity INT NOT NULL,

    CONSTRAINT PK_Shelters PRIMARY KEY (id),
    CONSTRAINT CK_Shelters_Capacity CHECK (capacity > 0)
);
GO

CREATE TABLE Adopters
(
    id INT IDENTITY(1,1) NOT NULL,
    first_name NVARCHAR(50) NOT NULL,
    last_name NVARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email NVARCHAR(100) NULL,
    address NVARCHAR(150) NOT NULL,

    CONSTRAINT PK_Adopters PRIMARY KEY (id)
);
GO

CREATE TABLE Animals
(
    id INT IDENTITY(1,1) NOT NULL,
    shelter_id INT NOT NULL,
    name NVARCHAR(50) NOT NULL,
    species NVARCHAR(50) NOT NULL,
    breed NVARCHAR(50) NULL,
    gender NVARCHAR(10) NOT NULL,
    birth_date DATE NULL,
    arrival_date DATE NOT NULL,
    notes NVARCHAR(MAX) NULL,
    status NVARCHAR(30) NOT NULL
        CONSTRAINT DF_Animals_Status DEFAULT N'Available',

    CONSTRAINT PK_Animals PRIMARY KEY (id),

    CONSTRAINT FK_Animals_Shelters
        FOREIGN KEY (shelter_id)
        REFERENCES Shelters(id),

    CONSTRAINT CK_Animals_Gender
        CHECK (gender IN (N'Male', N'Female')),

    CONSTRAINT CK_Animals_Dates
        CHECK (birth_date IS NULL OR birth_date <= arrival_date),

    CONSTRAINT CK_Animals_Status
        CHECK (status IN (N'Available', N'Adopted', N'Long-term stay'))
);
GO


CREATE TABLE Medical_Records
(
    id INT IDENTITY(1,1) NOT NULL,
    animal_id INT NOT NULL,
    visit_date DATE NOT NULL,
    diagnosis NVARCHAR(200) NOT NULL,
    treatment NVARCHAR(250) NULL,
    notes NVARCHAR(250) NULL,

    CONSTRAINT PK_Medical_Records PRIMARY KEY (id),

    CONSTRAINT FK_Medical_Records_Animals
        FOREIGN KEY (animal_id)
        REFERENCES Animals(id)
);
GO

CREATE TABLE Adoptions
(
    id INT IDENTITY(1,1) NOT NULL,
    animal_id INT NOT NULL,
    adopter_id INT NOT NULL,
    adoption_date DATE NOT NULL,
    fee DECIMAL(10,2) NOT NULL,
   notes NVARCHAR(250) NULL

    CONSTRAINT PK_Adoptions PRIMARY KEY (id),

    CONSTRAINT FK_Adoptions_Animals
        FOREIGN KEY (animal_id)
        REFERENCES Animals(id),

    CONSTRAINT FK_Adoptions_Adopters
        FOREIGN KEY (adopter_id)
        REFERENCES Adopters(id),

    CONSTRAINT UQ_Adoptions_Animal
        UNIQUE (animal_id),

    CONSTRAINT CK_Adoptions_Fee
        CHECK (fee >= 0)
);
GO
