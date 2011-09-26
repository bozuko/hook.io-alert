var nm = require('nodemailer');

var config;

var EmailMessage = module.exports = function(params){
    nm.EmailMessage.apply(this, arguments);
    if( !this.sender ){
        this.sender = config.sender;
    }
};

EmailMessage.prototype.__proto__ = nm.EmailMessage.prototype;

// static method (emulate the nodemailer send_mail)
EmailMessage.send = function(params, callback){
    var em = new EmailMessage(params);
    em.send(callback);
};

EmailMessage.configure = function(options) {
    if (!options.smtp) throw new Error("mail.configure requires smtp options");
    if (!options.sender) throw new Error("mail.configure requires sender option");
    config = options;
    nm.SMTP = options.smtp;
};
