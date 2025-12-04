import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadImageAsync(
    uri: string,
    userId: string,
    type: "garments" | "outfits"
) {
    const blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(new Error("Failed to convert image to blob"));
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const filename = `users/${userId}/${type}/${Date.now()}.jpg`;
    const imageRef = ref(storage, filename);

    await uploadBytes(imageRef, blob);

    return await getDownloadURL(imageRef); 
}