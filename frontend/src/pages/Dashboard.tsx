import { useEffect, useState } from "react";
import {
    getAnimals,
    getSheltersCount,
    getAdoptionsCount,
    type Animal,
} from "../services/api";

function Dashboard() {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [sheltersCount, setSheltersCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [adoptionsCount, setAdoptionsCount] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadAnimals() {
            try {
                const [animalsData, sheltersData, adoptionsData] =
                    await Promise.all([
                        getAnimals(),
                        getSheltersCount(),
                        getAdoptionsCount(),
                    ]);

                setAnimals(animalsData);
                setSheltersCount(sheltersData);
                setAdoptionsCount(adoptionsData);
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

    const availableAnimals = animals.filter((animal) => {
        const status = animal.status.toLowerCase();
        return status === "available" || status === "long-term stay";
    });

    const recentAnimals = [...animals]
        .sort(
            (a, b) =>
                new Date(b.arrivalDate).getTime() -
                new Date(a.arrivalDate).getTime(),
        )
        .slice(0, 5);

    if (loading) {
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return (
            <div className="error-message">
                <h3>Unable to load dashboard</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="welcome-section">
                <h2>Welcome to Happy Paws!</h2>
                <p>Here is what's happening in your animal shelter.</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon green">🐾</div>
                    <p>Total Animals</p>
                    <h3>{animals.length}</h3>
                    <span>Registered animals</span>
                </div>

                <div className="stat-card">
                    <div className="stat-icon blue">♡</div>
                    <p>Available Animals</p>
                    <h3>{availableAnimals.length}</h3>
                    <span>Waiting for adoption</span>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange">⌂</div>
                    <p>Shelters</p>
                    <h3>{sheltersCount}</h3>
                    <span>Total registered shelters</span>
                </div>

                <div className="stat-card">
                    <div className="stat-icon purple">♥</div>
                    <p>Adoptions</p>
                    <h3>{adoptionsCount}</h3>
                    <span>Total adoption records</span>
                </div>
            </div>

            <section className="recent-section">
                <div className="section-heading">
                    <div>
                        <h2>Recent Animals</h2>
                        <p>Recently registered animals in the shelter</p>
                    </div>
                </div>

                {recentAnimals.length === 0 ? (
                    <p>No animals found.</p>
                ) : (
                    <div className="table-wrapper">
                        <table className="animals-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Species</th>
                                    <th>Breed</th>
                                    <th>Shelter</th>
                                    <th>Status</th>
                                    <th>Arrival Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentAnimals.map((animal) => (
                                    <tr key={animal.id}>
                                        <td className="animal-name">
                                            {animal.name}
                                        </td>
                                        <td>{animal.species}</td>
                                        <td>{animal.breed || "—"}</td>
                                        <td>{animal.shelterName}</td>
                                        <td>
                                            <span className="status-badge">
                                                {animal.status}
                                            </span>
                                        </td>
                                        <td>
                                            {new Date(
                                                animal.arrivalDate,
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Dashboard;
