import { useEffect, useState } from "react";
import { Outfit } from "../types/Outfit.types";
import { getGarmentById } from "../services/garments";
import { Image, View } from "react-native";
import { colors } from "../variables/colors";
import { Garment } from "../types/Garment.types";
import { AppUser } from "../types/User.types";

export type OutfitItems = {
    top?: Garment | null;
    bottom?: Garment | null;
    shoes?: Garment | null;
};

export default function DispalyOutfit({ outfit, user, variant = "default", style }
    : {outfit: Outfit; user: AppUser | null; variant?: "default" | "compact"; style?: any}) {
    const [items, setItems] = useState<OutfitItems>({});

    useEffect(() => {
        if (!user) return;
        if (!outfit) return;

        const load = async () => {
            const top = await getGarmentById(user, outfit.topId);
            const bottom = await getGarmentById(user, outfit.bottomId);
            const shoes = await getGarmentById(user, outfit.shoesId);

            setItems({ top, bottom, shoes});
        };

        load();     
    }, [user, outfit]);

    if (!items.top || !items.bottom || !items.shoes) return null;

    return (
        <View style={{ 
            borderColor: colors.accent, 
            borderWidth: 2, 
            height: variant === "compact" ? 180 : 300, 
            width: variant === "compact" ? 180 : 300 }}>

            <Image
                source={{ uri: items.top.imageUrl }}
                style={{
                    width: variant === "compact" ? 70 : 115, 
                    height: variant === "compact" ? 70 : 115,
                    marginLeft: 15,
                    marginTop: variant === "compact" ? 10 : 30, 
                    marginRight: 25, 
                    marginBottom: variant === "compact" ? -5 : -30,
                }}
            />

            <Image
                source={{ uri: items.bottom.imageUrl }}
                style={{
                    width: variant === "compact" ? 70 : 115, 
                    height: variant === "compact" ? 70 : 115,
                    marginLeft: variant === "compact" ? 100 : 170, 
                    marginTop: -20, 
                    marginBottom: -70,
                }}
            />

            <Image
                source={{ uri: items.shoes.imageUrl }}
                style={{
                    width: variant === "compact" ? 70 : 115, 
                    height: variant === "compact" ? 70 : 115,
                    marginLeft: variant === "compact" ? 20 : 40, 
                    marginTop: variant === "compact" ? 35 : 20,
                }}
            />

        </View>

    );
}