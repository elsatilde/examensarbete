import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { AppUser } from "../types/User.types";
import { db } from "./firebase";
import { Outfit } from "../types/Outfit.types";


export async function addOutfit(user: AppUser, topId: string, bottomId: string, shoesId: string) {
    if (!user) throw new Error("User not logged in");

    const docRef = await addDoc(collection(db, "users", user.uid, "outfits"), {
        topId,
        bottomId,
        shoesId,
        createdAt: serverTimestamp(),
    });

    return docRef.id;
}

export async function getOutfits(user: AppUser): Promise<Outfit[]> {
    if (!user) throw new Error("User not logged in");

    const snapshot = await getDocs(collection(db, "users", user.uid, "outfits"));

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Outfit, "id">)
    }));
}

export async function deleteOutfit(user: AppUser, outfitId: string) {
    if (!user) throw new Error("User not logged in");
  
    await deleteDoc(doc(db, "users", user.uid, "outfits", outfitId));
}

export async function getLatestOutfits(user: AppUser, amount = 3): Promise<Outfit[]> {
    if (!user) throw new Error("User not logged in");

    const q = query(
        collection(db, "users", user.uid, "outfits"),
        orderBy("createdAt", "desc"),
        limit(amount)
    )
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Outfit, "id">),
    }));
}