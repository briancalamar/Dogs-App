const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
  // defino el modelo
  const Dog = sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span:{
      type: DataTypes.STRING,
    },
    image:{
      type: DataTypes.STRING,
    },
  });

  Dog.beforeCreate(async (dog) => {
    if( isNaN( await Dog.max("id"))){
        dog.id = 1000;
    }
    else dog.id = await Dog.max("id") + 1
  });
};




