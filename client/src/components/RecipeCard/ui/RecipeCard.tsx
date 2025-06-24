import React from 'react';
import {useState} from "react";
import style from './style.module.scss';
import { Recipe } from "../../../store/types.ts";

interface RecipeCardProps {
    recipe: Recipe;
    children?: React.ReactNode;
}

const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return [
        hours > 0 ? `${hours} ч` : null,
        mins > 0 ? `${mins} мин` : null
    ].filter(Boolean).join(' ') || 'Время не указано';
};


export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCardClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(false);
    };

    return (
        <>
            {isExpanded && (
                <div
                    className={style.overlay}
                    onClick={handleOverlayClick}
                />
            )}

            <div
                className={`${style.cardWrapper} ${isExpanded ? style.expanded : ''}`}
                onClick={handleCardClick}
            >
                <div className={style.cardContent}>
                    {recipe.image && (
                        <img
                            className={style.img_card}
                            src={recipe.image}
                            alt={recipe.title}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    )}
                    <h3>{recipe.title}</h3>
                    <p className={style.ingredients}>{recipe.ingredients}</p>
                    <p className={style.description}>{recipe.description}</p>
                    <p className={style.time}>{formatTime(recipe.time)}</p>
                </div>
                {children}
            </div>
        </>
    );
};