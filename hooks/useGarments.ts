import { useState } from "react";
import { useUser } from "./useUser";
import { Garment, GarmentCategory } from "../types/Garment.types";
import { addGarment as addGarmentService, getGarments as getGarmentsService, deleteGarment as deleteGarmentService } from "../services/garments";


export function useGarments() {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const addGarments = async (category: GarmentCategory, imageUrl: string) => {
        if (!user) throw new Error ("User not logged in");
        setLoading(true);
        try {
            const id = await addGarmentService(user, category, imageUrl);
            return id;
        } finally {
            setLoading(false);
        }
    };

    const getGarments = async (): Promise<Garment[]> => {
        if (!user) throw new Error ("User not logged in");
        setLoading(true);
        try {
            return await getGarmentsService(user);
        } finally {
            setLoading(false);
        }
    };

    const deleteGarment = async (garmentId: string) => {
        if (!user) throw new Error ("User not logged in");
        setLoading(true);
        try {
            await deleteGarmentService(user, garmentId)
        } finally {
            setLoading(false);
        }
    };

    return { addGarments, getGarments, deleteGarment, loading}
}

