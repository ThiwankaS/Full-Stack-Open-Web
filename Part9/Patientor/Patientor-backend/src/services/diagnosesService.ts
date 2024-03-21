import diagnosesData from '../data/diagnoses';
import { Diagnoses } from '../types';

const diagnoses : Diagnoses [] = diagnosesData;

const getDiagnosesEntries = () : Diagnoses[] => {
    return diagnoses;
};


export default {
    getDiagnosesEntries,
};