
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Target, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const equipment = [
  { id: 'kettlebells', name: 'Kettlebells', icon: '🏋️' },
  { id: 'jumpingRope', name: 'Jumping Rope', icon: '🪢' },
  { id: 'barbells', name: 'Barbells', icon: '🏋️‍♂️' },
  { id: 'dumbbells', name: 'Dumbbells', icon: '💪' },
  { id: 'resistanceBands', name: 'Resistance Bands', icon: '🔗' },
  { id: 'pullupBar', name: 'Pull-up Bar', icon: '🏃‍♂️' },
  { id: 'medicineBall', name: 'Medicine Ball', icon: '⚽' },
  { id: 'boxJump', name: 'Box/Step', icon: '📦' },
];

const workoutTypes = [
  {
    id: 'emom',
    name: 'EMOM',
    description: 'Every Minute on the Minute',
    icon: Clock,
    color: 'bg-gradient-to-r from-orange-500 to-red-500'
  },
  {
    id: 'amrap',
    name: 'AMRAP',
    description: 'As Many Rounds As Possible',
    icon: Target,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    id: 'tabata',
    name: 'TABATA',
    description: '20 sec work, 10 sec rest',
    icon: Zap,
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  },
  {
    id: 'forTime',
    name: 'For Time',
    description: 'Complete as fast as possible',
    icon: Clock,
    color: 'bg-gradient-to-r from-green-500 to-emerald-500'
  },
  {
    id: 'rounds',
    name: 'Rounds',
    description: 'Set number of rounds',
    icon: Target,
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500'
  },
];

const Training = () => {
  const navigate = useNavigate();
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<string>('');
  const [duration, setDuration] = useState<number>(20);

  const handleEquipmentChange = (equipmentId: string, checked: boolean) => {
    if (checked) {
      setSelectedEquipment([...selectedEquipment, equipmentId]);
    } else {
      setSelectedEquipment(selectedEquipment.filter(id => id !== equipmentId));
    }
  };

  const generateWorkout = () => {
    if (selectedEquipment.length === 0 || !selectedWorkout) {
      alert('Please select at least one equipment and a workout type!');
      return;
    }
    
    // Navigate to workout display page with parameters
    navigate('/workout', {
      state: {
        equipment: selectedEquipment,
        type: selectedWorkout,
        duration
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Build Your Workout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Equipment Selection */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <span className="text-2xl">🏠</span>
                Available Equipment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {equipment.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <Checkbox
                      id={item.id}
                      checked={selectedEquipment.includes(item.id)}
                      onCheckedChange={(checked) => handleEquipmentChange(item.id, checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                    <label htmlFor={item.id} className="flex items-center gap-2 cursor-pointer text-white">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm">{item.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Workout Type Selection */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Workout Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workoutTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedWorkout === type.id
                          ? 'border-orange-500 bg-orange-500/20'
                          : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                      }`}
                      onClick={() => setSelectedWorkout(type.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${type.color}`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{type.name}</h3>
                            <p className="text-sm text-gray-300">{type.description}</p>
                          </div>
                        </div>
                        {selectedWorkout === type.id && (
                          <Badge className="bg-orange-500 text-white">Selected</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Duration Selection */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              Workout Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <label className="text-white">Duration (minutes):</label>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-orange-400 font-semibold text-lg w-12">{duration}m</span>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={generateWorkout}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg font-semibold"
            size="lg"
          >
            Generate My Workout 🔥
          </Button>
        </div>

        {/* Selected Summary */}
        {(selectedEquipment.length > 0 || selectedWorkout) && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mt-8">
            <CardHeader>
              <CardTitle className="text-white">Your Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedEquipment.length > 0 && (
                  <div>
                    <p className="text-gray-300 mb-2">Equipment:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedEquipment.map((id) => {
                        const item = equipment.find(e => e.id === id);
                        return (
                          <Badge key={id} variant="secondary" className="bg-orange-500/20 text-orange-300">
                            {item?.icon} {item?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                {selectedWorkout && (
                  <div>
                    <p className="text-gray-300 mb-2">Workout Type:</p>
                    <Badge className="bg-purple-500/20 text-purple-300">
                      {workoutTypes.find(w => w.id === selectedWorkout)?.name}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Training;
