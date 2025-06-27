import { useState } from "react";

export default function CarForm({ onSubmit }) {
  const [car, setCar] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    description: ""
  });

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(car);
    setCar({ make: "", model: "", year: "", price: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow max-w-md">
      <h3 className="text-lg font-semibold mb-2">Add New Car</h3>
      <input name="make" placeholder="Make" value={car.make} onChange={handleChange} className="border p-1 mb-2 w-full" required />
      <input name="model" placeholder="Model" value={car.model} onChange={handleChange} className="border p-1 mb-2 w-full" required />
      <input name="year" placeholder="Year" value={car.year} onChange={handleChange} className="border p-1 mb-2 w-full" required />
      <input name="price" placeholder="Price" value={car.price} onChange={handleChange} className="border p-1 mb-2 w-full" required />
      <textarea name="description" placeholder="Description" value={car.description} onChange={handleChange} className="border p-1 mb-2 w-full" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Car</button>
    </form>
  );
}