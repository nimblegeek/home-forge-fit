import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Crown, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to Premium!
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your 7-day free trial has started. Enjoy all premium features!
            </p>
          </div>

          {/* Subscription Details */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-center gap-2">
                <Crown className="h-5 w-5 text-orange-400" />
                Your Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Plan:</span>
                <span className="text-white font-semibold">Premium Monthly</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Price:</span>
                <span className="text-white font-semibold">SEK 79/month</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Trial Period:</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  7 Days Free
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Next Billing:</span>
                <span className="text-white font-semibold">In 7 days</span>
              </div>
            </CardContent>
          </Card>

          {/* Premium Features */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                Premium Features Unlocked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Advanced Workout Plans</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Progress Analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Priority Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Ad-Free Experience</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/training">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg font-semibold">
                Start Training
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold">
                Go Home
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-sm text-gray-400">
            <p>You'll receive a confirmation email shortly.</p>
            <p className="mt-2">
              Need help? Contact us at{' '}
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

export default Success; 