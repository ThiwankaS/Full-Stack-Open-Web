import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';
import { toNewMedicalEntry } from '../utils';

const router = express.Router();

router.get('/',(_request,response) => {
    response.send(patientsService.getNonSensitivePatientEntries());
});

router.get('/:id',(request,response) => {
    const id : string = request.params.id; 
    response.send(patientsService.getPatientByID(id));
});

router.post('/',(request,response) => {
        try {
            const newPatientEntry = toNewPatientEntry(request.body);
            const savedPatient = patientsService.addNewPatientEntry(newPatientEntry);
            response.send(savedPatient);
        } catch (error : unknown) {
            let errorMessage = `Something went wrong.`;
            if(error instanceof Error){
                errorMessage += ` Error : ` + error.message;
            }
            response.status(400).send(errorMessage);
        }
});

router.post('/:id/entries',(request,response) => {
    try {
        const id : string = request.params.id;
        const newMedicalEntry = toNewMedicalEntry(request.body);
        const updatedPatient  = patientsService.addMedicalEntry(id,newMedicalEntry);
        response.send(updatedPatient);
    } catch (error : unknown) {
        let errorMessage = `Something went wrong.`;
        if(error instanceof Error){
            errorMessage += ` Error : ` + error.message;
        }
        response.status(400).send(errorMessage);
    }
});

export default router;