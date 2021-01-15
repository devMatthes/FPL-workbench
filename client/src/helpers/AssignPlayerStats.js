import { FetchAllPlayers } from './FetchAllPlayers'
import { FetchPlayersStats } from './FetchPlayersStats';

let playersFPL = [];
let playersStats = [];

function AssignPlayerStats(item) {
    // const firstName = item.first_name.replace(/ .*/,'');
    // const lastName = item.second_name.split(' ').pop();
    
    for (let i = 0; i < playersStats.length; i++) {
        if (playersStats[i]["player_name"].includes(item.web_name)) {
                const xG = Math.round((parseFloat(playersStats[i]["xG"]) + Number.EPSILON) * 100) / 100;
                const xA = Math.round((parseFloat(playersStats[i]["xA"]) + Number.EPSILON) * 100) / 100;
                item["xG"] = xG;
                item["xA"] = xA;
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