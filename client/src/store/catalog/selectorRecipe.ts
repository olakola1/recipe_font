import { RootState } from "../store.ts";

export const getRecipe = (state: RootState) => state.recipe.items;
export const getRecipeLoading = (state: RootState) => state.recipe.loading;
export const getRecipeError = (state: RootState) => state.recipe.error;