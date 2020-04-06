var CronJob = require('cron').CronJob;
const { main, sendToSteem } = require('./dsteem.js');
const mongo = require('./mongo');

module.exports = {
    job: new CronJob('0 0 */2 * * *', function() {
        main().then(async data => {
            await mongo.saveInstance(data);
            let latestInstance;
            setTimeout( () =>
                    latestInstance = mongo.getLatestInstance()
                        .then(data => {
                            sendToSteem(getCurrentMedianHistoryPrice(data))
                        }),
                100);  //TODO can't with Promise =/
        });
    }, null, true, 'America/Los_Angeles')
};

const getCurrentMedianHistoryPrice = (data) => {
    const latestInstances = data.slice(data.length - 12, data.length);

    const medianHistory = latestInstances.reduce((acc, current) => {

        const currentBase = current.avrBase || current.base.amount;
        const accBase = acc.avrBase || acc.base.amount;

        const currentQuote = current.avrQuote || current.quote.amount;
        const accQuote = acc.avrQuote || acc.quote.amount;

        return {
            avrBase: accBase + currentBase,
            avrQuote: accQuote + currentQuote
        }

    }, {
        base: { amount: 0 },
        quote: { amount: 0 }
    });
    medianHistory.avrBase = medianHistory.avrBase / 12;
    medianHistory.avrQuote = medianHistory.avrQuote / 12;

    return medianHistory;
};