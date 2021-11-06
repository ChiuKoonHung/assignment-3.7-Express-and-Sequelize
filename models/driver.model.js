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
