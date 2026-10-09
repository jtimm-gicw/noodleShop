// Sequelize database models for this educational application.
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false });
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'customer' }
});
const Order = sequelize.define('Order', {
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'order-placed' },
  total: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  deliveryAddress: { type: DataTypes.STRING, allowNull: false }
});
const OrderItem = sequelize.define('OrderItem', {
  dishId: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  qty: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false }
});
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
module.exports = { sequelize, User, Order, OrderItem };
