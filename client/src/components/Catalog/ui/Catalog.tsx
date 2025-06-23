import React from 'react';
import style from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { deleteRecipeFromServer} from "../../../store/catalog/thunk.ts";
import { getRecipe, getRecipeLoading, getRecipeError } from "../../../store/catalog/selectorRecipe.ts";


export const Catalog = () => {
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(getRecipe);
    const loading = useAppSelector(getRecipeLoading);
    const error = useAppSelector(getRecipeError);

    const handleDelete = async (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить этот рецепт?')) {
            await dispatch(deleteRecipeFromServer(id));
        }
    };

    if (loading) return <div className={style.loading}>Загрузка...</div>;
    if (error) return <div className={style.error}>Ошибка: {error}</div>;

    return (
        <div className={style.catalog}>
            <h2>Мои рецепты</h2>
            <div className={style.recipeList}>
                {recipes.map(recipe => (
                    <div key={recipe.id} className={style.recipeCard}>
                        <h3>{recipe.title}</h3>
                        <p>Время приготовления: {recipe.time} мин</p>
                        <button
                            onClick={() => handleDelete(recipe.id)}
                            className={style.deleteButton}
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};