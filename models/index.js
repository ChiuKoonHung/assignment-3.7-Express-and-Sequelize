// Import sequelize
const { Sequelize } = require("sequelize");

// DB Connection Configuration
const sequelize = new Sequelize("lesson_db", "postgres", "justinchiu123", {
  host: "localhost",
  dialect: "postgres",
});

// Test connection function
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
	addDataToDB();
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
}
testConnection();

// Import model(s)
const Vehicle = require("./vehicle.model")(sequelize);
const Driver = require("./driver.model")(sequelize);

// Create associations
Vehicle.belongsTo(Driver, {
    foreignKey:"driverId",
	as:"driver"
});

async function addDataToDB() {

	try {
	// Destructive operation do only when needed
	await sequelize.sync( {force: true} );

	await Vehicle.create( {
		type: 'car',
		carPlateNo: 'SA882'
	} );
	await Vehicle.create( {
		type: 'car',
		carPlateNo: 'SP558',
		driverId: 1,
	} );

	await Driver.create( {
		carLicenseNo: '25990234',
		fullName: 'Shramee Srivastav',
	 } );

	 await Driver.create( {
		carLicenseNo: '25990235',
		fullName: 'John Doe',
	 } );

	 await Driver.create( {
		carLicenseNo: '25990224',
		fullName: 'Jane Doe',
	 } );

	// Fetch all data Vehicle.findAll
	const vehiclesInDB = await Vehicle.findAll();
	vehiclesInDB.forEach( v => console.log( v.id, v.carPlateNo, v.type ) );

	const driversInDB = await Driver.findAll();
	driversInDB.forEach( d => console.log( d.id, d.carLicenseNo, d.fullName ) );
	} catch ( err ) {
		console.log( err );
	}
}

// Exports (remember enhanced object literal)
module.exports = {
  sequelize,
  testConnection,
  Vehicle,
  Driver,
};
