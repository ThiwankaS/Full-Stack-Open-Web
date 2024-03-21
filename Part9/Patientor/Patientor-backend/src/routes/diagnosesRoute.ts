import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/',(_request,response) => {
    response.send(diagnosesService.getDiagnosesEntries());
});

export default router; 