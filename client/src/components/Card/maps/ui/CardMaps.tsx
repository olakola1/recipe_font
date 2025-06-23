import React, { useState } from 'react';
import style from './style.module.scss';
import { Recipe } from "../../../../store/types.ts";
import { Search } from "../../../Search";
import { ButtonScroll } from "../../../ButtonSkroll";
import { useAppDispatch } from "../../../../store/store";
import { toggleFavoriteRecipe } from "../../../../store/catalog/thunk.ts";

interface CardMapsProps {
    recipes: Recipe[];
}

export const CardMaps: React.FC<CardMapsProps> = ({ recipes }) => {
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    const handleToggleFavorite = (recipe: Recipe) => {
        dispatch(toggleFavoriteRecipe({
            id: recipe.id,
            isFavorite: !recipe.isFavorite
        }));
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div>
                <Search onSearch={(query) => setSearchQuery(query)}/>
            </div>
            <div className={style.container_card}>
                {filteredRecipes.map((recipe) => (
                    <div key={recipe.id} className={style.cardWrapper}>
                        {recipe.image &&
                            <img
                                className={style.img_card}
                                src={recipe.image}
                                alt={recipe.title}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        }
                        <h3>{recipe.title}</h3>
                        <p>{recipe.ingredients}</p>
                        <p>Время приготовления: {recipe.time} мин</p>
                        <button
                            className={style.button_card}
                            onClick={() => handleToggleFavorite(recipe)}
                        >
                            {recipe.isFavorite ? 'Удалить из избранного' : 'Добавить в любимые'}
                            <svg width="20" height="27" viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M22.0625 0H2.9375C1.38725 0 0.125 1.49467 0.125 3.33333V31.9947l12.375-14.5907L24.875 31.9947V3.33333C24.875 1.49467 23.6128 0 22.0625 0ZM23.75 28.7867L12.5 15.524L1.25 28.7867V3.33333C1.25 2.23067 2.00712 1.33333 2.9375 1.33333H22.0625C22.9929 1.33333 23.75 2.23067 23.75 3.33333V28.7867Z"
                                    fill={recipe.isFavorite ? "#FF0000" : "#6D991B"}
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            <ButtonScroll/>
        </>
    );
};