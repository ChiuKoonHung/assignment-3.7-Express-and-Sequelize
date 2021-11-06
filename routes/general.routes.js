const express = require('express');
const router = express.Router();
const VehicleController = require('../controller/vehicle.controller')
const vehicleController = new VehicleController();

router.get("/general", (req, res) => {
    return res.send("You have called a general route");
});

router.get('/general/vehicle', async(req, res) => {
    await vehicleController.showAll(req, res);
});

module.exports = router;