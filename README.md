# Hook.io Alert - Handle alerts from other hooks and distribute over various protocols

## Install
git clone git@github.com:bozuko/alert.git
cd alert
npm install

## Run
hookio-alert

### Hook config.json settings

```js
{
    "email": {
        "addresses": ["you@someaddress.com"]
        "smtp":{
            "host": "smtp.gmail.com",
            "port": 465,
            "ssl": true,
            "use_authentication": true,
            "user": "you",
            "pass": "yourpass"
        },
        "sender": "My Mailer <mailer@yourcompany.com>"
    },
    "alert_threshold": 1800000,
    "load_threshold": 2.0
}
```