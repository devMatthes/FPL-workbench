const express = require('express');
const cors = require('cors')

const PORT = process.env.PORT || 5000;

const app = express();
const { spawn } = require('child_process');

async function playersUnderstat(req, res, next ) {
    try {
        let dataToSend = '';

        const python = spawn('python3', ['understatAPI.py']);

        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...');
            dataToSend += data.toString();

            // Set data to Redis
            //client.setex('Pogba', 3600, dataToSend);
        });

        python.on('close', (code) => {
            console.log(`child process close all stdio wtih code ${code}`);
            res.json(JSON.parse(dataToSend));
        });
    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

async function allPlayers(req, res, next) {
    try {
        let dataToSend = '';

        const python = spawn('python3', ['allplayers.py']);

        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...');
            dataToSend += data.toString();

            // Set data to Redis
            //client.setex('Pogba', 3600, dataToSend);
        });

        python.on('close', (code) => {
            console.log(`child process close all stdio wtih code ${code}`);
            res.json(JSON.parse(dataToSend));
        });
    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

async function allTeams(req, res, next ) {
    try {
        let dataToSend = '';

        const python = spawn('python3', ['allteams.py']);

        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...');
            dataToSend += data.toString();

            // MAKE STRING A VALID JSON
            dataToSend = "[" + dataToSend.replace(/}\s{/g, "},{") + "]";
            // Set data to Redis
            //client.setex('Pogba', 3600, dataToSend);
        });

        python.on('close', (code) => {
            console.log(`child process close all stdio wtih code ${code}`);
            res.json(JSON.parse(dataToSend));
        });
    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

async function allGameweeks(req, res, next ) {
    try {
        let dataToSend = '';

        const python = spawn('python3', ['allgameweeks.py']);

        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...');
            dataToSend += data.toString();

            // Set data to Redis
            //client.setex('Pogba', 3600, dataToSend);
        });

        python.on('close', (code) => {
            console.log(`child process close all stdio wtih code ${code}`);
            res.json(JSON.parse(dataToSend));
        });
    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

app.use(cors());

app.get('/stats', playersUnderstat);
app.get('/allPlayers', allPlayers);
app.get('/allTeams', allTeams);
app.get('/allGameweeks', allGameweeks);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});