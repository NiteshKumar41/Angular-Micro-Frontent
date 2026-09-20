
// const Product = require('../models/product.model');
// const {sequelize} = require('../config/database');

// const products = [
//   {
//     name: 'iPhone 17',
//     price: 79999,
//     description: 'Latest Apple iPhone with powerful performance.',
//     image: null,
//     category: 'Mobile'
//   },
//   {
//     name: 'MacBook Air',
//     price: 99999,
//     description: 'Lightweight Apple laptop for everyday productivity.',
//     image: null,
//     category: 'Laptop'
//   },
//   {
//     name: 'AirPods Pro',
//     price: 24999,
//     description: 'Premium wireless earbuds with active noise cancellation.',
//     image: null,
//     category: 'Audio'
//   },
//   {
//     name: 'Samsung Galaxy S25',
//     price: 74999,
//     description: 'Premium Android smartphone with advanced features.',
//     image: null,
//     category: 'Mobile'
//   },
//   {
//     name: 'Sony WH-1000XM5',
//     price: 29999,
//     description: 'Wireless noise cancelling headphones.',
//     image: null,
//     category: 'Audio'
//   },
//   {
//     name: 'Dell XPS 15',
//     price: 129999,
//     description: 'Powerful laptop for development and productivity.',
//     image: null,
//     category: 'Laptop'
//   }
// ];

// const seedProducts = async () => {

//   try {

//     await sequelize.authenticate();

//     console.log('Database connected');

//     await Product.bulkCreate(products);

//     console.log('Products inserted successfully');

//   } catch (error) {

//     console.error(
//       'Product seeding failed:',
//       error
//     );

//   } finally {

//     await sequelize.close();

//   }
// };

// seedProducts();