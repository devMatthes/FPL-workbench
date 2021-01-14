import { FetchAllPlayers } from './FetchAllPlayers'

let ratedPlayers = [];

function RatePlayer(item) {
    let valueIndex = 0;

    if (item.element_type === 4) {
        valueIndex = 
            parseFloat(item.form) + 
            parseFloat(item.points_per_game) +  
            ((100 - parseFloat(item.ict_index))/10) + 
            item.goals_scored + 
            item.assists + 
            (item.red_cards * 2) + 
            item.yellow_cards + 
            (item.bonus / 10) + 
            (item.bps / 100); 
    }

    item["value_index"] = valueIndex;
    ratedPlayers.push(item)
}

const RatePlayers = async () => {
    const players_FPL = await FetchAllPlayers();
    players_FPL.forEach(RatePlayer)
    return ratedPlayers;
}

export { RatePlayers }