import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getRecipe } from "../../../store/catalog/selectorRecipe";
import style from './style.module.scss';
import { toggleFavoriteRecipe } from "../../../store/catalog/thunk";
import { Recipe } from '../../../store/types';

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
                <div>
                    <p>У тебя еще нет любимых рецептов</p>
                </div>
            ) : (
                <div className={style.catalog_favorite}>
                    {favoriteRecipes.map((recipe) => (
                        <div key={recipe.id} className={style.catalog_favorite_wrapper}>
                            {recipe.image && (
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className={style.img_desert}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            )}
                            <h3>{recipe.title}</h3>
                            <p>{recipe.ingredients}</p>
                            <p>Время приготовления: {recipe.time} мин</p>
                            <button
                                className={style.button_favorite}
                                onClick={() => handleRemoveFavorite(recipe)}
                            >
                                Удалить из избранного
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};