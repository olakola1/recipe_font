import { createSlice } from '@reduxjs/toolkit';
import type { Recipe } from '../types.ts';
import {
    addRecipeToServer,
    deleteRecipeFromServer,
    fetchRecipes,
    toggleFavoriteRecipe
} from './thunk.ts';

interface RecipeState {
    items: Recipe[];
    loading: boolean;
    error: string | null;
}

const initialState: RecipeState = {
    items: [],
    loading: false,
    error: null
};

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addRecipeToServer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRecipeToServer.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload); // Добавляем в начало
            })
            .addCase(addRecipeToServer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteRecipeFromServer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRecipeFromServer.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(recipe => recipe.id !== action.payload);

                if (state.items.length === 0) {
                    state.items = [];
                }
            })
            .addCase(deleteRecipeFromServer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(toggleFavoriteRecipe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleFavoriteRecipe.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(r => r.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(toggleFavoriteRecipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default recipeSlice.reducer;