import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { createAdoption, getAdoptions } from "../services/api";
import type { AdoptionRecord } from "../services/api";

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

    // Adoption records
    const [adoptions, setAdoptions] = useState<AdoptionRecord[]>([]);
    const [loadingRecords, setLoadingRecords] = useState(true);
    const [recordsError, setRecordsError] = useState("");

    const loadAdoptions = useCallback(async () => {
        setLoadingRecords(true);
        setRecordsError("");

        try {
            const data = await getAdoptions();
            setAdoptions(data);
        } catch (err) {
            setRecordsError(
                err instanceof Error
                    ? err.message
                    : "Failed to load adoption records.",
            );
        } finally {
            setLoadingRecords(false);
        }
    }, []);

    useEffect(() => {
        loadAdoptions();
    }, [loadAdoptions]);

    useEffect(() => {
        if (selectedAnimalId !== null) {
            setAnimalId(selectedAnimalId);
            setError("");
            setSuccess("");
        }
    }, [selectedAnimalId]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

            // Refresh adoption records after successful creation
            await loadAdoptions();

            onAdoptionComplete();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong.",
            );
        } finally {
            setLoading(false);
        }
    }

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString("en-GB");
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

            {/* Adoption records table */}
            <section className="adoption-records-section">
                <div className="adoption-records-heading">
                    <div>
                        <h3>Adoption Records</h3>
                        <p>All registered animal adoptions</p>
                    </div>

                    <button
                        type="button"
                        className="refresh-adoptions-button"
                        onClick={loadAdoptions}
                        disabled={loadingRecords}
                    >
                        {loadingRecords ? "Loading..." : "Refresh"}
                    </button>
                </div>

                {recordsError && (
                    <div className="form-message error-message">
                        {recordsError}
                    </div>
                )}

                {loadingRecords ? (
                    <p className="adoption-records-message">
                        Loading adoption records...
                    </p>
                ) : !recordsError && adoptions.length === 0 ? (
                    <p className="adoption-records-message">
                        No adoption records found.
                    </p>
                ) : !recordsError ? (
                    <div className="adoption-table-wrapper">
                        <table className="adoption-records-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Animal</th>
                                    <th>Species</th>
                                    <th>Adopter</th>
                                    <th>Shelter</th>
                                    <th>Adoption Date</th>
                                    <th>Fee</th>
                                </tr>
                            </thead>

                            <tbody>
                                {adoptions.map((adoption) => (
                                    <tr key={adoption.id}>
                                        <td>#{adoption.id}</td>
                                        <td className="adoption-animal-name">
                                            {adoption.animalName}
                                        </td>
                                        <td>{adoption.species}</td>
                                        <td>{adoption.adopterName}</td>
                                        <td>{adoption.shelterName}</td>
                                        <td>
                                            {formatDate(adoption.adoptionDate)}
                                        </td>
                                        <td className="adoption-fee">
                                            €{adoption.fee.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : null}

                {!loadingRecords && !recordsError && adoptions.length > 0 && (
                    <p className="adoption-records-count">
                        Total records: {adoptions.length}
                    </p>
                )}
            </section>
        </div>
    );
}

export default Adoptions;
