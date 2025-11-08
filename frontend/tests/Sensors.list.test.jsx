import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

global.fetch = vi.fn();

describe("Sensor List", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_URL", "http://test.com/api");
  });

  afterEach(() => {
    fetch.mockClear();
  });

  it("WHEN sensors are loaded THEN renders app header with title and description", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        data: {
          sensors: [
            {
              _id: "1",
              alias: "Temperature Sensor",
              type: "float",
              createdAt: "2024-01-01T10:00:00.000Z",
              updatedAt: "2024-01-02T15:30:00.000Z",
            },
          ],
        },
      }),
    });

    render(<App />);
    await screen.findByText("Sensores Activos");

    expect(screen.getByText("Industrial Monitor")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Monitor de señales de sensores de máquinas industriales en tiempo real"
      )
    ).toBeInTheDocument();
  });

  it("WHEN no sensors exist THEN renders header and empty state message", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ data: { sensors: [] } }),
    });

    render(<App />);
    await screen.findByText("No hay sensores disponibles en este momento");

    expect(screen.getByText("Industrial Monitor")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Monitor de señales de sensores de máquinas industriales en tiempo real"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Esperando configuración de sensores...")
    ).toBeInTheDocument();
  });

  it("WHEN fetching sensors THEN shows loading spinner", () => {
    fetch.mockImplementationOnce(() => new Promise(() => {}));

    render(<App />);

    expect(
      screen.getByRole("status", { name: "Cargando sensores" })
    ).toBeInTheDocument();
  });

  it("WHEN API call succeeds THEN displays sensors", async () => {
    const mockSensors = [
      {
        _id: "1",
        alias: "Temperature Sensor",
        type: "float",
        createdAt: "2024-01-01T10:00:00.000Z",
        updatedAt: "2024-01-02T15:30:00.000Z",
      },
      {
        _id: "2",
        alias: "Pressure Sensor",
        type: "int",
        createdAt: "2024-01-01T11:00:00.000Z",
        updatedAt: "2024-01-02T16:30:00.000Z",
      },
    ];

    fetch.mockResolvedValueOnce({
      json: async () => ({ data: { sensors: mockSensors } }),
    });

    render(<App />);
    await screen.findByText("Sensores Activos");

    expect(screen.getByText("(2 sensores)")).toBeInTheDocument();
    expect(screen.getByText("Temperature Sensor")).toBeInTheDocument();
    expect(screen.getByText("Pressure Sensor")).toBeInTheDocument();
  });

  it("WHEN no sensors exist THEN displays empty state", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ data: { sensors: [] } }),
    });

    render(<App />);
    await screen.findByText("No hay sensores disponibles en este momento");

    expect(
      screen.getByText("Esperando configuración de sensores...")
    ).toBeInTheDocument();
  });

  it("WHEN API call fails THEN displays error message", async () => {
    const errorMessage = "Network error";
    fetch.mockRejectedValueOnce(new Error(errorMessage));

    render(<App />);
    await screen.findByText("Error al cargar los sensores");

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("WHEN app loads THEN fetches sensors from correct API endpoint", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ data: { sensors: [] } }),
    });

    render(<App />);
    await screen.findByText("No hay sensores disponibles en este momento");

    expect(fetch).toHaveBeenCalledWith("http://test.com/api/sensors", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  });
});
