import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { db } from "./config";

const carsRef = collection(db, "cars");
const requestsRef = collection(db, "purchaseRequests");

export const addCar = async (car) => {
  return await addDoc(carsRef, {
    ...car,
    isSold: false,
    createdAt: Date.now(),
  });
};

export const getCars = async () => {
  const snapshot = await getDocs(carsRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateCar = async (carId, data) => {
  const carDoc = doc(db, "cars", carId);
  await updateDoc(carDoc, data);
};

export const deleteCar = async (carId) => {
  await deleteDoc(doc(db, "cars", carId));
};

export const requestPurchase = async (carId, buyerId) => {
  const q = query(requestsRef, where("carId", "==", carId), where("buyerId", "==", buyerId));
  const exists = (await getDocs(q)).size > 0;
  if (exists) return;
  await addDoc(requestsRef, {
    carId,
    buyerId,
    status: "pending",
    createdAt: Date.now(),
  });
};

export const getRequests = async () => {
  const snapshot = await getDocs(requestsRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};