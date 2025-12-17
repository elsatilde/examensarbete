import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { Garment, GarmentCategory } from "../types/Garment.types";
import { AppUser } from "../types/User.types";
import { db } from "./firebase";

export async function addGarment(user: AppUser, category: GarmentCategory, imageUrl: string) {
    if (!user) throw new Error("User not logged in");

    const docRef = await addDoc(collection(db, "users", user.uid, "garments"), {
        category,
        imageUrl,
        createdAt: serverTimestamp(),
    });

    return docRef.id;

};

export async function getGarments(user: AppUser): Promise<Garment[]> {
    if (!user) throw new Error("User not logged in");

    const snapshot = await getDocs(collection(db, "users", user.uid, "garments"));

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Garment, "id">),
    }));
};

export async function deleteGarment(user: AppUser, garmentId: string) {
    if (!user) throw new Error("User not logged in");
  
    await deleteDoc(doc(db, "users", user.uid, "garments", garmentId));
};

export async function getGarmentById(user: AppUser, garmentId: string,): Promise<Garment | null> {
    if (!user) throw new Error("User not logged in");

    const docRef = doc(db, "users", user.uid, "garments", garmentId);
    const snap = await getDoc(docRef);

    return snap.exists() 
        ? {id: snap.id, ...(snap.data() as Omit<Garment, "id"> )}
        : null;
};

export async function getLatestGarments(user: AppUser, amount= 5,): Promise<Garment[]> {
    if (!user) throw new Error("User not logged in");

    const q = query(
        collection(db, "users", user.uid, "garments"),
        orderBy("createdAt", "desc"),
        limit(amount)
    )
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Garment, "id">),
    }));    
}
  