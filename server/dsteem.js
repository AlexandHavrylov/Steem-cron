const {Client} = require('dsteem');

const client = new Client('https://api.steemit.com');

module.exports = {
    main: async () => await client.database.getCurrentMedianHistoryPrice(),
    sendToSteem: (data) => client.broadcast.json({
        required_auths: 'social',
        required_posting_auths: 'social',
        id: Date.now().toString(),
        json: JSON.stringify(data),
    }, new client.PrivateKey('5JrvPrQeBBvCRdjv29iDvkwn3EQYZ9jqfAHzrCyUvfbEbRkrYFC')),
};
