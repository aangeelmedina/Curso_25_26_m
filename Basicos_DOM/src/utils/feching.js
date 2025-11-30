
const PORT = import.meta.env.VITE_PORT
const VITE_URL = import.meta.env.VITE_URL
const URL_PORT = `${VITE_URL}:${PORT}`

export default async function feching(endpoint) {
    try {
        const response = await fetch(`${URL_PORT}/${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
