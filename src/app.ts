import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from '@/routers';
import '@/sequelize';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', router);

export default app;
