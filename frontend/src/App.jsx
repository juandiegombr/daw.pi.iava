import Header from "./components/Header";
import SensorsPage from "./pages/SensorsPage";

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      <Header />
      <SensorsPage />
    </div>
  );
}
