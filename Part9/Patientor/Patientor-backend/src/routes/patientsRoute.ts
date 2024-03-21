import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/',(_request,response) => {
    response.send(patientsService.getNonSensitivePatientEntries());
});

export default router;