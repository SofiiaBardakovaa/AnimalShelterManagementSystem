import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Animals from "./pages/Animals";
import Adoptions from "./pages/Adoptions";
import AdditionalFeatures from "./pages/AdditionalFeatures";
import "./App.css";

export type Page = "Dashboard" | "Animals" | "Adoptions" | "AdditionalFeatures";

function App() {
    const [activePage, setActivePage] = useState<Page>("Dashboard");
    const [selectedAnimalId, setSelectedAnimalId] = useState<number | null>(
        null,
    );

    const handleAdopt = (animalId: number) => {
        setSelectedAnimalId(animalId);
        setActivePage("Adoptions");
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        document.querySelector(".main-content")?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [activePage]);

    const renderPage = () => {
        switch (activePage) {
            case "Dashboard":
                return <Dashboard />;

            case "Animals":
                return <Animals onAdopt={handleAdopt} />;

            case "Adoptions":
                return (
                    <Adoptions
                        selectedAnimalId={selectedAnimalId}
                        onAdoptionComplete={() => setSelectedAnimalId(null)}
                    />
                );

            case "AdditionalFeatures":
                return <AdditionalFeatures />;

            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="app-layout">
            <Sidebar activePage={activePage} onPageChange={setActivePage} />

            <main className="main-content">
                <Header activePage={activePage} />
                <div className="page-content">{renderPage()}</div>
            </main>
        </div>
    );
}

export default App;
