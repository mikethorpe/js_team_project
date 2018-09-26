const PubSub = require('../helpers/pub_sub');

const ModalNotificationView = function (container) {
    this.container = container;
    this.notificationDiv = null;
    this.notificationDetail = null;
}

ModalNotificationView.prototype.bindEvents = function() {
    PubSub.subscribe('Game:render-notification', (event) => {
        this.notificationDetail = event.detail;
        this.display();
    })

    // Disappears the notification view when the window is clicked
    window.addEventListener('click', (event) => {
        console.log('window listener', event.target.nodeName);
        if (event.target != this.notificationDiv && event.target.nodeName != 'BUTTON') {
            this.notificationDiv.style.display = 'none';
        }
    });
}

ModalNotificationView.prototype.render = function() {    
    this.container.innerHTML = '';
    this.notificationDiv = document.createElement('div');
    this.container.appendChild(this.notificationDiv);
}

ModalNotificationView.prototype.display = function() {
    this.notificationDiv.innerHTML = '';
    const notifcationDetailKeys = Object.keys(this.notificationDetail);
    
    notifcationDetailKeys.forEach( (key) => {          
        const notificationInfo = document.createElement('div');
        notificationInfo.textContent = this.notificationDetail[key];
        this.notificationDiv.appendChild(notificationInfo);
        this.notificationDiv.style.display = 'block';
    });

    // Disappear the notification after timeout (ms)
    const notificationTimeout = 3000;
    setTimeout( 
        () => { 
            this.notificationDiv.style.display = 'none'; 
        }, 
        notificationTimeout
    );
}

module.exports = ModalNotificationView;