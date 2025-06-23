import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.scss'
import store from "./store/store.ts";
import { Provider } from 'react-redux';
import { Router } from './components/Router';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <Router />
        </Provider>
    </StrictMode>
);
