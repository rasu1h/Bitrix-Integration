import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dealsRouter } from './routes/deals';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/deals', dealsRouter);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`   Bitrix24 webhook: ${process.env.BITRIX24_WEBHOOK_URL ? '✅ configured' : '❌ not set'}`);
});
