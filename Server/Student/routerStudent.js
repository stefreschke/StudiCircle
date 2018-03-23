module.exports = function(app) {
    var user = require('./controllerStudent');

    // user routes
    app.route('/user/register')
        .post(user.register);

    app.route('/user/:uuid/resetPassword')
        .get(user.resetPassword);

    app.route('/user/:uuid/activate')
        .get(user.activate);

    app.route('/user/setNewPassword')
        .post(user.setNewPassword);

    app.route('/user/forgotPassword')
        .post(user.forgotPassword);

    app.route('/user/test')
        .get(user.test);

    app.route('/user/*')
        .get(user.helloworld);

    app.route('/*')
        .get(user.unknownpage);
};