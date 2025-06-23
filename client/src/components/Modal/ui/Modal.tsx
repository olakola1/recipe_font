import React, { useState, useEffect } from 'react';
import style from './style.module.scss';
import { Recipe, RecipeFormErrors } from '../../../store/types.ts';
import { ChangeEvent } from "react";

export interface ModalIProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (recipe: Recipe) => void;
}

export const RecipeModal = ({ isOpen, onClose, onSave }: ModalIProps) => {
    const [newRecipe, setNewRecipe] = useState<Recipe>({
        id: 0,
        title: '',
        ingredients: '',
        time: 0,
        image: '',
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewRecipe({
            ...newRecipe,
            [name]: name === 'time' ? Number(value) : value,
        });
    };

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewRecipe({
                    ...newRecipe,
                    image: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const generateUniqueId = () => Math.floor(Math.random() * 1000000);

    const handleSave = () => {
        const recipeToSave: Recipe = {
            ...newRecipe,
            id: generateUniqueId(),
            image: newRecipe.image,
        };
        onSave(recipeToSave);
        onClose();
        setNewRecipe({
            id: 0,
            title: '',
            ingredients: '',
            time: 0,
            image: '',
        });
    };

    if (!isOpen) return null;

    return (
        <div className={style.modal_container}>
            <div className={style.modal_content}>
                <h2 className={style.modal_wrapper}>Добавить рецепт</h2>
                <label className={style.modal_label}>
                    Название:
                    <input
                        type="text"
                        name="title"
                        value={newRecipe.title}
                        onChange={handleInputChange} />
                </label>
                <label className={style.modal_label}>
                    Ингредиенты:
                    <textarea
                        name="ingredients"
                        value={newRecipe.ingredients}
                        onChange={handleInputChange} />
                </label>
                <label className={style.modal_label}>
                    Время приготовления:
                    <input
                        type="number"
                        name="time"
                        value={newRecipe.time}
                        onChange={handleInputChange} />
                </label>
                <label className={style.modal_label}>
                    Фото:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange} />
                </label>
                <button className={style.modal_button} onClick={handleSave}>Сохранить</button>
                <button className={style.modal_button} onClick={onClose}>Отмена</button>
            </div>
        </div>
    );
};