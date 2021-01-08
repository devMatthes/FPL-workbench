const API_URL = 'http://localhost:5000/allPlayers';

const FetchAllPlayers = async () => {
    const response = await fetch(API_URL);
    const allPlayers = await response.json();
    return allPlayers;
}

export { FetchAllPlayers }