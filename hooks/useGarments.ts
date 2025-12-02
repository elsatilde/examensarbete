import { useState } from "react";
import { useUser } from "./useUser";
import { Garment, GarmentCategory } from "../types/Garment.types";
import { addGarment as addGarmentService, getGarments as getGarmentsService, deleteGarment as deleteGarmentService } from "../services/garments";

export function useGarments() {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [garments, setGarments] = useState<Garment[]>([]);

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

    const getGarments = async () => {
        if (!user) throw new Error ("User not logged in");
        setLoading(true);
        try {
            const items = await getGarmentsService(user);
            setGarments(items);
            return items;
        } finally {
            setLoading(false);
        }
    };

    const deleteGarment = async (garmentId: string) => {
        if (!user) throw new Error ("User not logged in");
        setLoading(true);
        try {
            await deleteGarmentService(user, garmentId);
            setGarments(prev => prev.filter(g => g.id !== garmentId));
        } finally {
            setLoading(false);
        }
    };

    return { garments, addGarments, getGarments, deleteGarment, loading };
}

