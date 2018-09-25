const Request = require('../helpers/request.js')
const PubSub = require('../helpers/pub_sub.js')

const CryptoCurrency = function (){
    this.url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DOGE,XRP&tsyms=GBP'
    this.request = new Request(this.url);
}

CryptoCurrency.prototype.bindEvents = function(){
    PubSub.subscribe('Game:start-new-game', () => {
        this.getData();
    });
}

CryptoCurrency.prototype.getData = function(){
    this.request.get()
    .then((cryptoResponse) => {
        console.log('Crypto API data loaded',cryptoResponse);
        //cryptoResponse is a json with properties BTC, which is also an object
        //BTC is a json with property GBP, which is a numberType
        PubSub.publish('CryptoCurrency:crypto-conversion-data-ready', cryptoResponse);
        
    })
    .catch(console.error);
}

module.exports = CryptoCurrency;