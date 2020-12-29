import React, { Component } from 'react';

class TeamOfTheSeason extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            players: []
        })
    }

    componentDidMount(){
        fetch('http://localhost:5000/allPlayers')
        .then(res => res.json())
        .then(data => {
            this.setState({
                players: data
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        const TOTS = (
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
                        </tr>
                    </thead>
                    <tbody>
                        {[].concat(this.state.players).filter(x => x.element_type === 1).sort((a,b) => b.total_points - a.total_points).slice(0, 2).map((player) => {
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
                    {[].concat(this.state.players).filter(x => x.element_type === 2).sort((a,b) => b.total_points - a.total_points).slice(0, 5).map((player) => {
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
                    {[].concat(this.state.players).filter(x => x.element_type === 3).sort((a,b) => b.total_points - a.total_points).slice(0, 5).map((player) => {
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
                    {[].concat(this.state.players).filter(x => x.element_type === 4).sort((a,b) => b.total_points - a.total_points).slice(0, 3).map((player) => {
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
        
        return (
            <div>
                { TOTS }
            </div>
        )
    }
}

export default (TeamOfTheSeason)