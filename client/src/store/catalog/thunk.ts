import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Recipe, RecipeToCreate } from '../types.ts';


const API_BASE_URL = 'https://recipe-back-1-gvwf.onrender.com/api';

export const fetchRecipes = createAsyncThunk(
    'recipes/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/recipes`);
            if (!response.ok) throw new Error('Server error');
            return await response.json() as Recipe[];
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
        }
    }
);

export const addRecipeToServer = createAsyncThunk(
    'recipes/add',
    async (recipe: RecipeToCreate, { rejectWithValue }) => {
        try {

            if (!recipe.title.trim() || !recipe.ingredients.trim() || recipe.time <= 0) {
                throw new Error('Заполните все обязательные поля');
            }

            const response = await fetch(`${API_BASE_URL}/recipes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...recipe,
                    image: recipe.image || null
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to add recipe');
            }

            return (await response.json()) as Recipe;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown add error';
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteRecipeFromServer = createAsyncThunk(
    'recipes/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Server error');
            return id;
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
        }
    }
);

export const toggleFavoriteRecipe = createAsyncThunk(
    'recipes/toggleFavorite',
    async ({ id, isFavorite }: { id: number, isFavorite: boolean }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/recipes/${id}/favorite`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isFavorite })
            });
            if (!response.ok) throw new Error('Server error');
            return await response.json() as Recipe;
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
        }
    }
);