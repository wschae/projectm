const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/client/build"));

app.get('/api/people', (req, res) => {
    var people = [
        {name: 'jwkhong', url: 'assets/jwkhong.jpg', nonce: 414574257},
        {name: 'eyyoun', url: 'assets/eyyoun.gif', nonce: 195319202},
        //TODO: compute nonce
        // {name: 'hwanjoyu', url: 'assets/hwanjoyu.gif', nonce: 0},
        // {name: 'hyelee', url: 'assets/hyelee.jpg', nonce: 0},
        // {name: 'wschae', url: 'assets/wschae.jpg', nonce: 0},
    ];

  res.json(people);
});

app.listen(port, () => console.log(`Magic happens on port ${port}`));

module.exports = app;