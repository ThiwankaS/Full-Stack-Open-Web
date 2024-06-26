import { useState } from "react";
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';

import { PatientFormValues, Patient, Diagnoses } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";

import PatientView from "../PatientView";

interface Props {
  patients : Patient[];
  diagnoses : Diagnoses[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientListPage = ({ patients, setPatients, diagnoses } : Props ) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [selectedPatient,setSelectedPatient] = useState<Patient>();
  const [selectedPatientId,setSelectedPatientId] = useState<string>('');
  const [showPatientDetails,setShowPatientDetails] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const getSelectedPatient = async (id : string)=> {
    const data = await patientService.getPatientById(id);
    setSelectedPatient(data);
  };

  const showDetails = (id : string , event : React.SyntheticEvent) => {
    event.preventDefault();
    getSelectedPatient(id);
    setShowPatientDetails(true);
    setSelectedPatientId(id);
  };

  const hideDetails = () => {
    setSelectedPatient(undefined);
    setShowPatientDetails(false);
  };
  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell><a href="" onClick={(event) => showDetails(patient.id,event)}>{patient.name}</a></TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
      <PatientView 
        patient={selectedPatient}
        diagnoses={diagnoses}
        show={showPatientDetails}
        onClose={hideDetails}
        patientId={selectedPatientId}
      />
    </div>
  );
};

export default PatientListPage;
