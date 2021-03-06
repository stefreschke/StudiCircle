const Sequelize = require('sequelize'),
	sequelize = require('./connection.js');

const Circle = sequelize.define('Circle', {
	name: Sequelize.STRING,
	visible: Sequelize.BOOLEAN,
	business: Sequelize.BOOLEAN,
	// MODUL - Booleans (existiert/existiert nicht)
	blackboard: Sequelize.BOOLEAN,
	calendar: Sequelize.BOOLEAN,
	bill: Sequelize.BOOLEAN,
	bet: Sequelize.BOOLEAN,
	filesharing: Sequelize.BOOLEAN,
	chat: Sequelize.BOOLEAN,
	market: Sequelize.BOOLEAN
}, {
	timestamps: false
});

const Location = sequelize.define('Location', {
	longitude: Sequelize.DOUBLE,
	latitude: Sequelize.DOUBLE
});

const UsersCircles = sequelize.define('UsersCircles', {
	userID: Sequelize.INTEGER,
	circleID: Sequelize.INTEGER
});

const CircleLocation = sequelize.define('CircleLocation', {});

Circle.belongsToMany(Location, { as: 'locations', through: { model: CircleLocation }, foreignKey: 'circle_id' });
Location.belongsToMany(Circle, { as: 'circles', through: { model: CircleLocation }, foreignKey: 'location_id' });

module.exports.Circle = Circle;
module.exports.Location = Location;
module.exports.UsersCircles = UsersCircles;
module.exports = Circle;
