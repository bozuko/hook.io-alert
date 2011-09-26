var Hook = require('hook.io').Hook,
    util = require('util'),
    os = require('os'),
    mail = require('./mail'),
    async = require('async'),
    inspect = require('util').inspect
;

var Alert = module.exports = function (options) {

  Hook.call(this, options);

  var self = this;
  var active_alerts = {};
    
  // config
  self.email = self.config.get('email');
  if (self.email) mail.configure(self.email);
  self.alert_threshold = self.config.get('alert_threshold');

  this.on('*::alert', function(data) {
      var key = data.host+':'+data.name;
      data.timestamp = new Date();
      send_timestamp = data.timestamp;
      if (!active_alerts[key]) {
          active_alerts[key] = {data: data, send_timestamp: send_timestamp};
          self.do_alert(key, data);
      } else if (active_alerts[key].send_timestamp + self.alert_threshold >= new Date()) {
          active_alerts[key].data = data;
      } else {
          active_alerts[key].data = data;
          self.do_alert(key, data);
      }

  });

  this.on('hook::ready', function () {

  });
};

//
// Inherit from `hookio.Hook`
//
util.inherits(Alert, Hook);

Alert.prototype.do_alert = function(key, data) {
    var self = this;
    if (self.email) {
        async.forEach(self.email.addresses,
            function(email_address, callback) {
                return mail.send({
                    to: email_address,
                    subject: 'Alert: '+key,
                    body: inspect(data)
                }, function(err, success) {
                    if (err || !success) {
                        console.error("Failed to send alert email with subject: Alert: "+
                            key+"to "+email_address+". "+err
                        );
                    }
                    return callback(null);
                });
            },
            function(err) {
                return null;
            }
        );
    }
};