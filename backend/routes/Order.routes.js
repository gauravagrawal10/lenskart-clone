const { Router } = require('express');
const { OrderModel } = require('../model/Orders.model');
const { MustBeSigned } = require('../middleware/authenticate');

const orderRouter = Router();

// Logger
orderRouter.use((req, res, next) => {
  console.log('[OrderRouter]', req.method, req.path);
  next();
});

// ADMIN – Get all orders
orderRouter.get('/', async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.send(orders);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// USER – Get own orders
orderRouter.get('/my', MustBeSigned, async (req, res) => {
  try {
    const userID = req.body.userID;
    const orders = await OrderModel.find({ userID });
    res.send(orders);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// CREATE order
orderRouter.post('/', async (req, res) => {
  try {
    await OrderModel.insertMany(req.body);
    res.send({ msg: "Order placed successfully" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// ADMIN – Update order status
orderRouter.patch('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.send({
      msg: "Order status updated",
      order: updatedOrder
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// DELETE order (optional)
orderRouter.delete('/delete/:id', async (req, res) => {
  try {
    await OrderModel.findByIdAndDelete(req.params.id);
    res.send({ msg: "Order deleted successfully" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = orderRouter;
