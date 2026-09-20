
const Orders = require('../models/orders.model');
const Products = require('../models/product.model');
const { sequelize } = require("../config/database");
const OrderItem = require('../models/orderItem.model');

const getOrders = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have user authentication middleware that sets req.user
        const orders = await Orders.findAll({ where: { user_id: userId }    ,
            include: [
        {
          model: OrderItem,
          as: 'items',

          include: [
            {
              model: Products,
              as: 'product',

              attributes: [
                'id',
                'name',
                'price',
                'image',
                'category'
              ]
            }
          ]
        }
      ],
    order: [
        ['createdAt', 'DESC'] ]});

        return res.status(200).json({
            orders
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const createOrder = async (req, res) => {
    const transaction= await sequelize.transaction();
    try {
        const { items } = req.body; // Assuming items is an array of { product_id, quantity, price }
        const userId = req.user.id; // Assuming you have user authentication middleware that sets req.user  
        if(!items || !Array.isArray(items) || items.length === 0) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: "Items are required to create an order"
            });
        }
        const productIds = items.map(item => item.product_id);
        const products = await Products.findAll({
            where: {
                id: productIds
            },transaction
        });
        if(products.length !== productIds.length) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: "One or more products are invalid"
            });
        }
        let totalAmount = 0;
        var orderItems=[]
        for(const item of items) {
            const product = products.find(p => p.id === item.product_id);
            if(!product) {
                await transaction.rollback();
                return res.status(400).json({
                    success: false,
                    message: `Product with id ${item.product_id} not found`
                });
            }
            const quantity = Number(item.quantity);
            if (!quantity || quantity <= 0) {
                await transaction.rollback();

                return res.status(400).json({
                    success: false,
                    message: 'Invalid quantity'
                });
            
            }
             const price = Number(product.price);
            totalAmount += price * quantity;

            orderItems.push({
                product_id: item.product_id,
                quantity: item.quantity,
                price: product.price
            });
        }
        const order = await Orders.create({
            user_id: userId,
            total_amount: totalAmount,
            status: 'PLACED'
        },{transaction});

        const ItemsToCreate = orderItems.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price
        }));
        await OrderItem.bulkCreate(ItemsToCreate,{transaction});
        await transaction.commit();
        return res.status(201).json({
            message: 'Order created successfully',
            order: {
                id: order.id,
                total_amount: totalAmount,
                status: order.status
            }
        });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to create order"
        });
    }

}   

module.exports = {
    getOrders,
    createOrder
};