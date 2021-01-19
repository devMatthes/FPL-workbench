import { FetchAllPlayers } from './FetchAllPlayers'
import { FetchPlayersStats } from './FetchPlayersStats';

let playersFPL = [];
let playersStats = [];

function AssignPlayerStats(item) {
    for (let i = 0; i < playersStats.length; i++) {
        if (playersStats[i]["player_name"].includes(item.web_name)) {
                const xG = Math.round((parseFloat(playersStats[i]["xG"]) + Number.EPSILON) * 100) / 100;
                const xA = Math.round((parseFloat(playersStats[i]["xA"]) + Number.EPSILON) * 100) / 100;
                item["xG"] = xG;
                item["xA"] = xA;
        } else {
            item["xG"] = 0;
            item["xA"] = 0;
        }
    }                
}


const AssignPlayersStats = async () => {
    playersStats = await FetchPlayersStats();
    playersFPL = await FetchAllPlayers();
    playersFPL.forEach(AssignPlayerStats)
    return playersFPL;
}

export { AssignPlayersStats }