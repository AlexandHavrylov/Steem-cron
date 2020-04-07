const { Client, PrivateKey } = require('dsteem');

const client = new Client('https://api.steemit.com');
const key = PrivateKey.from('5JrvPrQeBBvCRdjv29iDvkwn3EQYZ9jqfAHzrCyUvfbEbRkrYFC');

module.exports = {
    main: async () => await client.database.getCurrentMedianHistoryPrice(),
    sendToSteem: (data) => {
        client.broadcast.json(getPostData(data), key)
            .catch(err => console.log(err))
            .then(res => console.log(res))
    },
    getPostData: (data) => ({
        required_auths: [],
        required_posting_auths: ['social'],
        id: Date.now().toString(),
        json: JSON.stringify(data),
    })
};
