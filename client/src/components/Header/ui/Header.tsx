import React, { useState } from 'react';
import style from './style.module.scss';
import { Link } from "react-router-dom";
import { RecipeModal } from "../../Modal";
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { addRecipeToServer } from "../../../store/catalog/thunk";
import { Routes as Paths } from '../../../config/routes';
import { getRecipe } from "../../../store/catalog/selectorRecipe";
import { RecipeToCreate } from '../../../store/types';

export const Header = () => {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const recipes = useAppSelector(getRecipe);

    const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);

    const handleSaveRecipe = async (recipe: RecipeToCreate) => {
        try {
            await dispatch(addRecipeToServer(recipe)).unwrap();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };

    return (
        <div className={style.container}>
            <Link to="/home">
                <div className="logo">
                    <img src="/img/Logo.svg" alt="Логотип" />
                </div>
            </Link>
            <nav>
                <div className={style.nav}>
                    <Link to={Paths.catalog} className={style.navbar}>
                        Моя книга рецептов {recipes.length > 0 && `(${recipes.length})`}
                    </Link>
                    <Link to={Paths.favorite} className={style.navbar}>
                        Любимые рецепты {favoriteRecipes.length > 0 && `(${favoriteRecipes.length})`}
                    </Link>
                    <button
                        className={style.button_new_recipe}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Добавить рецепт
                    </button>
                    <Link to="https://t.me/a_useful_recipe_bot" target="_blank" rel="noopener noreferrer">
                        <img src="/img/telegram.png" alt="Телеграм" className={style.icon} />
                    </Link>
                </div>
            </nav>
            <RecipeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRecipe}
            />
        </div>
    );
};