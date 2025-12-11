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

export default function DispalyOutfit({ outfit, user }: {outfit: Outfit; user: AppUser | null}) {
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
        <View style={{ borderColor: colors.accent, borderWidth: 2, height: 300, width: 300 }}>

            <Image
                source={{ uri: items.top.imageUrl }}
                style={{
                    width: 115, height: 115,
                    marginLeft: 15, marginTop: 30, marginRight: 25, marginBottom: -30,
                }}
            />

            <Image
                source={{ uri: items.bottom.imageUrl }}
                style={{
                    width: 115, height: 115,
                    marginLeft: 170, marginTop: -20, marginBottom: -70,
                }}
            />

            <Image
                source={{ uri: items.shoes.imageUrl }}
                style={{
                    width: 115, height: 115,
                    marginLeft: 40, marginTop: 20,
                }}
            />

        </View>

    );
}