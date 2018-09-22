const PubSub = require('../helpers/pub_sub');

const AnswerView = function(container, answer){
    this.container = container;
    this.answer = answer;
}

AnswerView.prototype.render = function(){
    const answerButton = document.createElement('button');
    answerButton.innerHTML = this.answer;    
    answerButton.addEventListener('click', (event) => {
        const answerText = event.target.textContent;
        PubSub.publish('AnswerView:answer-submitted', answerText);
    });

    this.container.appendChild(answerButton);

}

module.exports = AnswerView;