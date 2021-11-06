const vehicleService = require("../services/vehicle.service");

class VehicleController {
  async onboard(req, res, next) {
      if (typeof req.body !=='object') {
          res.status(400);
          return;
      };

      const {vehicleId, driverId} = req.body;

      if(typeof driverId !== "number" || typeof vehicleId !== "number") {
          res.status(400);
          return res.json({message:"Incorrect request data"});
      }
      const response = await vehicleService.onboard(vehicleId, driverId);
      res.json(response);
  };

  async offboard(req, res, next) {
      if(typeof req.body.vehicleId!=="number") {
          res.status(400);
          return res.json({message:"Incorrect request data"});
      }
      const response = await vehicleService.offboard(req.body.vehicleId);
      res.json(response);
  };

  async change(req, res, next) {
      if (typeof req.body.carPlateNo!=="string" || typeof req.body.type!=="string"){
          res.status(400);
          return res.json({message:"Incorrect request data"});
      }
          res.status(200);
          const response = await vehicleService.change(req.body.vehicleId, req.body.type, req.body.carPlateNo);
          res.json(response);
  };

  async removeDriver(req,res) {
      const driverId = Number(req.params.driverId);
      res.status(200);
      const response = await vehicleService.removeDriver(driverId);
      res.json(response);
  };

  async showAll(req,res) {
      res.status(200);
      const response = await vehicleService.showAll();
      res.json(response);
  }
}

module.exports = VehicleController;