const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/client/build"));

app.get('/api/people', (req, res) => {
    var people = [
        {name: 'jwkhong', url: 'assets/jwkhong.jpg', nonce: 5076},
        {name: 'eyyoun', url: 'assets/eyyoun.gif', nonce: 40764},
        {name: 'hwanjoyu', url: 'assets/hwanjoyu.gif', nonce: 14418},
        {name: 'hyelee', url: 'assets/hyelee.jpg', nonce: 26529},
        {name: 'wschae', url: 'assets/wschae.jpg', nonce: 18776},
        {name: 'sein92', url: 'assets/sein92.jpg', nonce: 33191},
    ];

  res.json(people);
});

app.listen(port, () => console.log(`Magic happens on port ${port}`));

module.exports = app;
