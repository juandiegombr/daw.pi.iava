import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import SensorList from "../components/SensorList";
import SensorForm from "../components/SensorForm";
import SensorEditForm from "../components/SensorEditForm";
import ConfirmDialog from "../components/ConfirmDialog";

export default function SensorsPage() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingSensorId, setDeletingSensorId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [editingSensor, setEditingSensor] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sensorToDelete, setSensorToDelete] = useState(null);

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

  const handleDeleteSensor = (sensorId) => {
    const sensor = sensors.find(s => s._id === sensorId);
    setSensorToDelete(sensor);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteSensor = async () => {
    if (!sensorToDelete) return;

    setDeletingSensorId(sensorToDelete._id);
    setDeleteError(null);
    setShowDeleteConfirm(false);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/sensors/${sensorToDelete._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el sensor");
      }

      setSensors((prev) => prev.filter((sensor) => sensor._id !== sensorToDelete._id));
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeletingSensorId(null);
      setSensorToDelete(null);
    }
  };

  const cancelDeleteSensor = () => {
    setShowDeleteConfirm(false);
    setSensorToDelete(null);
  };

  const handleEditSensor = (sensor) => {
    setEditingSensor(sensor);
  };

  const handleSensorUpdated = (updatedSensor) => {
    setSensors((prev) =>
      prev.map((sensor) =>
        sensor._id === updatedSensor._id ? updatedSensor : sensor
      )
    );
  };

  const handleCloseEditForm = () => {
    setEditingSensor(null);
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {deleteError && (
          <div className="mb-4">
            <ErrorMessage message={deleteError} />
          </div>
        )}
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && sensors.length === 0 && <EmptyState />}
        {!loading && !error && sensors.length > 0 && (
          <SensorList
            sensors={sensors}
            onDeleteSensor={handleDeleteSensor}
            onEditSensor={handleEditSensor}
            deletingSensorId={deletingSensorId}
          />
        )}
      </main>
      <SensorForm onSensorAdded={handleSensorAdded} />
      {editingSensor && (
        <SensorEditForm
          sensor={editingSensor}
          onSensorUpdated={handleSensorUpdated}
          onClose={handleCloseEditForm}
        />
      )}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onConfirm={confirmDeleteSensor}
        onCancel={cancelDeleteSensor}
        title="Eliminar Sensor"
        message={`¿Estás seguro de que deseas eliminar el sensor "${sensorToDelete?.alias}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  );
}
