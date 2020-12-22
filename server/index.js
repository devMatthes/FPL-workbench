const express = require('express');
const cors = require('cors')

const PORT = process.env.PORT || 5000;

const app = express();
const { spawn } = require('child_process');

async function topPlayers(req, res, next ) {
    try {
        let dataToSend;
        let dataToSendJSON;

        const python = spawn('python3', ['bestplayers.py']);

        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...');
            dataToSend = data.toString();

            // MAKE STRING VALID JSON
            dataToSend = "[" + dataToSend.replace(/}\s{/g, "},{") + "]";
            dataToSendJSON = JSON.parse(dataToSend);
            // Set data to Redis
            //client.setex('Pogba', 3600, dataToSend);
        });

        python.on('close', (code) => {
            console.log(`child process close all stdio wtih code ${code}`);
            res.send(dataToSendJSON);
        });
    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

app.use(cors());

app.get('/Pogba', topPlayers);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});