const mongoose = require('mongoose');
const mongoUri = require('./config.json')["mongo-uri"];
const Schema = mongoose.Schema;

class Mongo {
    constructor(url){
        this.url = url;
    }
    medianHistoryPriceSchema = new Schema({
        base: { amount: Number, symbol: String },
        quote: { amount: Number, symbol: String },
    });
    medianHistoryPriceModel = mongoose.model('medianHistoryPriceModel', this.medianHistoryPriceSchema);
    saveInstance(dataModel) {
        const medianHistoryPrice_instance = new this.medianHistoryPriceModel(dataModel);
        medianHistoryPrice_instance.save((err) => {
            return err ? console.log(err) : console.log('we save instance');
        })
    }
    getLatestInstance() {
        return this.medianHistoryPriceModel.find({ base: Object, quote: Object });
    }
    connect() {
        mongoose.connect(this.url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    }

}

module.exports = new Mongo(mongoUri);