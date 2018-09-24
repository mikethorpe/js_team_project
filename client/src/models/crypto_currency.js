const Request = require('../helpers/request.js')

const CryptoCurrency = function (){
    this.url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=GBP'
    this.request = new Request(this.url);
}

CryptoCurrency.prototype.bindEvents = function(){
    this.getData();
}

CryptoCurrency.prototype.getData = function(){
    this.request.get()
    .then((cryptoResponse) => {
        const BTCtoGBPexchange = cryptoResponse['GBP'];
        console.log(BTCtoGBPexchange);  
    })
    .catch(console.error);
}

module.exports = CryptoCurrency;