
import { useEffect, useState } from "react";
import { getAdopters, type Adopter } from "../services/api";

function Adopters() {
    const [adopters, setAdopters] = useState<Adopter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const loadAdopters = async () => {
            try {
                const data = await getAdopters();
                setAdopters(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load adopters"
                );
            } finally {
                setLoading(false);
            }
        };

        loadAdopters();
    }, []);

    const filteredAdopters = adopters.filter((adopter) => {
        const fullName =
            `${adopter.firstName} ${adopter.lastName}`.toLowerCase();

        return (
            fullName.includes(search.toLowerCase()) ||
            adopter.phone.toLowerCase().includes(search.toLowerCase()) ||
            adopter.email?.toLowerCase().includes(search.toLowerCase()) ||
            adopter.address.toLowerCase().includes(search.toLowerCase())
        );
    });

    if (loading) {
        return <div className="loading-message">Loading adopters...</div>;
    }

    if (error) {
        return (
            <div className="error-message">
                <h3>Unable to load adopters</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="adopters-page">
            <div className="adopters-page-header">
                <div>
                    <h2>Adopters</h2>
                    <p>People who have adopted animals from our shelter</p>
                </div>

                <div className="adopters-count">
                    {adopters.length} adopters
                </div>
            </div>

            <div className="adopters-search">
                <input
                    type="text"
                    placeholder="Search by name, phone, email or address..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filteredAdopters.length === 0 ? (
                <div className="empty-state">
                    <h3>No adopters found</h3>
                    <p>Try changing your search.</p>
                </div>
            ) : (
                <div className="adopters-grid">
                    {filteredAdopters.map((adopter) => (
                        <div className="adopter-card" key={adopter.id}>
                            <div className="adopter-card-header">
                                <div className="adopter-avatar">
                                    {adopter.firstName.charAt(0)}
                                    {adopter.lastName.charAt(0)}
                                </div>

                                <span className="adopter-id">
                                    ID #{adopter.id}
                                </span>
                            </div>

                            <h3>
                                {adopter.firstName} {adopter.lastName}
                            </h3>

                            <div className="adopter-info">
                                <div>
                                    <span>Phone</span>
                                    <strong>{adopter.phone}</strong>
                                </div>

                                <div>
                                    <span>Email</span>
                                    <strong>{adopter.email || "Not provided"}</strong>
                                </div>

                                <div>
                                    <span>Address</span>
                                    <strong>{adopter.address}</strong>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Adopters;
