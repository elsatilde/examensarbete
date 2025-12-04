export type GarmentCategory = "top" | "bottom" | "shoes";

export const GARMENT_CATEGORIES: GarmentCategory[] = [
    "top",
    "bottom",
    "shoes",
  ];

export type Garment = {
    id: string;
    imageUrl: string;
    category: GarmentCategory;
    createdAt: number;
}