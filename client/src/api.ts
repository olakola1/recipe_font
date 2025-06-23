const API_BASE_URL = 'https://your-render-app.onrender.com/api';

export const apiConfig = {
    baseUrl: API_BASE_URL,
    endpoints: {
        recipes: `${API_BASE_URL}/recipes`,
        favorite: (id: number) => `${API_BASE_URL}/recipes/${id}/favorite`,
    },
};