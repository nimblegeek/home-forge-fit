
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Dumbbell, Timer, Target, Zap, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Dumbbell,
      title: 'Home Equipment Focus',
      description: 'Designed specifically for home workouts using common equipment like kettlebells, dumbbells, and resistance bands.'
    },
    {
      icon: Timer,
      title: 'Multiple Workout Styles',
      description: 'Choose from EMOM, AMRAP, TABATA, For Time, and Rounds to keep your training varied and engaging.'
    },
    {
      icon: Target,
      title: 'Tailored Workouts',
      description: 'Generate personalized workouts based on your available equipment and preferred training style.'
    },
    {
      icon: Zap,
      title: 'Quick & Simple',
      description: 'No complicated setup. Select your gear, pick your style, and start training in seconds.'
    }
  ];

  const workoutTypes = [
    { name: 'EMOM', description: 'Every Minute on the Minute', color: 'from-orange-500 to-red-500' },
    { name: 'AMRAP', description: 'As Many Rounds As Possible', color: 'from-purple-500 to-pink-500' },
    { name: 'TABATA', description: '20 sec work, 10 sec rest', color: 'from-blue-500 to-cyan-500' },
    { name: 'For Time', description: 'Complete as fast as possible', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-orange-500/20 text-orange-300 border-orange-500/30">
              CrossFit Home Training
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-red-300 bg-clip-text text-transparent">
              Train Hard,
              <br />
              Train Smart
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              The ultimate CrossFit training app designed for home workouts. 
              <br />
              Generate personalized WODs based on your equipment and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/training">
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold group"
                  size="lg"
                >
                  Try it in the Browser
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-orange-500/50 text-orange-300 hover:bg-orange-500/10 hover:border-orange-400 px-8 py-4 text-lg"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Why Choose Our App?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Built by athletes, for athletes. Simple, effective, and focused on results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Workout Types Preview */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Workout Styles</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose from proven CrossFit training methodologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workoutTypes.map((type, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className={`mb-4 mx-auto w-12 h-12 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{type.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{type.name}</h3>
                <p className="text-sm text-gray-300">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/40 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Transform Your Training?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of athletes who have revolutionized their home workouts with our simple, effective training app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-orange-300">
                <CheckCircle className="h-5 w-5" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2 text-orange-300">
                <CheckCircle className="h-5 w-5" />
                <span>Works on any device</span>
              </div>
              <div className="flex items-center gap-2 text-orange-300">
                <CheckCircle className="h-5 w-5" />
                <span>Completely free</span>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/training">
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold group"
                  size="lg"
                >
                  Start Training Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Built with ❤️ for the CrossFit community
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
