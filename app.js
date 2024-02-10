const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const availableTokens = ['token1', 'token2', 'token3', 'token4', 'token5'];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/login', (req, res) => {
    const token = req.query.token;

    if (!token) {
        return res.status(400).send({ message: 'Solana Address is required' });
    }

    if (availableTokens.includes(token)) {
        res.json({ success: true, message: 'Congrats, You are Whitelisted ' });
    } else {
        res.json({ success: false, message: 'Alass ! This address is not Whitelisted' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
