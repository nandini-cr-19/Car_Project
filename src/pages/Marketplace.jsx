import { useEffect, useState } from "react";
import { getCars, requestPurchase } from "../firebase/firestore";
import { useAuth } from "../context/AuthContext";
import CarCard from "../components/CarCard";

export default function Marketplace() {
  const { currentUser } = useAuth();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetch = async () => setCars(await getCars());
    fetch();
  }, []);

  const handleRequest = async (carId) => {
    await requestPurchase(carId, currentUser.uid);
    alert("Request sent!");
  };

  return (
    <section className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Available Cars</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} onRequest={handleRequest} />
        ))}
      </div>
    </section>
  );
}