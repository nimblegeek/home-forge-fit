import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Pause, SkipForward, RotateCcw, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

interface WorkoutTimerProps {
  exercises: Exercise[];
  onComplete: () => void;
  onBack: () => void;
}

interface TimerState {
  isActive: boolean;
  isRest: boolean;
  timeLeft: number;
  currentExercise: number;
  currentSet: number;
  totalSets: number;
}

const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ exercises, onComplete, onBack }) => {
  const [timerState, setTimerState] = useState<TimerState>({
    isActive: false,
    isRest: false,
    timeLeft: 0,
    currentExercise: 0,
    currentSet: 1,
    totalSets: exercises[0]?.sets || 1,
  });

  const [isPaused, setIsPaused] = useState(false);

  // Parse rest time (e.g., "60s" -> 60, "90s" -> 90)
  const parseRestTime = (rest: string): number => {
    const match = rest.match(/(\d+)s?/);
    return match ? parseInt(match[1]) : 60;
  };

  // Start the workout
  const startWorkout = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isActive: true,
      timeLeft: 0, // Start immediately
      currentExercise: 0,
      currentSet: 1,
      totalSets: exercises[0]?.sets || 1,
    }));
  }, [exercises]);

  // Pause/Resume timer
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Skip to next set/exercise
  const skipCurrent = () => {
    if (timerState.isRest) {
      // Skip rest, go to next set
      const nextSet = timerState.currentSet + 1;
      if (nextSet <= timerState.totalSets) {
        setTimerState(prev => ({
          ...prev,
          isRest: false,
          timeLeft: 0,
          currentSet: nextSet,
        }));
      } else {
        // Move to next exercise
        const nextExercise = timerState.currentExercise + 1;
        if (nextExercise < exercises.length) {
          setTimerState(prev => ({
            ...prev,
            isRest: false,
            timeLeft: 0,
            currentExercise: nextExercise,
            currentSet: 1,
            totalSets: exercises[nextExercise]?.sets || 1,
          }));
        } else {
          // Workout complete
          onComplete();
        }
      }
    } else {
      // Skip work, go to rest
      const currentExercise = exercises[timerState.currentExercise];
      const restTime = parseRestTime(currentExercise.rest);
      setTimerState(prev => ({
        ...prev,
        isRest: true,
        timeLeft: restTime,
      }));
    }
  };

  // Reset workout
  const resetWorkout = () => {
    setTimerState({
      isActive: false,
      isRest: false,
      timeLeft: 0,
      currentExercise: 0,
      currentSet: 1,
      totalSets: exercises[0]?.sets || 1,
    });
    setIsPaused(false);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerState.isActive && !isPaused && timerState.timeLeft > 0) {
      interval = setInterval(() => {
        setTimerState(prev => {
          const newTimeLeft = prev.timeLeft - 1;
          
          if (newTimeLeft <= 0) {
            // Timer finished
            if (prev.isRest) {
              // Rest finished, go to next set
              const nextSet = prev.currentSet + 1;
              if (nextSet <= prev.totalSets) {
                return {
                  ...prev,
                  isRest: false,
                  timeLeft: 0,
                  currentSet: nextSet,
                };
              } else {
                // Move to next exercise
                const nextExercise = prev.currentExercise + 1;
                if (nextExercise < exercises.length) {
                  return {
                    ...prev,
                    isRest: false,
                    timeLeft: 0,
                    currentExercise: nextExercise,
                    currentSet: 1,
                    totalSets: exercises[nextExercise]?.sets || 1,
                  };
                } else {
                  // Workout complete
                  onComplete();
                  return prev;
                }
              }
            } else {
              // Work finished, go to rest
              const currentExercise = exercises[prev.currentExercise];
              const restTime = parseRestTime(currentExercise.rest);
              return {
                ...prev,
                isRest: true,
                timeLeft: restTime,
              };
            }
          }
          
          return {
            ...prev,
            timeLeft: newTimeLeft,
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerState.isActive, isPaused, timerState.timeLeft, timerState.isRest, exercises, onComplete]);

  // Auto-start rest timer when work is complete
  useEffect(() => {
    if (timerState.isActive && !timerState.isRest && timerState.timeLeft === 0 && !isPaused) {
      const currentExercise = exercises[timerState.currentExercise];
      const restTime = parseRestTime(currentExercise.rest);
      setTimerState(prev => ({
        ...prev,
        isRest: true,
        timeLeft: restTime,
      }));
    }
  }, [timerState.isActive, timerState.isRest, timerState.timeLeft, isPaused, exercises]);

  if (!timerState.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent ml-4">
              Ready to Start?
            </h1>
          </div>

          {/* Workout Summary */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white text-center">
                Workout Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <div className="text-2xl font-bold text-orange-400">
                  {exercises.length} Exercises
                </div>
                <div className="text-gray-300">
                  Total Sets: {exercises.reduce((total, ex) => total + ex.sets, 0)}
                </div>
                <div className="text-gray-300">
                  Estimated Time: ~{Math.round(exercises.reduce((total, ex) => total + (ex.sets * parseRestTime(ex.rest)), 0) / 60)} minutes
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Start Button */}
          <div className="text-center">
            <Button
              onClick={startWorkout}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-12 py-4 text-xl font-semibold"
              size="lg"
            >
              <Play className="h-6 w-6 mr-2" />
              Start Workout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentExercise = exercises[timerState.currentExercise];
  const progress = ((timerState.currentExercise * 100) / exercises.length) + 
                  ((timerState.currentSet - 1) * 100 / exercises.length / timerState.totalSets);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            {timerState.isRest ? 'Rest Time' : 'Work Time'}
          </h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={resetWorkout}>
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-300">
            Exercise {timerState.currentExercise + 1} of {exercises.length} • Set {timerState.currentSet} of {timerState.totalSets}
          </div>
        </div>

        {/* Current Exercise */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">
              {currentExercise.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-6">
              {/* Timer Display */}
              <div className="text-6xl font-bold text-orange-400 mb-4">
                {Math.floor(timerState.timeLeft / 60)}:{(timerState.timeLeft % 60).toString().padStart(2, '0')}
              </div>
              
              {/* Status */}
              <div className="text-xl text-gray-300">
                {timerState.isRest ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-blue-400">Rest</span>
                    <span>•</span>
                    <span>{currentExercise.rest}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-green-400">Work</span>
                    <span>•</span>
                    <span>{currentExercise.sets} sets × {currentExercise.reps}</span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                <Button
                  onClick={togglePause}
                  className={`px-6 py-3 ${isPaused ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'}`}
                >
                  {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                <Button
                  onClick={skipCurrent}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-6 py-3"
                >
                  <SkipForward className="h-5 w-5 mr-2" />
                  Skip
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Exercise Preview */}
        {timerState.currentExercise + 1 < exercises.length && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-4">
              <div className="text-center text-gray-300">
                <span className="text-sm">Next: </span>
                <span className="text-white font-medium">
                  {exercises[timerState.currentExercise + 1].name}
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkoutTimer; 