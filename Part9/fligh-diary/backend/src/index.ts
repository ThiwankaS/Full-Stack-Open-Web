import express, { Request, Response, NextFunction } from 'express';
import diaryRouter from './routes/diaries';
import cors from 'cors';

const errorHandler = (error : any , _req : Request, res : Response, next : NextFunction ) => {
  console.error(error.message);
  if (error instanceof Error) {
    return res.status(404).send({ error : error.message });
  }
  return next(error);
};


const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});