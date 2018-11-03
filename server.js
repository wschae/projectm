const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/client/build"));

app.get('/api/people', (req, res) => {
    var people = [
        {name: 'jwkhong', url: 'assets/jwkhong.jpg', nonce: '58702553'},
        {name: 'eyyoun', url: 'assets/eyyoun.gif', nonce: '89239464'},
        {name: 'hwanjoyu', url: 'assets/hwanjoyu.gif', nonce: '120291891'},
        {name: 'hyelee', url: 'assets/hyelee.jpg', nonce: '46326056'},
        {name: 'wschae', url: 'assets/wschae.jpg', nonce: '354861675'},
        {name: 'kyungchan', url: 'assets/kyungchan.jpg', nonce: '359310174'},
        {name: 'swkim', url: 'assets/swkim.jpg', nonce: '244859547'},
        {name: 'jskim', url: 'assets/jskim.jpg', nonce: '41698321'},
        {name: 'cyoh', url: 'assets/cyoh.jpg', nonce: '151578779'},
        {name: 'limseok', url: 'assets/limseok.jpg', nonce: '256976594'}
    ];

  res.json(people);
});

app.listen(port, () => console.log(`Magic happens on port ${port}`));

module.exports = app;
