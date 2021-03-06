const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: true,
      defaultValue: 0,
      validate: {     
        isDecimal: true,
        min: {
          args: [0]       
        },
        max: {
          args: [999999999]           
        }
      }
    },
    state: {
      type: DataTypes.ENUM,
      defaultValue: 'Cart',
      values: ['Cart', 'Created', 'Processing', 'Canceled', 'Complete']
    }
    })
}
