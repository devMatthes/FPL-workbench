import { AssignPlayersStats } from "./AssignPlayerStats";

let ratedPlayers = [];

function RatePlayer(item) {
    let valueIndex = 0;

    if (item.element_type === 4) {
        valueIndex = 
            parseFloat(item.form) + 
            parseFloat(item.points_per_game) +  
            ((100 - parseFloat(item.ict_index))/10) + 
            parseFloat(item.xG) +
            parseFloat(item.xA) +
            item.goals_scored + 
            item.assists - 
            (item.red_cards / 2) + 
            item.yellow_cards + 
            (item.bonus / 10) + 
            (item.bps / 100); 
    }
    else if (item.element_type === 3) {
        valueIndex =
            parseFloat(item.form) + 
            parseFloat(item.points_per_game) +  
            ((100 - parseFloat(item.ict_index))/10) + 
            parseFloat(item.xG) +
            parseFloat(item.xA) +
            item.goals_scored + 
            item.assists +
            item.clean_sheets - 
            (item.red_cards / 2) + 
            item.yellow_cards + 
            (item.bonus / 10) + 
            (item.bps / 100); 
    }
    else if (item.element_type === 2) {
        valueIndex =
            parseFloat(item.form) + 
            parseFloat(item.points_per_game) +  
            ((100 - parseFloat(item.ict_index))/10) + 
            parseFloat(item.xG) +
            parseFloat(item.xA) +
            item.goals_scored + 
            item.assists +
            item.clean_sheets - 
            (item.red_cards / 2) + 
            item.yellow_cards + 
            (item.bonus / 10) + 
            (item.bps / 100); 
    }
    else if (item.element_type === 1) {
        valueIndex =
            parseFloat(item.form) + 
            parseFloat(item.points_per_game) +  
            ((100 - parseFloat(item.ict_index))/10) + 
            item.saves +
            item.goals_conceded +
            item.clean_sheets + 
            item.penalties_saved -
            (item.red_cards / 2) + 
            item.yellow_cards + 
            (item.bonus / 10) + 
            (item.bps / 100); 
    }

    item["value_index"] = Math.round((valueIndex + Number.EPSILON) * 100) / 100;
    ratedPlayers.push(item)
}

const RatePlayers = async () => {
    const players_FPL = await AssignPlayersStats();
    players_FPL.forEach(RatePlayer)
    return ratedPlayers;
}

export { RatePlayers }