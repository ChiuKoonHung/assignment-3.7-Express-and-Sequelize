# Sequelize

## Brief

In this lesson, we will walk through the steps to:
1. Setup Node.js with Sequelize.
2. Define models and associations.
3. Send queries.

Login to your database session via Terminal to get ready for sending SQL queries.

We will be designing according to what we have produced in previous lesson. Consider the following ERD, we will be creating `Vehicle` and `Driver` models.

<img src="./assets/images/car-park-erd.png" />

### Part 1 - Setup

Step 1: Change Directory to the root of this git repostiory and run the following commands on terminal.

```
npm init
```

Then,

```
npm install sequelize pg pg-hstore 
```

Create a start script in `package.json`.

``` js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
},
```

Step 2: Create `./models/index.js` and add the following code.

``` js
// Import sequelize
const { Sequelize } = require("sequelize");

// DB Connection Configuration
const sequelize = new Sequelize("lesson_db", "edisonzhuang", "", {
  host: "localhost",
  dialect: "postgres",
});

// Test connection function
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
}

// Exports (remember enhanced object literal)
module.exports = {
  sequelize,
  testConnection,
};

```

Step 3: Import `./src/models/index.js` into `./index.js`

```js
const {sequelize, testConnection} = require("./models"); // index.js is the default entry point.

testConnection();
```

Step 4: Run the application with `npm run start` and you should see an output such as:

```
Executing (default): SELECT 1+1 AS result
Connection has been established successfully.
```


### Part 2 - Define Models and Associations

Step 1: Create a new file `./models/vehicle.model.js` and add the following code.

```js
const { DataTypes, Model } = require("sequelize");

module.exports = function (sequelize) {
  class Vehicle extends Model {}

  Vehicle.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      carPlateNo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "car_plate_no",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "Vehicle",
      tableName: "vehicles",
    }
  );

  return Vehicle;
};
```
Step 2: Export `Vehicle` model in `./models/index.js`:

```js
// Import model(s)
const Vehicle = require('./vehicle.model')(sequelize); // this line right above module.exports

// Exports (remember enhanced object literal)
module.exports = {
  sequelize,
  testConnection,
  Vehicle
};
```

Step 3: Attempt a query in `./index.js`. The whole file should look like this:

```js
const { sequelize, testConnection, Vehicle } = require("./models"); // index.js is the default entry point.

testConnection();

// Addition (Remember IIFE?)
(async () => {
  const results = await Vehicle.findAll();
  console.log(JSON.stringify(results));
})();
```

Step 4: Run the application

Run the application with `npm run start` and you should see an error.

> UnhandledPromiseRejectionWarning: SequelizeDatabaseError: column "createdAt" does not exist

By default, the ORM expects `createdAt` and `updatedAt` columns in the tables. Add the columns by entering into a DB session on Terminal. Add column with this SQL:

```
alter table "vehicles" add column "created_at" timestamp;
alter table "vehicles" add column "updated_at" timestamp;
```

Add 2 properties to `Vehicle` Model:

```js
createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
},
updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
},
```

Step 5: Run the application again and you should be able to read the data from database.

Output:
```
[{"id":1,"type":"Truck","carPlateNo":"SHA3331Z","createdAt":null,"updatedAt":null},{"id":2,"type":"Taxi","carPlateNo":"SHI3231Z","createdAt":null,"updatedAt":null}]
```

Step 6: Create `Driver` model and associate it with `Vehicle`. 

One driver should have one vehicle. A vehicle can have zero driver. In the language of sequelize, it will be: 
> A Vehicle belongs to A Driver.

Create file `./models/driver.model.js` and add the following code:

```js
const { DataTypes, Model } = require("sequelize");

module.exports = function (sequelize) {
  class Driver extends Model {}

  Driver.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      carLicenseNo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "car_license_no",
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "full_name",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "Driver",
      tableName: "drivers",
    }
  );

  return Driver;
};

```

Run these SQL commands at DB session:
```
alter table "drivers" add column "created_at" timestamp;
alter table "drivers" add column "updated_at" timestamp;
```

Add `driverId` attribute to `Vehicle` model.

```js
driverId:{
    type:DataTypes.INTEGER,
    field:"driverId"
},
```

Import `Driver` into `./models/index.js`:

```js
// Import model(s)
const Vehicle = require("./vehicle.model")(sequelize);
const Driver = require("./driver.model")(sequelize); // Addition
```

Edit the query in `./index.js` to include Driver object.

```js
const results = await Vehicle.findAll({ include: Driver });
```

### Part 3 - Sending Queries (CRUD)

Creating, updating and deleting example:

`./index.js`
``` js
    // Create
    const newVehicle = await Vehicle.create({carPlateNo:"888AA", type:"Bike"});
  
    // Update 
    newVehicle.type = "Road Bike";
    await newVehicle.save();

    // Delete 
    await newVehicle.destroy();
```

More query examples:

``` js

result = await Vehicle.findAll({attributes:["carPlateNo"]}); // Selecting only "carPlateNo"
result = await Vehicle.findAll({where:{type:"Truck"}}); // Select records where type = "Truck"
result = await Vehicle.findAll({order:[["carPlateNo","DESC"]]}); // select records order by carPlateNo in descending order
```
