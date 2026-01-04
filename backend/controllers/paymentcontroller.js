const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
  try {
    const { paymentMethodId, amount } = req.body;

    if (!paymentMethodId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Payment method ID and amount are required',
      });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      return_url: 'http://localhost:3000/', // Redirect URL after payment
    });

    if (paymentIntent.status === 'succeeded') {
      return res.status(200).json({
        success: true,
        message: 'Payment successful',
        paymentIntentId: paymentIntent.id,
      });
    } else if (paymentIntent.status === 'requires_action') {
      return res.status(200).json({
        success: false,
        message: 'Payment requires additional action',
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Payment failed',
        status: paymentIntent.status,
      });
    }
  } catch (error) {
    console.error('Payment error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Payment processing failed',
    });
  }
};

const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: 'Amount is required',
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create payment intent',
    });
  }
};

module.exports = {
  processPayment,
  createPaymentIntent,
};
