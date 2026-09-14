import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());

const PORT = Number(process.env.PORT ?? 4000);

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// TODO: implement this.
// It should return the stations from data/stations.json as a clean, typed
// JSON list. See the README for what "clean" means. The data file is not
// perfectly tidy on purpose.
app.get('/api/stations', (_req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

app.listen(PORT, () => {
  console.log(`UV API listening on http://localhost:${PORT}`);
});
