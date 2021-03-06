const Sequelize = require('sequelize'),
	sequelize = require('./connection.js');

const User = sequelize.define('User', {
	name: Sequelize.STRING,
	email: {
        type: Sequelize.STRING,
		unique: true
	},
	pwdHash: Sequelize.STRING,
	salt: Sequelize.STRING,
	lastActivity: Sequelize.DATE,
	businessDescription: Sequelize.STRING,
    state: Sequelize.ENUM (
        'ACTIVE',
        'PENDING',
        'DISABLED'
    ),
    type: Sequelize.ENUM (
        'BUSINESS',
        'GUEST',
        'STUDENT'
    )
}, {
	timestamps: false
});
module.exports = User;