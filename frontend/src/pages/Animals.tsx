import { useEffect, useState } from "react";
import { getAnimals, type Animal } from "../services/api";

interface AnimalsProps {
    onAdopt: (animalId: number) => void;
}

function Animals({ onAdopt }: AnimalsProps) {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    useEffect(() => {
        async function loadAnimals() {
            try {
                const data = await getAnimals();
                setAnimals(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Something went wrong",
                );
            } finally {
                setLoading(false);
            }
        }

        loadAnimals();
    }, []);

    const speciesList = [...new Set(animals.map((animal) => animal.species))];

    const filteredAnimals = animals.filter((animal) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            animal.name.toLowerCase().includes(searchText) ||
            animal.species.toLowerCase().includes(searchText) ||
            (animal.breed?.toLowerCase().includes(searchText) ?? false);

        const matchesSpecies =
            selectedSpecies === "All" || animal.species === selectedSpecies;

        const status = animal.status.toLowerCase();

        const matchesStatus =
            selectedStatus === "All" ||
            (selectedStatus === "Available" &&
                (status === "available" || status === "long-term stay")) ||
            (selectedStatus === "Long-term stay" &&
                status === "long-term stay") ||
            (selectedStatus === "Adopted" && status === "adopted");

        return matchesSearch && matchesSpecies && matchesStatus;
    });

    if (loading) return <p>Loading animals...</p>;

    if (error) {
        return (
            <div className="error-message">
                <h3>Unable to load animals</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="animals-page">
            <div className="animals-page-heading">
                <div>
                    <h2>Find Your New Friend</h2>
                    <p>Meet the animals waiting for their forever homes.</p>
                </div>
            </div>

            <div className="animals-filters">
                <div className="search-box">
                    <span className="search-icon">⌕</span>
                    <input
                        type="text"
                        placeholder="Search animals by name or breed..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    {search && (
                        <button
                            className="clear-search"
                            onClick={() => setSearch("")}
                            type="button"
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>

                <select
                    className="filter-select"
                    value={selectedSpecies}
                    onChange={(event) => setSelectedSpecies(event.target.value)}
                >
                    <option value="All">All species</option>
                    {speciesList.map((species) => (
                        <option key={species} value={species}>
                            {species}
                        </option>
                    ))}
                </select>

                <select
                    className="filter-select"
                    value={selectedStatus}
                    onChange={(event) => setSelectedStatus(event.target.value)}
                >
                    <option value="All">All statuses</option>
                    <option value="Available">Available for adoption</option>
                    <option value="Long-term stay">Long-term stay</option>
                    <option value="Adopted">Adopted</option>
                </select>

                <button
                    className="reset-filters"
                    type="button"
                    onClick={() => {
                        setSearch("");
                        setSelectedSpecies("All");
                        setSelectedStatus("All");
                    }}
                >
                    Reset filters
                </button>
            </div>

            <div className="animals-results">
                Showing <strong>{filteredAnimals.length}</strong> of{" "}
                <strong>{animals.length}</strong> animals
            </div>

            {filteredAnimals.length === 0 ? (
                <div className="empty-state">
                    <span>🐾</span>
                    <h3>No animals found</h3>
                    <p>Try changing your search or filters.</p>
                </div>
            ) : (
                <div className="animals-grid">
                    {filteredAnimals.map((animal) => {
                        const isAvailable =
                            animal.status.toLowerCase() === "available" ||
                            animal.status.toLowerCase() === "long-term stay";

                        return (
                            <div className="animal-card" key={animal.id}>
                                <div className="animal-card-top">
                                    <span className="animal-id">
                                        ID #{animal.id}
                                    </span>

                                    <span
                                        className={`animal-status ${animal.status
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}`}
                                    >
                                        {animal.status}
                                    </span>
                                </div>

                                <div className="animal-card-icon">
                                    {animal.species
                                        .toLowerCase()
                                        .includes("dog")
                                        ? "🐶"
                                        : animal.species
                                                .toLowerCase()
                                                .includes("cat")
                                          ? "🐱"
                                          : "🐾"}
                                </div>

                                <div className="animal-card-info">
                                    <button
                                        className="animal-card-name"
                                        onClick={() =>
                                            isAvailable && onAdopt(animal.id)
                                        }
                                        disabled={!isAvailable}
                                    >
                                        {animal.name}
                                    </button>

                                    <p className="animal-card-species">
                                        {animal.breed || animal.species}
                                    </p>
                                </div>

                                <div className="animal-card-details">
                                    <div>
                                        <span>Species</span>
                                        <strong>{animal.species}</strong>
                                    </div>

                                    <div>
                                        <span>Gender</span>
                                        <strong>{animal.gender}</strong>
                                    </div>

                                    <div>
                                        <span>Shelter</span>
                                        <strong>{animal.shelterName}</strong>
                                    </div>

                                    <div>
                                        <span>Arrival date</span>
                                        <strong>
                                            {new Date(
                                                animal.arrivalDate,
                                            ).toLocaleDateString()}
                                        </strong>
                                    </div>
                                </div>

                                {animal.notes && (
                                    <p className="animal-card-notes">
                                        {animal.notes}
                                    </p>
                                )}

                                <div className="animal-card-footer">
                                    {isAvailable ? (
                                        <button
                                            className="adopt-button"
                                            onClick={() => onAdopt(animal.id)}
                                        >
                                            Adopt this animal
                                        </button>
                                    ) : (
                                        <span className="unavailable-label">
                                            Not available for adoption
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Animals;
