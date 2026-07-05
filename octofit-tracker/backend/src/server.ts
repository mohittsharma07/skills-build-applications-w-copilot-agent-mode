import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

type ResourceItem = {
  id: string;
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

const users: ResourceItem[] = [
  { id: 'user-1', name: 'Ava Patel', email: 'ava@example.com' },
];
const teams: ResourceItem[] = [{ id: 'team-1', name: 'River Runners', members: 4 }];
const activities: ResourceItem[] = [{ id: 'activity-1', type: 'Run', duration: 35 }];
const leaderboard: ResourceItem[] = [{ id: 'leader-1', name: 'Ava Patel', score: 120 }];
const workouts: ResourceItem[] = [{ id: 'workout-1', name: 'Tempo Run', focus: 'endurance' }];

function createResourceRouter(resourceName: string, items: ResourceItem[]) {
  const router = express.Router();

  router.get('/', (_req, res) => {
    res.json({ resource: resourceName, items, apiBaseUrl });
  });

  router.post('/', (req, res) => {
    const payload = req.body as ResourceItem;
    const { id: _ignoredId, ...rest } = payload;
    const item = { id: `${resourceName}-${items.length + 1}`, ...rest };
    items.push(item);
    res.status(201).json(item);
  });

  router.get('/:id', (req, res) => {
    const item = items.find((entry) => entry.id === req.params.id);
    if (!item) {
      res.status(404).json({ error: `${resourceName} not found` });
      return;
    }

    res.json(item);
  });

  router.put('/:id', (req, res) => {
    const index = items.findIndex((entry) => entry.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ error: `${resourceName} not found` });
      return;
    }

    items[index] = { ...items[index], ...req.body };
    res.json(items[index]);
  });

  router.delete('/:id', (req, res) => {
    const index = items.findIndex((entry) => entry.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ error: `${resourceName} not found` });
      return;
    }

    const [removed] = items.splice(index, 1);
    res.json(removed);
  });

  return router;
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', createResourceRouter('users', users));
app.use('/api/teams', createResourceRouter('teams', teams));
app.use('/api/activities', createResourceRouter('activities', activities));
app.use('/api/leaderboard', createResourceRouter('leaderboard', leaderboard));
app.use('/api/workouts', createResourceRouter('workouts', workouts));

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
