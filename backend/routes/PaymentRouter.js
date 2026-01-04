const express = require('express');
const { processPayment, createPaymentIntent } = require('../controllers/paymentcontroller');

const paymentRouter = express.Router();

// Route to process payment
paymentRouter.post('/process', processPayment);

// Route to create payment intent
paymentRouter.post('/intent', createPaymentIntent);

module.exports = paymentRouter;
