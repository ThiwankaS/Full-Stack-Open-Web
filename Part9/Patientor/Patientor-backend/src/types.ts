export type NonSensitivePatientEntries = Omit<Patient,'ssn' | 'entries'>;
export type NonSensitivePatient = Omit<Patient,'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient,'id'>;
export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum Type {
    Hospital = 'Hospital',
    OccupationalHealthcare = 'OccupationalHealthcare',
    HealthCheck = 'HealthCheck'
}

export enum  HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface Diagnoses {
    code : string;
    name : string;
    latin? : string;
}

export interface SickLeave {
    startDate : string;
    endDate : string;
}

export interface Discharge {
    date : string;
    criteria : string;
}

export interface BaseEntry {
    id : string;
    date : string;
    specialist : string;
    description : string;
    diagnosisCodes? : Array<Diagnoses['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
    healthCheckRating : HealthCheckRating;
    type : 'HealthCheck';
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    employerName : string;
    sickLeave : SickLeave;
    type : 'OccupationalHealthcare';
}

export interface HospitalEntry extends BaseEntry {
    discharge : Discharge;
    type : 'Hospital';
}

export interface Patient {
    id : string;
    name : string;
    dateOfBirth : string;
    ssn : string;
    gender : Gender;
    occupation : string;
    entries : Entry[];
}