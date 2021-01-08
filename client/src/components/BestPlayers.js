import { useState, useEffect } from 'react';
import { FetchAllPlayers } from '../helpers/FetchAllPlayers';

const BestPlayers = () => {

    const [players, setPlayers] = useState([]);
    
    useEffect(() => {
        (async () => {
        const fetchedPlayers = await FetchAllPlayers();
        setPlayers(fetchedPlayers);
    })();
}, []);

    return (
        <div>
            <table className="topPlayersTable">
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Total Points</th>
                        <th>Form</th>
                    </tr>
                </thead>
                <tbody>
                    {[].concat(players).sort((a,b) => b.total_points - a.total_points).slice(0, 5).map((player) => {
                                return (
                                    <tr>
                                        <td>{player.web_name}</td>
                                        <td>{player.total_points}</td>
                                        <td>{player.form}</td>
                                    </tr>
                                );
                            }
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default (BestPlayers)