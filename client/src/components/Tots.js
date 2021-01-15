import { useState, useEffect } from 'react';
import { RatePlayers } from '../helpers/RateAllPlayers'

const TOTS = () => {

    const [players, setPlayers] = useState([]);
    let playersLimits = {'1': 2, '2': 5, '3': 5, '4': 3};

    useEffect(() => {
        (async () => {
            const ratedPlayers = await RatePlayers();
            // const bestEleven = await maxKnapsack(fetchedPlayers, 100);
            //const bestEleven = await findBestPlayers(fetchedPlayers, playersLimits, 100);
            setPlayers(ratedPlayers);
        })();
    }, []);

    return ( 
        <div>
            <h2>Tests</h2>
            <table className="totsTable"> 
                    <thead>
                        <tr>
                            <th>TEAM OF THE SEASON</th>
                        </tr>
                        <tr>
                            <th>Position</th>
                            <th>Player</th>
                            <th>Pts</th>
                            <th>Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[].concat(players).filter(x => x.element_type === 1).sort((a,b) => b.total_points - a.total_points).slice(0, 2).map((player) => {
                                return (
                                    <tr key={player.id}>
                                        <td>GKP</td>
                                        <td>{player.web_name}</td>
                                        <td>{player.total_points}</td>
                                        <td>{player.form}</td>
                                        <td>{player.value_index}</td>
                                    </tr>
                                );
                            }
                        )
                    }
                    {[].concat(players).filter(x => x.element_type === 2).sort((a,b) => b.total_points - a.total_points).slice(0, 5).map((player) => {
                                return (
                                    <tr key={player.id}>
                                        <td>DEF</td>
                                        <td>{player.web_name}</td>
                                        <td>{player.total_points}</td>
                                        <td>{player.form}</td>
                                        <td>{player.value_index}</td>
                                    </tr>
                                );
                            }
                        )
                    }
                    {[].concat(players).filter(x => x.element_type === 3).sort((a,b) => b.total_points - a.total_points).slice(0, 5).map((player) => {
                                return (
                                    <tr key={player.id}>
                                        <td>MID</td>
                                        <td>{player.web_name}</td>
                                        <td>{player.total_points}</td>
                                        <td>{player.form}</td>
                                        <td>{player.value_index}</td>
                                    </tr>
                                );
                            }
                        )
                    }
                    {[].concat(players).filter(x => x.element_type === 4).sort((a,b) => b.total_points - a.total_points).slice(0, 3).map((player) => {
                                return (
                                    <tr key={player.id}>
                                        <td>FWD</td>
                                        <td>{player.web_name}</td>
                                        <td>{player.total_points}</td>
                                        <td>{player.form}</td>
                                        <td>{player.value_index}</td>
                                    </tr>
                                );
                            }
                        )
                    }
                    </tbody>
            </table>      
        </div>
     );
}
 
export default TOTS;