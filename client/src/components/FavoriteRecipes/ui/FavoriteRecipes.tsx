import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getRecipe } from "../../../store/catalog/selectorRecipe";
import style from './style.module.scss';
import { toggleFavoriteRecipe } from "../../../store/catalog/thunk";
import { Recipe } from '../../../store/types';
import { RecipeCard } from '../../RecipeCard';

export const FavoriteRecipes = () => {
    const dispatch = useAppDispatch();
    const allRecipes = useAppSelector(getRecipe);
    const favoriteRecipes = allRecipes.filter(recipe => recipe.isFavorite);

    const handleRemoveFavorite = (recipe: Recipe) => {
        dispatch(toggleFavoriteRecipe({
            id: recipe.id,
            isFavorite: false
        }));
    };

    return (
        <div className={style.container_favorite}>
            <h2>Любимые рецепты</h2>

            {favoriteRecipes.length === 0 ? (
                <div className={style.empty_message}>
                    <p>У тебя еще нет любимых рецептов</p>
                </div>
            ) : (
                <div className={style.catalog_favorite}>
                    {favoriteRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                        >
                            <button
                                className={style.button_favorite}
                                onClick={() => handleRemoveFavorite(recipe)}
                            >
                                Удалить из избранного
                            </button>
                        </RecipeCard>
                    ))}
                </div>
            )}
        </div>
    );
};