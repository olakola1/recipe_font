import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchRecipes } from "../../../store/catalog/thunk.ts";
import { getRecipe, getRecipeLoading, getRecipeError } from "../../../store/catalog/selectorRecipe.ts";
import { CardContainer } from "../../../components/Card";
import { CardMaps } from "../../../components/Card/maps";

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(getRecipe);
    const loading = useAppSelector(getRecipeLoading);
    const error = useAppSelector(getRecipeError);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div>
            <CardContainer>
                <CardMaps recipes={recipes} />
            </CardContainer>
        </div>
    );
};