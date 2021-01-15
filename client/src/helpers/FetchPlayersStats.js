const API_URL = 'http://localhost:5000/stats';

const FetchPlayersStats = async () => {
    const response = await fetch(API_URL);
    const playersStats = await response.json();
    return playersStats;
}

export { FetchPlayersStats }