var registration = require('./registration');
var activation = require('./activateUser');
var resetPwd = require('./resetPassword');

module.exports = {

    activate : function (req, res) {
        activation.activateNewUser(req.params.uuid);
        res.send("Validating UUID "+req.params.uuid +'!');
    },

    changePassword : function (req, res) {
        if (activation.activateExistingUser(req.params.uuid, req.body.password)) {
            res.send("Success");
        } else {
            res.send("Error");
        }
    },

    forgotPassword: function (req, res) {
        var user = req.body.user;
        if (resetPwd.reset(user)) {
            res.send("Success");
        } else {
            res.send("Error");
        }
    },

    helloworld : function (req, res) {
        res.send('Hello World!');
    },

    register : function (req, res) {
        var mailAddress = req.body.mail;
        var password = req.body.pwd;
        var accountType = req.body.type;

        //console.log(mailAddress + "\n" + password + "\n" + accountType + "\n" + res);

        registration.register(mailAddress, password, accountType, res);
    },

    test : function (req, res) {
        let response = "Start unit tests\n";

    },

    unknownpage : function (req, res) {
      res.status(404);
      res.send('Unknown Endpoint')
    }
};