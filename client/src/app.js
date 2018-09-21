const Questions = require('./models/questions.js');

document.addEventListener('DOMContentLoaded', () => {
    console.log('Javascript initialized');
    
    //https://opentdb.com/api.php?amount=1
    const questions = new Questions();
    questions.getData();
    

});