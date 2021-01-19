import { AssignPlayersStats } from "./AssignPlayerStats";
import { FetchAllTeams } from "./FetchAllTeams";

const API_URL = 'http://localhost:5000/allGameweeks';

const FetchCurrentGameweek = async () => {
    const response = await fetch(API_URL);
    const allPlayers = await response.json();
    return allPlayers;
}

let ratedPlayers = [];
let allTeams = [];
let currentGameweek = 0;
let valueIndex = 0;
let teamID = 0;
let teamStrength = 0;
let teamAttack = 0;
let teamDefense = 0;
let teamFixes = 0;

function RatePlayer(item) {
    let matchesPlayed = currentGameweek;

    if (matchesPlayed === 0) {
        valueIndex = 0;
    } else {
        
        if (teamID !== item.team) {
            teamID = item.team;
            for (let i = 0; i < allTeams.length; i++) {
                if (allTeams[0][i]["id"] === teamID) {
                    teamStrength = allTeams[0][i]["strength"];
                    teamAttack = (allTeams[0][i]["strength_attack_home"] + allTeams[0][i]["strength_attack_away"]) / 100;
                    teamDefense = (allTeams[0][i]["strength_defence_home"] + allTeams[0][i]["strength_defence_away"]) / 100;

                    for (let j = 0; j < 3; j++) {
                        teamFixes += allTeams[0][i]["fixes"];
                    }

                    teamFixes = teamFixes / 3;
                }
            }
        }
        
        //FORWARDS
        if (item.element_type === 4) {
            valueIndex = 
                parseFloat(item.form) + 
                parseFloat(item.points_per_game) +  
                parseFloat(item.xG) +
                parseFloat(item.xA) +
                (item.goals_scored / matchesPlayed) * 4 + 
                (item.assists / matchesPlayed) * 3 -
                (item.own_goals / matchesPlayed) * 2 -
                (item.penalties_missed / matchesPlayed) * 2 -
                (item.red_cards / matchesPlayed) * 3 -
                (item.yellow_cards / matchesPlayed) +  
                (item.minutes / matchesPlayed) / 45 + 
                teamAttack -
                teamFixes;
    
            if ((item.bps / matchesPlayed) >= 20) {
                valueIndex += 2
            }
    
            else if ((item.bps / matchesPlayed) < 20 && (item.bps / matchesPlayed) >= 16) {
                valueIndex += 1
            }
    
            valueIndex = valueIndex * (teamStrength / 10);
        }
    
        //MIDFIELDERS
        else if (item.element_type === 3) {
            valueIndex =
                parseFloat(item.form) + 
                parseFloat(item.points_per_game) +  
                parseFloat(item.xG) +
                parseFloat(item.xA) +
                (item.goals_scored / matchesPlayed) * 5 + 
                (item.assists / matchesPlayed) * 3 +
                (item.clean_sheets / matchesPlayed) - 
                (item.own_goals / matchesPlayed) * 2 -
                (item.goals_conceded / matchesPlayed) - 
                (item.penalties_missed / matchesPlayed) * 2 -
                (item.red_cards / matchesPlayed) * 3 -
                (item.yellow_cards / matchesPlayed) +  
                (item.minutes / matchesPlayed) / 45 + 
                teamDefense / 3 +
                teamAttack - 
                teamFixes;
    
            if ((item.bps / matchesPlayed) >= 20) {
                valueIndex += 2
            }
    
            else if ((item.bps / matchesPlayed) < 20 && (item.bps / matchesPlayed) >= 16) {
                valueIndex += 1
            }
    
            valueIndex = valueIndex * (teamStrength / 10);
        }
    
        //DEFENDERS
        else if (item.element_type === 2) {
            valueIndex =
                parseFloat(item.form) + 
                parseFloat(item.points_per_game) +  
                parseFloat(item.xG) +
                parseFloat(item.xA) +
                ((item.goals_scored / matchesPlayed) * 6) +
                (item.assists / matchesPlayed) * 3 +
                (item.clean_sheets / matchesPlayed) * 4 - 
                (item.own_goals / matchesPlayed) * 2 -
                (item.goals_conceded / matchesPlayed) * 1.2 - 
                (item.penalties_missed / matchesPlayed) * 2 -
                (item.red_cards / matchesPlayed) * 3 -
                (item.yellow_cards / matchesPlayed) +  
                (item.minutes / matchesPlayed) / 45 + 
                teamDefense +
                teamAttack / 3 -
                teamFixes;
    
            if ((item.bps / matchesPlayed) >= 20) {
                valueIndex += 2
            }
    
            else if ((item.bps / matchesPlayed) < 20 && (item.bps / matchesPlayed) >= 16) {
                valueIndex += 1
            }
    
            valueIndex = valueIndex * (teamStrength / 10);
        }
    
        //GOALKEEPERS
        else if (item.element_type === 1) {
            valueIndex =
                parseFloat(item.form) + 
                parseFloat(item.points_per_game) +  
                (item.saves / matchesPlayed) * 1.3 -
                (item.goals_conceded / matchesPlayed) * 1.5 +
                (item.clean_sheets / matchesPlayed) * 4 + 
                (item.penalties_saved / matchesPlayed) * 5 -
                (item.red_cards / matchesPlayed) * 3 - 
                item.yellow_cards / matchesPlayed +
                (item.minutes / matchesPlayed) / 45 +
                teamDefense - 
                teamFixes;
    
            if ((item.bps / matchesPlayed) >= 20) {
                valueIndex += 2
            }
    
            else if ((item.bps / matchesPlayed) < 20 && (item.bps / matchesPlayed) >= 16) {
                valueIndex += 1
            }
    
            valueIndex = valueIndex * (teamStrength / 10);
        }
    }

    item["value_index"] = Math.round((valueIndex + Number.EPSILON) * 100) / 100;
    item["matches_played"] = matchesPlayed;
    ratedPlayers.push(item)
}

const RatePlayers = async () => {
    const players_FPL = await AssignPlayersStats();
    allTeams = await FetchAllTeams();
    currentGameweek = await FetchCurrentGameweek();
    players_FPL.forEach(RatePlayer);
    return ratedPlayers;
}

export { RatePlayers }