import { useEffect, useState } from "react";
import { createAdoption } from "../services/api";

interface AdoptionsProps {
    selectedAnimalId: number | null;
    onAdoptionComplete: () => void;
}

function Adoptions({ selectedAnimalId, onAdoptionComplete }: AdoptionsProps) {
    const [animalId, setAnimalId] = useState<number | "">(
        selectedAnimalId ?? "",
    );
    const [adopterId, setAdopterId] = useState("");
    const [fee, setFee] = useState("0");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (selectedAnimalId !== null) {
            setAnimalId(selectedAnimalId);
            setError("");
            setSuccess("");
        }
    }, [selectedAnimalId]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (animalId === "" || Number(animalId) <= 0) {
            setError("Please enter a valid Animal ID.");
            return;
        }

        if (!adopterId || Number(adopterId) <= 0) {
            setError("Please enter a valid Adopter ID.");
            return;
        }

        if (fee === "" || Number(fee) < 0) {
            setError("Fee cannot be negative.");
            return;
        }

        setLoading(true);

        try {
            await createAdoption({
                animalId: Number(animalId),
                adopterId: Number(adopterId),
                fee: Number(fee),
            });

            setSuccess("Adoption created successfully!");
            setAnimalId("");
            setAdopterId("");
            setFee("0");
            onAdoptionComplete();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong.",
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="adoptions-page">
            <div className="adoptions-heading">
                <h2>Create Adoption</h2>
                <p>Register a new adoption in the animal shelter database.</p>
            </div>

            <div className="adoption-form-card">
                <div className="adoption-form-title">
                    <h3>Adoption details</h3>
                    <p>Enter the animal and adopter information below.</p>
                </div>

                <form onSubmit={handleSubmit} className="adoption-form">
                    <div className="form-field">
                        <label htmlFor="animalId">Animal ID</label>
                        <input
                            id="animalId"
                            type="number"
                            min="1"
                            value={animalId}
                            onChange={(event) =>
                                setAnimalId(
                                    event.target.value === ""
                                        ? ""
                                        : Number(event.target.value),
                                )
                            }
                            placeholder="Enter animal ID"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="adopterId">Adopter ID</label>
                        <input
                            id="adopterId"
                            type="number"
                            min="1"
                            value={adopterId}
                            onChange={(event) =>
                                setAdopterId(event.target.value)
                            }
                            placeholder="Enter adopter ID"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="fee">Adoption fee</label>
                        <input
                            id="fee"
                            type="number"
                            min="0"
                            step="0.01"
                            value={fee}
                            onChange={(event) => setFee(event.target.value)}
                            placeholder="Enter adoption fee"
                            required
                        />
                    </div>

                    {error && (
                        <div className="form-message error-message">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="form-message success-message">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="submit-adoption-button"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Adoption"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Adoptions;
