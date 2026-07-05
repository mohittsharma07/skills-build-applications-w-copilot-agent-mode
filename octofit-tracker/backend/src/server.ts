import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';

type ResourceItem = {
  id?: string;
  [key: string]: unknown;
};

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

function createResourceRouter(resourceName: string, model: mongoose.Model<any>) {
  const router = express.Router();

  router.get('/', async (_req, res) => {
    const items = await model.find({}).lean();
    res.json({ resource: resourceName, items, apiBaseUrl });
  });

  router.post('/', async (req, res) => {
    const item = await model.create(req.body);
    res.status(201).json(item);
  });

  router.get('/:id', async (req, res) => {
    const item = await model.findById(req.params.id).lean();
    if (!item) {
      res.status(404).json({ error: `${resourceName} not found` });
      return;
    }

    res.json(item);
  });

  router.put('/:id', async (req, res) => {
    const item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      res.status(404).json({ error: `${resourceName} not found` });
      return;
    }

    res.json(item);
  });

  router.delete('/:id', async (req, res) => {
    const item = await model.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ error: `${resourceName} not found` });
      return;
    }

    res.json(item);
  });

  return router;
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', createResourceRouter('users', User));
app.use('/api/teams', createResourceRouter('teams', Team));
app.use('/api/activities', createResourceRouter('activities', Activity));
app.use('/api/leaderboard', createResourceRouter('leaderboard', LeaderboardEntry));
app.use('/api/workouts', createResourceRouter('workouts', Workout));

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
