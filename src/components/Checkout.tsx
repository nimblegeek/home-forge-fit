import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap, Crown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// TypeScript declaration for Stripe pricing table
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'pricing-table-id': string;
        'publishable-key': string;
      };
    }
  }
}

interface CheckoutProps {
  onClose?: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onClose }) => {
  useEffect(() => {
    // Load Stripe pricing table script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

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
            Become a monthly member today
          </h1>
          {onClose && (
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onClose}>
              <span className="text-2xl">×</span>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Stripe Pricing Table */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-center text-2xl">
                One plan, one price
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {/* Stripe Pricing Table */}
              <stripe-pricing-table 
                pricing-table-id="prctbl_1RjlFpCcLf80njXJ13rDCDxC"
                publishable-key="pk_live_51PuxRrCcLf80njXJqksaoVp0IN5lvTR1sOEwJdPrxxzxB7sU8gBCL1vjDJChdZ3iiKwUXTuixBTjIlgFcDo1zF0T00JtmLhUPy">
              </stripe-pricing-table>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Crown className="h-5 w-5 text-orange-400" />
                  Why Monthly Membership?
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

            {/* Back to App */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  Continue with Free Features
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/training">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Training
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 