import { useEffect, useState } from "react";
import {
  addCar,
  getCars,
  updateCar,
  deleteCar,
  getRequests,
} from "../firebase/firestore";
import CarCard from "../components/CarCard";
import CarForm from "../components/CarForm";

export default function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [requests, setRequests] = useState([]);
  const [jsonInput, setJsonInput] = useState("");

  const refresh = async () => {
    setCars(await getCars());
    setRequests(await getRequests());
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleAdd = async (car) => {
    if (cars.length >= 5) {
      alert("Limit reached: only 5 cars allowed");
      return;
    }
    await addCar(car);
    refresh();
  };

  const handleBulkAdd = async () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) throw new Error("Paste an array of car objects");

      const allowed = 5 - cars.length;
      if (parsed.length > allowed) {
        alert(`Only ${allowed} more cars can be added.`);
        return;
      }

      for (const car of parsed) {
        if (car.make && car.model && car.year && car.price) {
          await addCar(car);
        }
      }
      setJsonInput("");
      refresh();
      alert("Cars added successfully!");
    } catch (err) {
      alert("Invalid JSON: " + err.message);
    }
  };

  const handleUpdate = async (id, data) => {
    await updateCar(id, data);
    refresh();
  };

  const handleDelete = async (id) => {
    await deleteCar(id);
    refresh();
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Single Car Form */}
      <CarForm onSubmit={handleAdd} />

      {/* JSON Upload Section */}
      <h3 className="text-lg font-semibold mt-6">Upload Cars via JSON</h3>
      <textarea
        placeholder='[{"make":"Honda","model":"Civic","year":"2020","price":"800000","description":"Well maintained."}]'
        className="border w-full p-2 mb-2"
        rows={6}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button
        onClick={handleBulkAdd}
        className="bg-indigo-600 text-white px-4 py-2 rounded shadow"
      >
        Upload
      </button>

      {/* Display Car Listings */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Current Listings</h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            admin
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Purchase Requests */}
      <h3 className="text-xl font-semibold mt-8 mb-2">Purchase Requests</h3>
      <ul className="list-disc ml-5">
        {requests.map((r) => (
          <li key={r.id}>
            Car ID: {r.carId} — Buyer: {r.buyerId} — Status: {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
}