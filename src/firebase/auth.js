import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./config";

export const googleLogin = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);