const constant = require('./constants');
var db = require('../Database/database');
var database = require('../Student/database');
var mailer = require('./mailer');
const passwordUtil = require('./passwordCheck');
const responder = require('./responseSender');

module.exports = {

    registerBusiness: function (mail, password, userName, businessDescription, businessName, res) {

        let randomString = mailer.generateRandomString(constant.KEY_LENGTH);
        html = '<html lang="de-DE">\n' +
                '<head>\n' +
                '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
                '</head>\n' +
                '<body>\n' +
                '<h1>Validation of new business account "' + userName + '"</h1>'+
                '<p>There´s a new user "' + userName + '".</p> '+
                '<p>The business description of the new user is:</p>'+
                '<p>' + businessDescription + '</p>'+
                '<p>The business name:</p>'+
                '<p>' + businessName + '</p>'+
                '<p>The mail address is: ' + mail + '</p>'+
                '<p>Please click on following link to activate this account on StudiCircle: <a href="' + constant.getActivationURL(randomString) + '">Validate new account</a></p>' +
                '<p>Please click on following link to cancel the activitation / invitation of this account on StudiCircle: <a href="' + constant.getDeactivationURL(randomString) + '">Disable new account</a></p>' +
                '</body>\n' +
                '</html>';
        subject = 'StudiCircle: Validate new business account';

        var userAuthData = passwordUtil.generateUserAuthData(password);
        var hash = userAuthData.hash;
        var salt = userAuthData.salt;


        try {
                return db.User.create({
                    name: userName,
                    email: mail,
                    pwdHash: hash,
                    salt:salt,
                    type:constant.AccountType.BUSINESS,
                    state:constant.AccountState.PENDING
                }).then( (user)=> {
                    db.ValidationKey.create({
                        validationKey: randomString
                    }).then( validationKey => {
                        validationKey.setUser(user);
                        return mailer.sendMail('studicircle@web.de', html, subject)
                            .then(resp => {
                                console.log(resp);
                                if (res){
                                    res.send({
                                        httpStatus: 200,
                                        message:  "Activation link sent"
                                    });
                                }
                                return true;
                            })
                            .catch(err => {
                                console.log(err);
                                if (res){
                                    res.status(412);
                                    res.send({
                                        httpStatus: 412,
                                        message:  "Error at sending activation link."
                                    });
                                }
                                return false;
                            });
                    }).error( err =>{
                        res.status(409);
                        res.send({
                            httpStatus: 409,
                            message:  "Database error"
                        });
                        return err;
                    });
                }).error(err => {
                    res.status(409);
                    res.send({
                        httpStatus: 409,
                        message:  "Database error"
                    });
                    return err;
                });
            } catch (err) {
                res.status(409);
                res.send({
                    httpStatus: 409,
                    message:  "Database error"
                });
                return err;
            }

    },

    register: async function (mail, password, accountType, userName, res, businessDescription, businessName) {

        if (!mail || !password || !accountType || !userName) {
            if (res) {
                res.status(417);
                res.send({
                    httpStatus: 417,
                    message: "Expectation Failed"
                });
            }
            return "null";
        }

        if (!mailer.checkMailAddress(mail)) {
            if (res) {
                res.status(412);
                res.send({
                    httpStatus: 412,
                    message: "Invalid eMail entered."
                });
            }
            return "invalidMail";
        }

        if (accountType != constant.AccountType.BUSINESS && accountType != constant.AccountType.GUEST && accountType != constant.AccountType.STUDENT) {
            if (res) {
                res.status(412);
                res.send({
                    httpStatus: 412,
                    message: "Invalid account type entered."
                });
            }
            return "invalidAccountType";
        }

        let passwordCheck = passwordUtil.passwordIsCompliant(password);
        if (!passwordCheck) {
            if (res) {
                res.status(412);
                res.send({
                    httpStatus: 412,
                    message: "wrong passsword"
                });
            }
            return "wrong password";
        }

        if (userName.length < constant.USERNAME_MIN_LENGTH || userName.length > constant.USERNAME_MAX_LENGTH) {
            if (res) {
                res.status(412);
                res.send({
                    httpStatus: 412,
                    message: "User name length is not between " + constant.USERNAME_MIN_LENGTH + " and " + constant.USERNAME_MAX_LENGTH + " characters."
                });
            }
            return "wrong username";
        }

        try {
            let userId = await database.getUserIdFromMail(mail);
            console.log(err);
            responder.sendResponse(res, 451, "Mail already exists");
            return false;
        } catch (err) {
            console.log("Register a new mail address");
        }

        if (accountType == constant.AccountType.BUSINESS) {
            return this.registerBusiness(mail, password, userName, businessDescription, businessName, res);
        }

        try{
            await database.checkStudentMail(mail);
        } catch (err) {
            console.log(err);
            if (res) {
                responder.sendResponse(res, 403, mail + " in not a known valid mail address.");
            }
            return false;
        }

        let randomString = mailer.generateRandomString(constant.KEY_LENGTH);
        html = '<html lang="de-DE">\n' +
            '<head>\n' +
            '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
            '</head>\n' +
            '<body>\n' +
            '<p>Please click on following link to register to StudiCircle: <a href="' + constant.getActivationURL(randomString) + '">Validate E-Mail</a></p>' +
            '</body>\n' +
            '</html>';
        subject = 'StudiCircle: Validate your mail address';

        var userAuthData = passwordUtil.generateUserAuthData(password);
        var hash = userAuthData.hash;
        var salt = userAuthData.salt;


        try {
            return db.User.create({
                name: userName,
                email: mail,
                pwdHash: hash,
                salt: salt,
                type: constant.AccountType.STUDENT,
                state: constant.AccountState.PENDING
            }).then((user) => {
                db.ValidationKey.create({
                    validationKey: randomString
                }).then(validationKey => {
                    validationKey.setUser(user);
                    return mailer.sendMail(mail, html, subject)
                        .then(resp => {
                            console.log(resp);
                            if (res) {
                                responder.sendResponse(res, 200, "Activation link sent");
                            }
                            return true;
                        })
                        .catch(err => {
                            console.log(err);
                            if (res) {
                                res.status(412);
                                responder.sendResponse(res, 412, "Error at sending activation link." );
                            }
                            return false;
                        });
                }).error(err => {
                    res.status(409);
                    responder.sendResponse(res, 409, "Database error" );
                    return err;
                });
            }).error(err => {
                res.status(409);
                responder.sendResponse(res, 409, "Database error" );
                return err;
            });
        } catch (err) {
            res.status(409);
            responder.sendResponse(res, 409, "Database error" );
            return err;
        }
    },

    registrationInform : async function ( validationKey, message){
        try {
            let userId = await database.getUserIdFromValidationKey( validationKey);
            let userData = await database.getUserData(userId);
            console.log(userData.username);
            let html = '<html lang="de-DE">\n' +
                '<head>\n' +
                '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
                '</head>\n' +
                '<body>\n' +
                '<h1>Validation of your new business account "' + userData.username + '"</h1>' +
                '<p>' + message + '</p> ' +
                '</body>\n' +
                '</html>';
            let subject = 'StudiCircle: Validation of your new business account';
            await mailer.sendMail(userData.mail, html, subject);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    externInvitation : async function (mail, invitingUserId, circle){
        try {
            let circleName = await database.getCircleNameById(circle);
            let randomString = mailer.generateRandomString(constant.KEY_LENGTH);
            let invitingUserData = await database.getUserData(invitingUserId);
            console.log("create new user" + mail);
            return db.User.create({
                email: mail,
                type:constant.AccountType.GUEST,
                state:constant.AccountState.PENDING
            }).then( (user)=> {
                db.Invitation.create({"UserId": user.id, "CircleId": circle}).then( result =>{
                    if(result) {
                        db.ValidationKey.create({
                            validationKey: randomString
                        }).then( validationKey => {
                            validationKey.setUser(user);

                            try {
                                let html = '<html lang="de-DE">\n' +
                                    '<head>\n' +
                                    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
                                    '</head>\n' +
                                    '<body>\n' +
                                    '<h1>You\' re invited from ' + invitingUserData.username + ' to join circle "' + circleName  + '"</h1>' +
                                    '<p>Please click on following link to join this circle on StudiCircle: <a href="' + constant.getCreateGuestUserURL(randomString) + '">Join circle</a></p>' +
                                    '</body>\n' +
                                    '</html>';
                                let subject = 'StudiCircle: Invitation in Circle ' + circleName;

                                return mailer.sendMail(mail, html, subject)
                                    .then(resp => {
                                        console.log(resp);
                                        return true;
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        return false;
                                    });
                            } catch (error) {
                                console.log(error);
                                return false;
                            }
                        }).error( err =>{
                            console.log(err);
                            return false;
                        });
                    }
                    return false;
                }).error(err => {
                    console.log(err);
                    return err;
                });
            }).error(err => {
                console.log(err);
                return err;
            });
        } catch (err) {
            console.log(err);
            return false;
        }

    }
};