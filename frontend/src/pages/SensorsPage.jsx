import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import SensorList from "../components/SensorList";
import SensorForm from "../components/SensorForm";

export default function SensorsPage() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(API_URL + "/sensors", { method: "GET", headers: { "Content-Type": "application/json" } })
      .then((response) => response.json())
      .then((result) => {
        setSensors(result.data.sensors);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSensorAdded = (newSensor) => {
    setSensors((prev) => [...prev, newSensor]);
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && sensors.length === 0 && <EmptyState />}
        {!loading && !error && sensors.length > 0 && <SensorList sensors={sensors} />}
      </main>
      <SensorForm onSensorAdded={handleSensorAdded} />
    </>
  );
}
