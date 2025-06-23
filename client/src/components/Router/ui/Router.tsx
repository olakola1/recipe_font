import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from '../../../pages';
import { CatalogPage } from "../../../pages";
import { FavoritePage } from "../../../pages";
import { Header } from '../../Header';
import { Routes as Paths  } from '../../../config/routes'

export const Router = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path={Paths.home} element={<HomePage />} />
                <Route path={Paths.catalog} element={<CatalogPage />} />
                <Route path={Paths.favorite} element={<FavoritePage />} />
            </Routes>
        </BrowserRouter>
    );
};