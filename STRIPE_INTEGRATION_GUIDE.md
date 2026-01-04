# Stripe Payment Integration Setup Guide

## Overview
This guide walks you through setting up Stripe payment integration for the ClearDekho Lenskart Clone project.

## Files Modified/Created

### Frontend Changes
1. **frontend/package.json** - Added Stripe dependencies
   - `@stripe/react-stripe-js`
   - `@stripe/stripe-js`

2. **frontend/src/Components/Products/Payment.jsx** - Complete rewrite with Stripe integration
   - Replaced dummy payment form with Stripe CardElement
   - Added payment processing logic
   - Integrated with backend API

3. **frontend/src/Components/Products/StripeProvider.jsx** - New file
   - Wrapper component to provide Stripe context to the Payment component

### Backend Changes
1. **backend/package.json** - Added `stripe` package

2. **backend/controllers/paymentcontroller.js** - New file
   - `processPayment()` - Processes payment with Stripe
   - `createPaymentIntent()` - Creates a Stripe payment intent

3. **backend/routes/PaymentRouter.js** - New file
   - POST `/api/payment/process` - Process payment
   - POST `/api/payment/intent` - Create payment intent

4. **backend/index.js** - Updated
   - Added payment router import and middleware

## Setup Instructions

### Step 1: Get Stripe API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Sign up or log in to your Stripe account
3. Navigate to **Developers** → **API Keys**
4. Copy your:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)

### Step 2: Add Environment Variables

**Backend (.env file in backend folder):**
```
MONGO_URI=mongodb+srv://...
PORT=8000
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

**Frontend (.env file in frontend folder):**
```
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_publishable_key_here
```

### Step 3: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 4: Update Payment Component Usage

Wrap your Payment component with the StripeProvider in your routing or parent component:

```jsx
import { StripeProvider } from './Components/Products/StripeProvider';
import Payment from './Components/Products/Payment';

// In your component/route:
<StripeProvider>
  <Payment />
</StripeProvider>
```

Or update the route that uses Payment component to wrap it with StripeProvider.

### Step 5: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Testing with Stripe Test Cards

Use these test card numbers to process payments in test mode:

**Successful Payment:**
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/25`)
- CVC: Any 3 digits (e.g., `123`)

**Declined Payment:**
- Card Number: `4000 0000 0000 0002`
- Expiry: Any future date
- CVC: Any 3 digits

**3D Secure Payment:**
- Card Number: `4000 0025 0000 3155`
- Expiry: Any future date
- CVC: Any 3 digits

## API Endpoints

### Process Payment
**POST** `/api/payment/process`

Request Body:
```json
{
  "paymentMethodId": "pm_...",
  "amount": 5000
}
```

Response (Success):
```json
{
  "success": true,
  "message": "Payment successful",
  "paymentIntentId": "pi_..."
}
```

### Create Payment Intent
**POST** `/api/payment/intent`

Request Body:
```json
{
  "amount": 5000
}
```

Response:
```json
{
  "success": true,
  "clientSecret": "pi_..._secret_...",
  "paymentIntentId": "pi_..."
}
```

## Features Implemented

✅ Stripe CardElement for secure card input
✅ Payment processing with Stripe API
✅ Error handling and validation
✅ Loading states during payment processing
✅ Success notifications with SweetAlert2
✅ Multi-step form for checkout
✅ Responsive design with Chakra UI

## Frontend Component Structure

The Payment component has 3 forms:
1. **Form1** (Registration) - Optional, can be removed
2. **Form2** (Delivery Address) - Collects shipping details
3. **Form3** (Payment) - Stripe payment form

Navigate between forms using Back/Next buttons. The final "Pay Now" button in Form3 processes the payment.

## Troubleshooting

### "Stripe is not loaded" error
- Check that `REACT_APP_STRIPE_PUBLIC_KEY` is set in frontend `.env`
- Restart the frontend development server after adding `.env`

### Payment fails with 401/403 error
- Verify `STRIPE_SECRET_KEY` is correctly set in backend `.env`
- Check Stripe API keys are valid

### CardElement not showing
- Ensure StripeProvider wraps the Payment component
- Check browser console for any import errors

### CORS errors
- Ensure backend `cors` is configured correctly
- Check that frontend proxy is set (it's in package.json)

## Next Steps

1. Customize amount calculation based on cart items
2. Add order creation after successful payment
3. Implement webhooks for payment confirmation
4. Add refund functionality
5. Implement payment history/receipts
6. Add more payment methods (Apple Pay, Google Pay)

## Additional Resources

- [Stripe React Integration](https://stripe.com/docs/stripe-js/react)
- [Stripe Payment Intents API](https://stripe.com/docs/payments/payment-intents)
- [Stripe Test Mode](https://stripe.com/docs/testing)
