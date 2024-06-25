import React from 'react';
import { Patient } from '../types/index';

interface PatientListProps {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  updatePatient: (id: number, updatedPatient: Patient) => void;
  deletePatient: (id: number) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, loading, error, updatePatient, deletePatient }) => {
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
      {patients.length > 0 ? (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id} className="border-b p-4">
              {patient.nombre}
              <button onClick={() => deletePatient(patient.id)}>Eliminar</button>
              <button onClick={() => updatePatient(patient.id, { ...patient, nombre: 'Nombre Actualizado' })}>Actualizar</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No hay pacientes disponibles</div>
      )}
    </div>
  );
};

export default PatientList;
