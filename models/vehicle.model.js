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
      // driverId:{
      //     type:DataTypes.INTEGER,
      //     allowNull:true,
      //     field:"driver_id"
      // },
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
