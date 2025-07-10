import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap, Crown } from 'lucide-react';

interface CheckoutProps {
  onClose?: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: '', // Optional: pre-fill customer email
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Crown,
      title: 'Premium Workouts',
      description: 'Access to exclusive workout programs and advanced training plans'
    },
    {
      icon: Zap,
      title: 'Advanced Analytics',
      description: 'Track your progress with detailed analytics and performance insights'
    },
    {
      icon: Star,
      title: 'Priority Support',
      description: 'Get priority customer support and personalized training advice'
    },
    {
      icon: CheckCircle,
      title: 'Ad-Free Experience',
      description: 'Enjoy a clean, distraction-free workout experience'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Upgrade to Premium
          </h1>
          {onClose && (
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onClose}>
              <span className="text-2xl">×</span>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Pricing Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-center text-2xl">
                Premium Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {/* Price */}
              <div className="space-y-2">
                <div className="text-4xl font-bold text-orange-400">
                  SEK 79
                </div>
                <div className="text-gray-300">per month</div>
              </div>

              {/* Trial Badge */}
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-lg px-4 py-2">
                7-Day Free Trial
              </Badge>

              {/* Features */}
              <div className="space-y-4 text-left">
                <div className="text-lg font-semibold text-white mb-4">What's included:</div>
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white">{feature.title}</div>
                        <div className="text-sm text-gray-300">{feature.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold"
                size="lg"
              >
                {isLoading ? 'Loading...' : 'Start 7-Day Free Trial'}
              </Button>

              {error && (
                <div className="text-red-400 text-sm mt-2">
                  {error}
                </div>
              )}

              {/* Terms */}
              <div className="text-xs text-gray-400">
                By starting your trial, you agree to our Terms of Service and Privacy Policy. 
                Cancel anytime during the trial period to avoid charges.
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Crown className="h-5 w-5 text-orange-400" />
                  Why Upgrade?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">Unlock unlimited workout variations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">Access to expert training programs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">Advanced progress tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">Priority customer support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Risk-Free Trial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-300">
                  <div>✓ 7-day free trial, no commitment</div>
                  <div>✓ Cancel anytime during trial</div>
                  <div>✓ No hidden fees</div>
                  <div>✓ Secure payment processing</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 