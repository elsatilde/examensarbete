import { useState } from "react";
import { useUser } from "./useUser";
import { Outfit } from "../types/Outfit.types";
import { addOutfit as addOutfitService, getOutfits as getOutfitsService, deleteOutfit as deleteOutfitService } from "../services/outfits";


export function useOutfits() {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const addOutfit = async (topId: string, bottomId: string, shoesId: string) => {
        if (!user) throw new Error("User not logged in");
        setLoading(true);
        try {
            return await addOutfitService(user, topId, bottomId, shoesId);
        } finally {
            setLoading(false);
        }       
    };

    const getOutfits = async (): Promise<Outfit[]> => {
        if (!user) throw new Error("User not logged in");
        setLoading(true);
        try {
            return await getOutfitsService(user);
        } finally {
            setLoading(false);
        }
    };

    const deleteOutfit = async (outfitId: string) => {
        if (!user) throw new Error("User not logged in");
        setLoading(true);
        try {
            await deleteOutfitService(user, outfitId);
        } finally {
            setLoading(false);
        }
    };

    return { addOutfit, getOutfits, deleteOutfit, loading };

}