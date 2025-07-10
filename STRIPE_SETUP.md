# Stripe Payment Integration Setup

This guide will help you set up Stripe payments for your React app with a 7-day free trial and SEK 79/month subscription.

## 🚀 Quick Start

### 1. Stripe Dashboard Setup

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com) and sign up
   - Navigate to **Developers > API Keys** to get your keys

2. **Create Product & Price**
   - Go to **Products > Add a Product**
   - Name: "Home Forge Fit Premium"
   - Description: "Access to premium workout features"
   - Pricing: SEK 79/month (recurring)
   - **Important**: Enable 7-day free trial in price settings

3. **Copy Your Keys**
   - Publishable Key: `pk_test_...`
   - Secret Key: `sk_test_...`
   - Price ID: `price_...`

### 2. Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd stripe-backend
   ```

2. **Create Environment File**
   ```bash
   cp env.example .env
   ```

3. **Update Environment Variables**
   ```bash
   # Edit .env file with your Stripe keys
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   STRIPE_PRICE_ID=price_your_price_id_here
   CLIENT_URL=http://localhost:8081
   PORT=4000
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Start Backend Server**
   ```bash
   npm start
   ```

### 3. Frontend Setup

1. **Environment Variables** (Optional for testing)
   - Create `.env` in the root directory
   - Add: `REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here`

2. **Start Frontend**
   ```bash
   npm run dev
   ```

## 🧪 Testing

### Test Cards
Use these test cards in Stripe Checkout:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Expiry**: Any future date
- **CVC**: Any 3 digits

### Test Flow
1. Click "Upgrade to Premium" on homepage
2. Click "Start 7-Day Free Trial"
3. Fill in test card details
4. Complete checkout
5. Verify success/cancel pages

## 🔧 Webhook Setup (Optional)

For production, set up webhooks to handle subscription events:

1. **Install Stripe CLI**
   ```bash
   brew install stripe/stripe-cli/stripe
   stripe login
   ```

2. **Forward Webhooks**
   ```bash
   stripe listen --forward-to http://localhost:4000/webhook
   ```

3. **Add Webhook Secret**
   - Copy the webhook secret from CLI output
   - Add to `.env`: `STRIPE_WEBHOOK_SECRET=whsec_...`

## 📁 File Structure

```
├── src/
│   ├── components/
│   │   └── Checkout.tsx          # Stripe checkout component
│   └── pages/
│       ├── Success.tsx           # Success page after payment
│       └── Cancel.tsx            # Cancel page
├── stripe-backend/
│   ├── server.js                 # Express server with Stripe endpoints
│   ├── package.json              # Backend dependencies
│   └── env.example              # Environment variables template
└── STRIPE_SETUP.md              # This setup guide
```

## 🔒 Security Notes

- **Never expose secret keys** in frontend code
- **Use environment variables** for all sensitive data
- **Test thoroughly** before going live
- **Monitor webhooks** for subscription events

## 🚀 Production Deployment

1. **Backend**: Deploy to Heroku, Vercel, or AWS
2. **Frontend**: Deploy to Vercel, Netlify, or similar
3. **Update URLs**: Replace `localhost` with production URLs
4. **Switch to Live Mode**: Use live API keys in production

## 📞 Support

- **Stripe Documentation**: [docs.stripe.com](https://docs.stripe.com)
- **Test Mode**: All transactions are test-only until you switch to live mode
- **Currency**: SEK is supported by Stripe

## 🎯 Features Implemented

- ✅ 7-day free trial
- ✅ SEK 79/month subscription
- ✅ Stripe Checkout integration
- ✅ Success/Cancel pages
- ✅ Webhook handling
- ✅ Test mode ready
- ✅ Production ready

## 🔄 Next Steps

1. **Test the integration** with test cards
2. **Set up webhooks** for production
3. **Deploy to production** servers
4. **Switch to live mode** when ready
5. **Monitor subscriptions** in Stripe Dashboard 