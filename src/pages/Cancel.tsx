import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, XCircle, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Cancel Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-12 w-12 text-red-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Checkout Cancelled
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              No worries! You can still enjoy our free features.
            </p>
          </div>

          {/* Free Features */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white">
                Continue with Free Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Basic workout generation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Equipment-based workouts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Workout timer</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Drag & drop exercise editing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Reminder */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-center gap-2">
                <Crown className="h-5 w-5 text-orange-400" />
                Unlock Premium Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Get access to advanced workout plans, progress analytics, and priority support.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-2">
                    SEK 79/month
                  </div>
                  <div className="text-sm text-gray-400 mb-4">
                    with 7-day free trial
                  </div>
                  <Link to="/checkout">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2">
                      Try Premium
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/training">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-lg font-semibold">
                Start Free Workout
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-sm text-gray-400">
            <p>
              Questions about pricing? Contact us at{' '}
              <a href="mailto:support@homeforgefit.com" className="text-orange-400 hover:text-orange-300">
                support@homeforgefit.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel; 