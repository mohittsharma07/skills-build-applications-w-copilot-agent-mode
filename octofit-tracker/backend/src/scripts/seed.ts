import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Patel',
        email: 'ava.patel@example.com',
        age: 29,
        goal: 'Half marathon',
        city: 'Austin',
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@example.com',
        age: 34,
        goal: 'Strength training',
        city: 'Denver',
      },
      {
        name: 'Nia Brooks',
        email: 'nia.brooks@example.com',
        age: 27,
        goal: 'Cycling endurance',
        city: 'Seattle',
      },
    ]);

    await Team.insertMany([
      {
        name: 'River Runners',
        sport: 'Running',
        location: 'Austin',
        members: 6,
      },
      {
        name: 'Summit Cyclists',
        sport: 'Cycling',
        location: 'Denver',
        members: 5,
      },
    ]);

    await Activity.insertMany([
      {
        userName: users[0].name,
        type: 'Run',
        durationMinutes: 42,
        distanceKm: 8.2,
        calories: 410,
        notes: 'Morning tempo session',
      },
      {
        userName: users[1].name,
        type: 'Strength',
        durationMinutes: 60,
        calories: 520,
        notes: 'Upper body focus',
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userName: users[0].name, score: 1280, rank: 1, streak: 5 },
      { userName: users[1].name, score: 1190, rank: 2, streak: 3 },
      { userName: users[2].name, score: 1135, rank: 3, streak: 2 },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run',
        focus: 'Endurance',
        durationMinutes: 35,
        difficulty: 'Intermediate',
        equipment: ['Running shoes'],
        description: 'A brisk workout with intervals designed to improve pace.',
      },
      {
        title: 'Full-Body Strength',
        focus: 'Strength',
        durationMinutes: 50,
        difficulty: 'Intermediate',
        equipment: ['Dumbbells', 'Bench'],
        description: 'A balanced routine for upper and lower body strength.',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
