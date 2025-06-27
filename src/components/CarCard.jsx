import { useState } from "react";

export default function CarCard({ car, onRequest, admin, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [formState, setFormState] = useState(car);

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSave = () => {
    onUpdate(car.id, formState);
    setEditing(false);
  };

  return (
    <div className="border rounded shadow p-4 flex flex-col gap-2">
      {editing ? (
        <>
          <input name="make" value={formState.make} onChange={handleChange} className="border p-1" />
          <input name="model" value={formState.model} onChange={handleChange} className="border p-1" />
          <input name="year" value={formState.year} onChange={handleChange} className="border p-1" />
          <input name="price" value={formState.price} onChange={handleChange} className="border p-1" />
          <button onClick={handleSave} className="bg-green-600 text-white px-2 py-1 rounded">Save</button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold">{car.make} {car.model}</h3>
          <p>Year: {car.year}</p>
          <p>₹{car.price}</p>
          {admin ? (
            <div className="flex gap-2 mt-2">
              <button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
              <button onClick={() => onDelete(car.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
            </div>
          ) : (
            <button onClick={() => onRequest(car.id)} className="bg-green-600 text-white mt-2 px-3 py-1 rounded">
              Request to Buy
            </button>
          )}
        </>
      )}
    </div>
  );
}