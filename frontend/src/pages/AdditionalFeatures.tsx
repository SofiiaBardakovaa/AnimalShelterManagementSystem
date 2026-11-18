import { useState } from "react";
import {
    getAdoptersCount,
    getAvailableAnimals,
    type AvailableAnimal,
} from "../services/api";

export default function AdditionalFeatures() {
    // Count adopters by region
    const [region, setRegion] = useState("");
    const [adoptersCount, setAdoptersCount] = useState<number | null>(null);
    const [countSearched, setCountSearched] = useState(false);
    const [countLoading, setCountLoading] = useState(false);
    const [countError, setCountError] = useState("");

    // Available animals by shelter
    const [shelterId, setShelterId] = useState("");
    const [animals, setAnimals] = useState<AvailableAnimal[]>([]);
    const [animalsSearched, setAnimalsSearched] = useState(false);
    const [animalsLoading, setAnimalsLoading] = useState(false);
    const [animalsError, setAnimalsError] = useState("");

    const handleCountSearch = async () => {
        if (!region.trim()) {
            setCountError("Please enter a region.");
            setCountSearched(false);
            return;
        }

        setCountLoading(true);
        setCountError("");
        setCountSearched(false);

        try {
            const result = await getAdoptersCount(region.trim());
            setAdoptersCount(result.count);
            setCountSearched(true);
        } catch (error) {
            setCountError(
                error instanceof Error
                    ? error.message
                    : "Failed to get adopters count.",
            );
        } finally {
            setCountLoading(false);
        }
    };

    const handleAnimalsSearch = async () => {
        const id = Number(shelterId);

        if (!shelterId.trim() || !Number.isInteger(id) || id <= 0) {
            setAnimalsError("Please enter a valid shelter ID.");
            setAnimalsSearched(false);
            return;
        }

        setAnimalsLoading(true);
        setAnimalsError("");
        setAnimalsSearched(false);

        try {
            const result = await getAvailableAnimals(id);
            setAnimals(result);
            setAnimalsSearched(true);
        } catch (error) {
            setAnimalsError(
                error instanceof Error
                    ? error.message
                    : "Failed to load available animals.",
            );
        } finally {
            setAnimalsLoading(false);
        }
    };

    return (
        <div className="additional-features-page">
            <div className="additional-features-heading">
                <h2>Additional Features</h2>
                <p>Explore additional database functions and their results.</p>
            </div>

            <div className="features-grid">
                {/* Scalar function */}
                <section className="feature-card">
                    <div className="feature-card-heading">
                        <div className="feature-icon">⌕</div>
                        <div>
                            <h3>Count Adopters by Region</h3>
                            <span>Scalar-valued function</span>
                        </div>
                    </div>

                    <p className="feature-description">
                        Find out how many adopters are registered in a
                        particular region.
                    </p>

                    <div className="feature-form">
                        <div className="form-field">
                            <label htmlFor="region">Region</label>
                            <input
                                id="region"
                                type="text"
                                placeholder="Enter region (e.g. Tallinn)"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleCountSearch();
                                }}
                            />
                        </div>

                        <button
                            className="feature-button"
                            onClick={handleCountSearch}
                            disabled={countLoading}
                        >
                            {countLoading ? "Calculating..." : "Calculate"}
                        </button>
                    </div>

                    {countError && (
                        <div className="feature-message error-message">
                            {countError}
                        </div>
                    )}

                    {countSearched && (
                        <div className="feature-result">
                            {adoptersCount === null ? (
                                <p>Please enter a region.</p>
                            ) : adoptersCount === -1 ? (
                                <p>No adopters found in this region.</p>
                            ) : (
                                <>
                                    <span>Number of adopters</span>
                                    <strong>{adoptersCount}</strong>
                                    <p>Region: {region}</p>
                                </>
                            )}
                        </div>
                    )}
                </section>

                {/* Table-valued function */}
                <section className="feature-card">
                    <div className="feature-card-heading">
                        <div className="feature-icon">⌂</div>
                        <div>
                            <h3>Available Animals by Shelter</h3>
                            <span>Table-valued function</span>
                        </div>
                    </div>

                    <p className="feature-description">
                        Display animals available for adoption in a selected
                        shelter.
                    </p>

                    <div className="feature-form">
                        <div className="form-field">
                            <label htmlFor="shelterId">Shelter ID</label>
                            <input
                                id="shelterId"
                                type="number"
                                min="1"
                                placeholder="Enter shelter ID"
                                value={shelterId}
                                onChange={(e) => setShelterId(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter")
                                        handleAnimalsSearch();
                                }}
                            />
                        </div>

                        <button
                            className="feature-button"
                            onClick={handleAnimalsSearch}
                            disabled={animalsLoading}
                        >
                            {animalsLoading ? "Searching..." : "Search"}
                        </button>
                    </div>

                    {animalsError && (
                        <div className="feature-message error-message">
                            {animalsError}
                        </div>
                    )}

                    {animalsSearched && (
                        <div className="feature-result-table">
                            <div className="feature-result-heading">
                                <div>
                                    <h4>Available Animals</h4>
                                    {animals.length > 0 && (
                                        <p className="feature-shelter-name">
                                            Shelter: {animals[0].shelterName}
                                        </p>
                                    )}
                                </div>

                                <span>{animals.length} found</span>
                            </div>

                            {animals.length === 0 ? (
                                <p className="feature-empty">
                                    No available animals found in this shelter.
                                </p>
                            ) : (
                                <div className="table-wrapper">
                                    <table className="animals-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Species</th>
                                                <th>Breed</th>
                                                <th>Gender</th>
                                                <th>Arrival Date</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {animals.map((animal) => (
                                                <tr key={animal.animalID}>
                                                    <td>{animal.animalID}</td>
                                                    <td className="animal-name">
                                                        {animal.animalName}
                                                    </td>
                                                    <td>{animal.species}</td>
                                                    <td>
                                                        {animal.breed || "—"}
                                                    </td>
                                                    <td>{animal.gender}</td>
                                                    <td>
                                                        {new Date(
                                                            animal.arrivalDate,
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    <td>
                                                        {animal.notes || "—"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
