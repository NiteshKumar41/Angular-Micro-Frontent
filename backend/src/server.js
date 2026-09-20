const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./config/database");
const authRoutes = require("./routes/auth.routes");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const ordersRoutes = require("./routes/orders.routes");
const productsRoutes = require("./routes/products.routes");
const authenticate = require("./middleware/auth.middleware");
require('./models');
// Middleware
app.use(cors());
app.use(express.json());

// //Relationships
// User.hasMany(Order, { foreignKey: "user_id",onDelete: "CASCADE" });
// Order.belongsTo(User, { foreignKey: "user_id" });

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/orders', authenticate, ordersRoutes);
app.use('/api/products', productsRoutes);

// Start the server after connecting to the database
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
}); 