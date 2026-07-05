import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    goal: String,
    city: String,
  },
  { timestamps: true },
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sport: String,
    location: String,
    members: Number,
  },
  { timestamps: true },
);

const activitySchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: Number,
    distanceKm: Number,
    calories: Number,
    notes: String,
  },
  { timestamps: true },
);

const leaderboardSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    rank: Number,
    streak: Number,
  },
  { timestamps: true },
);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    focus: String,
    durationMinutes: Number,
    difficulty: String,
    equipment: [String],
    description: String,
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
