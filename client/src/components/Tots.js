import { useState, useEffect } from 'react';
import { FetchAllPlayers } from '../helpers/FetchAllPlayers';

const maxKnapsack = async (items, capacity, cost) => {
    let cache = [];

    for (let i = 0; i < items.length; i++) {
        let row = [];
        for (let k = 1; k <= capacity; k++) {
            for (let j = 1; j <= cost; j++) {
                row.push(getSolution(i,k,j));
            }
        }
        cache.push(row);
    }

    return(getLast());

    function getLast() {
        let lastRow = cache[cache.length - 1];
        lastRow = lastRow[lastRow.length - 1];
        return lastRow[lastRow.length - 1];
    }

    function getSolution(row, cap, cst) {
        const NO_SOLUTION = { maxValue:0, subset:[] };

        let col = cap - 1;
        let lastItem = items[row];
        let lastSubItem = items[row][cap];
        let remaining = cap[lastItem.element_type] - 1;
        let subRemaining = cst - lastItem.now_cost / 10;

        let lastSolution = row > 0 ? cache[row - 1][col] || NO_SOLUTION : NO_SOLUTION;
        let lastSubSolution = row > 0 ? cache[row - 1][remaining - 1] || NO_SOLUTION : NO_SOLUTION;
        let lastSubSubSolution = row > 0 ? cache[row - 1][remaining - 1][subRemaining - 1] || NO_SOLUTION : NO_SOLUTION;

        if (remaining < 1) {
            if (subRemaining < 1) {
                return lastSubSolution;
            }
            return lastSolution;
        }

        let lastValue = lastSolution.maxValue;
        let lastSubValue = lastSubSolution.maxValue;
        let lastSubSubValue = lastSubSubSolution.maxValue;

        let newValue = lastSubValue + lastItem.total_points;
        let newSubValue = lastSubSubValue + lastSubItem.total_points;

        if (newValue >= lastValue) {
            if (newSubValue >= lastSubValue) {
                let _lastSubSubSet = lastSubSubSolution.subset.slice();
                _lastSubSubSet.push(lastSubItem);
            }
            let _lastSubSet = lastSubSolution.subset.slice();
            _lastSubSet.push(lastItem);
            return { maxValue: newValue, subset: _lastSubSet };
        } else {
            return lastSolution;
        }
    }
}

const findBestPlayers = async (players, capacity, cost) => {
    let memo = new Array(players.length + 1);
    const limits = Object.values(capacity).reduce((a,b) => a + b);
    
    for (let i = 0; i <= players.length; i++) {
        memo[i] = new Array(limits + 1);
        for (let j = 0; j <= limits; j++) {
            memo[i][j] = new Array(cost + 1);
            for (let k = 0; k<= cost; k++) {
                memo[i][j][k] = 0;
            }
        }
    }

    for (let i = 1; i <= players.length; i++) {
        for (let j = 0; j <= limits; j++) {
            for (let k = 0; k <= cost; k++) {
                if (capacity[players[i - 1].element_type] <= 0) {
                    memo[i][j][k] = memo[i - 1][j][k];
                } else if (players[i - 1].now_cost / 10 > capacity) {
                    memo[i][j][k] = memo[i - 1][j][k];
                } else {
                    memo[i][j][k] = Math.max(memo[i - 1][j][k], memo[i - 1][capacity[players[i - 1].element_type - 1]][k - (players[i - 1].now_cost / 10)] + players[i - 1].total_points);
                }
            }
        }
    }
    return memo;    
}

const TOTS = () => {

    const [players, setPlayers] = useState([]);
    let playersLimits = {'1': 2, '2': 5, '3': 5, '4': 3};

    useEffect(() => {
        (async () => {
            const fetchedPlayers = await FetchAllPlayers();
            // const bestEleven = await maxKnapsack(fetchedPlayers, 100);
            const bestEleven = await findBestPlayers(fetchedPlayers, playersLimits, 100);
            console.log(bestEleven);
            // setPlayers(bestEleven);
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
                                    <tr>
                                        <td>GKP</td>
                                        <td>{player.web_name}</td>
                                        <td>{player.total_points}</td>
                                        <td>{player.form}</td>
                                    </tr>
                                );
                            }
                        )
                    }
                    {[].concat(players).filter(x => x.element_type === 2).sort((a,b) => b.total_points - a.total_points).slice(0, 5).map((player) => {
                                return (
                                    <tr>
                                        <td>DEF</td>
                                        <td>{player.web_name}</td>
                                        <td>{player.total_points}</td>
                                        <td>{player.form}</td>
                                    </tr>
                                );
                            }
                        )
                    }
                    {[].concat(players).filter(x => x.element_type === 3).sort((a,b) => b.total_points - a.total_points).slice(0, 5).map((player) => {
                                return (
                                    <tr>
                                        <td>MID</td>
                                        <td>{player.web_name}</td>
                                        <td>{player.total_points}</td>
                                        <td>{player.form}</td>
                                    </tr>
                                );
                            }
                        )
                    }
                    {[].concat(players).filter(x => x.element_type === 4).sort((a,b) => b.total_points - a.total_points).slice(0, 3).map((player) => {
                                return (
                                    <tr>
                                        <td>FWD</td>
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
     );
}
 
export default TOTS;