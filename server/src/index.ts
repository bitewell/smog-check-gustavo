import cors from 'cors';
import express from 'express';
import { getStations } from './stations';

const app = express();
app.use(cors());

const PORT = Number(process.env.PORT ?? 4000);

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/stations', (_req, res) => {
  res.json(getStations());
});

app.listen(PORT, () => {
  console.log(`UV API listening on http://localhost:${PORT}`);
});
