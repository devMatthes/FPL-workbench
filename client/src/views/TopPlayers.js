import React, { Component } from 'react';

class TopPlayers extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            players: []
        })
    }

    componentDidMount(){
        fetch('http://localhost:5000/topPlayers')
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
        const ListOfTopPlayers = (
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
                            {this.state.players.map((player) => {
                                return (
                                    <tr>
                                        <td>{player.web_name}</td>
                                        <td>{player.total_points}</td>
                                        <td>{player.form}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        );
        
        return (
            <div>
                { ListOfTopPlayers }
            </div>
        )
    }
}

export default (TopPlayers)