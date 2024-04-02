import express from 'express';

import diaryService from '../services/diaryService';

import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    const errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      res.status(400).send({ error : `${errorMessage}. ${error.message }` });
    } else {
      res.status(500).send({ error : `${errorMessage}. Internal server error.` });
    }
  }
});

export default router;