import React from "react";
import PatientList from "./components/PatientList2";
// import PatientForm from "./components/PatientForm2";
import usePatients from "./store2";

const PatientContainer: React.FC = () => {
  const {
    patients,
    loading,
    error,
    // createPatient,
    updatePatient,
    deletePatient,
  } = usePatients();

  return (

    <div className="container mx-auto mt-20">

      <div className="mt-12 md:flex">
      <PatientList
        patients={patients}
        loading={loading}
        error={error}
        updatePatient={updatePatient}
        deletePatient={deletePatient}
      />
      </div>
    </div>
  );
};

export default PatientContainer;
