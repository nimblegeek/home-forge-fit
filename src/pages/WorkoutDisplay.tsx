import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Target, Zap, Play, Timer, TrendingUp, GripVertical, Edit2, Check, X } from 'lucide-react';
import WorkoutTimer from '@/components/WorkoutTimer';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Exercise Component
const SortableExercise = ({ 
  exercise, 
  index, 
  onUpdate 
}: { 
  exercise: Exercise; 
  index: number;
  onUpdate: (id: string, updatedExercise: Partial<Exercise>) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSets, setEditSets] = useState(exercise.sets);
  const [editReps, setEditReps] = useState(exercise.reps);
  const [editRest, setEditRest] = useState(exercise.rest);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exercise.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    onUpdate(exercise.id, {
      sets: editSets,
      reps: editReps,
      rest: editRest,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditSets(exercise.sets);
    setEditReps(exercise.reps);
    setEditRest(exercise.rest);
    setIsEditing(false);
  };

    return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 transition-all duration-200 max-w-2xl mx-auto ${
        isDragging ? 'shadow-lg scale-105 border-orange-500/50 bg-orange-500/10' : 
        isEditing ? 'border-blue-500/50 bg-blue-500/10' : 'hover:bg-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-semibold text-sm">
            {index + 1}
          </div>
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        {isEditing ? (
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-white">{exercise.name}</h3>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={editSets}
                onChange={(e) => setEditSets(Number(e.target.value))}
                className="w-16 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                min="1"
                max="10"
              />
              <span className="text-gray-300 text-sm">sets ×</span>
              <input
                type="text"
                value={editReps}
                onChange={(e) => setEditReps(e.target.value)}
                className="w-20 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                placeholder="10-15"
              />
              <span className="text-gray-300 text-sm">reps</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-gray-300 text-sm">Rest:</span>
              <input
                type="text"
                value={editRest}
                onChange={(e) => setEditRest(e.target.value)}
                className="w-16 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                placeholder="60s"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <h3 className="font-semibold text-white">{exercise.name}</h3>
            <p className="text-sm text-gray-300">{exercise.sets} sets × {exercise.reps}</p>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white p-1 h-8 w-8"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white p-1 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-1 h-8 w-8"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Badge variant="outline" className="border-orange-500/30 text-orange-300">
              Rest: {exercise.rest}
            </Badge>
          </>
        )}
      </div>
    </div>
  );
};

interface WorkoutParams {
  equipment: string[];
  type: string;
  duration: number;
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

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

// Mock workout generation based on parameters
const generateWorkout = (params: WorkoutParams) => {
  const { equipment: selectedEquipment, type, duration } = params;
  
  const exercises: Exercise[] = [
    { id: 'push-ups', name: 'Push-ups', sets: 3, reps: '10-15', rest: '60s' },
    { id: 'squats', name: 'Squats', sets: 3, reps: '15-20', rest: '60s' },
    { id: 'plank', name: 'Plank', sets: 3, reps: '30-45s', rest: '60s' },
    { id: 'lunges', name: 'Lunges', sets: 3, reps: '10 each leg', rest: '60s' },
    { id: 'mountain-climbers', name: 'Mountain Climbers', sets: 3, reps: '20-30', rest: '60s' },
    { id: 'burpees', name: 'Burpees', sets: 3, reps: '8-12', rest: '90s' },
  ];

  // Add equipment-specific exercises
  if (selectedEquipment.includes('dumbbells')) {
    exercises.push({ id: 'dumbbell-rows', name: 'Dumbbell Rows', sets: 3, reps: '12 each arm', rest: '60s' });
    exercises.push({ id: 'dumbbell-press', name: 'Dumbbell Press', sets: 3, reps: '10-12', rest: '90s' });
  }
  
  if (selectedEquipment.includes('kettlebells')) {
    exercises.push({ id: 'kettlebell-swings', name: 'Kettlebell Swings', sets: 3, reps: '15-20', rest: '90s' });
    exercises.push({ id: 'kettlebell-goblet-squats', name: 'Kettlebell Goblet Squats', sets: 3, reps: '12-15', rest: '60s' });
  }

  if (selectedEquipment.includes('resistanceBands')) {
    exercises.push({ id: 'band-rows', name: 'Band Rows', sets: 3, reps: '15-20', rest: '60s' });
    exercises.push({ id: 'band-squats', name: 'Band Squats', sets: 3, reps: '15-20', rest: '60s' });
  }

  if (selectedEquipment.includes('pullupBar')) {
    exercises.push({ id: 'pull-ups', name: 'Pull-ups', sets: 3, reps: '5-10', rest: '90s' });
    exercises.push({ id: 'hanging-leg-raises', name: 'Hanging Leg Raises', sets: 3, reps: '8-12', rest: '60s' });
  }

  return {
    type: workoutTypes.find(w => w.id === type) || workoutTypes[0],
    duration,
    exercises: exercises.slice(0, Math.min(exercises.length, 8)), // Limit to 8 exercises
    totalTime: duration,
    intensity: 'High',
    calories: Math.round(duration * 8), // Rough estimate
  };
};

const WorkoutDisplay = () => {
  const location = useLocation();
  const workoutParams = location.state as WorkoutParams;
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workout, setWorkout] = useState<any>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  React.useEffect(() => {
    if (workoutParams) {
      const generatedWorkout = generateWorkout(workoutParams);
      setWorkout(generatedWorkout);
      setExercises(generatedWorkout.exercises);
    }
  }, [workoutParams]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setExercises((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleExerciseUpdate = (id: string, updatedExercise: Partial<Exercise>) => {
    setExercises((items) =>
      items.map((exercise) =>
        exercise.id === id ? { ...exercise, ...updatedExercise } : exercise
      )
    );
  };

  const handleStartWorkout = () => {
    setIsTimerActive(true);
  };

  const handleWorkoutComplete = () => {
    setIsTimerActive(false);
    // You could add a completion celebration here
  };

  const handleBackFromTimer = () => {
    setIsTimerActive(false);
  };

  if (!workoutParams) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Workout Data</h1>
          <p className="text-gray-300 mb-6">Please generate a workout first.</p>
          <Link to="/training">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Go to Training
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!workout || exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Workout...</h1>
        </div>
      </div>
    );
  }

  if (isTimerActive) {
    return (
      <WorkoutTimer
        exercises={exercises}
        onComplete={handleWorkoutComplete}
        onBack={handleBackFromTimer}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/training" className="mr-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Your Custom Workout
          </h1>
        </div>

        {/* Workout Overview */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              Workout Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5">
                <div className={`p-2 rounded-full ${workout.type.color}`}>
                  <workout.type.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Type</p>
                  <p className="font-semibold text-white">{workout.type.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5">
                <Timer className="h-5 w-5 text-orange-400" />
                <div>
                  <p className="text-sm text-gray-300">Duration</p>
                  <p className="font-semibold text-white">{workout.duration} minutes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-300">Intensity</p>
                  <p className="font-semibold text-white">{workout.intensity}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-sm text-gray-300">Calories</p>
                  <p className="font-semibold text-white">~{workout.calories}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Used */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-2xl">🏠</span>
              Equipment Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {workoutParams.equipment.map((id) => {
                const item = equipment.find(e => e.id === id);
                return (
                  <Badge key={id} variant="secondary" className="bg-orange-500/20 text-orange-300 text-sm">
                    {item?.icon} {item?.name}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Exercise List */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-2xl">💪</span>
              Your Exercises
              <Badge variant="outline" className="ml-2 border-orange-500/30 text-orange-300 text-xs">
                Drag to reorder
              </Badge>
              <Badge variant="outline" className="ml-2 border-blue-500/30 text-blue-300 text-xs">
                Click edit to modify
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={exercises} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {exercises.map((exercise, index) => (
                    <SortableExercise 
                      key={exercise.id} 
                      exercise={exercise} 
                      index={index} 
                      onUpdate={handleExerciseUpdate}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleStartWorkout}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-lg font-semibold"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Workout
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold">
            Save Workout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDisplay; 