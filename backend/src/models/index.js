const user= require('./user.model');
const product= require('./product.model');
const order= require('./orders.model');
const orderItem= require('./orderItem.model');

user.hasMany(order, { foreignKey: 'user_id',as: 'orders' });
order.belongsTo(user, { foreignKey: 'user_id', as: 'user' });

order.hasMany(orderItem, { foreignKey: 'order_id', as: 'items', onDelete: 'CASCADE' });
orderItem.belongsTo(order, { foreignKey: 'order_id', as: 'order' });

product.hasMany(orderItem, { foreignKey: 'product_id', as: 'items' });
orderItem.belongsTo(product, { foreignKey: 'product_id', as: 'product' });

module.exports = {
  user,
  product,
  order,
  orderItem
};  