/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';


const router = express.Router();

router.get('/',(_request,response) => {
    response.send(patientsService.getNonSensitivePatientEntries());
});

router.post('/',(request,response) => {
        const newEntry = {...request.body};
        const savedPatient = patientsService.addNewPatientEntry(newEntry);
        response.send(savedPatient);
});

export default router;