import { useState, useEffect } from 'react';
import { RatePlayers } from '../helpers/RateAllPlayers'

const TOTS = () => {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        (async () => {
            const ratedPlayers = await RatePlayers();
            setPlayers(ratedPlayers);
            console.log(ratedPlayers);
        })();
    }, []);

    return ( 
        <div>
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
                            <th>Value Index</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[].concat(players).filter(x => x.element_type === 1).map((player) => {
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
                    {[].concat(players).filter(x => x.element_type === 2).sort((a,b) => b.value_index - a.value_index).map((player) => {
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
                    {[].concat(players).filter(x => x.element_type === 3).sort((a,b) => b.value_index - a.value_index).map((player) => {
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
                    {[].concat(players).filter(x => x.element_type === 4).sort((a,b) => b.value_index - a.value_index).map((player) => {
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