const { Vehicle, Driver } = require("../models");

module.exports = {
  onboard: async (vehicleId, driverId) => {
    try {
    let result = {
      message: null,
      status: null,
      data: null,
    };
    const vehicle = await Vehicle.findByPk(vehicleId);
    const driver = await Driver.findByPk(driverId);

    if (!vehicle) {
        result.message = `Vehicle ID ${vehicleId} is not found.`;
        result.status = 404;
        return result;
      }

    if (vehicle.driverId) {
      result.message = `Vehicle ID ${vehicle.id} is already in use.`;
      result.status = 400;
      return result;
    }

    if (!driver) {
      result.message = `Driver ID ${driverId} is not found.`;
      result.status = 404;
      return result;
    }

    // Add driverId to the vehicle and update database:
    vehicle.driverId = driver.id;
    await vehicle.save();

    //Prepare and send response:
    result.data = vehicle;
    result.status = 200;
    result.message = "Onboard successful";

    return result;
    }    catch (error) {
      console.log(error);
    }
  },

  offboard: async (vehicleId, driverId) => {
    try {
    let result = {
      message: null,
      status: null,
      data: null,
    };
    const vehicle = await Vehicle.findByPk(vehicleId);

    if (!vehicle) {
        result.message = `Vehicle ID ${vehicleId} is not found.`;
        result.status = 404;
        return result;
      }

    // Remove driverId from the vehicle and update database:
    vehicle.driverId = null;
    await vehicle.save();

    result.data = vehicle;
    result.status = 200;
    result.message = "Offboard successful";
    return result;
  }    catch (error) {
    console.log(error);
  }
  },

  updateVehicle: async (vehicleId, driverId) => {
    try {
    let result = {
      message: null,
      status: null,
      data: null,
    };
    const vehicle = await Vehicle.findByPk(vehicleId);
    const driver = await Driver.findByPk(driverId);

    if (!vehicle) {
        result.message = `Vehicle ID ${vehicleId} is not found.`;
        result.status = 404;
        return result;
      }

    if (vehicle.driverId) {
      result.message = `Vehicle ID ${vehicle.id} is already in use.`;
      result.status = 400;
      return result;
    }

    if (!driver) {
      result.message = `Driver ID ${driverId} is not found.`;
      result.status = 404;
      return result;
    }

    vehicle.driverId = driver.id;
    await vehicle.save();
    result.data = vehicle;
    result.status = 200;
    result.message = "Update Vehicle successful";

    return result;
  }    catch (error) {
    console.log(error);
  }
  },

  updateVehicle: async (vehicleId, vehicleType, vehicleCarPlateNo) => {
    try {
    let result = {
      message: null,
      status: null,
      data: null,
    };

    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
        result.message = `Vehicle ID ${vehicleId} is not found.`;
        result.status = 404;
        return result;
      }

    if (vehicle) {
      // update vehicle details and update database:
    vehicle.type = vehicleType;
    vehicle.carPlateNo = vehicleCarPlateNo
    await vehicle.save();
    result.data = vehicle;
    result.status = 200;
    result.message = `Update Vehicle ID ${vehicleId} successful`;

    return result;
  } 
  }catch (error) {
    console.log(error);
  }
},

deleteVehicle: async (vehicleId, driverId) => {
  try {
  let result = {
    message: null,
    status: null,
    data: null,
  };
            //Fetch the vehicle & driver:
            const driver = await Driver.findByPk(driverId);
            const vehicle = await Vehicle.findAll({where: {
                driverId: driverId
              }});

  if (!vehicle) {
      result.message = `Driver ${driverId} is successfully deleted.`;
      result.status = 200;
      response.data = vehicle;
      return result;
    }

  if (vehicle) {
    result.message = `Driver is onboard a vehicle and cannot be deleted.`;
    result.status = 400;
    return result;
  }

  if (!driver) {
    result.message = `Driver ${driverId} is not found.`;
    result.status = 404;
    return result;
  }

  }    catch (error) {
    console.log(error);
    throw error;
  }
},

showAll: async() => {
  try {
    let result = {
          message: null,
          status: null,
          data: null,
      };

      //Fetch the vehicle & driver:
      const vehicle = await Vehicle.findAll({include:[{model:Driver, as:"driver"}]});

      //Region validation
      if (!vehicle) {
          result.status = 200;
          result.message = "There are no vehicles stored in database";
          return result;
      }
      if (vehicle) {
        result.status = 200;
          result.message = "List of vehicles in database with drivers";
          result.data = vehicle;
          return result;
      }
  } catch (error) {
      console.log(error);
  }
},
};
