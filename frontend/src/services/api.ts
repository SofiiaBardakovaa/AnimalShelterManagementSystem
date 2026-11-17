const API_URL = "http://localhost:5258/api";

export interface Animal {
    id: number;
    shelterId: number;
    name: string;
    species: string;
    breed: string | null;
    gender: string;
    birthDate: string | null;
    arrivalDate: string;
    notes: string | null;
    status: string;
    shelterName: string;
}

export interface Adoption {
    animalId: number;
    adopterId: number;
    fee: number;
}

export interface AvailableAnimal {
    animalID: number;
    animalName: string;
    species: string;
    breed: string | null;
    gender: string;
    arrivalDate: string;
    notes: string | null;
}

// Отримання всіх тварин
export async function getAnimals(): Promise<Animal[]> {
    const response = await fetch(`${API_URL}/Animals`);

    if (!response.ok) {
        throw new Error("Failed to load animals");
    }

    return response.json();
}

// Додавання усиновлення

export async function createAdoption(data: Adoption): Promise<void> {
    const response = await fetch(`${API_URL}/Adoptions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();

        let errorMessage = errorText || "Failed to create adoption";

        try {
            const errorData = JSON.parse(errorText);
            errorMessage =
                errorData.error ||
                errorData.message ||
                errorData.title ||
                errorMessage;
        } catch {
            // Response is not JSON, use the original text
        }

        throw new Error(errorMessage);
    }
}

// Підрахунок усиновлювачів за регіоном
export async function getAdoptersCount(region: string) {
    const response = await fetch(
        `${API_URL}/Functions/adopters-count?region=${encodeURIComponent(region)}`,
    );

    if (!response.ok) {
        throw new Error("Failed to get adopters count");
    }

    return response.json();
}

// Отримання доступних тварин у притулку
export async function getAvailableAnimals(
    shelterId: number,
): Promise<AvailableAnimal[]> {
    const response = await fetch(
        `${API_URL}/Functions/available-animals/${shelterId}`,
    );

    if (!response.ok) {
        throw new Error("Failed to load available animals");
    }

    return response.json();
}

export async function getSheltersCount(): Promise<number> {
    const response = await fetch(`${API_URL}/Functions/shelters-count`);

    if (!response.ok) {
        throw new Error("Failed to get shelters count");
    }

    const data = await response.json();
    return data.count;
}

export async function getAdoptionsCount(): Promise<number> {
    const response = await fetch(`${API_URL}/Functions/adoptions-count`);

    if (!response.ok) {
        throw new Error("Failed to get adoptions count");
    }

    const data = await response.json();
    return data.count;
}
