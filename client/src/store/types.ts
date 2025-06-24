export interface Recipe {
    id: number;
    title: string;
    ingredients: string;
    description: string;
    time: number;
    image?: string;
    isFavorite?: boolean;
}

export interface RecipeToCreate {
    title: string;
    ingredients: string;
    description: string;
    time: number;
    image?: string;
}

export interface RecipeFormErrors {
    title?: string;
    ingredients?: string;
    description: string;
    time?: string;
    image?: string;
}