const Request = require('../helpers/request.js')
const PubSub = require('../helpers/pub_sub.js')

const CryptoCurrency = function (){
    this.url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=GBP'
    this.request = new Request(this.url);
}

CryptoCurrency.prototype.bindEvents = function(){
    this.getData();
}

CryptoCurrency.prototype.getData = function(){
    this.request.get()
    .then((cryptoResponse) => {
        console.log(cryptoResponse);
        PubSub.publish('CryptoCurrency:crypto-conversion-data-ready', cryptoResponse);
        
    })
    .catch(console.error);
}

module.exports = CryptoCurrency;