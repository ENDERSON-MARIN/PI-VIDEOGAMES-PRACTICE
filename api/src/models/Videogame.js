const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // se define la estructura del modelo de los videojuegos
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      released: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },

      background_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: true }
  );
};
