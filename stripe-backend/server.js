require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create checkout session endpoint
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Your Price ID from Stripe Dashboard
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      subscription_data: {
        trial_period_days: 7, // 7-day free trial
      },
      customer_email: req.body.email, // Optional: pre-fill customer email
      metadata: {
        product_name: 'Home Forge Fit Premium',
      },
    });
    
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint for handling subscription events
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
      console.log('Subscription created:', event.data.object);
      // Update your database with subscription details
      break;
    case 'customer.subscription.trial_will_end':
      console.log('Trial ending soon:', event.data.object);
      // Send reminder email to customer
      break;
    case 'invoice.payment_succeeded':
      console.log('Payment succeeded:', event.data.object);
      // Grant access to premium features
      break;
    case 'invoice.payment_failed':
      console.log('Payment failed:', event.data.object);
      // Handle failed payment
      break;
    case 'customer.subscription.deleted':
      console.log('Subscription canceled:', event.data.object);
      // Revoke access to premium features
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Stripe backend is running' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Stripe backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
}); 